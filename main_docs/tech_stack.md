# Tribunus — Tech Stack & Architecture Plan

*How we build Tribunus so multiple developers can ship complex AI features in parallel, each as a self-contained "Lego block," with near-zero git conflict — starting as an MVP but scaling to many client firms.*

**Status:** Recommended default · **Date:** August 2026 · Companion to [mvp_feature_list.md](mvp_feature_list.md)

> **How to read this doc.** This is the **recommended starting stack**, not a cage. Its job is to remove a hundred small "which library?" decisions before development starts, so every developer — and every AI agent working in this repo — makes the same predictable choice by default. Where a feature genuinely needs something else (a specialist parsing library, a different queue, a service in another language), we add it deliberately and note why. The defaults exist to be boring; the interesting problems are in the AI layer (§6), not in tooling debates.

---

## 1. What we're actually building (the technical shape)

Tribunus is **not** a chatbot. It's a **developer-side risk-control platform** that turns fragmented municipal data + a firm's private project documents into cited, verifiable findings. The stack has to be good at six things at once:

| Requirement (from the feature list) | Technical demand |
| --- | --- |
| Document upload, versioning, extraction (F4, F5) | File storage, PDF/Office/image parsing, OCR fallback |
| Cited baselines, assumptions & risks register (F6, F11) | Structured, versioned, multi-tenant relational data with an audit trail |
| **Every claim traces to a source** (F14 — the trust backbone) | Native citation mapping (page/section/char) from the LLM, not free-form summaries |
| "Run Development Review" fires several AI workflows → one result (F10) | Orchestrated, resumable **agentic/LLM workflows** with structured JSON output + independent verification |
| Deterministic calculators for FSR/fees (F8) | Plain, testable code — **never** the LLM doing arithmetic |
| Human-in-the-loop review, Project Watch monitoring (F15, F13) | Internal review console + background jobs / scheduled monitoring |
| Multiple firms, isolated data (F1) | Multi-tenant isolation from day one |

The one constraint that shapes **everything below**: *multiple developers building complex features in parallel with minimal merge conflict, each feature a plug-in Lego block.*

---

## 2. The core principle: a modular monolith of vertical feature slices

Merge conflicts almost never come from two people editing the *same feature*. They come from two people editing the **same shared central file** — the router that lists every route, the nav config, the one giant DB schema, the dependency-injection wiring. Industry consensus in 2026 (Shopify, Gusto, PlayTech case studies) is that a **modular monolith with vertical feature slices + strict internal contracts** gets you parallel-team velocity without the operational tax of microservices.

We adopt three rules that make a feature a true Lego block:

1. **A feature owns a folder, top to bottom.** UI, API routes, business logic, DB tables, migrations, LLM workflow, and tests for one feature all live in `features/<name>/`. You build a feature by *adding a folder*, not by touching a dozen shared files.
2. **Features register themselves; nothing central lists them.** Routes, nav entries, background jobs, and analysis workflows are discovered from the filesystem or a per-feature manifest at boot. Adding a feature never edits a root `app` file or a master route table — the #1 source of conflicts.
3. **Features talk through contracts, not each other's internals.** A small, slow-changing `packages/contracts` package holds the shared types/schemas. Features depend on contracts, never on another feature's guts. If feature A needs something from feature B, it goes through a published event or a contract interface.

> **The test for "is this a real Lego block?"** — Two developers add two unrelated features on two branches. Both branches touch **only** their own `features/<name>/` folder plus, at most, an append-only migration file. `git merge` produces **zero** conflicts. Everything in this doc exists to make that true.

---

## 3. The stack

**TypeScript end to end, Supabase as the data platform, Vercel to host.** Two principles drive these picks:

1. **One language by default.** A feature slice should be one folder in one runtime. A slice that straddles TypeScript *and* Python isn't really a Lego block anymore — it's two, with a network hop and a second ORM between them. We start single-language and add a second runtime only when a real need forces it (§3.1).
2. **Fewer vendors, more predictable agents.** This stack is deliberately the one AI coding agents know best: Next.js and Supabase are among the most-represented tools in training data, shadcn/ui components are copied into our repo as plain readable code rather than hidden behind a library API, and Supabase ships an MCP server so an agent can inspect the live schema instead of guessing. Predictability is the feature.

