# Feature: Agentic Document Search

## 1. Overview

This feature answers complex, specific questions about municipal development approvals by reasoning over a corpus of historical planning documents. It replaces the standard retrieval-augmented generation (RAG) pattern with agentic search: an LLM agent navigates a prepared document corpus using search and read tools, in the same way a coding agent navigates a large codebase.

Initial corpus is approximately 20GB of PDFs covering historical approved development projects for the City of Coquitlam, BC. Architecture assumes additional cities will be added, each as its own jurisdiction-scoped agent over its own corpus partition (§5.1).

## 2. Problem Statement

Users (developers, planners, consultants) need answers to questions that require synthesis across many documents: precedent research, condition patterns, comparative analysis of past approvals. Today this work is done manually by reading through council minutes, staff reports, and hearing records, which takes hours to days per question.

Standard RAG is not sufficient for this use case. It retrieves fixed-size text chunks and passes them to the model as the complete context. For multi-hop questions, the relevant material is spread across documents and sections, and chunk boundaries fragment the reasoning chain. Chunks that appear individually irrelevant are often meaningful in combination. The result is answers that look complete but silently omit critical material.

## 3. Goals and Non-Goals

### Goals

- Answer complex multi-hop questions with document-and-page-level citations
- Achieve high recall on relevant source documents, measured explicitly
- Preserve full fidelity of source material, including tables, maps, and site plans
- Support both project-scoped questions and corpus-wide analytical questions
- Scale to additional municipalities without architectural change

### Non-Goals (v1)

- Real-time or sub-second response. Target is a research tool, not a chat assistant
- Live ingestion of new filings as they are published (batch updates only)
- Cross-city comparative questions (deferred until city two is onboarded)
- Document drafting or generation of application materials

## 4. Corpus Preparation

Answer quality is bounded by corpus quality. Agentic search works on codebases because code provides plain text, meaningful structure, and fast search. Ingestion must manufacture all three for the document corpus.

### 4.1 Parsing

- All PDFs processed through the Mistral OCR / Document AI API
- Output is markdown with page anchors preserved throughout, so every extracted statement traces to a specific document and page
- `bbox_annotation_format` configured with a planning-domain schema, producing structured annotations for every extracted figure (image type, transcribed location details, visible planning parameters, factual summary). Annotations are inserted inline in the markdown, making figure content searchable
- `include_image_base64` enabled so cropped figure images are saved to disk alongside the markdown

### 4.2 Visual content

No text conversion can losslessly represent a zoning map, site plan, or elevation drawing. Visual fidelity is preserved through the figure images Mistral extracts during parsing: each figure is stored as an image file alongside its structured annotation, and referenced inline from the markdown at the position it occupies in the source document.

At query time this gives the agent two paths to visual content: the annotation makes the figure discoverable through text search, and the stored image lets the agent inspect the figure directly when a question depends on what it actually shows.

Full-page renders are not produced in v1. Source PDFs are retained, so page rendering can be added later without reprocessing if evaluation shows the agent needs to see full page layout rather than isolated figures.

### 4.3 Corpus structure and project identity

Documents and projects have a many-to-many relationship. A single council meeting minutes document covers multiple unrelated applications; a single project generates documents across years and may appear under different addresses, file numbers, or phase designations as it progresses. A directory tree keyed on project cannot represent this, so project grouping is modelled in data rather than in the filesystem.

**Document storage** is organized by provenance, not by project:

- Partitioned by city, then by document type and date (for example: council minutes, staff reports, public hearing records, development permit decisions)
- Filenames encode date, document type, and source identifier
- Each document carries frontmatter with source path, city, date, document type, and page count

**Project registry** is a database entity, not a folder:

- Canonical project record with a stable internal ID
- Alias table of every address, legal description, file number, and application number the project has appeared under
- Phase and predecessor relationships linking related applications across time
- Populated by an ingestion-time resolution pass, described below

**Document-to-project mapping** is a link table associating a project with a specific document and page range, so a set of minutes covering six applications produces six links to six distinct page ranges rather than one link to the whole file. Links carry a confidence value.

**Generated navigation aids:**

- Per-project view: a generated manifest assembling every linked document and page range in chronological order, with one-line summaries. This is the project "folder" the agent sees, materialized on demand from the link table
- Per-document index: which projects a document touches, and where in the document each is discussed
- Corpus catalog of all projects with their aliases and current status
- A per-city guide document (equivalent to AGENTS.md) explaining that city's document taxonomy, its approval process flow, domain terminology, project identity conventions, and citation requirements. This doubles as the maintained, reviewable source for that city agent's domain system prompt (§5.1), keeping jurisdiction knowledge in the corpus rather than hard-coded in application code

**Project identity resolution** is a distinct ingestion stage and a significant piece of work in its own right. It must detect project references within documents, segment multi-project documents into page ranges per project, and resolve references to canonical projects across address changes, subdivisions, consolidations, and phased applications. Ambiguous or low-confidence resolutions are surfaced for review rather than silently committed, since a wrong link produces answers that cite the wrong project.

