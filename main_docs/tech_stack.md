# Tech Stack & Engineering Conventions

*The default stack, architecture patterns, and design language for this codebase. Deliberately **general** — this doc describes **how** we build, never **what** we build.*

**Status:** Recommended default · **Date:** August 2026

> **How to read this doc.**
>
> **This is not tied to any feature, and it shouldn't be.** Features change constantly; the stack underneath them should not. Nothing here references a specific product feature, and nothing here should be edited when the feature list changes. If you find yourself adding "…for the fees screen" to this doc, it belongs in a feature spec instead.
>
> **These are defaults, not rules.** The point is to remove a hundred small "which library?" decisions before development starts, so every developer — and every AI agent working in this repo — reaches for the same thing by default. Where something genuinely needs a different tool, we add it deliberately and write down why. The defaults exist to be boring; the interesting problems should be in the product, not in tooling debates.
>
> **It's chosen to be AI-agent-friendly.** Every pick below is weighted toward tools that coding agents already know cold, with predictable conventions and readable in-repo code. That's a real engineering criterion now, not a novelty.

---

## 1. Principles

1. **One language by default.** A feature should be one folder in one runtime. A feature that straddles two languages isn't one unit of work anymore — it's two, with a network hop and a second ORM between them.
2. **Fewer vendors.** Every additional service is another SDK, another auth model, another set of docs, another dashboard. Consolidate unless there's a concrete reason not to.
3. **Opinionated and predictable beats clever.** The stack should be the *obvious* one. Agents and new developers both perform dramatically better on conventional choices than on bespoke ones.
4. **Code in the repo beats config in a dashboard.** Prefer tools whose behaviour is visible as readable source you can grep, diff, and review.
5. **Escape hatches stay open.** Every choice below has a documented next step (§10). Nothing here requires a rewrite to scale.

---

## 2. The stack

**TypeScript end to end, Supabase as the data platform, Vercel to host.**

| Layer | Choice | Why |
| --- | --- | --- |
| **Language** | **TypeScript**, everywhere | One language across UI, API, jobs, and AI workflows. One toolchain, one type system, one set of shared types. |
| **Frontend** | **Next.js (App Router) + React** | The most-represented framework in agent training data by a wide margin — agents scaffold routes and components with near-zero clarification. Server components keep it fast; the file-system router means adding a page never edits a shared route table. |
| **Styling / UI** | **Tailwind CSS + shadcn/ui** | shadcn components are *copied into the repo* as plain readable code rather than hidden behind a library API — so they're greppable, diffable, and directly editable by agents. See §7 for the design language. |
| **API layer** | **Next.js Route Handlers + Server Actions**; **tRPC** where end-to-end type safety earns its keep | Type-safe client↔server with no hand-written API contracts. Each feature adds its own router. |
| **Data platform** | **Supabase** — Postgres + Auth + Storage + pgvector + row-level security, in one box | Replaces what would otherwise be three or four vendors. One SDK, one mental model, one set of docs. Ships an official **MCP server**, so an agent can read the real schema instead of guessing at it. |
| **Database** | **PostgreSQL** | The correct default for ~95% of applications. Relational integrity, JSONB when you need flexibility, RLS for tenant isolation, and pgvector for semantic search — all in one engine, no second datastore to operate. |
| **ORM / migrations** | **Drizzle** | One ORM, one migration history. Schema is plain TypeScript that reads like SQL — easy for agents to get right. Migrations are **append-only and timestamp-named**, so two branches never collide. |
| **Auth** | **Supabase Auth** — email + magic link, org/membership tables governed by RLS | Workspaces, roles, and invitations without a second vendor. Swap in WorkOS behind the same session interface if enterprise SSO ever becomes a hard requirement. |
| **File storage** | **Supabase Storage**, signed upload/download URLs | Same auth model as the database — no separate IAM to reason about. S3-compatible, so moving to R2/S3 later is a config change. |
| **Background jobs** | **Inngest** — durable steps, retries, scheduling, runs on Vercel | Anything long-running, scheduled, or retryable belongs here rather than in a request. No Redis or worker fleet to operate. Supabase cron is fine for trivial periodic jobs. |
| **LLM provider** | **Anthropic Claude** (`claude-opus-5` for hard reasoning, `claude-sonnet-5` for high-volume steps), behind a thin **LLM-gateway module** | Native citations, structured outputs, and extended thinking. The gateway keeps model IDs and provider quirks in one file instead of scattered across features. |
| **Email** | **Resend** | Simple, TypeScript-native, React Email templates live in the repo. |
| **Payments** | **Stripe**, when there's something to charge for | The default everyone and every agent already knows. |
| **Observability** | **Sentry** (errors) + structured logs + LLM tracing (Langfuse or the provider console) | You must be able to trace any output back through the code path that produced it. |
| **Testing** | **Vitest** (unit) + **Playwright** (e2e) | Fast, TS-native, conventional. |
| **Repo & CI** | **Turborepo/pnpm monorepo**, GitHub + GitHub Actions, CODEOWNERS per area | One repo, cached builds, **path-scoped CI** so a change's tests run on its own files. |
| **Hosting** | **Vercel** (web + API + workflows) + **Supabase** (data) + **Inngest** (jobs) | Three managed services, no containers to operate. Boring, scalable, no premature Kubernetes. |