| Layer | Choice | Why |
| --- | --- | --- |
| **Frontend** | **Next.js (App Router) + React + TypeScript**, Tailwind CSS + shadcn/ui | Component-per-feature maps cleanly to slices; server components keep it fast; shadcn/ui gives us the "deliberately not a blank chatbot," polished-looking product (incl. placeholder features) quickly. |
| **API / BFF** | **Next.js Route Handlers + Server Actions** for app/CRUD; **tRPC** (or typed REST) where we want end-to-end type safety | Type-safe client↔server with no hand-written API contracts; each feature adds its own router, auto-merged into the root. |
| **AI / workflow layer** | **TypeScript, in-repo** — Anthropic SDK agentic tool-loops running as Next.js route handlers and background jobs | The Anthropic TS SDK does tool loops, structured outputs, and citations natively, so orchestration needs no separate service or language. Workflows stay inside their feature slice (§4). |
| **Data platform** | **Supabase** — Postgres + Auth + Storage + pgvector + RLS in one box | Replaces what would otherwise be three vendors (managed Postgres + Clerk/WorkOS + S3). One SDK, one mental model, one set of docs for humans and agents. Its native idiom is **Postgres RLS for multi-tenancy** — exactly what §7 already mandates. Has an official **MCP server**, so agents can read the real schema. |
| **Primary database** | **PostgreSQL** (via Supabase) | The correct default for ~95% of SaaS. Relational integrity for the assumption/risk registers, JSONB for flexible findings, RLS for tenant isolation, and pgvector — all in one engine. |
| **Retrieval (semantic index)** | **pgvector** (same Postgres), used as a *tool the agent calls* — not a standalone RAG pipeline | Powers the recall half of our hybrid agentic search (see §6). The index surfaces candidate passages by meaning; the agent then reads the real files to verify and cite. Start in Postgres — no second datastore to operate. Swap to a dedicated vector DB only if scale forces it (see §8). |
| **Documents source-of-truth** | **Versioned file repo per corpus** in **Supabase Storage** (S3-compatible), canonical; the semantic index is *derived* from it | Real files give real page/section citations, cheap incremental indexing, and Kevin's freshness/change-detection almost for free (see §6). |
| **File storage** | **Supabase Storage**, signed upload/download URLs | Secure, versioned document storage with the same auth model as the database — no separate IAM to reason about. S3-compatible, so moving to R2/S3 later is a config change. |
| **Auth & orgs** | **Supabase Auth** — email + magic link, org/membership tables with RLS policies | Firm workspaces, roles (Admin/Member/Viewer), invitations, and magic links (feature F1) without a second vendor. If enterprise SSO becomes a real sales blocker, swap in WorkOS behind the same session interface. |
| **ORM / migrations** | **Drizzle** (TypeScript) | One ORM, one migration history. Schema is plain TS that reads like SQL — easy for agents to get right. **Per-feature migration files** are the key: append-only, timestamp-named, so two features' migrations never collide. |
| **LLM provider** | **Anthropic Claude** (`claude-opus-5` for hard analysis, `claude-sonnet-5` for high-volume/cheaper steps), behind a thin **LLM-gateway abstraction** | Claude's **native Citations** feature (page/section/char-level source mapping) is a near-perfect fit for F14, the trust backbone. Structured outputs + extended thinking suit careful, verification-heavy work. The gateway keeps us from being locked to one vendor. |
| **Document parsing** | **Claude's native PDF support** for most documents; a **hosted parsing API** (LlamaParse / Reducto / Mistral OCR) for scanned or heavily-tabular municipal PDFs | Keeps parsing a service call rather than a reason to run a Python fleet. This is the row most likely to change — see §3.1. |
| **Background jobs / monitoring** | **Inngest** (TS-native, durable, runs on Vercel) | Project Watch (F13), scheduled monitoring, long-running reviews, and the weekly digest all need durable async execution — not request/response. Inngest gives retries, steps, and scheduling without operating Redis or a worker fleet. Supabase cron is fine for trivial periodic jobs. |
| **Billing (later)** | **Stripe** | Pilot is manual; wire Stripe when pricing is validated. |
| **Observability** | **Sentry** (errors) + **structured logs** + LLM tracing (Langfuse or the Anthropic console) | We *must* be able to trace a finding back through the workflow that produced it. |
| **Repo & CI** | **Turborepo/pnpm monorepo**, GitHub + GitHub Actions, per-feature CODEOWNERS | One repo, cached builds, and **path-scoped CI** so a feature's tests run on its own files. |
| **Hosting** | **Vercel** (Next.js + route handlers) + **Supabase** (managed Postgres/Auth/Storage) + **Inngest** (jobs) | Three managed services, no containers to operate for the MVP. Boring, scalable, no premature Kubernetes. |