### 4.4 Structured extraction

During ingestion, an LLM pass extracts a structured record per project into a relational database: address, application type, floor space ratio, height, unit count, parking provision, decision, decision date, and attached conditions. This is what makes aggregate questions tractable. Schema must be prototyped against a sample of at least 50 real projects before being finalized, since municipal record-keeping is inconsistent across decades.

### 4.5 Quality assurance (MVP scope)

Two automated checks run on every document, both cheap:

- Page count reconciliation between source PDF and parsed output, guarding against partial reads
- Text quality heuristic (dictionary word ratio per page) to catch OCR failure on poor scans

Documents failing either check are quarantined and reported rather than entering the corpus silently.

One manual gate before the corpus is built on: a sampled review of parsed output against the source PDFs, sized to establish whether extraction quality clears the bar. This runs once, not continuously.

**Deferred beyond MVP:** per-table verification against page images by a vision model, and ongoing sampled review with tracked quality scores. Both are worth building once the corpus is in production use and specific failure patterns are known.

## 5. Query Architecture

### 5.1 Topology: orchestrator → city agents

Search is decomposed by **jurisdiction, not by question**. A master orchestrator owns the conversation, resolves which jurisdiction a question concerns, dispatches to that city's agent, and synthesizes and verifies the returned findings into one answer. All corpus access happens inside a city agent; the orchestrator never searches directly.

**One agent per city.** A city agent is `corpus + tool scope + domain system prompt` — scoped to that municipality's entire document set across every type (council minutes, staff reports, public hearing records, permit decisions), and carrying a prompt that encodes how that municipality actually works: its approval process, document taxonomy, local terminology, bylaw and file-number conventions, and the failure modes specific to it.

A city agent is **not a persistent process**. It is a scoped invocation, spun up on demand and torn down once its findings are returned, which is what lets the design serve many cities and many concurrent users without N×M idle processes.

Scoping is a quality mechanism as much as an organizational one:

- **Recall improves because the domain prompt is specific.** A prompt that has to describe four municipalities at once describes none of them well
- **Corpora stay independent.** One city's corpus growing to millions of pages never slows another city's queries
- **Findings cannot bleed across jurisdictions.** A Coquitlam agent has no read path to Vancouver documents, so a citation from the wrong city is structurally impossible rather than something the verification pass has to catch

Cross-city questions remain out of scope for v1 (§3), but this topology is what makes them cheap later: fan out to two city agents and synthesize, with no change to either agent.

### 5.2 Agent harness

Built on an agent SDK (Claude Agent SDK or equivalent) rather than by invoking a coding CLI as a subprocess. Requirements: session persistence for the orchestrator conversation, custom tool definitions, permission control, and subagent support with **per-subagent tool and filesystem scoping** — the mechanism that enforces the city isolation described above.

Runtime: one orchestrator session per conversation; city agents are spawned per dispatch with their corpus partition mounted read-only and no outbound network access from the agent container. Onboarding a city means registering one more agent definition against one more corpus partition and guide document — configuration, not architecture.

### 5.3 City agent tools

Every tool below is scoped to the invoking agent's own city partition. The orchestrator holds no search tools of its own; it works only with what city agents return.

| Tool | Purpose |
|---|---|
| Text search | Exact-match search over the markdown corpus. Handles addresses, bylaw numbers, permit IDs, and other identifiers |
| Semantic search | Returns document and page pointers, not content. Resolves vocabulary mismatch where the same concept appears under different terms across documents and eras |
| Structured query | SQL over the extracted project database, filtered to this city. Handles aggregate, statistical, and filtered questions |
| Figure viewer | Loads an extracted figure image so the agent can inspect maps, plans, and drawings directly rather than relying on their annotations |
| Project loader | Assembles a project view from the document-to-project link table and loads it into context for project-scoped questions, bypassing retrieval entirely |

The semantic search design point is important: embeddings are used to locate information, never to represent it. The agent receives pointers and then reads the full surrounding section. This captures embedding recall without inheriting RAG's context fragmentation.

### 5.4 Execution strategies

Routing decides **how much machinery a question needs**. It sits on top of the topology rather than replacing it: the orchestrator picks a strategy alongside the jurisdiction, and the strategy then runs inside that city's agent.

- **Project-scoped**: the city agent assembles the full project view (all linked page ranges across all documents, including predecessor phases) and loads it into context. Highest quality path when applicable, since retrieval risk is eliminated. Quality here is bounded by the completeness of project identity resolution rather than by search
- **Corpus-wide analytical**: full agentic loop within the city agent. For questions spanning many projects the city agent may fan out to its own short-lived search subagents for breadth — these are workers inside one jurisdiction, never additional domain specialists
- **Aggregate or statistical**: structured query first, followed by verification reads against source documents
- **Simple lookup**: direct retrieval path, optimized for latency

Misrouting must degrade gracefully. A question routed to a cheaper path that cannot be answered from it must escalate rather than answer from insufficient evidence.