---

## 3. When to deviate

Deviating is fine. Deviating *silently* is not — add a short note to this section when you do.

- **A second language.** Justified when an ecosystem is genuinely better for a bounded job (Python for heavy document parsing, OCR, or scientific work). The shape that stays clean: **one narrow service that does that job and nothing else**, called over HTTP, owning no tables and no business logic. What we avoid is *starting* with a two-language split before we know we need one.
- **A specialist datastore.** pgvector in Postgres is the default. A dedicated vector DB (Qdrant, Turbopuffer) is warranted only when recall or latency measurably demands it.
- **A heavier workflow engine.** Inngest covers most durable orchestration. Temporal earns its complexity only for genuinely long-lived, multi-day, stateful workflows.
- **Anything with a dashboard-only configuration model.** Push back hard. It won't be reviewable, and agents can't see it.

---

## 4. Architecture: a modular monolith of vertical slices

Merge conflicts almost never come from two people editing the *same feature*. They come from two people editing the **same shared central file** — the router that lists every route, the nav config, one giant schema file, the dependency-injection wiring.

Three rules make a feature a self-contained unit:

1. **A feature owns a folder, top to bottom.** UI, API routes, business logic, tables, migrations, workflows, and tests for one feature all live in `features/<name>/`. You build a feature by *adding a folder*, not by touching a dozen shared files.
2. **Features register themselves; nothing central lists them.** Routes, nav entries, background jobs, and workflows are discovered from the filesystem at boot. Adding a feature never edits a root `app` file or a master route table — the #1 source of conflicts.
3. **Features talk through contracts, not each other's internals.** A small, slow-changing `packages/contracts` holds shared types and schemas. Features depend on contracts, never on another feature's guts. Cross-feature needs go through a published event or a contract interface.

> **The test.** Two developers add two unrelated features on two branches. Both branches touch **only** their own `features/<name>/` folder plus, at most, an append-only migration file. `git merge` produces **zero** conflicts. Everything in this section exists to make that true.

---

## 5. How a feature plugs in — the registry pattern

The reason features don't conflict is that **the app discovers them; a human never edits a central list.**

Each feature ships a manifest. One loader globs them at boot.

```ts
// features/<name>/feature.config.ts
export default defineFeature({
  id: "example-feature",
  nav: { label: "Example", icon: "table", section: "main" },
  routes:    () => import("./routes"),     // API router for this feature
  page:      () => import("./ui/Page"),    // its screen(s)
  jobs:      () => import("./jobs"),       // background jobs it owns
  workflows: () => import("./workflows"),  // AI workflows it registers
});
```

```ts
// app/registry.ts — written ONCE, never edited when adding features
const features = import.meta.glob("../features/*/feature.config.ts", { eager: true });
export const registry = Object.values(features).map(m => m.default);
```