### 3.1 When we'd add Python

Python's document-processing and OCR ecosystem is genuinely better than TypeScript's. If hosted parsing APIs turn out to be too inaccurate, too slow, or too expensive on real Vancouver/Coquitlam PDFs, the answer is a **single narrow Python service that does parsing and nothing else** — containerized on Railway/Render/Fly, called over HTTP, owning no tables and no business logic.

That stays compatible with everything in this doc because feature slices depend only on the workflow-registry contract (§4), not on where parsing physically runs. What we're avoiding is the *default* split — two languages, two ORMs, and two deploy targets before we know we need them. Deterministic calculators (F8) stay in TypeScript either way: they're plain tested code, and they belong next to the features that call them.

---

## 4. How a feature plugs in (the registry pattern — this is the whole game)

The reason features don't conflict is that **the app discovers them; a human never edits a central list.** Concretely:

### Routes & navigation — self-registering

Each feature ships a manifest describing what it exposes. A single loader globs `features/*/feature.config.ts` at boot. Adding a feature adds a file; it does not edit a shared router.

```ts
// features/assumption-ledger/feature.config.ts
export default defineFeature({
  id: "assumption-ledger",
  nav: { label: "Assumptions", icon: "table", section: "analysis" },
  routes: () => import("./routes"),        // API/tRPC router for this feature
  page:   () => import("./ui/Page"),        // its screen(s)
  jobs:   () => import("./jobs"),           // background jobs it owns
  workflows: () => import("./workflows"),   // LLM workflows it registers
});
```

```ts
// app/registry.ts  — written ONCE, never edited when adding features
const features = import.meta.glob("../features/*/feature.config.ts", { eager: true });
export const registry = Object.values(features).map(m => m.default);
```

### AI workflows — a registry too

The five MVP Codex/Claude workflows (fact extraction → baseline → assumption analysis → precedent/risk → verification) each register themselves. "Run Development Review" (F10) asks the registry for the workflows tagged for that action and runs them — so adding a sixth workflow later is just dropping in a new file.

```ts
// features/development-review/workflows/assumption-analysis.ts
export default defineWorkflow({
  id: "assumption_analysis",
  version: "1.0",
  stage: "review",
  input:  AssumptionInput,      // zod schema
  output: AssumptionLedger,     // structured JSON — validated, not free text
  async run(ctx) { ... },
});
```

### Database — per-feature tables + append-only migrations

Each feature owns its tables (prefixed, e.g. `ledger_assumptions`) and its own migration files. Migrations are **timestamped and append-only**, so two branches never edit the same migration and Postgres applies them in order. No single hand-edited `schema.sql`.

**Net effect:** the only shared files that ever change are `packages/contracts` (rare, deliberate, reviewed) and the append-only migrations folder. Everything else is add-a-folder.

---

## 5. Suggested repository layout

