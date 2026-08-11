# Tribunus — AI Architecture

*The product-specific AI design: what Tribunus actually has to do, and how the retrieval and analysis layer is shaped to do it. Feature-coupled by nature — expect this to change as the feature list changes.*

**Status:** Proposed · **Date:** August 2026

**Companions:** [tech_stack.md](tech_stack.md) — the general, feature-agnostic stack and conventions (start there) · [locked_feature_list.md](locked_feature_list.md) — the feature set this serves.

---

## 1. The technical shape of the product

Tribunus is **not** a chatbot. It's a **developer-side risk-control platform** that turns fragmented municipal data plus a firm's private project documents into cited, verifiable findings. That demands six things at once:

| Requirement | Technical demand |
| --- | --- |
| Document upload, versioning, extraction (F4, F5) | File storage, PDF/Office/image parsing, OCR fallback |
| Cited baselines, assumptions & risks register (F6, F11) | Structured, versioned, multi-tenant relational data with an audit trail |
| **Every claim traces to a source** (F14 — the trust backbone) | Native citation mapping (page/section/char) from the LLM, not free-form summaries |
| "Run Development Review" fires several workflows → one result (F10) | Orchestrated, resumable agentic workflows with structured JSON output + independent verification |
| Deterministic calculators for FSR/fees (F8) | Plain, testable code — **never** the LLM doing arithmetic |
| Human-in-the-loop review, Project Watch monitoring (F15, F13) | Internal review console + durable background jobs / scheduled monitoring |
| Multiple firms, isolated data (F1) | Multi-tenant isolation from day one |

The general conventions for all of the above live in [tech_stack.md](tech_stack.md) §8–§9. What follows is the part specific to *this* product.

---

## 2. Hybrid agentic retrieval

This is the piece deliberately designed to be best-in-class, because a risk-control product lives or dies on whether it **misses** things. The design is a **multi-agent orchestrator over domain-scoped specialist agents**, each doing hybrid agentic search — semantic retrieval for recall, then agentic file-reading for precision and real citations.

### 2.1 Topology: orchestrator → domain sub-agents

- **A master orchestrator** decomposes a task (e.g. Run Development Review, F10), dispatches to the domain sub-agents it needs, then synthesizes and verifies their findings into one coherent result.
- **Domain-scoped sub-agents** are the specialists. Each is scoped to a single corpus — *Coquitlam council reports*, *Vancouver council reports*, *BC Building Code*, *a city's DCC/ACC fee schedules* — with a **domain system prompt** encoding how that jurisdiction actually works (Coquitlam ACC rules, in-stream protection, the OCP→Metro Van servicing cascade, "never mix historical and current rates").
- A sub-agent is **not** a persistent process. It's a *scoped invocation*: `corpus + tool-scope + domain prompt`, spun up on demand. That's what lets it scale to many client firms without N×M idle processes.
- **Scoping is also a performance and reliability mechanism.** Because each sub-agent only searches its own slice, one city's corpus growing to tens of thousands of pages never slows another city's query, and findings can't bleed across domains.

### 2.2 Hybrid search inside each sub-agent

Each sub-agent gets retrieval **tools** and drives its own search loop — the index does *not* answer on its own:

- **Semantic search (recall):** a pgvector index over the sub-agent's corpus, matching on *meaning*, so a document worded differently than the agent would have grepped for still surfaces. This is the safety net against the silent-miss failure mode — e.g. finding a watercourse-protection DPA's riparian buffer when the agent only knew to look for "setback."
- **Keyword / grep (precision):** exact-string search for bylaw numbers, fee codes, defined terms.
- **Read the real files (provenance):** the agent opens actual document text to verify a candidate says what's needed, discard false positives, spot superseded content, and cite the exact page/section.
- **All tools are uncapped and iterative.** No fixed top-k caps what the agent can see; semantic retrieval just makes sure the right document is *reachable* so the agent isn't searching under the streetlight while the answer sits in the dark.

**Why both:** semantic-only gives approximate, context-stripped chunks (weak citations); agentic-grep-only silently misses anything worded unexpectedly (weak recall). Combined, the index guarantees the right files are *found* and the agent guarantees they're *read, verified, and cited*.

### 2.3 Corpora and index lifecycle