AI workflows register the same way, so adding one is dropping in a file:

```ts
// features/<name>/workflows/<workflow>.ts
export default defineWorkflow({
  id: "example_workflow",
  version: "1.0",
  input:  ExampleInput,     // zod schema
  output: ExampleOutput,    // structured JSON — validated, not free text
  async run(ctx) { ... },
});
```

**Database:** each feature owns its tables (prefixed) and its own timestamped, append-only migration files. No hand-edited central schema.

**Net effect:** the only shared files that ever change are `packages/contracts` (rare, deliberate, reviewed) and the append-only migrations folder. Everything else is add-a-folder.

---

## 6. Repository layout

```
<repo>/
├─ apps/
│  └─ web/                     # Next.js app (thin — mostly loads feature slices)
│     └─ app/registry.ts       # the one auto-discovery loader
├─ services/                   # [ONLY IF NEEDED] narrow single-purpose services (§3)
├─ features/                   # ← every feature slice lives here
│  └─ <feature-name>/
│     ├─ ui/                   # screens and components
│     ├─ api/                  # route handlers / router
│     ├─ domain/               # business logic, plain testable functions
│     ├─ db/migrations/        # append-only, timestamp-named
│     ├─ workflows/            # AI workflows this feature registers
│     ├─ jobs/                 # background jobs this feature owns
│     ├─ tests/
│     └─ feature.config.ts     # the manifest
└─ packages/
   ├─ contracts/               # shared types/zod schemas — slow-changing, reviewed
   ├─ ui/                      # design-system primitives (shadcn/ui) + tokens (§7)
   ├─ llm-gateway/             # provider-abstracted LLM client + citation helpers
   └─ db/                      # Supabase client, Drizzle schema, RLS helpers
```

Pair with **CODEOWNERS** (`/features/<name>/ @dev`) so each slice has a clear owner and reviews route automatically.

---

## 7. Design language

**Inspiration: Anthropic's warm-minimal aesthetic** — cream rather than white, near-black rather than pure black, a single warm accent used sparingly, serif display type against a clean sans UI, and elevation built from color contrast instead of drop shadows.

> **Inspiration, not imitation.** We're borrowing the *approach* — warm neutrals, editorial typography, restraint — to build our own identity. We don't copy Anthropic's logo, wordmark, or brand assets, and their display faces (Copernicus, Styrene) are licensed and not ours to use. The substitutes below are the actual picks.

### 7.1 Why this direction

Nearly every B2B SaaS product defaults to cool gray on pure white. A warm cream canvas reads as considered and calm rather than clinical, and it costs nothing to implement. The serif display face is what keeps it from looking like every other AI tool — it signals editorial care, which matters for a product whose output people are meant to trust.

### 7.2 Tokens

Define these once in `packages/ui` as CSS custom properties, and map them into `tailwind.config.ts` so components never hardcode a hex value.

```css
:root {
  /* Surfaces — warm, deliberately not pure white */
  --canvas:          #faf9f5;   /* page background */
  --surface-soft:    #f5f0e8;   /* subtle raised areas, table stripes */
  --surface-card:    #efe9de;   /* cards, panels */

  /* Text — near-black, never #000 */
  --ink:             #141413;   /* headlines */
  --body-strong:     #252523;
  --body:            #3d3d3a;   /* default body copy */
  --muted:           #6c6a64;   /* secondary text, labels */
  --muted-soft:      #8e8b82;   /* captions, timestamps, placeholders */

  /* Accent — the signature. Used sparingly: primary CTAs and callouts only. */
  --accent:          #cc785c;
  --accent-active:   #a9583e;
  --accent-disabled: #e6dfd8;

  /* Borders — hairlines, low contrast */
  --hairline:        #e6dfd8;
  --hairline-soft:   #ebe6df;

  /* Status */
  --success:         #5db872;
  --warning:         #d4a017;
  --error:           #c64545;
  --info:            #5db8a6;
}

/* Dark mode — warm dark, not blue-black */
:root[data-theme="dark"] {
  --canvas:       #181715;
  --surface-soft: #1f1e1b;
  --surface-card: #252320;
  --ink:          #faf9f5;
  --body:         #e8e5dd;
  --muted:        #a8a49a;
  --hairline:     #34322d;
}
```