```
tribunus/
├─ apps/
│  └─ web/                     # Next.js app (thin — mostly loads feature slices)
│     └─ app/registry.ts       # the one auto-discovery loader
├─ services/
│  └─ parsing/                 # [ONLY IF NEEDED] narrow Python doc-parsing service (§3.1)
├─ features/                   # ← every Lego block lives here
│  ├─ project-portfolio/
│  ├─ document-upload/
│  ├─ project-profile/
│  ├─ verified-baseline/
│  ├─ fees-review/
│  ├─ deterministic-calculators/   # plain code, heavily tested
│  ├─ assumption-ledger/
│  ├─ development-review/           # the orchestrator + the 5 workflows
│  ├─ precedent-search/
│  ├─ risk-register/
│  ├─ project-watch/                # background monitoring + digest
│  ├─ evidence-citations/           # the trust backbone
│  ├─ analyst-review-console/       # human-in-the-loop
│  ├─ reports-export/
│  └─ ask-this-project/             # [PLACEHOLDER UI in MVP]
│  # each feature/: ui/  api/  domain/  db/migrations/  workflows/  jobs/  tests/  feature.config.ts
├─ packages/
│  ├─ contracts/               # shared types/zod schemas — slow-changing, reviewed
│  ├─ ui/                      # shared design-system primitives (shadcn/ui)
│  ├─ llm-gateway/             # provider-abstracted Claude client + citations helpers
│  └─ db/                      # Supabase client, Drizzle schema, RLS helpers, migration runner
└─ turbo.json / pnpm-workspace.yaml
```

Pair this with **CODEOWNERS** (`/features/fees-review/ @dev-a`) so each Lego block has a clear owner and reviews route automatically.

---

## 6. The AI layer — hybrid agentic retrieval

This is the "really complicated AI platform" part, and it's the piece we've deliberately designed to be **best-in-industry quality**, because a risk-control product lives or dies on whether it *misses* things. The design is a **multi-agent orchestrator over domain-scoped specialist agents**, each of which does **hybrid agentic search** — semantic retrieval for recall, then agentic file-reading for precision and real citations.

### 6.1 The topology: orchestrator → domain sub-agents

- **A master orchestrator** decomposes a task (e.g. "Run Development Review") and dispatches to the domain sub-agents it needs, then synthesizes and verifies their findings into one coherent result (F10).
- **Domain-scoped sub-agents** are the specialists. Each one is scoped to a single corpus — *Coquitlam council reports*, *Vancouver council reports*, *BC Building Code*, *a city's DCC/ACC fee schedules*, etc. — with a **domain system prompt** encoding how that jurisdiction actually works (e.g. Coquitlam ACC rules, in-stream protection, the OCP→Metro Van servicing cascade, "never mix historical and current rates").
- A "sub-agent" is **not** a persistent model process living in a folder. It is a *scoped invocation*: `corpus + tool-scope + domain prompt`, spun up on demand by the orchestrator. This is what lets it scale to many client firms without N×M idle processes.
- **Scoping is also a performance and reliability mechanism.** Because each sub-agent only ever searches its own slice, one city's corpus growing to tens of thousands of pages never slows another city's query, and findings can't bleed across domains.

### 6.2 Hybrid search inside each sub-agent (recall + precision)

Each sub-agent is given retrieval **tools** and drives its own search loop — the index does *not* answer on its own:

- **Semantic search (recall):** a pgvector index over the sub-agent's corpus, matching on *meaning*, so a document that uses different wording than the agent would have grepped for still surfaces. This is the safety net against the silent-miss failure mode — e.g. finding a watercourse-protection DPA's riparian buffer when the agent only knew to look for "setback."
- **Keyword / grep (precision):** exact-string search for bylaw numbers, fee codes, defined terms.
- **Read the real files (provenance):** the agent opens the actual document text to verify a candidate really says what's needed, discard false positives, spot superseded content, and cite the **exact page/section**.
- **All tools are uncapped and iterative** — the agent keeps pulling on any of them until it's confident. There is no fixed "top-k" that caps what it can see; semantic retrieval simply makes sure the right document is *reachable* so the agent isn't searching under the streetlight while the answer sits in the dark.

**Why both, not one:** semantic-only gives approximate, context-stripped chunks (weak citations); agentic-grep-only silently misses anything worded unexpectedly (weak recall). Combined: the index guarantees the right files are *found*, the agent guarantees they're *read, verified, and cited*.

### 6.3 The corpora and the index lifecycle

