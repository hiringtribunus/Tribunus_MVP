# Tribunus — MVP Feature List (v2, consolidated)

*The agreed MVP feature set, restructured to remove overlap. Same scope as v1 — the entries from Usman's and Gurinder's merged lists are regrouped so each feature is a single, ownable "Lego block" (one feature = one folder = one owner). Rationale and the full before→after mapping live in [feature_consolidation_proposal.md](feature_consolidation_proposal.md); the pre-consolidation list is preserved at [mvp_feature_list_v1_original.md](mvp_feature_list_v1_original.md).*

**Status:** Locked for development (v2) · **Date:** August 2026 · **Count:** 19 full features + 6 placeholders (was 26 + 7)

## How to read this list

- **Full features** are built for real, backend and all.
- **Placeholder features** appear in the product and look complete, but the backend is intentionally **not** wired up yet. They are labelled `[PLACEHOLDER]`.
- Each feature carries a **Consolidates** note (which v1 items it now contains), a suggested **Owner track**, and **Depends on** (what should exist first). Owner tracks (A–G) are logical groupings you can map onto engineers; see §Ownership at the end.
- Deferred features live in [deferred_feature_list.md](deferred_feature_list.md). Domain context is in [domain_knowledge.md](domain_knowledge.md). How these get built: [ai_architecture.md](ai_architecture.md) (product-specific) and [tech_stack.md](tech_stack.md) (general stack and conventions).

---

## A. Platform & Accounts

### F1. Firm Workspace & User Accounts
Company workspace with secure login (email or magic link), team invitations, roles (Admin / Member / Viewer), and project-level access permissions with activity history. Lets a real firm collaborate instead of sharing one login. Foundational — most other features assume it exists.
*Consolidates: v1 #1 · Owner: Track A · Depends on: — (build first)*

### F2. Projects & Portfolio Home
Homepage listing all projects. Each card shows name, address, municipality, development type, current stage, number of open risks, most recent change, last-verified date, and Project Watch status. The product's home — deliberately not a blank chatbot. Also hosts the **portfolio-intelligence** view: across all company projects, surface shared risks, upcoming fee changes, policy exposure, nearby competition, municipal concentration, and open consultant dependencies. (Portfolio-wide *alerts* are produced by Project Watch, F13.)
*Consolidates: v1 #2 + #26 (portfolio-intelligence view) · Owner: Track A · Depends on: F1; reads F11, F13*

### F3. Create Project
Entry form: address / drawn parcel, municipality (Vancouver or Coquitlam), development type (townhouse / multifamily / mixed-use), stage (acquisition screening → under municipal review), approximate units / height / FSR, tenure, and short description. Must accept incomplete information. Everything for a site lives in one place ("project-first folder" model). Creating a project kicks off the automatic municipal context (F6) and the first Development Review (F10).
*Consolidates: v1 #3 · Owner: Track A · Depends on: F1; triggers F6, F10*

---

## B. Documents & Project Profile

### F4. Document Upload & Versioning
Upload PDFs, Word, Excel, and images, organized by category (drawings, planning rationale, feasibility, consultant reports, City correspondence, fees, etc.). Preserve versions and upload dates, supersede old files, secure preview/download, and link a document to a finding. No CAD/BIM interpretation.
*Consolidates: v1 #4 · Owner: Track B · Depends on: F1*

### F5. Structured Project Profile
Extract and display key facts from the firm's own files and inputs: site area, existing/proposed use, units, height, storeys, FSR, GFA, setbacks, parking, loading, tenure, requested variances/departures, and stage. The user confirms or corrects before deeper analysis runs. Flags internal conflicts (e.g., rationale says 210 units, stats sheet says 218). This confirmed profile — *what you're proposing* — is the source of truth that later gets compared against *what the rules allow* (F6).
*Consolidates: v1 #5 · Owner: Track B · Depends on: F4*

---

## C. Municipal Intelligence & Baseline