### 7.3 Typography

| Role | Font | Notes |
| --- | --- | --- |
| **Display / headings** | **Newsreader** (or EB Garamond / Source Serif 4) | Serif, weight 400. Apply **negative letter-spacing** — `-0.02em` at large sizes, easing to `-0.01em` by 28px. Without it the face reads loose and generic. |
| **Body / UI** | **Inter** | Humanist sans, 400–500. All UI labels, navigation, tables, forms. |
| **Code / data** | **JetBrains Mono** | 14px, line-height 1.6. Also good for figures in dense tables. |

Type scale: `64 / 48 / 36 / 28` display · `16` body · `14` small · `13` caption.

### 7.4 Layout and form

- **Spacing:** 4px base unit — `4, 8, 12, 16, 24, 32, 48, 96`. Section vertical rhythm is generous (64–96px); cards are 24–32px internally.
- **Radius:** `4` xs · `6` sm · `8` md (buttons, inputs) · `12` lg (cards) · `16` xl (hero containers) · `9999` pill (badges).
- **Elevation via contrast, not shadow.** Separate surfaces with the cream ramp and hairline borders. Reserve a soft shadow for hover/active states only.
- **Accent discipline.** The coral is voltage, not decoration — primary CTAs and the occasional full-bleed callout. If more than one accent element is visible in a viewport, question it.
- **Density.** Data-heavy screens use the small/caption sizes and tighter spacing; marketing and empty states get the generous rhythm. Don't mix the two rhythms on one screen.

### 7.5 Practical notes

- Build every screen **theme-aware from the start**. Retrofitting dark mode is far more expensive than doing it in the tokens up front.
- Charts and data visualizations should pull from the same token set, not invent their own palette.
- Never hardcode a hex outside `packages/ui`. If a component needs a color that isn't a token, that's a signal the token set needs one — add it there.

---

## 8. AI layer conventions

General rules for any AI-backed feature, regardless of what it does.

- **Structured output, always.** Every workflow declares a zod input and output schema and validates against it. Free-form text is a UI concern, never an interface between components.
- **Citations are a first-class output.** Any claim derived from a source document carries `{source, location, retrieved_at}`. Use the provider's native citation support rather than asking the model to format references itself.
- **Deterministic work is NOT the LLM.** Arithmetic, date math, unit conversion, and anything with a correct answer are plain TypeScript with unit tests, each exposing its formula and inputs. The model may *decide* a calculation applies; it never performs it.
- **Retrieval is a tool the agent calls, not a pipeline that answers.** Semantic search for recall, keyword search for precision, and reading the real source for provenance. Let the agent iterate across all three rather than capping it at a fixed top-k.
- **Long runs are jobs, not requests.** Anything multi-step or slow executes as durable Inngest steps so it survives restarts and gets retries for free.
- **Verification passes are cheap insurance.** For anything a user will act on, a second pass that rejects unsupported claims is the main guard against confident hallucination.
- **Human-in-the-loop is a real state, not a TODO.** If output needs review, `pending_review` is a first-class status in the data model with a UI that says so.
- **Model IDs live in the gateway.** One file. Never scattered through features.

---

## 9. Multi-tenancy & security

Build these in from day one — retrofitting tenancy is a rewrite.

- **Every tenant-owned row carries a tenant/org id**, and isolation is enforced with **Postgres row-level security**, not just application-layer `WHERE` clauses. Defense in depth.
- **Core shared entities** live in `packages/contracts` + `packages/db`; feature tables extend them rather than forking them.
- **Encryption in transit and at rest**, audit logging, data deletion, and resource-level permissions are baseline, not features.
- **Never mix tenants' data in a shared index.** Scope retrieval per tenant at the query level.

---

## 10. Scale path

