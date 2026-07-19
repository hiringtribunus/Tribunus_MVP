# TRIBUNUS — Final Feature List (Decision Menu)

*A deduplicated menu of every feature across the thesis, full feature dump, and Codex sprint plan. Grouped for triage. For each feature, decide: **MVP / Later / Cut** — and if MVP, whether it must be **built** or can be **concierge'd** (faked with manual/human work behind the scenes).*

*Decision anchor: the MVP is done when a design partner uploads one real Vancouver/Coquitlam project and gets one trustworthy, cited review that surfaces at least one assumption or risk worth discussing internally. Judge each feature against that, not against "is it useful."*

---

## SECTION 1 — CORE USER-FACING (the MVP candidates)

### Feature A — Firm Workspace & User Accounts
Company workspace, secure login (email or magic link), team invitations, roles (Admin / Member / Viewer), project-level access permissions, activity history. Lets a real firm collaborate instead of sharing one login.
*Dependency: foundational — most other features assume it exists.*

### Feature B — Project Portfolio Dashboard
Homepage listing all projects. Each card: name, address, municipality, development type, current stage, # open risks, most recent change, last-verified date, Project Watch status. The product's home — deliberately not a blank chatbot.

### Feature C — Create Project
Entry form: address/parcel, municipality (Vancouver or Coquitlam), development type (townhouse / multifamily / mixed-use), stage (acquisition → under review), approx. units / height / FSR, tenure, short description. Must accept incomplete info.

### Feature D — Automatic Parcel & Municipal Context
On address entry, auto-retrieve parcel/location, current zoning, OCP/neighbourhood/area-plan designation, Development Permit Areas, applicable policies/overlays, nearby transit, nearby active applications, known site constraints.
*Note: highest data-engineering cost; strong concierge candidate (team pre-loads context for pilot projects).*

### Feature E — Document Upload & Versioning
Upload PDFs, Word, Excel, images. Organize by category (drawings, planning rationale, feasibility, consultant reports, City correspondence, fees, etc.), track versions/upload dates, supersede old files, secure preview/download, link a document to a finding. No CAD/BIM interpretation.

### Feature F — Structured Project Profile
Extract and display key facts from files/inputs: site area, existing/proposed use, units, height, storeys, FSR, GFA, setbacks, parking, loading, tenure, requested variances, stage. User must confirm/correct before deeper analysis. Flags conflicts (e.g., rationale says 210 units, stats sheet says 218).

### Feature G — Verified Site Baseline
First major deliverable per project: current zoning, plan designations, permitted uses, height/density/setback rules, guidelines, DPAs, submission requirements. Every value shows source, section/page, effective date, last-checked date, and a status label (Verified fact / Derived calculation / Tribunus assessment / Requires confirmation).

### Feature H — Fees & Contributions Review
Identify potentially applicable charges — DCLs/DCCs, application fees, CACs/density bonus (Van), ACCs (Coq), utility/regional charges, announced future changes. Each item labelled: deterministically calculable / preliminary estimate / negotiated-uncertain / requires municipal confirmation.

### Feature I — Development Assumption Ledger
The central product object. Table of critical assumptions: value, supporting source, effective date, confidence/status, documents that depend on it, consequence if wrong, assigned owner, resolution notes. This is what moves Tribunus from "research tool" to "risk-control system."
*Note: the core differentiated feature — least likely to be cut, hardest to fake convincingly.*

### Feature J — Approval Pathway & Requirements Checklist
Identify likely pathway (by-right / DP / rezoning / OCP amendment / variance / subdivision / BP dependencies), decision-maker, major stages, required documents & consultants, studies needed, sequencing dependencies, remaining unknowns. Must be municipality-specific.

### Feature K — Comparable Project & Precedent Search
Surface ~3–10 relevant historical projects by municipality, neighbourhood, type, height/density, units, tenure, site size, policy, requested variances, pathway. For each: why comparable, why not, original proposal, revisions, staff rec, decision, conditions, outcome, timeline. User opens source docs.
*Note: dataset can be manually curated for the pilot rather than searched municipality-wide.*

### Feature L — Council, Staff & Decision Trace
For selected comparables, reconstruct the arc: original application → staff concerns → public feedback → applicant revisions → council/board discussion → amendments/conditions → outcome. Extract staff recs, council comments, opposition/support, concessions, conditions, unresolved issues.

### Feature M — Risk & Action Register
Every finding becomes a persistent, assignable item: title, category, severity, confidence, explanation, evidence, potential impact, recommended action, owner, due date, status, resolution notes. Categories span zoning/policy, fees, density/height, setbacks/dedications, servicing, environmental, completeness, precedent, process, community/political, document inconsistency (incl. amendment & negotiation risk).

### Feature N — Run Development Review (Primary Action)
One main button that internally fires several analysis workflows and returns one coherent result: top ~5 risks, top opportunities, missing info, likely pathway, applicable charges, closest precedents, recommended next ~5 actions. The core "aha" moment. Deliberately avoids a single unsupported approval-probability score.

### Feature O — Application Readiness Review
Checks the project package for missing documents/studies, unsupported claims, inconsistent stats, conflicting drawings, unanswered City comments, unaddressed policy requirements, missing consultant confirmations.
*Note: overlaps with F and M; consider whether it's a distinct feature or a mode of the Development Review.*

### Feature P — Change Detection & Refresh Analysis
On new file/drawing version or profile edit: compare to previous, identify changed assumptions, resolved vs. newly-created risks, re-run affected analyses, and show the user exactly what changed while preserving prior results. Creates the first repeat-use loop.