### F6. Verified Site Baseline
On address entry, auto-retrieve parcel/location, current zoning, OCP/neighbourhood/area-plan designation, Development Permit Areas, applicable policies/overlays, nearby transit, nearby active applications, and known site constraints — including zoning-map aggregation so every municipality the user works in is accessible in one place. Then present the project's **verified baseline** (its first major deliverable): permitted uses, height/density/setback rules, guidelines, DPAs, and submission requirements. Every value shows source, section/page, effective date, last-checked date, and a status label — **Verified fact** / **Derived calculation** / **Tribunus assessment** / **Requires confirmation**.
*Consolidates: v1 #6 (retrieval) + #7 (verified presentation) · Owner: Track C · Depends on: F9, F14; F1*

### F7. Fees & Contributions Review
Identify potentially applicable charges — DCLs/DCCs, application fees, CACs/density bonus (Vancouver), ACCs (Coquitlam), utility/regional charges, and announced future changes — stored with current and historical rates, effective dates, and source links. Directly answers the most-repeated developer ask: an always-current DCC/DCL/CAC/ACC feed. Each item labelled: deterministically calculable / preliminary estimate / negotiated-uncertain / requires municipal confirmation. Uses the shared calculator engine (F8) for the math; owns the fee *knowledge and labelling*.
*Consolidates: v1 #8 · Owner: Track C · Depends on: F8, F9*

### F8. Deterministic Calculators
Normal software (not generative AI) for FSR, site-area conversions, unit/area-based charges, fee totals, dedications, dates, timeline stats, and distances. Every calculation exposes its formula and inputs. A shared, heavily-tested library used across many features. Protects against the fee/FSR surprises that flip a project upside down.
*Consolidates: v1 #9 · Owner: Track C · Depends on: — (shared lib, build early)*

### F9. Municipal Data Ingestion & Adapters
Vancouver and Coquitlam adapters: import zoning/policy/application records, council reports/minutes, and fee schedules; preserve versions; detect new/changed documents. For the pilot, sources may be manually curated instead of fully auto-ingested. The data layer feeding F6, F7, and F12.
*Consolidates: v1 #10 · Owner: Track C · Depends on: — (foundational data layer)*

---

## D. Core Analysis

### F10. Run Development Review (Primary Action)
One main button that internally fires several analysis workflows and returns one coherent result: top ~5 risks, top opportunities, missing info, likely pathway, applicable charges, closest precedents, and recommended next ~5 actions. Runs automatically on project creation so value arrives before the user learns any features. The core "aha" moment. Deliberately avoids a single unsupported approval-probability score. This feature owns the orchestrator plus three analyses that are outputs of the review:

- **Application Readiness** — checks the project package for missing documents/studies, unsupported claims, inconsistent stats, conflicting drawings, unanswered City comments, unaddressed policy requirements, and missing consultant confirmations.
- **Approval Pathway & Requirements Checklist** — identifies the likely pathway (by-right / DP / rezoning / OCP amendment / variance / subdivision / BP dependencies), decision-maker, major stages, required documents and consultants, studies needed, sequencing dependencies, and remaining unknowns. Municipality-specific for Vancouver and Coquitlam.
- **Timeline Forecasting** — stage-by-stage timeline range, comparable-project timelines, likely review cycles, main delay risks, and actions that could reduce delay.

*Consolidates: v1 #12 + #13 (Readiness) + #14 (Pathway) + #24 (Timeline) · Owner: Track D (lead engineer) · Depends on: F5, F6, F7, F11, F12, F14*

### F11. Findings Register — Assumptions & Risks
One persistent, assignable register holding two linked record types:

- **Assumptions** (the central product object) — value, supporting source, effective date, confidence/status, documents that depend on it, consequence if wrong, assigned owner, and resolution notes. This is what moves Tribunus from "research tool" to "risk-control system."
- **Risks / findings** — title, category, severity, confidence, explanation, evidence, potential impact, recommended action, owner, due date, status, and resolution notes. Categories span zoning/policy, fees, density/height, setbacks/dedications, servicing, environmental, completeness, precedent, process, community/political, and document inconsistency.

**Relationship:** when an assumption is breached or can't be confirmed, it spawns a linked risk. Keeps a running issue backlog so past issues resurface later.
*Consolidates: v1 #11 (Assumption Ledger) + #17 (Risk & Action Register) · Owner: Track D · Depends on: F1; feeds F10*

---

## E. Precedent & Council Intelligence

