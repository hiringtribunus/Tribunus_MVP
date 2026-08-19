# PROPOSAL — Tribunus Scope Revision (for approval)

> ## ⚠️ This is a proposal. Nothing has been changed.
>
> **No existing document has been modified.** `locked_feature_list.md`, `deferred_feature_list.md`, `UX flows.md`, `ai_architecture.md`, and every research document remain exactly as they were. Every feature and every piece of research is preserved.
>
> This file proposes a revised scope and gives an exact change map. **Nothing here is executed until you approve it**, item by item if you prefer.

**Date:** August 2026 · **Supersedes if approved:** the v2 lock (19 features + 6 placeholders)

---

## Contents

| Part | Section | What it covers |
| --- | --- | --- |
| **1** | Proposed Scope | The revised product definition, the three scope levels (A/B/C), the full F1–F19 / P1–P6 mapping, open decisions, and the document change map |
| **2** | Data Engine | The full municipal source inventory the evidence layer must eventually cover |
| **3** | Development Cycle Mapping | The 7-phase development timeline and where Tribunus and every adjacent competitor sit on it |
| **4** | Tribunus Product | The 8-screen UX shape and the central click flow |
| **5** | Tribunus Product Thesis | The one-paragraph, one-sentence, and one-line definitions of what Tribunus is |

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# PART 1 · PROPOSED SCOPE
*The revised product definition, scope levels, feature mapping, open decisions, and execution plan for the scope revision itself.*

## The new product definition
**Tribunus tells a developer the most defensible path for getting a proposed development approved, using the municipality's rules, policies, and actual decision history.**

Short form: *from proposed project to evidence-backed approval strategy.*

Zoning intelligence is the **foundation**. Development-approval intelligence is the **product**. Approval is the customer's goal.

One primary action — **Run Development Review** — takes a specific proposed development and returns a defensible approval strategy for it. Every capability in the initial product exists to create, verify, explain, update, or export that Review.

## What changes conceptually

The v2 locked list describes a **risk-control platform**: it surfaces risks, fees, precedents, and actions around a project. The revised definition is narrower and sharper: it takes a **specific proposal** and evaluates it **against the rules**, then tells you **what you can credibly push and why**.

That shift exposes a real gap, described immediately below.

---

## The most important finding: two capabilities do not exist yet
The clarified strategy turns on two behaviours that **are not in the current 19 features**, and I want to be explicit that these are additions rather than existing features being renamed:

| New capability | Why the current list does not cover it |
| --- | --- |
| **Compliance & Departure Analysis** (proposal vs. baseline, line by line) | F5 flags conflicts *within the developer's own documents* (rationale says 210 units, stats sheet says 218). F6 presents the *baseline*. **Nothing compares the two.** F10's "Application Readiness" checks the submission package for completeness — not the proposal against the rules. |
| **Pushability Assessment** | F12 retrieves precedent and council behaviour, and the v1 source mentions "gray-area / discretionary departure precedent." But no feature **turns that evidence into a per-departure judgement** of whether the departure is hard or negotiable, what argument supports it, and what weakens it. |

These two are the bridge between a zoning lookup and approval intelligence. Without them, the revised product promise is not deliverable. They are sanctioned by your brief (capabilities 3 and 4) and are **not** imported from any competitor.

Everything else in the revised scope is an existing Tribunus feature retained, narrowed, merged, or deferred.

---

## Proposed scope — three levels
## A. Initial sellable product

Eleven customer-facing capabilities and five foundations. Everything here earns its place against **Run Development Review**.

---

### A1. Project & Proposal Intake
*(merges F3 + F5, plus a narrowed F4)*

- **Customer question:** What exactly am I proposing, and is that captured correctly?
- **Inputs:** Address/parcel, municipality, proposed use, units, density/FSR, height and storeys, tenure, setbacks, parking/loading, requested variances or departures, development stage, and available project documents.
- **Behaviour:** Capture the proposal; extract facts from uploaded documents; present extractions for correction; surface conflicts between user input and documents, and between documents.
- **Output:** One confirmed, structured representation of the proposed development — the object every later step reasons about.
- **Evidence:** Every extracted fact shows its source document and page. Unconfirmed extractions are visibly unconfirmed. The user's confirmation is recorded and dated.
- **Boundaries:** Not a document-management system. Categorization and version history exist only as far as the Review needs them. No CAD/BIM interpretation.
- **Dependencies:** Foundations only.
- **Analyst support in pilot:** Yes — analysts correct extraction misses before the Review runs.

### A2. Verified Site Baseline
*(F6, retained)*