Nothing here needs re-architecting to grow; each piece has a known next step.

| Concern | Default | At scale |
| --- | --- | --- |
| Compute | Vercel, no containers to operate | Dedicated compute for heavy workloads once they exceed function limits or dominate cost |
| Database | One managed Supabase Postgres | Read replicas; connection pooling (Supavisor/PgBouncer); partition large tables by tenant |
| Retrieval | pgvector in Postgres | Dedicated vector DB *only if* recall or latency measurably demands it |
| Jobs | Inngest | Same at higher volume; Temporal for genuinely long-lived stateful workflows |
| Tenancy | Shared DB + RLS | Still fine for hundreds of tenants; isolate a whale onto its own schema/DB if required |
| LLM cost | Larger model for hard steps, smaller for volume; prompt caching | Batch API for bulk work; cache shared context aggressively |

The modular boundary is the escape hatch: if one feature genuinely needs to be its own service later, it already *is* a self-contained slice with a contract — extract it without a rewrite.

---

## 11. Developer workflow

1. **One feature = one folder = one branch = one owner** (CODEOWNERS).
2. **Never edit a central list** — routes, nav, jobs, and workflows self-register.
3. **Migrations are append-only and timestamped** — never edit an existing migration; add a new one.
4. **`packages/contracts` changes are rare, reviewed, and announced** — treat them as API changes.
5. **Path-scoped CI** — only the affected slice's build and tests run, so PRs stay fast and independent.
6. **Cross-feature needs go through events or contracts**, never direct imports of another feature's internals.
7. **Design tokens are the only source of color and type** — no hardcoded values outside `packages/ui`.

---

## Sources

Research current as of August 2026.

**AI-agent-friendly stack consensus:**

- [Tech Stack for Vibe Coding Modern Applications (KDnuggets)](https://www.kdnuggets.com/tech-stack-for-vibe-coding-modern-applications)
- [The Best SaaS Stack in 2026: Build Production Apps Fast (MakerKit)](https://makerkit.dev/blog/saas/saas-stack-2026)
- [The Best Tech Stack for Vibe Coding Your First App (Mukund Mohan)](https://mukundmohan.blog/2025/11/07/the-best-tech-stack-for-vibe-coding-your-first-app/)
- [The Perfect Vibe Coding Tech Stack 2026 (Context Studios)](https://www.contextstudios.ai/blog/the-perfect-vibe-coding-tech-stack-2026-10-tools-every-app-needs)

**Design language:**

- [Claude/Anthropic design tokens — awesome-design-md (VoltAgent)](https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/claude/DESIGN.md)
- [Styrene in use: Anthropic (Type.Today)](https://type.today/en/journal/anthropic)
- [Anthropic — Geist (brand identity work)](https://geist.co/work/anthropic)
- [Claude brand color palette (Mobbin)](https://mobbin.com/colors/brand/claude)

**Architecture:**

- [Modules vs Vertical Slices 2026 — Modular Monolith macro vs micro architecture (AppScale)](https://appscale.blog/en/blog/modules-vs-vertical-slices-macro-vs-micro-architecture-modular-monolith-2026)
- [Monolith vs Microservices in 2026: The Decision Framework (DistantJob)](https://distantjob.com/blog/monolith-vs-microservices/)
- [Microservices Backlash 2026: When Monoliths Make a Comeback (DevX)](https://www.devx.com/uncategorized/microservices-backlash-monoliths-comeback-2026/)
- [The Exact Tech Stack I Use to Ship AI SaaS Products Fast in 2026 — Next.js + PostgreSQL (Hassan Raza)](https://hassanr.com/blogs/ai-saas-tech-stack-2026-nextjs-postgresql.html)
- [Best Tech Stack for Building a Scalable SaaS Application in 2026 (Empiric Infotech)](https://empiricinfotech.com/blogs/best-tech-stack-for-saas-2026)
- [Best SaaS Tech Stack 2026: Architecture That Scales (AgileSoftLabs)](https://www.agilesoftlabs.com/blog/2026/03/best-saas-tech-stack-architecture-2026)