- **Two corpus families:** (a) curated municipal sources — Vancouver and Coquitlam for the pilot, organized per jurisdiction × source-type; and (b) each firm's **private** project documents. Private and municipal data are tenant-scoped and never mixed across customers.
- **Files are the source of truth; the index is derived.** Source documents live in a versioned repo per corpus. This gives real-file citations and — because ingestion is event-driven — the **freshness indicator** ("updated today / last week") and **change detection** ("what moved since last week" = a diff) nearly for free.
- **Indexing is incremental, not a rebuild.** A new council meeting → chunk *that* document → embed only its chunks → insert. Existing embeddings untouched; cost per meeting is trivial. A **full re-embed** happens only when upgrading the embedding model or changing chunking strategy — both rare and batchable.
- **Every chunk carries metadata** — jurisdiction, document type, effective date, current-vs-superseded status — so "never mix historical and current rates" is enforced by filtering on effective date at query time. Old rate schedules are **marked superseded, never deleted**; the history is needed.

### 2.4 Trust and verification — the non-negotiables

- **Citations are a first-class output.** Every extracted fact carries `{source_document, page/section, char_range}` via Claude's native citation support. This implements F14 and lets the UI render *Verified fact / Calculated / Tribunus assessment / Requires confirmation* with real provenance.
- **Every workflow has a strict I/O contract** — defined input, schema-validated JSON output, evidence requirements, and an **independent verification pass** that rejects unsupported findings (F10, P4). This is the guard against confident hallucination.
- **Deterministic calculators are NOT the LLM.** FSR, fee totals, unit/area charges, dedications, dates (F8) are plain TypeScript with unit tests exposing formula and inputs. The LLM may decide a calculator applies; it never does the math.
- **Human-in-the-loop is a real workflow state.** Results sit in `pending_review` showing "Analysis under Tribunus review" until an analyst approves in the console (F15) — mandatory for the pilot, and the source of the eval data that lets us automate later.

### 2.5 Orchestration mechanics

For the MVP the orchestrator and sub-agents run **in-repo as TypeScript**, via the Anthropic SDK's agentic tool-loop with the retrieval tools above. Long-running invocations (Run Development Review, Project Watch sweeps) execute as **Inngest steps** rather than inside a request, so they get durability, retries, and resumability for free. Because "agents that grep and read files in a corpus" is what file-scoped agent runtimes do out of the box, most of the sub-agent plumbing is configuration, not infrastructure.

If orchestration outgrows this — genuinely long multi-day workflows, complex fan-out/fan-in, or heavy parsing that wants Python — we graduate the orchestrator or split out a service **without changing the feature slices**, because they depend only on the workflow-registry contract ([tech_stack.md](tech_stack.md) §5).

---

## 3. Feature slices

The features from [locked_feature_list.md](locked_feature_list.md) map onto the slice layout in [tech_stack.md](tech_stack.md) §6:

```
features/
├─ firm-workspace/              # F1
├─ project-portfolio/           # F2, F3
├─ document-upload/             # F4
├─ project-profile/             # F5
├─ verified-baseline/           # F6
├─ fees-review/                 # F7
├─ deterministic-calculators/   # F8 — plain code, heavily tested
├─ municipal-ingestion/         # F9
├─ development-review/          # F10 — the orchestrator + its workflows
├─ findings-register/           # F11
├─ precedent-council/           # F12
├─ project-watch/               # F13 — monitoring + digest
├─ evidence-citations/          # F14 — the trust backbone
├─ analyst-review-console/      # F15 — human-in-the-loop
├─ reports-export/              # F16
├─ consultant-checklist/        # F17
├─ city-comments/               # F18
├─ sales-comps/                 # F19
└─ ask-this-project/            # P1 [PLACEHOLDER UI]
```

**Two features are the critical path** and deserve the strongest owners: **F10 (Development Review)**, the orchestrator whose output is the product's first impression, and **F14 (Evidence & Citations)**, the trust backbone every claim depends on. Both should exist in skeleton form early so other features integrate against their contracts.

---

## 4. Deferred — don't build during the MVP

Consistent with [deferred_feature_list.md](deferred_feature_list.md) and the codex MVP sprint notes: no automated municipality-wide scraping, no live GIS/parcel mapping engine, no automated DCC/CAC calculator sweep, no council-video transcription, no CAD/BIM interpretation, no mobile app.

Curate municipal and precedent data manually for the pilot; the adapters and ingestion pipeline (F9) are slices we add later without disturbing anything else.