- **Customer question:** What rules and policies actually apply to this site today?
- **Inputs:** Confirmed site from A1; municipal evidence layer.
- **Behaviour:** Assemble applicable zoning, permitted/conditional uses, density/FSR, height, setbacks, lot coverage, parking/loading, OCP designation, neighbourhood/area plans, applicable policies, DPAs, overlays, guidelines, major site constraints, transit/infrastructure context, submission requirements, and relevant regional/provincial requirements.
- **Output:** The site's rule set, presented as the first standalone deliverable.
- **Evidence:** Every material item carries authoritative source, page/section/clause, publication or adoption date, effective date, last-checked date, and evidence status. Historical and current rules are never mixed.
- **Boundaries:** States the rules; does not evaluate the proposal (that is A3).
- **Dependencies:** FDN-3.
- **Analyst support in pilot:** Yes — baseline is analyst-verified before release.

### A3. Compliance & Departure Analysis — **NEW**
- **Customer question:** Where does my proposal comply, and where exactly does it depart?
- **Inputs:** Confirmed proposal (A1); verified baseline (A2).
- **Behaviour:** Compare proposal to baseline element by element. Classify each material element as: compliant/by-right · policy-aligned but requiring approval · discretionary or potentially relaxable · requires rezoning · requires OCP or policy amendment · conflicts with policy · dependent on missing information · requires municipal confirmation.
- **Output:** A departure table. For each departure: the proposal, the applicable requirement, the size and nature of the difference, why it matters, the likely approval mechanism, whether it appears hard or negotiable, supporting and opposing evidence, and the recommended response.
- **Evidence:** Every requirement cites its clause. Every classification is typed (Verified fact / Calculated / Assessment / Requires confirmation).
- **Boundaries:** Not buried in a report — this is a first-class product surface. Does not assert approval outcomes.
- **Dependencies:** A1, A2, A10.
- **Analyst support in pilot:** Yes.

### A4. Pushability Assessment — **NEW**
- **Customer question:** What can I credibly push, and what supports pushing it?
- **Inputs:** Each departure from A3; precedent and council evidence from A5; policy from A2.
- **Behaviour:** Per departure, assess whether policy supports additional development; whether similar departures were previously accepted; how staff have treated similar reasoning; what revisions or concessions were required; what conditions were imposed; how the current project differs materially from the precedent; what arguments are defensible; what weakens them; and what must be confirmed with the municipality.
- **Output:** A per-departure judgement using calibrated language — *strong policy support · moderate precedent support · limited comparable evidence · material staff risk · significant discretionary exposure · policy conflict · requires City confirmation · insufficient evidence.*
- **Evidence:** Every judgement traces to specific policy clauses and specific decisions. Opposing evidence is shown, never suppressed.
- **Boundaries:** **Pushability is not permission and not a probability.** No percentage score. A prior approval is evidence, not entitlement. Never framed as legal advice or municipal confirmation.
- **Dependencies:** A3, A5, A10.
- **Analyst support in pilot:** Yes — this is the most judgement-heavy capability and should be analyst-reviewed without exception.

### A5. Precedent, Staff & Council Intelligence
*(F12, retained and made more central)*

- **Customer question:** How have genuinely comparable projects been treated?
- **Inputs:** Confirmed proposal; municipal evidence layer.
- **Behaviour:** Select a small number of genuinely comparable projects rather than listing many. For each: why comparable, important differences, original proposal, requested departures, revisions, staff concerns, staff recommendation, public concerns, advisory/design-panel feedback, council discussion, amendments, concessions, conditions, final outcome, voting record, and timeline.
- **Output:** Decision traces showing how a project moved from proposal to decision — not merely whether it was approved.
- **Evidence:** Each element cited to a specific document and meeting.
- **Boundaries:** Not an application-list browser. Never implies precedent guarantees outcome.
- **Dependencies:** FDN-3, FDN-5.
- **Analyst support in pilot:** Yes — comparability selection is analyst-checked.