- **Two corpus families:** (a) curated municipal sources (Vancouver + Coquitlam for the pilot), organized per jurisdiction × source-type; and (b) each firm's **private** project documents. Private and municipal data are **tenant-scoped and never mixed across customers** (F1 + §7).
- **Files are the source of truth; the index is derived.** Source documents live in a git-backed repo per corpus. This gives real-file citations, and — because ingestion is event-driven — Kevin's **freshness indicator** ("updated today / last week") and **change detection** ("what moved since last week" = a diff) nearly for free.
- **Indexing is incremental, not a rebuild.** A new council meeting → chunk *that* document → embed only its chunks → insert. Existing embeddings are untouched; cost per meeting is trivial. A **full re-embed** happens only in two rare, batchable cases: upgrading the embedding model, or changing the chunking strategy.
- **Every chunk carries metadata** — jurisdiction, document type, effective date, and current-vs-superseded status — so the "never mix historical and current rates" rule is enforced by filtering on effective-date at query time. Old rate schedules are **marked superseded, never deleted** (the history is needed).

### 6.4 Trust, verification, and the non-negotiables

- **Citations are a first-class output, not an afterthought.** Use Claude's native citation support so every extracted fact carries `{source_document, page/section, char_range}`. This directly implements F14 and lets the UI render "Verified fact / Calculated / Tribunus assessment / Requires confirmation" with real provenance.
- **Every workflow has a strict I/O contract.** Defined input, structured JSON output (validated against a schema), evidence requirements, and an **independent verification pass** that rejects unsupported findings (F10 / P4) — the guard against confident hallucination.
- **Deterministic calculators are NOT the LLM.** FSR, fee totals, unit/area charges, dedications, dates (F8) are plain TypeScript with unit tests, each exposing its formula and inputs. The LLM may *decide* a calculator applies; it never does the math.
- **Human-in-the-loop is a real workflow state.** A result sits in `pending_review` showing "Analysis under Tribunus review" until an analyst approves it in the console (F15) — mandatory for the pilot and the source of the eval data that lets us automate later.

### 6.5 Orchestration mechanics

For the MVP, the orchestrator and sub-agents run **in-repo as TypeScript**, via the Anthropic SDK's agentic tool-loop with the retrieval tools above. Long-running invocations (Run Development Review, Project Watch sweeps) execute as **Inngest steps** rather than inside a request, so they get durability, retries, and resumability for free. Because "agents that grep and read files in a corpus" is exactly what file-scoped agent runtimes do out of the box, most of the sub-agent plumbing is configuration, not infrastructure.

If orchestration outgrows this — genuinely long multi-day workflows, complex fan-out/fan-in, or heavy parsing that wants Python (§3.1) — we graduate the orchestrator to a dedicated workflow engine (Temporal) or split out a service, **without changing the feature slices**, because they depend only on the workflow-registry contract (§4).

---

## 7. Multi-tenancy & data model (from day one)

- **Every tenant-owned row carries `firm_id`.** Enforce isolation with **Postgres Row-Level Security**, not just app-layer `WHERE` clauses — defense in depth so one firm can never see another's data.
- **Core shared entities** (in `packages/contracts` + `db`): `firm`, `user`, `membership(role)`, `project`, `document(version)`, `finding`, `assumption`, `risk`, `source`, `citation`, `analysis_run`. Feature-specific tables extend these; they don't fork them.
- **Encryption in transit and at rest**, audit logs, data deletion, project-level permissions — baseline security from day one; the full feature-level security/audit console is deferred (see [deferred_feature_list.md](deferred_feature_list.md)).

---

## 8. MVP now → many clients later (the scale path)

Nothing here needs re-architecting to scale; each piece has a known next step:

| Concern | MVP | At scale |
| --- | --- | --- |
| Compute | Vercel (web + workflows), no containers to operate | Dedicated compute for AI workloads (containers on ECS/Fargate) once agent runs dominate cost or exceed function limits |
| Database | One managed Supabase Postgres | Read replicas; connection pooling (Supavisor/PgBouncer); partition big tables by `firm_id`; self-host or move to RDS if we outgrow the managed tier |
| Retrieval index | pgvector in Postgres, scoped per corpus | Dedicated vector DB (Qdrant/Turbopuffer) *only if* recall/latency demands it; sub-agent scoping already keeps per-corpus queries fast as the dataset grows |
| Agentic search cost/latency | Async workflows (Run Development Review) absorb multi-hop search fine | Cache municipal corpora aggressively; reserve full agentic sweeps for async, use tighter retrieval for interactive surfaces |
| Jobs | Inngest (durable steps, scheduling, retries) | Same, at higher volume; Temporal if orchestration becomes genuinely multi-day and stateful |
| Doc parsing | Claude native PDF + hosted parsing API | Narrow Python parsing service if accuracy/cost demands it (§3.1) |
| Tenancy | Shared DB + Supabase RLS | Shared DB + RLS still fine for hundreds of firms; isolate a whale onto its own schema/DB if required |
| LLM cost | Opus for hard steps, Sonnet for volume, prompt caching on the big municipal context | Batch API for monitoring sweeps; cache municipal corpora aggressively |