### 5.5 Verification

Drafted answers pass through a verification step before delivery. Each claim is checked against its cited page, using the extracted figure image where the claim depends on a map, plan, or drawing. Unverifiable claims are removed or flagged rather than shipped. This approximately doubles per-query cost and is treated as a requirement, not an optimization, given the professional audience and the consequences of a confidently wrong precedent claim.

### 5.6 Context management

Hard questions can pull hundreds of pages into context. Required mitigations:

- Agent isolation: city agents return distilled findings and citations to the orchestrator, never raw document text, and the same rule binds any search subagents inside a city agent. The orchestrator's context stays clean by construction
- Scratchpad notes persisted to a file so intermediate findings survive context compaction
- Explicit compaction strategy with monitoring, since context exhaustion degrades answer quality silently rather than failing loudly

## 6. Evaluation

An evaluation set is built before tuning begins and gates every subsequent design decision.

- Minimum 20 representative questions spanning all four execution strategies, with hand-verified correct answers
- For each question, a hand-labelled set of all documents that are genuinely relevant

### Metrics

| Metric | Definition | Priority |
|---|---|---|
| Recall | Fraction of hand-labelled relevant documents the agent actually found | Highest |
| Citation accuracy | Fraction of citations that support the claim they are attached to | High |
| Answer correctness | Scored against hand-verified answers | High |
| Latency (p50, p95) | End to end, per execution strategy | Medium |
| Cost per query | Token and API spend, per execution strategy | Medium |

Recall is the priority metric because recall failures are silent. An answer that missed the two most relevant documents looks identical to a correct one.

## 7. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Silent recall failure | Confidently incomplete answers erode user trust irrecoverably | Hybrid search (exact plus semantic), explicit recall measurement, in-jurisdiction subagent breadth |
| Ingestion information loss | Tables or map details corrupted or dropped during parsing | Figure images retained alongside annotations, automated parse checks, one-time sampled review before build-out |
| Project identity resolution failure | Missed links produce incomplete project views; wrong links produce answers citing the wrong project | Confidence scoring on links, review queue for ambiguous resolutions, recall measured against hand-labelled projects |
| Context exhaustion | Quality degrades without visible failure | Subagent isolation, scratchpad persistence, compaction monitoring |
| Prompt injection via document content | Agent behaviour steered by corpus text | Read-only tools, no network egress, document content never treated as instruction |
| Jurisdiction misdispatch | A question sent to the wrong city agent yields confident answers from an irrelevant corpus | Explicit jurisdiction resolution before dispatch, city recorded on every citation, ambiguous jurisdiction surfaced to the user rather than guessed. Immaterial in v1 (single city), real at city two |
| Domain prompt drift | Per-city prompts diverge in quality as cities are added, so recall silently varies by jurisdiction | Prompt sourced from the reviewed per-city guide document (§4.3), evaluation set extended per city before that city ships |
| Latency or cost exceeding tolerance | Product unusable or uneconomic | Routing to cheap paths where sufficient, per-category budgets, caching |
| Structured schema mismatch | SQL layer sparse and unusable | Schema prototyped against 50+ real projects before commit |

## 8. Open Questions

1. What latency does the product promise? This determines the affordable depth of verification and orchestration.
2. *Inside* a city agent, where is the boundary between fanning out to search subagents and single-agent search with a scratchpad? Decomposition adds breadth but risks losing detail in synthesis. The jurisdiction boundary itself is settled — one agent per city (§5.1) — this is the remaining question one level down.
3. How much per-project structured extraction is worthwhile before the schema becomes sparse?
4. How is project identity defined at the boundaries? Specifically: does a phased development with separate applications constitute one project or several linked projects, and does a subdivided or consolidated parcel inherit the approval history of its predecessors? This is a product definition question as much as a technical one, and it determines what a project-scoped answer includes.
5. What is the update cadence for new filings, and does incremental ingestion require reindexing?
6. Do cross-city questions become a headline capability at city two? The agent topology already supports them as an orchestrator fan-out (§5.1), so the open part is narrower: whether corpus structure, extraction schema, and manifests should be normalized across cities now so that comparisons between them are actually meaningful.

## 9. Phasing

**Phase 1: Corpus foundation.** Ingestion pipeline, automated parse checks, corpus structure, project identity resolution and document-to-project linking, generated navigation aids, evaluation set construction.

**Phase 2: Core agent.** Orchestrator plus the first city agent (Coquitlam), with text search, semantic search, figure viewer, and project loader. Single execution strategy (corpus-wide). Baseline evaluation run.

**Phase 3: Structured layer and strategy selection.** Project database and SQL tool, query classification, jurisdiction resolution and dispatch, per-category evaluation.

**Phase 4: Quality hardening.** Verification pass, in-jurisdiction subagent orchestration, context management, recall optimization against the evaluation set.

**Phase 5: Scale.** Second city agent — corpus partition, guide document, and domain prompt, with no architectural change — plus the incremental update pipeline and cost and latency optimization.