### A6. Approval Pathway & Readiness
*(from F10's Pathway and Readiness analyses, plus a narrow slice of F17)*

- **Customer question:** What approvals does this need, in what order, and what am I missing?
- **Inputs:** A3 departures; baseline submission requirements.
- **Behaviour:** Identify the likely path — by-right, DP, variance/relaxation, rezoning, OCP amendment, subdivision, design-panel or advisory review, public consultation, committee, Council, public hearing where applicable, rezoning enactment conditions, later DP/BP dependencies. Show required approvals, likely sequence, decision-makers, key dependencies, required or likely studies, **likely consultant disciplines**, known submission requirements, missing information, readiness gaps, and the most important questions for an enquiry or pre-application meeting.
- **Output:** A pathway map plus a readiness gap list and a pre-application question set.
- **Evidence:** Pathway rules cited to bylaw/procedure; readiness gaps traced to the specific missing item.
- **Boundaries:** **Approval-path intelligence, not consultant-task management and not permit submission.** It names the disciplines and studies likely required; it does not track their deliverables (deferred, C2).
- **Dependencies:** A2, A3.
- **Analyst support in pilot:** Yes.

### A7. Fees, Contributions & Timeline Exposure
*(F7 + F8 retained; timeline from F10)*

- **Customer question:** What will the municipality cost me, and how long is this likely to take?
- **Inputs:** Confirmed proposal statistics; pathway from A6; fee schedules.
- **Behaviour:** Identify potentially applicable application fees, DCLs, DCCs, ACCs, CAC/density-bonus considerations, regional charges, utility/infrastructure charges, dedications, known future rate changes, and other major municipal costs. Compute deterministic figures in code with visible formulas and inputs. Produce evidence-based timeline ranges with stages, dependencies, and delay reasons.
- **Output:** A labelled fee stack and a timeline exposure range.
- **Evidence:** Each figure labelled *deterministic calculation · preliminary estimate · negotiated or uncertain · dependent on future project details · requires municipal confirmation.* Every rate dated; superseded rates retained, never mixed with current.
- **Boundaries:** **No guaranteed dates.** No pro forma, no residual land value, no financial feasibility modelling (deferred, C4). The LLM never performs arithmetic.
- **Dependencies:** A1, A2, A6.
- **Analyst support in pilot:** Partial — deterministic math is code; regime applicability is analyst-checked.

### A8. Development Review & Decision Brief
*(F10 as orchestrator + F16 export)*

- **Customer question:** What should we do about this project?
- **Inputs:** All of A1–A7 and A9.
- **Behaviour:** One primary action assembles a single coherent result and holds an explicit state (needs input → running → under Tribunus review → ready → stale).
- **Output:** Leads with recommended decision posture, top material risks, top opportunities, major departures, strongest and weakest approval arguments, missing information, likely pathway, fee and timeline exposure, closest precedents, and the next five recommended actions. Exportable as a professional PDF/Word brief for principals, acquisition teams, planners, architects, consultants, partners, lenders, or investment committees.
- **Evidence:** Every conclusion typed and traceable. Review state is disclosed honestly.
- **Boundaries:** Decision posture uses defined language — *proceed under current assumptions · proceed after specified revisions · seek municipal confirmation before committing further capital · reconsider the aggressive elements · hold pending missing information · significant approval barriers identified.* **Never legal advice, never municipal confirmation, never a guaranteed outcome, never a fabricated probability.**
- **Dependencies:** All of A.
- **Analyst support in pilot:** Yes — nothing reaches the customer without analyst approval.

### A9. Findings & Assumptions
*(F11, narrowed)*

- **Customer question:** Which beliefs is this project resting on, and what happens if one is wrong?
- **Inputs:** Findings generated across A2–A7.
- **Behaviour:** Persist material assumptions, risks, opportunities, and missing information with source and evidence, consequence if wrong, recommended response, status, and resolution notes.
- **Output:** A working register that survives between reviews.
- **Evidence:** Every entry links to its supporting source.
- **Boundaries:** **Not a task-management system.** Owner and due date appear only where they materially improve actionability.
- **Dependencies:** A10.
- **Analyst support in pilot:** Partial.

### A10. Evidence, Citations & Verification
*(F14, retained as the cross-cutting trust layer)*

- **Customer question:** Why should I believe this?
- **Behaviour:** Classify every material conclusion as **Verified fact** (directly stated by an authoritative source) · **Calculated result** (deterministic logic with visible inputs) · **Tribunus assessment** (reasoned interpretation supported by evidence) · **Requires confirmation** (incomplete, contradictory, ambiguous, or authority-dependent). Preserve contradictions rather than silently resolving them.
- **Output:** Inline source access from every conclusion, everywhere in the product.
- **Boundaries:** Not a separate page — a layer. Manual and analyst-verified work is disclosed, never presented as autonomous.
- **Dependencies:** FDN-3.

### A11. Scoped Project Q&A — "Ask this Review"
*(P1, narrowed from placeholder)*

- **Customer question:** Why is this a risk? Show me the policy. Which comparable best supports this departure? What did staff object to? What remains uncertain? What should we ask the City? Which conclusion changes if FSR changes?
- **Behaviour:** Answer questions grounded strictly in the selected project, its confirmed profile, municipal evidence, and selected precedents.
- **Boundaries:** **Subordinate to the Review, never the entry point.** Not a blank chatbot. Cannot answer outside the project's evidence.
- **Dependencies:** A8, A10.
- **Analyst support in pilot:** Optional.
- **Note:** This is the one A-item I would ship last, and it is defensible to hold it at placeholder if the Review lands well without it.

---

### Foundations (required, not separately sold)

| ID | Capability | From | Scope |
| --- | --- | --- | --- |
| **FDN-1** | Workspace & access | F1 narrowed | Basic authentication and firm access only. Elaborate roles, permissions, and activity history deferred. |
| **FDN-2** | Project list | F2 narrowed | A simple list of the firm's projects. Portfolio intelligence deferred. |
| **FDN-3** | Municipal evidence layer | F9 + the new agentic-search PRD | The corpus, ingestion, and retrieval that everything cites. **Architecture defined separately** in `gurinder_docs/agentic-document-search-prd-section.md`. |
| **FDN-4** | Analyst review console | F15 retained | The human gate. Service-heavy delivery is an accepted pilot strategy. |
| **FDN-5** | Traceability | P3 + P4, both narrowed | Project identity resolution and analysis run history, kept to the minimum required for reliable, traceable output. |

---

## B. First retention and workflow expansion

Valuable, but must not distract from proving the Review.

| Capability | From | Note |
| --- | --- | --- |
| **B1. Project Watch** | F13 | Monitors project-relevant changes to zoning, policy, area plans, fees, applications, council decisions, infrastructure, transit, and regional/provincial rules. Every alert must state what changed, which recorded assumption or finding is affected, why it matters, possible impact, recommended response, and source. **Never a generic news feed.** |
| **B2. Review refresh & change detection** | currently in `deferred_feature_list.md` | Pairs naturally with B1: the Review goes stale, and the customer sees what changed since last time. |
| **B3. Feedback & outcome capture** | currently in `deferred_feature_list.md` | **Flagged for your decision — see §6.** |
| **B4. Minimal scenario comparison** | P2, heavily narrowed | Only if a minimal "what changes if FSR drops to X" materially improves approval strategy. A11 partly covers this need already. |

## C. Deferred or future

Nothing here is deleted. Research and definitions are preserved.

| Capability | From |
| --- | --- |
| C1. Portfolio intelligence | F2's portfolio-intelligence half |
| C2. Consultant dependency & deliverable management | F17 remainder (after A6 takes the "likely disciplines" slice) |
| C3. City comment management & response tracking | F18 |
| C4. Local sales comps & financial feasibility | F19 |
| C5. Broad scenario modelling | P2 full |
| C6. Growth forecasting | P5 |
| C7. Competitor extras analysis | P6 |
| C8. Full document management & version history | F4 remainder |
| C9. Elaborate roles, permissions, activity history | F1 remainder |
| C10–C20. Existing deferred items | all 11 entries already in `deferred_feature_list.md`, unchanged |

---

## Mapping — every old feature and placeholder
| Old | Name | Disposition | Lands as |
| --- | --- | --- | --- |
| **F1** | Firm Workspace & User Accounts | **Narrowed** | FDN-1 (basic auth + firm access); remainder → C9 |
| **F2** | Projects & Portfolio Home | **Narrowed** | FDN-2 (simple project list); portfolio intelligence → C1 |
| **F3** | Create Project | **Merged** | A1 |
| **F4** | Document Upload & Versioning | **Narrowed + merged** | A1 (only what the Review needs); remainder → C8 |
| **F5** | Structured Project Profile | **Merged** | A1 (its core) |
| **F6** | Verified Site Baseline | **Retained** | A2 |
| **F7** | Fees & Contributions Review | **Retained** | A7 |
| **F8** | Deterministic Calculators | **Retained** | A7 |
| **F9** | Municipal Data Ingestion & Adapters | **Retained** | FDN-3; architecture now specified separately |
| **F10** | Run Development Review | **Retained + elevated** | A8 (orchestrator); its Pathway/Readiness → A6; Timeline → A7 |
| **F11** | Findings Register | **Narrowed** | A9 (register, not task manager) |
| **F12** | Precedent & Council Intelligence | **Retained + elevated** | A5; now also the evidence engine for A4 |
| **F13** | Project Watch & Alerts | **Deferred to B** | B1 |
| **F14** | Evidence, Verification & Citations | **Retained** | A10 |
| **F15** | Internal Analyst Review Console | **Retained** | FDN-4 |
| **F16** | Reports & Export | **Retained** | A8 (the decision brief) |
| **F17** | Consultant Requirement & Dependency Checklist | **Narrowed, remainder deferred** | "likely disciplines/studies" → A6; tracking/management → C2 |
| **F18** | City Comment Management | **Deferred** | C3 |
| **F19** | Local Sales Comps & Feasibility | **Deferred** | C4 |
| **P1** | Ask This Project | **Narrowed** | A11 (scoped, subordinate) — or hold as placeholder |
| **P2** | Development Scenario Comparison | **Deferred** | B4 if minimal; C5 if broad |
| **P3** | Entity Matching & Linking | **Narrowed and promoted** | FDN-5 — **no longer a placeholder**; it is Phase 1 infrastructure in the new data-engine PRD |
| **P4** | Analysis Engine & Run History | **Narrowed** | FDN-5 (minimum traceability); human QA stays FDN-4 |
| **P5** | Growth Forecasting | **Deferred** | C6 |
| **P6** | Competitor Extras Analysis | **Deferred** | C7 — and I would recommend removing it outright at the next review; it is the least connected to approval strategy |

**Nothing is removed.** No feature is proposed for deletion in this pass.

## Category discipline (per your instruction)

- **Existing Tribunus features deferred:** F13, F17 (partial), F18, F19
- **Existing placeholders deferred:** P2, P5, P6
- **Boundaries already present in the source:** no CAD/BIM interpretation, no live GIS engine, no council-video transcription, no mobile app, no automated municipality-wide scraping, no single approval-probability score (F10 already said this)
- **Unrelated competitor capabilities — never in Tribunus, not "removed":** TestFit-style physical design generation, PermitFlow-style permit submission and administration, LandTech-style site sourcing, construction management, full pro forma platforms

---

## The most important scope decisions
1. **Two new capabilities are required.** A3 and A4 do not exist today, and without them the product cannot deliver the promise. This is the single biggest change.

2. **A3 and A4 are the differentiator.** A2 (baseline) is a zoning lookup — that is table stakes and Bassett.ai already does citation-backed zoning Q&A. What no one does is compare a *specific proposal* to the rules and then judge what is *pushable* using real decision history.

3. **F12 gets promoted.** Precedent stops being a browsing feature and becomes the evidence supply for pushability. Its quality now gates A4.

4. **P3 stops being a placeholder.** Project identity resolution is Phase 1 of the data engine PRD and is required for A5 to produce trustworthy decision traces. Showing it as a placeholder is no longer accurate.

5. **F17 splits rather than deferring wholesale.** Naming likely consultant disciplines is genuinely part of approval-path intelligence; tracking their deliverables is not. Only the tracking defers.

6. **Analyst support is designed in, not hidden.** FDN-4 stays in the initial product and the customer sees "Analysis under Tribunus review." Every A-capability above states whether analyst support is expected.

7. **The word "locked" must go.** The current file asserts a scope authority that this revision contradicts. Leaving both creates exactly the drift problem the lock was meant to prevent.

---

## Decisions I need from you
These I did not resolve unilaterally.

**D1 — Vancouver vs. Coquitlam sequencing. ⚠️ Material conflict.**
Your brief says preserve the pilot as **Vancouver and Coquitlam**. But the new data-engine PRD (just committed by Gurinder) states the initial corpus is **Coquitlam only**, puts cross-city questions out of scope for v1, and phases the **second city to Phase 5** — the last phase. The product scope and the data engine currently disagree about whether Vancouver exists at launch. Options: ship Coquitlam-only first, or move Vancouver into data-engine Phase 2.

**D2 — Feedback & outcome capture (B3).** `clarifications.md` recommends pulling this *into* the MVP as the data moat that justifies analyst cost. Your brief does not mention it. I placed it in B. Confirm B, or pull to A.

**D3 — A11 "Ask this Review."** Build narrow, or hold at placeholder? Your capability 11 implies building it; the prioritization test suggests it is the most deferrable item in A.

**D4 — P6 Competitor Extras.** I deferred it. I recommend removing it entirely, but will not remove anything without your word.

---

## Document change map
If approved, these are the exact edits. **None have been made.**

| Document | Change | Preserves |
| --- | --- | --- |
| `locked_feature_list.md` | Rename → `approved_scope.md`. Replace the LOCKED banner with the A/B/C structure. Rewrite F-entries into A/B/C capabilities. | Full v2 list moved verbatim into an appendix |
| `deferred_feature_list.md` | Add C1–C9. Existing 11 entries untouched. | All existing text |
| `clarifications.md` | Mark Q1 (economics) and Q2 (Wedge-C cuts) as resolved by this revision; leave Q3 open pending D2. | Whole document; status note only |
| `UX flows.md` | §5 IA and §11 project shell gain Compliance/Departure and Pushability. §13 review structure adds both as first-class sections. §19 Workflow (F17/F18/F19) moves out of initial nav. §23 deferred placement updated. §30 coverage table rebuilt against A/B/C. | Design system §24–27 unchanged; deferred placements retained |
| `ai_architecture.md` | §1 requirements table remapped to A-capabilities. §3 feature-slice list rebuilt. **Reconcile §2 with the new agentic-search PRD** — both describe the same retrieval layer with different vocabulary (corpus-scoped vs. city agents). | All retrieval design reasoning |
| `domain_knowledge.md` | §8 mapping table remapped from old `#numbers` to A-capabilities. | All 219 lines of domain research |
| `wedge_focus_plan.html` | Positioning and messaging updated to the new promise. | Research figures and sourcing |
| `startup_viability.md` | Competitive section extended with the TestFit / LandTech / PermitFlow boundary. | All market research |
| `feature_consolidation_proposal.md` | Header note: superseded, retained for history. | Entire document |
| `mvp_feature_list_v1_original.md` | None — historical record. | Entire document |
| `tech_stack.md` | **None.** It was made deliberately feature-agnostic; the revision does not touch it. | Entire document |
| `agentic-document-search-prd-section.md` | None, pending D1. Cross-reference as the FDN-3 specification. | Entire document |
| `startup_guide.md`, `system_prompt.md` | Currently empty (0 bytes). Would be written fresh against the new definition. | n/a |

---

## Consistency check
*If a new employee read only the revised document, would they understand that Tribunus takes a proposed development and produces the most defensible, evidence-backed path toward municipal approval?*

Under this proposal: **yes** — provided A3 and A4 are approved. Without them the document still reads as a zoning-plus-risk product, and the answer is no.

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# PART 2 · DATA ENGINE
*The source inventory the evidence layer (**FDN-3**) must eventually cover. This section defines **what** must be ingested, not **how** — the ingestion and retrieval architecture is specified separately in [agentic-document-search-prd-section.md](../gurinder_docs/agentic-document-search-prd-section.md). Every capability in Level A assumes this layer exists and cites into it.*

## Municipal Land Use & Policy

* Official Community Plan (OCP) / Official Development Plan (ODP)
* Zoning Bylaw
* Zoning Maps & Schedules
* Area / Neighbourhood / Community Plans
* Corridor Plans
* Station-Area / Transit-Oriented Area Plans
* Development Permit Area Guidelines
* Municipal Design Guidelines
* Council-Adopted Planning & Development Policies
* Rezoning Policies
* Rental Housing Policies
* Affordable Housing Policies
* Heritage Policies & Guidelines
* Employment / Industrial Land Policies
* Municipal Housing Strategy
* Housing Needs Report
* Development Approval Procedure Bylaw
* Delegation Bylaw
* Floodplain Bylaw
* Tree Protection Bylaw
* Stream / Watercourse Protection Bylaw
* Municipal Heritage Register
* Heritage Conservation Area Guidelines

## Development & Servicing

* Subdivision and Development Servicing Bylaw
* Engineering Design Manual / Engineering Design Criteria
* Stormwater Management Manual / Policy
* Water Servicing Standards
* Sanitary Sewer Servicing Standards
* Drainage Servicing Standards
* Transportation / Street Design Standards
* Development Works / Frontage Improvement Requirements
* Transportation Master Plan
* Municipal Utility / Servicing Master Plans
* Municipal Capital Plan
* Area-Specific Servicing Plans / Servicing Assessments

## Fees & Development Contributions

* Development Application Fee Schedule
* Development Cost Charge (DCC) Bylaw
* Development Cost Levy (DCL) Bylaw
* Amenity Cost Charge (ACC) Bylaw
* Community Amenity Contribution (CAC) Policy
* Density Bonus Contribution Schedules
* Development-Related Utility / Connection Charge Bylaws
* Regional District DCC Bylaws
* Metro Vancouver DCC Bylaws
* Development Charge Exemption / Waiver Bylaws
* School Site Acquisition Charge Regulation / Applicable Bylaws
* Development Charge (Instalments) Regulation
* Parkland Dedication / Cash-in-Lieu Rules

## Application Requirements

* Rezoning Application Guide / Submission Checklist
* OCP Amendment Application Guide / Submission Checklist
* Development Permit Application Guide / Submission Checklist
* Development Variance Permit Application Guide / Submission Checklist
* Subdivision Application Guide / Submission Checklist
* Building Permit Application Guide / Submission Checklist
* Municipal Development / Planning Bulletins
* Municipal Planning Interpretation Bulletins
* Engineering / Infrastructure Submission Checklists

## Development Applications & Precedent

* Current Development Application Registry / Map
* Rezoning Application Packages
* OCP Amendment Application Packages
* Development Permit Application Packages
* Development Variance Permit Application Packages
* Public Subdivision Application Records
* Master Development Plan Application Packages
* Public Development Application Consultation / Engagement Records
* Development Application Status / Decision Registry
* Issued Development Permit Records
* Issued Building Permit Records
* Archived Development Application Packages

## Council & Decision Intelligence

* City Council Agenda Packages
* City Council Staff Reports
* City Council Minutes
* City Council Meeting Videos / Transcripts
* Council Voting Records
* Public Hearing Agenda Packages
* Public Hearing Written Submissions
* Public Hearing Minutes
* Public Hearing Videos / Transcripts
* Council Committee Agenda Packages
* Council Committee Staff Reports
* Council Committee Minutes
* Development Permit Board Reports
* Development Permit Board Minutes
* Urban Design / Design Review Panel Reports
* Urban Design / Design Review Panel Minutes
* Planning Advisory Committee Reports
* Planning Advisory Committee Minutes
* Board of Variance Records
* Rezoning Referral Reports
* Rezoning Enactment Reports
* Adopted Rezoning Bylaws
* Conditions of Approval / Prior-to-Enactment Conditions

## Provincial Planning & Housing

* Local Government Act
* Vancouver Charter
* Housing Supply Act
* Housing Supply Regulation
* Municipal Housing Target Orders
* Provincial SSMUH Policy Manual & Site Standards
* Transit-Oriented Area Regulations
* Transit-Oriented Area Maps
* Provincial Transit-Oriented Areas Policy Manual
* Provincial Housing / Land-Use Implementation Manuals & Bulletins
* Provincial Orders in Council affecting land use or development
* Provincial Legislative Amendments affecting land use or development

## Regional Planning & Infrastructure

* Metro Vancouver Regional Growth Strategy / Metro 2050
* Metro 2050 Regional Growth Strategy Maps
* Metro Vancouver Regional Water Plans
* Metro Vancouver Liquid Waste Management Plan
* TransLink Transport 2050
* TransLink Investment / Ten-Year Plans
* TransLink GTFS / Public Transit Dataset
* Provincial Highway Plans / Corridor Maps

## Parcel & Spatial Data

* Municipal GIS / Open Data Portal
* ParcelMap BC Open Dataset
* BC Data Catalogue / BC Geographic Warehouse Public Datasets

## Environmental & Physical Constraints

* Riparian Areas Protection Act
* Riparian Areas Protection Regulation
* Environmental Management Act
* Contaminated Sites Regulation
* Provincial Environmental Remediation Sites Public Dataset
* Provincial Flood Hazard Maps / Datasets
* Freshwater Atlas / BC Water Resources Atlas
* BC Conservation Data Centre Public Datasets
* Agricultural Land Commission Act & Regulations
* Agricultural Land Reserve Map / Dataset

## Historical / Change Intelligence

For every applicable source above, also ingest publicly available:

* Archived / Superseded Versions
* Amendment Bylaws
* Policy Amendments
* Fee / Charge Amendments
* Proposed Amendments
* Effective Dates

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# PART 3 · DEVELOPMENT CYCLE MAPPING
*Where Tribunus sits in the development lifecycle, and how the adjacent tool landscape divides it. This is the positioning evidence behind the product boundary and the differentiator argument in §1.*

## The real-estate development timeline

| Phase | Name | Activities |
| --- | --- | --- |
| **1** | Find the site | Market strategy → product choice → land sourcing → identifying potential sites |
| **2** | Test the deal | Preliminary zoning review → site constraints → due diligence → market analysis → land control or conditional purchase |
| **3** | Shape the project | Concept design → unit mix → density and massing assumptions → preliminary pro forma → consultant input → financing strategy |
| **4** | **Win municipal approvals** | Pre-application discussions → rezoning/OCP amendment if required → staff review → public consultation/hearing → Council decision → conditions → Development Permit |
| **5** | Get build-ready | Detailed technical drawings → Building Permit → construction financing → tendering → contractor procurement |
| **6** | Build and complete | Construction → inspections → cost and schedule control → deficiency correction → Occupancy Permit |
| **7** | Exit or operate | Presales or sales → closings → leasing → stabilization → refinancing or long-term ownership |

## Proven adjacent companies

| Company | Primary phases | What it does, and where it stops |
| --- | --- | --- |
| **LandTech** | 1–2 | Helps developers discover land and perform initial planning, ownership, constraint and viability assessments. It does not provide a deep, project-specific municipal approval strategy. |
| **Zoneomics** | 2–3 | Provides zoning classifications, permitted uses, development controls, zoning reports and APIs. It explains the applicable zoning but does not deeply reason through discretionary approvals or Council behaviour. |
| **Gridics** | 2–3 | Converts zoning regulations into parcel-level development rules and estimates by-right development capacity. It concentrates on what the existing zoning permits rather than how to pursue a difficult rezoning. |
| **TestFit** | 2–3 | Generates conceptual site layouts, unit counts, parking arrangements and preliminary financial scenarios. It shows what can physically fit and approximately pencil, not what the municipality may be persuaded to approve. |
| **Archistar** | 2–4 | Combines planning controls, site assessment and generative conceptual design. It covers allowable development and compliance more than staff, Council and political approval strategy. |
| **PermitFlow** | 5 | Researches construction-permit requirements and helps prepare, submit and track permit applications. It primarily executes permitting after the development direction has already been decided. |
| **Northspyre** | 2–6 | Manages development budgets, forecasts, documents, contracts and project delivery. It controls the financial and operational process but does not determine what can credibly be pushed through municipal approval. |

## Early or not independently proven companies

| Company | Claimed phases | Claim, and what is unverified |
| --- | --- | --- |
| **Deventic** | 2–5 | Claims to cover zoning interpretation, feasibility, entitlement pathways, document generation, approvals and permit preparation. Its ownership, customers and commercial adoption are not publicly verifiable. |
| **Shovelready** | 2–5 | Claims to assess rezoning probability, Council risk, approval timelines, permit delays and carrying-cost exposure. It is extremely close to Tribunus conceptually but is currently an early beta with limited demonstrated coverage. |
| **Rasmere** | 2–4 | Produces planning-risk reports using policies, constraints, comparable applications and appeal decisions. It resembles an early version of the Tribunus Development Review, but meaningful adoption is not publicly established. |
| **Cityscrape** | 2–4 | Monitors municipal policies, agendas, applications, decisions and tribunal records, then connects relevant changes to projects. It closely resembles the Tribunus council-intelligence and Project Watch components. |
| **PlotWize** | 2–4 | Provides early planning-risk assessments using property constraints and nearby application outcomes. It is narrower than Tribunus and appears early-stage. |
| **CivroDA** | 2–4 | Compares proposed developments against Council decisions to identify precedent and approval risk. Its demonstrated dataset and municipal coverage remain extremely limited. |
| **ParcelScore AI** | 2–4 | Claims to produce acquisition reports covering zoning, development potential, regulatory risks and planning precedents. Its meaningful commercial adoption has not been publicly demonstrated. |

## Tribunus's position

**Primary phases: 2–4 · Strongest concentration: Phase 4**

Tribunus enters when a developer has a potential site and a proposed development. It compares that proposal against zoning, policies, staff reports, Council proceedings, hearings, comparable applications, conditions, fees and other municipal evidence.

Tribunus should answer:

1. Can this proposal proceed under the current zoning?
2. What conflicts with the existing rules or policies?
3. What approvals or amendments are required?
4. Which constraints are hard and which may be negotiable?
5. What can credibly be pushed?
6. What policy and precedent support or weaken that position?
7. How did similar projects change during municipal review?
8. What could kill, delay or materially increase the cost of the project?
9. What should the developer do next?

The output is an evidence-backed approval strategy for that specific project.

**Tribunus should not replace:**

- LandTech for broad land discovery;
- TestFit for physical concept generation;
- PermitFlow for construction-permit administration;
- Northspyre for construction and financial project management.

**Tribunus should connect the gap between them:**

> Land and zoning intelligence
> → **project-specific approval intelligence**
> → permit execution
> → project delivery

## Bottom line

Proven companies sell individual parts of the development workflow.

The least-proven section is the intelligence between early feasibility and municipal approval: determining what can be pushed, whether policy and precedent support it, and how the developer should pursue approval.

That is where Tribunus should sit.

LandTech, Zoneomics, Gridics and TestFit help determine whether a site appears promising.

**Tribunus determines the most defensible way to get the proposed project approved.**

PermitFlow and Northspyre help execute and manage what happens afterward.

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# PART 4 · TRIBUNUS PRODUCT
*A check against the interface itself: does the product read as a structured workflow, or as a chatbot with a report generator bolted on. This is the UX-level test that should be applied to whatever screens get built against the Level A capabilities in §1.*

Exactly—if the main interaction is "upload documents → generate report → chat with report," then it is essentially a dressed-up chatbot.

A realistic first mockup needs about eight screen types. Click through the navigation and actions below:

The eight screens are:

1. **Projects** — portfolio of active developments.
2. **Create Project** — short three-step setup flow.
3. **Overview** — current decisions, barriers and next actions.
4. **Site & Proposal** — editable project facts beside verified municipal requirements.
5. **Departures** — working table where the team chooses to revise, push, confirm or delegate each issue.
6. **Approval Cases** — policy, precedents, arguments and weaknesses for individual departures.
7. **Pathway & Workflow** — approval stages, City questions, consultant gaps, fees and timeline.
8. **Documents & Evidence** — project files and authoritative sources supporting everything else.

The central click flow becomes:

```text
Open project
→ See decision requiring attention
→ Open the departure
→ Build its approval case
→ Review comparable decisions
→ Add unresolved questions to the City agenda
→ Prepare for the meeting
→ Record feedback
→ Revise the proposal
→ See which findings changed
```

Documents are supporting inputs. Reports are exportable snapshots. Chat is a global shortcut. The actual product is the structured workflow involving proposals, departures, approval cases, decisions, revisions and municipal feedback.

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# PART 5 · TRIBUNUS PRODUCT THESIS
*The plainest statement of what Tribunus is, at three levels of depth. This is the version to hand someone who has never read the rest of this document.*

## The simplest complete definition

If I had to explain Tribunus to someone in one paragraph:

Tribunus is a project-first entitlement strategy and development-approval intelligence platform. A developer enters a site and the development they want to build. Tribunus establishes the verified municipal baseline, identifies where the proposal departs from it, uses policy and actual decision history to assess what can credibly be pushed, and produces the most defensible pathway toward approval. It helps the team understand what is known, what remains uncertain, what could damage the project, and what to do next—with evidence behind every material conclusion.

## The shortest version

Tribunus turns a proposed development into an evidence-backed municipal approval strategy.

## The deepest conceptual version

Developers create value by reducing uncertainty. Tribunus helps reduce the uncertainty between what they want to build and what the municipality may actually approve.
