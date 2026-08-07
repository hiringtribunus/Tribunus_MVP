# Tribunus — MVP Feature List

*The agreed feature set for the first build, merged and de-duplicated from Usman's and Gurinder's feature lists.*

**Status:** Locked for development · **Date:** July 2026

## How to read this list

- **Full features** are built for real, backend and all.
- **Placeholder features** appear in the product and look complete/visually appealing, but the backend is intentionally **not** wired up yet. They are labelled `[PLACEHOLDER]`.
- Deferred features live in [deferred_feature_list.md](deferred_feature_list.md). Out-of-scope features are excluded entirely.

Where Usman's and Gurinder's lists described the same feature, the two have been merged into a single entry.

---

## A. Platform & Accounts

### 1. Firm Workspace & User Accounts
Company workspace with secure login (email or magic link), team invitations, roles (Admin / Member / Viewer), and project-level access permissions with activity history. Lets a real firm collaborate instead of sharing one login. Foundational — most other features assume it exists.

### 2. Project Portfolio Dashboard
Homepage listing all projects. Each card shows name, address, municipality, development type, current stage, number of open risks, most recent change, last-verified date, and Project Watch status. The product's home — deliberately not a blank chatbot.

### 3. Create Project
Entry form: address / drawn parcel, municipality (Vancouver or Coquitlam), development type (townhouse / multifamily / mixed-use), stage (acquisition screening → under municipal review), approximate units / height / FSR, tenure, and short description. Must accept incomplete information. Everything for a site lives in one place ("project-first folder" model).

---

## B. Documents & Project Profile

### 4. Document Upload & Versioning
Upload PDFs, Word, Excel, and images, organized by category (drawings, planning rationale, feasibility, consultant reports, City correspondence, fees, etc.). Preserve versions and upload dates, supersede old files, secure preview/download, and link a document to a finding. No CAD/BIM interpretation.

### 5. Structured Project Profile
Extract and display key facts from files and inputs: site area, existing/proposed use, units, height, storeys, FSR, GFA, setbacks, parking, loading, tenure, requested variances/departures, and stage. The user confirms or corrects before deeper analysis runs. Flags conflicts (e.g., rationale says 210 units, stats sheet says 218). This confirmed profile is the source of truth for every analysis.

---

## C. Municipal Intelligence & Baseline

### 6. Automatic Parcel & Municipal Context
On address entry, auto-retrieve parcel/location, current zoning, OCP/neighbourhood/area-plan designation, Development Permit Areas, applicable policies/overlays, nearby transit, nearby active applications, and known site constraints. Includes zoning-map aggregation so every municipality the user works in is accessible in one place.

### 7. Verified Site Baseline
First major deliverable per project: current zoning, plan designations, permitted uses, height/density/setback rules, guidelines, DPAs, and submission requirements. Every value shows source, section/page, effective date, last-checked date, and a status label — **Verified fact** / **Derived calculation** / **Tribunus assessment** / **Requires confirmation**.

### 8. Fees & Contributions Review
Identify potentially applicable charges — DCLs/DCCs, application fees, CACs/density bonus (Vancouver), ACCs (Coquitlam), utility/regional charges, and announced future changes — stored with current and historical rates, effective dates, and source links. Directly answers the most-repeated developer ask: an always-current DCC/DCL/CAC feed. Each item labelled: deterministically calculable / preliminary estimate / negotiated-uncertain / requires municipal confirmation.

### 9. Deterministic Calculators
Normal software (not generative AI) for FSR, site-area conversions, unit/area-based charges, fee totals, dedications, dates, timeline stats, and distances. Every calculation exposes its formula and inputs. Protects against the fee/FSR surprises that flip a project upside down.

### 10. Municipal Data Ingestion & Adapters
Vancouver and Coquitlam adapters: import zoning/policy/application records, council reports/minutes, and fee schedules; preserve versions; detect new/changed documents. For the pilot, sources may be manually curated instead of fully auto-ingested.

---

## D. Core Analysis

### 11. Development Assumption Ledger
The central product object. Table of critical assumptions: value, supporting source, effective date, confidence/status, documents that depend on it, consequence if wrong, assigned owner, and resolution notes. This is what moves Tribunus from "research tool" to "risk-control system" — the core differentiated feature.

### 12. Run Development Review (Primary Action)
One main button that internally fires several analysis workflows and returns one coherent result: top ~5 risks, top opportunities, missing info, likely pathway, applicable charges, closest precedents, and recommended next ~5 actions. Runs automatically on project creation so value arrives before the user learns any features. The core "aha" moment. Deliberately avoids a single unsupported approval-probability score.

### 13. Application Readiness Review
Checks the project package for missing documents/studies, unsupported claims, inconsistent stats, conflicting drawings, unanswered City comments, unaddressed policy requirements, and missing consultant confirmations. Runs as part of the Development Review.

### 14. Approval Pathway & Requirements Checklist
Identify the likely pathway (by-right / DP / rezoning / OCP amendment / variance / subdivision / BP dependencies), decision-maker, major stages, required documents and consultants, studies needed, sequencing dependencies, and remaining unknowns. Municipality-specific for Vancouver and Coquitlam.

---

## E. Precedent & Council Intelligence

### 15. Comparable Project & Precedent Search + Decision Trace
Surface ~3–10 relevant historical projects by municipality, neighbourhood, type, height/density, units, tenure, site size, policy, requested variances, and pathway. For each: why comparable, why not, original proposal, revisions, staff recommendation, decision, conditions, outcome, and timeline. Reconstruct the full arc: original application → staff concerns → public feedback → applicant revisions → council/board discussion → amendments/conditions → outcome. User can open source docs. Dataset may be manually curated for the pilot.