### F12. Precedent & Council Intelligence
One intelligence capability over the council/staff corpus, with two entry points:

- **Comparable project search + decision trace** — surface ~3–10 relevant historical projects by municipality, neighbourhood, type, height/density, units, tenure, site size, policy, requested variances, and pathway. For each: why comparable, why not, original proposal, revisions, staff recommendation, decision, conditions, outcome, and timeline. Reconstruct the full arc: original application → staff concerns → public feedback → applicant revisions → council/board discussion → amendments/conditions → outcome, with links to source docs.
- **Council & staff intelligence** — extract and summarize staff recommendations, council concerns, opposition/support, concessions, and conditions, each cited to a specific meeting. Includes **gray-area / discretionary departure precedent** (where a council allowed a departure from zoning within the neighbourhood plan or a set radius), **live council meeting summarization** (the gist of an item and what was actually debated vs. the written plan), and a **council voting behaviour profile** (how each member has voted on comparable projects and the themes they back or resist).

Dataset may be manually curated for the pilot.
*Consolidates: v1 #15 (Comparable Search) + #16 (Council & Staff) · Owner: Track E · Depends on: F9*

---

## F. Risk, Monitoring & Outputs

### F13. Project Watch & Change/Upgrade Alerts
Opt-in per project. Monitors zoning/policy changes, OCP/NCP amendments, DCC/DCL/ACC/fee changes, relevant council decisions, transit/infrastructure announcements, and provincial/regional/federal regulation changes affecting the property (e.g., a setback increased from a creek due to a protected species). Sends only project-relevant alerts — each explaining what changed, which assumption is affected, why it matters, potential impact, recommended action, and source — plus one concise weekly digest per project. Also produces the **portfolio-wide** alerts surfaced on the Portfolio Home (F2). No generic real-estate news.
*Consolidates: v1 #18 (+ portfolio alerting from #26) · Owner: Track F · Depends on: F6, F11*

### F14. Evidence, Verification & Citations
The trust backbone. Every material conclusion links to the original municipal document, page/section, publication date, effective date, and source authority, with confidence labels, contradictory-evidence checks, and a human-review queue. Clearly distinguishes **Verified fact** / **Calculated result** / **Tribunus assessment** / **Unknown requiring confirmation**. Runs invisibly beneath every analysis feature. Aligns with the explicit preference for fact over generative summary.
*Consolidates: v1 #19 · Owner: Track F · Depends on: — (infra, build early); used everywhere*

### F15. Internal Analyst Review Console
Lets the Tribunus team review extracted facts, correct or suppress findings, add/remove sources, adjust confidence, re-run workflows, and mark a result "ready for customer." Shows *"Analysis under Tribunus review"* until approved. Human-in-the-loop is acceptable — arguably mandatory — for the pilot: it protects trust while generating the evaluation data needed to automate later. (The human counterpart to placeholder P4.)
*Consolidates: v1 #20 · Owner: Track F · Depends on: F10, F11, F14*

### F16. Reports & Export (Development Brief)
Generate a clean PDF/Word brief: project profile, verified baseline, fees, assumption/risk register, approval pathway, comparables, material risks, recommended actions, and sources & limitations. Lets output be shared with principals, consultants, and investment committees.
*Consolidates: v1 #21 · Owner: Track F · Depends on: F5, F6, F7, F10, F11, F12*

---

## G. Consultant, Market & Portfolio

### F17. Consultant Requirement & Dependency Checklist
Per-discipline checks (mechanical, electrical, sanitary, storm, water, landscape, geotechnical) plus utilities (BC Hydro, Telus, Shaw, Fortis gas), confirming each package was reviewed and is "in." Assign requirements to consultants, track deliverables and dependencies, and flag missing/overdue work. Motivating example: a $100k hit from pipes placed wrong that nobody double-checked across drawings.
*Consolidates: v1 #22 · Owner: Track G · Depends on: F1; feeds F10 Readiness*

### F18. City Comment Management
Upload municipal comment letters, extract individual comments, assign each, track responses, connect revisions to comments, and verify whether each was resolved.
*Consolidates: v1 #23 · Owner: Track G · Depends on: F1, F4; feeds F10 Readiness*