The modular-monolith boundary is the escape hatch: if one feature (say Project Watch's monitoring) genuinely needs to be its own service later, it already *is* a self-contained slice with a contract — you extract it without a rewrite.

---

## 9. The developer workflow that keeps conflicts near zero

1. **One feature = one folder = one branch = one owner** (CODEOWNERS).
2. **Never edit a central list** — routes, nav, jobs, and workflows self-register.
3. **Migrations are append-only and timestamped** — never edit an existing migration; add a new one.
4. **`packages/contracts` changes are rare, reviewed, and announced** — it's the one shared surface, so treat changes to it as an API change.
5. **Path-scoped CI** — Turborepo runs only the affected feature's build/tests, so PRs stay fast and independent.
6. **Cross-feature needs go through events or contracts**, never direct imports of another feature's internals.

Follow these six rules and two developers shipping two complex features on the same day merge cleanly.

---

## 10. Deferred (don't build during MVP)

Consistent with [deferred_feature_list.md](deferred_feature_list.md) and the codex MVP sprint notes: no automated municipality-wide scraping, no live GIS/parcel mapping engine, no automated DCC/CAC calculator sweep, no council-video transcription, no CAD/BIM interpretation, no mobile app. Curate municipal + precedent data manually for the pilot; the adapters and ingestion pipeline (F9) are slices we add later without disturbing anything else.

---

## Sources

Architecture and stack research (current as of August 2026):

**AI-agent-friendly stack consensus** (the basis for the §3 revision):

- [Tech Stack for Vibe Coding Modern Applications (KDnuggets)](https://www.kdnuggets.com/tech-stack-for-vibe-coding-modern-applications)
- [The Best SaaS Stack in 2026: Build Production Apps Fast (MakerKit)](https://makerkit.dev/blog/saas/saas-stack-2026)
- [The Best Tech Stack for Vibe Coding Your First App (Mukund Mohan)](https://mukundmohan.blog/2025/11/07/the-best-tech-stack-for-vibe-coding-your-first-app/)
- [The Perfect Vibe Coding Tech Stack 2026 (Context Studios)](https://www.contextstudios.ai/blog/the-perfect-vibe-coding-tech-stack-2026-10-tools-every-app-needs)

**Architecture:**

- [Modules vs Vertical Slices 2026 — Modular Monolith macro vs micro architecture (AppScale)](https://appscale.blog/en/blog/modules-vs-vertical-slices-macro-vs-micro-architecture-modular-monolith-2026)
- [Monolith vs Microservices in 2026: The Decision Framework (DistantJob)](https://distantjob.com/blog/monolith-vs-microservices/)
- [Microservices Backlash 2026: When Monoliths Make a Comeback (DevX)](https://www.devx.com/uncategorized/microservices-backlash-monoliths-comeback-2026/)
- [The Exact Tech Stack I Use to Ship AI SaaS Products Fast in 2026 — Next.js + PostgreSQL (Hassan Raza)](https://hassanr.com/blogs/ai-saas-tech-stack-2026-nextjs-postgresql.html)
- [Best Tech Stack for Building a Scalable SaaS Application in 2026 (Empiric Infotech)](https://empiricinfotech.com/blogs/best-tech-stack-for-saas-2026)
- [Best SaaS Tech Stack 2026: Architecture That Scales (AgileSoftLabs)](https://www.agilesoftlabs.com/blog/2026/03/best-saas-tech-stack-architecture-2026)