### Feature Q — Project Watch (Monitoring, Alerts & Digest)
Opt-in per project. Monitors zoning/policy changes, OCP/NCP amendments, DCC/DCL/ACC/fee changes, nearby applications, relevant council decisions, transit/infrastructure announcements, provincial/regional changes, submission-requirement changes. Sends only project-relevant alerts + one concise weekly digest per project/portfolio. No generic real-estate news.
*Note: recurring-revenue justification, but heaviest ongoing data-ops burden. Can start manual/weekly.*

### Feature R — Ask This Project (Contextual Chat)
Secondary chat grounded in confirmed profile, uploaded docs, municipal sources, existing findings, comparables, and completed analyses. Answers must cite sources and label interpretation. Not a blank chatbot — scoped to the project.

### Feature S — Evidence & Citation Viewer
Every material conclusion links to the original municipal document, page/section, publication date, effective date, source authority. Clearly distinguishes Verified fact / Calculated result / Tribunus assessment / Unknown requiring confirmation.
*Note: not a screen so much as a cross-cutting requirement — but it's the trust backbone; cutting it undermines everything else.*

### Feature T — Reports & Export (Development Brief)
Generate a clean PDF/Word brief: project profile, verified baseline, fees, assumption ledger, approval pathway, comparables, material risks, recommended actions, sources & limitations. Lets output be shared with principals, consultants, investment committees.

---

## SECTION 2 — EXPANSION (strong, but likely post-MVP)

### Feature U — Consultant Coordination
Assign requirements to consultants, track deliverables and dependencies, flag missing/overdue/incomplete work.

### Feature V — City Comment Management
Upload municipal comment letters, extract individual comments, assign each, track responses, connect revisions to comments, verify whether each was resolved.

### Feature W — Cross-Document Consistency Checking
Compare architectural, civil, landscape, planning rationale, project stats, consultant reports, and pro forma; flag contradictory values and missing coordination.

### Feature X — Development Scenario Comparison
Compare conservative / policy-aligned / aggressive proposals across units, density, approval risk, fees, required studies, timeline, estimated yield.

### Feature Y — Timeline Forecasting
Stage-by-stage timeline range, comparable-project timelines, likely review cycles, main delay risks, actions that could reduce delay.

### Feature Z — Nearby Competition Monitoring
Track new/approved applications, competing unit supply, construction timing, nearby developments, product-mix changes.

### Feature AA — Municipality Comparison
Compare municipalities on approval timelines, application volume, revision frequency, fee structure, amendment history, type suitability, data confidence. Avoid one simplistic score.

### Feature AB — Portfolio-Level Intelligence
Across all company projects: shared risks, upcoming fee changes, policy exposure, nearby competition, municipal concentration, open consultant dependencies, portfolio-wide alerts.

---

## SECTION 3 — INTERNAL / ADMIN (infrastructure; not customer-facing but required for reliability)

### Feature AC — Municipal Source Registry & Versioning
Track every authoritative source: municipality, type, official URL, publication/effective dates, last-checked, current-vs-superseded status, file hash/version, related policies/projects. Historical and current rules must never be mixed.

### Feature AD — Municipal Data Ingestion & Adapters
Vancouver and Coquitlam adapters: download council reports/minutes, import zoning/policy/application records and fee schedules, preserve versions, detect new/changed documents. *For the pilot, sources may be manually curated instead of auto-ingested.*

### Feature AE — Structured Municipal Knowledge Base
Store projects, parcels, policies, applications, meetings, staff concerns, amendments, conditions, decisions, timelines, fees in structured form.

### Feature AF — Entity Matching & Linking
Connect address ↔ parcel ↔ application ↔ council report ↔ meeting ↔ policy ↔ decision ↔ drawing revision ↔ developer ↔ consultant. Required for reliable historical timelines.

### Feature AG — Deterministic Calculators
Normal software (not generative AI) for FSR, site-area conversions, unit/area-based charges, fee totals, dates, timeline stats, distances. Each calc exposes its formula and inputs.

### Feature AH — Analysis Orchestration & Verification (Quality Gates)
Defined inputs, workflow, structured output, evidence requirements, independent verification, bounded retry, confidence labels, stored history. Confirms citations, checks effective dates, detects unsupported claims, validates calculations, flags contradictory evidence. Unsupported findings rejected or marked uncertain.

### Feature AI — Internal Analyst Review Console
Lets the Tribunus team review extracted facts, correct/suppress findings, add/remove sources, adjust confidence, approve, re-run workflows, and mark "ready for customer." Shows "Analysis under Tribunus review" until approved. Human-in-the-loop is acceptable — arguably mandatory — for the pilot.

### Feature AJ — Analysis Run History
Store analysis date, workflow version, source versions, project-file versions, generated findings, user changes, final outcome.

### Feature AK — Feedback & Outcome Capture
Let the design partner mark findings correct/incorrect/already-known, note that a finding caused an action, record how the municipality actually responded, and log final outcome (approved / withdrawn / redesigned / abandoned). Builds private evaluation data.

### Feature AL — Security & Audit Logs
Encryption in transit and at rest, company-level data separation, project access controls, secure file storage, audit logs, data deletion, confidential-document handling, no cross-customer document use without permission. A real firm won't upload private feasibility studies without this.

---

## How to run the triage (suggested)

For each feature mark one: **MVP-build** · **MVP-concierge (fake it)** · **Later** · **Cut**.

Three questions to force the call on each:
1. Does the first design-partner "aha" (one cited review that surfaces one real risk) actually require this?
2. If yes — must it be *built*, or can a human do it manually behind the scenes for 5–10 projects?
3. If no — does removing it break anything you *are* keeping?

*Watch for scope creep: if you finish with more than ~10–12 "MVP-build" items, you've likely re-created the full platform, not the sprint.*