### 16. Council & Staff Intelligence
Extract and summarize staff recommendations, council concerns, opposition/support, concessions, and conditions — each cited to a specific meeting. Includes:
- **Gray-area / discretionary departure precedent** — where a council or municipality has actually allowed a departure from zoning (e.g., a 2.5 m setback where 3 m is required), within the neighbourhood plan or a set radius. High value: saves design time and yields more sellable square footage.
- **Live council meeting summarization** — the gist of a specific council item and what council actually debated vs. what the written OCP/NCP says, so the user avoids sitting through 3-hour meetings.
- **Council voting behaviour profile** — how each member has voted on comparable projects and the themes they back or resist.

---

## F. Risk, Monitoring & Outputs

### 17. Risk & Action Register
Every finding becomes a persistent, assignable item: title, category, severity, confidence, explanation, evidence, potential impact, recommended action, owner, due date, status, and resolution notes. Categories span zoning/policy, fees, density/height, setbacks/dedications, servicing, environmental, completeness, precedent, process, community/political, and document inconsistency. Keeps a running issue backlog so past issues resurface later.

### 18. Project Watch & Change/Upgrade Alerts
Opt-in per project. Monitors zoning/policy changes, OCP/NCP amendments, DCC/DCL/ACC/fee changes, relevant council decisions, transit/infrastructure announcements, and provincial/regional/federal regulation changes affecting the property (e.g., a setback increased from a creek due to a protected species). Sends only project-relevant alerts — each explaining what changed, which assumption is affected, why it matters, potential impact, recommended action, and source — plus one concise weekly digest per project/portfolio. No generic real-estate news.

### 19. Evidence, Verification & Citations
The trust backbone. Every material conclusion links to the original municipal document, page/section, publication date, effective date, and source authority, with confidence labels, contradictory-evidence checks, and a human-review queue. Clearly distinguishes **Verified fact** / **Calculated result** / **Tribunus assessment** / **Unknown requiring confirmation**. Aligns with the explicit preference for fact over generative summary.

### 20. Internal Analyst Review Console
Lets the Tribunus team review extracted facts, correct or suppress findings, add/remove sources, adjust confidence, re-run workflows, and mark a result "ready for customer." Shows *"Analysis under Tribunus review"* until approved. Human-in-the-loop is acceptable — arguably mandatory — for the pilot: it protects trust while generating the evaluation data needed to automate later.

### 21. Reports & Export (Development Brief)
Generate a clean PDF/Word brief: project profile, verified baseline, fees, assumption ledger, approval pathway, comparables, material risks, recommended actions, and sources & limitations. Lets output be shared with principals, consultants, and investment committees.

---

## G. Consultant, Market & Portfolio

### 22. Consultant Requirement & Dependency Checklist
Per-discipline checks (mechanical, electrical, sanitary, storm, water, landscape, geotechnical) plus utilities (BC Hydro, Telus, Shaw, Fortis gas), confirming each package was reviewed and is "in." Assign requirements to consultants, track deliverables and dependencies, and flag missing/overdue work. Motivating example: a $100k hit from pipes placed wrong that nobody double-checked across drawings.

### 23. City Comment Management
Upload municipal comment letters, extract individual comments, assign each, track responses, connect revisions to comments, and verify whether each was resolved.

### 24. Timeline Forecasting
Stage-by-stage timeline range, comparable-project timelines, likely review cycles, main delay risks, and actions that could reduce delay.

### 25. Local Sales Comps & Feasibility Check
Land and product sales in the area with dollar-per-square-foot and sale timeframes, plus average cost per unit by product type (condo, townhouse, single family), as a quick "does this pencil" check.

### 26. Portfolio-Level Intelligence
Across all company projects: shared risks, upcoming fee changes, policy exposure, nearby competition, municipal concentration, open consultant dependencies, and portfolio-wide alerts.

---

## Placeholder Features

*Present in the product and visually complete, but the backend is intentionally not implemented yet.*

### P1. Ask This Project — Contextual Chat `[PLACEHOLDER]`
A project-scoped chat grounded in the confirmed profile, uploaded docs, municipal sources, existing findings, comparables, and completed analyses, with cited answers. Not a blank chatbot. UI present in MVP; backend deferred.

### P2. Development Scenario Comparison `[PLACEHOLDER]`
Compare conservative / policy-aligned / aggressive proposals across units, density, approval risk, fees, required studies, timeline, and estimated yield.

### P3. Entity Matching & Linking `[PLACEHOLDER]`
Connect address ↔ parcel ↔ application ↔ council report ↔ meeting ↔ policy ↔ decision ↔ drawing revision ↔ developer ↔ consultant. Underpins reliable historical timelines.

### P4. Analysis Orchestration & Automated Quality Gates `[PLACEHOLDER]`
Automated verification engine: defined inputs, workflow, structured output, evidence requirements, independent verification, bounded retry, and confidence labels. In the MVP, humans perform this QA via the Internal Analyst Review Console (#20); the automated engine is shown but not fully built.

### P5. Analysis Run History `[PLACEHOLDER]`
Store analysis date, workflow version, source versions, project-file versions, generated findings, user changes, and final outcome.

### P6. Growth Forecasting `[PLACEHOLDER]`
Surface the regional growth strategy, municipal OCPs, and transit plans (SkyTrain, bus routes) to show where growth is heading, so the user can get into an area before land prices climb.

### P7. Competitor Extras Analysis `[PLACEHOLDER]`
What competitors in the area are offering (second fridge, air conditioning, wood-floor upgrades, basement suite), so the user knows the minimum competitive standard without full marketing research.