### F19. Local Sales Comps & Feasibility Check
Land and product sales in the area with dollar-per-square-foot and sale timeframes, plus average cost per unit by product type (condo, townhouse, single family), as a quick "does this pencil" check. Models tenure explicitly (strata vs. secured rental) since it swings the economics.
*Consolidates: v1 #25 · Owner: Track G · Depends on: F8*

---

## Placeholder Features

*Present in the product and visually complete, but the backend is intentionally not implemented yet.*

### P1. Ask This Project — Contextual Chat `[PLACEHOLDER]`
A project-scoped chat grounded in the confirmed profile, uploaded docs, municipal sources, existing findings, comparables, and completed analyses, with cited answers. Not a blank chatbot. UI present in MVP; backend deferred.
*Consolidates: v1 P1 · Owner: Track D*

### P2. Development Scenario Comparison `[PLACEHOLDER]`
Compare conservative / policy-aligned / aggressive proposals across units, density, approval risk, fees, required studies, timeline, and estimated yield.
*Consolidates: v1 P2 · Owner: Track D*

### P3. Entity Matching & Linking `[PLACEHOLDER]`
Connect address ↔ parcel ↔ application ↔ council report ↔ meeting ↔ policy ↔ decision ↔ drawing revision ↔ developer ↔ consultant. Underpins reliable historical timelines.
*Consolidates: v1 P3 · Owner: Track C/E*

### P4. Analysis Engine & Run History `[PLACEHOLDER]`
Two halves of the automated-analysis backbone. **Automated quality gates:** defined inputs, workflow, structured output, evidence requirements, independent verification, bounded retry, and confidence labels. **Run history:** analysis date, workflow version, source versions, project-file versions, generated findings, user changes, and final outcome. In the MVP, humans perform this QA via the Internal Analyst Review Console (F15); the automated engine and its history are shown but not fully built.
*Consolidates: v1 P4 (Quality Gates) + P5 (Run History) · Owner: Track D*

### P5. Growth Forecasting `[PLACEHOLDER]`
Surface the regional growth strategy, municipal OCPs, and transit plans (SkyTrain, bus routes) to show where growth is heading, so the user can get into an area before land prices climb.
*Consolidates: v1 P6 · Owner: Track E*

### P6. Competitor Extras Analysis `[PLACEHOLDER]`
What competitors in the area are offering (second fridge, air conditioning, wood-floor upgrades, basement suite), so the user knows the minimum competitive standard without full marketing research.
*Consolidates: v1 P7 · Owner: Track G*

---

## Ownership & build order

Seven logical **owner tracks** (A–G) group the features by domain and shared code, so an engineer who owns a track builds on shared foundations instead of colliding with others. Map one track to one engineer if you have seven; combine adjacent tracks if fewer.

| Track | Theme | Features | Build tier |
| --- | --- | --- | --- |
| **A** | Platform & accounts | F1, F2, F3 | 1 (foundational) |
| **B** | Documents & profile | F4, F5 | 1–2 |
| **C** | Municipal data & baseline | F8, F9 → F6, F7 | 1 → 2 |
| **D** | Core analysis engine | F11 → F10 (+ P1, P2, P4) | 2 (core) |
| **E** | Precedent & council | F12 (+ P5) | 2 |
| **F** | Trust, monitoring & outputs | F14 → F13, F15, F16 | 1 → 3 |
| **G** | Consultant, comments & market | F17, F18, F19 (+ P6) | 2 |

**Suggested sequencing.** Tier 1 first — the foundations everything leans on: **F1** (workspace), **F8** (calculators), **F9** (municipal data), **F14** (citations backbone), plus **F4**. Tier 2 builds the substance: **F5, F6, F7, F11, F12**, then **F10** (the review that ties them together) and **F17/F18/F19**. Tier 3 is the surfaces that consume everything: **F13, F15, F16**. Placeholders slot in with their track whenever that track has slack.

**Two features are the critical path** and deserve your strongest owners: **F10 (Development Review)** — the orchestrator whose output is the product's first impression — and **F14 (Evidence & Citations)** — the trust backbone every claim depends on. Both should exist in skeleton form early so other features can integrate against their contracts.
