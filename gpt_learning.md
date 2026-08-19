# Tribunus — Complete Product and Startup Handoff

**Document purpose:** Give a new AI chat or collaborator enough context to understand what Tribunus is, who it serves, what the MVP must contain, how the product is intended to behave, what has already been built, and which ideas are still only proposals.

**Snapshot date:** August 15, 2026  
**Project:** Tribunus MVP Development  
**Company:** Tribunus Labs Inc.  
**Scope authority:** [`main_docs/locked_feature_list.md`](main_docs/locked_feature_list.md), locked v2, August 2026

> This document is a neutral consolidation of the existing work. It does not approve a new strategy, change the locked feature list, or resolve open product questions.

---

## 1. How to read this document

The repository contains locked requirements, proposed designs, research, historical lists, and a front-end prototype. They do not all have equal authority.

### Authority order

1. **Locked scope:** [`main_docs/locked_feature_list.md`](main_docs/locked_feature_list.md) is the only authority for what is in the MVP. It defines 19 full features and 6 visible placeholders. Changing MVP scope requires editing that file and incrementing its version.
2. **Deferred scope:** [`main_docs/deferred_feature_list.md`](main_docs/deferred_feature_list.md) records features that are outside the current locked MVP unless the locked list is formally changed.
3. **Direct stakeholder direction:** The product must be project-first, highly interactive, useful to professional real-estate development teams, and closer to a friendly development-intelligence terminal than a collection of reports. Later stakeholder feedback about maps, inputs, chat, and high-ROI screen space is important UX direction but has not changed the feature list.
4. **Proposed or recommended documents:** UX, architecture, technical stack, market strategy, consolidation, and prioritization documents are useful guidance. They are not scope authority unless incorporated into the locked list.
5. **Research and interviews:** Domain notes, Kevin's interview, competitor research, market figures, pricing ideas, and founder hypotheses are evidence or input, not settled product decisions.
6. **Current code:** The `main/` application is a front-end bring-up showing one interpretation of the product. It uses mock data and is not a production implementation or final UX specification.

### Status vocabulary used below

- **LOCKED:** Required by the current MVP scope.
- **PLACEHOLDER:** Must have a visibly complete UX, but its production backend does not need to be connected.
- **DEFERRED:** Explicitly outside the current MVP.
- **PROPOSED / RECOMMENDED:** A design or implementation recommendation that is not scope authority.
- **CURRENT IMPLEMENTATION:** What the existing code currently does.
- **RAW INPUT:** Interview or research material that has not been approved.
- **OPEN:** A question that has not been resolved.

---

## 2. Tribunus in one page

### What Tribunus is

Tribunus is a developer-side real-estate development intelligence and risk-control platform. It is intended to help professional development teams understand a site, pressure-test a proposed project, identify assumptions and approval risks, learn from municipal precedent, see likely fees and approval steps, and monitor material changes. Important claims must be tied to evidence.

It is not meant to be merely:

- a static zoning report;
- a generic dashboard;
- a blank AI chatbot;
- a permit-submission portal;
- a building-code certification tool;
- a full construction-management suite;
- a complete Argus replacement or full underwriting system; or
- an unsupported approval-probability score.

### Public-facing positioning currently used

The active website describes Tribunus as **Real Estate Development Intelligence** and uses the positioning line:

> **Development decisions, backed by evidence.**

The active hero communicates the customer problem in plain language:

> Know what could delay or derail a project—before it becomes an expensive surprise.

The supporting promise is that Tribunus uses AI to analyze municipal rules, fees, past approvals, and project documents, then explains what could go wrong, what it could cost, and what to do next, with evidence behind every finding.

The public site intentionally emphasizes customer outcomes rather than internal technical language. It must not claim guaranteed approvals, guaranteed approval-time reductions, building-code certification, full pro-forma modelling, unsupported coverage, or unsupported customer/performance counts.

### Core product idea

Real-estate development is a chain of expensive decisions made before certainty exists. A project depends on assumptions about zoning, policy, density, setbacks, fees, servicing, dedications, tenure, consultant inputs, approval sequence, timing, and precedent. If one material assumption is wrong or stale, the error can propagate into design, the pro forma, negotiations, and schedule.

Tribunus is intended to become the project-specific control layer for those assumptions:

```text
Firm inputs and project files
             +
Municipal rules, fees, applications, staff reports, and decisions
             ↓
Verified project model and site baseline
             ↓
Development Review: risks, opportunities, pathway, fees, precedent, actions
             ↓
Findings assigned and resolved with evidence
             ↓
Project Watch detects material changes and re-surfaces affected assumptions
```

### Primary customer outcome

Before a developer buys, redesigns, meets the municipality, submits, or responds to comments, the team should be able to answer:

1. What are we proposing?
2. What do the current rules and policies say?
3. Which assumptions could materially damage yield, cost, approval path, or schedule?
4. What information is missing or contradictory?
5. What fees and contributions may apply, and how were they calculated?
6. What is the likely municipal pathway and what must happen next?
7. Which past projects are genuinely comparable, and how were they decided?
8. What changed since the last review?
9. What should the team do next, who owns it, and what evidence supports the recommendation?

---

## 3. Problem and market context

### Developer workflow

The broad real-estate development sequence is:

```text
Site / land
  → acquisition screening and feasibility
  → concept and consultant work
  → rezoning / Official Community Plan amendment, if needed
  → development permit
  → building permit
  → construction
  → sale or operation
```

Each stage inherits decisions and assumptions from the stages before it. The worst product failure is therefore not a visible error; it is a silent, plausible-looking miss that the team relies on.

### Fragmented information

Relevant information currently lives across:

- zoning bylaws and maps;
- Official Community Plans, neighbourhood plans, and policy overlays;
- Development Permit Areas and design guidelines;
- parcel/GIS systems;
- fee and contribution schedules;
- application registries;
- staff reports and council minutes;
- historical approval decisions and conditions;
- City correspondence and comment letters;
- consultant reports and drawings;
- project statistics and internal spreadsheets; and
- the team's institutional knowledge.

Experienced developers compensate with municipal knowledge, consultants, spreadsheets, calls, and manual cross-checking. A team entering a new municipality often has to rebuild that context from scratch. The economic value is not simply saving research hours; it is reducing exposure to a bad acquisition, stale fee assumption, unsupported proposal, missed requirement, consultant conflict, or avoidable review cycle.

### Why now

The research documents identify three timing drivers:

- B.C. and municipal housing policy has been changing quickly, including provincial legislation and local implementation.
- Rules, fees, planning priorities, and process requirements are increasingly difficult to track manually across a portfolio.
- Modern language models can retrieve, structure, compare, and explain large document corpora, but only if citations, versioning, deterministic calculations, and human review are engineered around them.

### Market thesis and its limits

The current market assessment rates confidence in the problem as medium-high and confidence in the business as medium. The buyer already spends money on trusted planners, consultants, analysts, legal advice, and carrying costs. Tribunus must prove that it changes real decisions and earns trust; it cannot assume that AI output automatically redirects that budget.

Metro Vancouver is the proof market, not necessarily the final market. The research notes that a B.C.-only business may support a focused high-value company but is likely too narrow for a very large venture outcome without broader geography, broader workflow depth, or both.

Timestamped market research in July/August 2026 used public permitting-delay and application-volume figures to illustrate the cost of delay. Those figures are hypotheses and context, not product guarantees. Any external use should retain their citations and dates from [`usman_docs/Tribunus_Product_Thesis_MVP_and_Market_Case.md`](usman_docs/Tribunus_Product_Thesis_MVP_and_Market_Case.md).

---

## 4. Customers, users, and buying context

### Current common ground

- The product is for professional real-estate development work, not a casual consumer property search.
- The daily user is likely a development manager, project manager, analyst, planner, acquisitions/feasibility team member, or another staff member responsible for checking and advancing projects.
- The economic buyer is likely a principal, executive, development VP, or investment-committee stakeholder who cares about portfolio risk, decision quality, cost, and schedule.
- Consultants may be supporting users or collaboration partners.
- Tribunus internal analysts are separate operational users who verify outputs before customer release during the pilot.

### Audience tension that remains unresolved

Different documents point to different initial customer emphasis:

- [`main_docs/clarifications.md`](main_docs/clarifications.md) recommends designing for large developers with multiple active projects and sophisticated workflows. In that framing, the product sells to a principal but is used by development managers.
- [`usman_docs/Tribunus_Product_Thesis_MVP_and_Market_Case.md`](usman_docs/Tribunus_Product_Thesis_MVP_and_Market_Case.md) frames the customer as small-to-mid-sized developers with lean teams and multiple sites.
- Kevin's interview says veteran developers may use Tribunus mainly as an office-wide checkpoint or monitoring layer, while newer developers, expanding firms, and staff entering unfamiliar municipalities may rely on the baseline and audit more directly.
- The public website currently says “professional real estate development teams,” which avoids choosing between those segments.

This is an open go-to-market and onboarding question. It must not be silently resolved in product copy or UX without an explicit decision.

### User expectations

The product must respect a knowledgeable professional user:

- Show the decision-relevant answer first.
- Let the user inspect the evidence and calculation.
- Separate fact from interpretation and uncertainty.
- Preserve project context and the user's own data.
- Avoid generic “AI magic” language.
- Avoid needless layout changes or novelty; stability matters.
- Support role-specific depth so a user can focus on planning, approvals, finance, consultants, or executive review without being forced through every module.
- Make freshness visible because stale information is a primary failure mode.

---

## 5. Pilot boundaries

### Jurisdictions

**LOCKED pilot municipalities:**

- City of Vancouver
- City of Coquitlam

Regional and provincial sources may still matter, including Metro Vancouver, TransLink, utilities, and B.C. legislation. The customer-facing product must not imply that other municipalities are fully supported unless their coverage has been verified and approved.

### Project types

The locked create-project flow supports:

- townhouse;
- multifamily; and
- mixed-use.

Raw interview context emphasizes townhouses and wood-frame low-rise projects, including six-storey wood-frame projects over concrete parkades. That interview context is useful pilot data but is not a formal change to supported project types.

### Project stages

The product spans acquisition screening through municipal review and later development-approval workflow. A project can be incomplete and may be created before all facts or documents exist.

### Explicit boundaries

The current product does not promise:

- full permit submission;
- building-code certification;
- construction management;
- universal approval probability;
- guaranteed approvals or timelines;
- full CAD/BIM interpretation;
- a vendor marketplace or advertising;
- a generic news feed;
- complete live automation of all municipal sources on day one; or
- a full pro forma/Argus replacement unless an economics decision is later approved.

Manual source curation and human analyst review are acceptable for the pilot. They must be disclosed honestly through states such as **Analysis under Tribunus review**, not hidden behind fake automation.

---

## 6. End-to-end product workflow

The intended golden path is:

1. **Enter the firm workspace.** Sign in securely, join or create a workspace, and use role/project permissions.
2. **Choose or create a project.** Start from an address or drawn parcel in Vancouver or Coquitlam.
3. **Describe the proposal.** Enter type, stage, units, height, FSR, tenure, and other known facts. Incomplete data is allowed.
4. **Upload available files.** Add project statistics, drawings, planning rationale, feasibility material, consultant reports, City correspondence, and other supported files. Preserve categories and versions.
5. **Build the live project profile.** Tribunus extracts facts from user inputs and documents, shows conflicts, and asks the user to confirm or correct them.
6. **Build the verified site baseline.** Retrieve parcel, zoning, plans, policies, overlays, site constraints, transit context, nearby applications, fees, and submission requirements with dates and evidence.
7. **Run the Development Review.** Produce one coherent set of material risks, opportunities, missing information, likely pathway, charges, precedents, timeline considerations, and next actions.
8. **Perform internal verification.** Tribunus analysts inspect unsupported claims, contradictions, calculations, source versions, and extraction conflicts, then approve or return the review.
9. **Customer reviews and acts.** The team inspects findings, evidence, formulas, precedent traces, and recommended actions; assigns owners and due dates; resolves assumptions and risks.
10. **Ask contextual questions.** “Ask This Project” answers from the selected project's model, documents, municipal corpus, findings, and precedents, with citations and clear assessment labels. It is a placeholder in the MVP.
11. **Export a Development Brief.** Generate a cited PDF/Word deliverable for principals, consultants, partners, or an investment committee.
12. **Watch the project and portfolio.** Monitor project-relevant policy, fee, infrastructure, application, council, and regulatory changes; explain the affected assumption and recommended response.
13. **Continue through approval workflow.** Track consultants/dependencies, City comments, and a lightweight local-sales/feasibility check as defined in locked features F17–F19.

---

## 7. Locked MVP scope — 19 full features

Everything in this section is **LOCKED**. The wording below is condensed from the authoritative list without changing scope.

### F1 — Firm Workspace & User Accounts

- Secure email or magic-link authentication.
- Firm workspace creation and membership.
- Team invitations.
- Roles: Admin, Member, Viewer.
- Project-level access permissions.
- Activity history.
- Purpose: let a real firm collaborate securely rather than sharing one login.

### F2 — Projects & Portfolio Home

Project list information includes:

- project name;
- address and municipality;
- project type and stage;
- open risks;
- recent change;
- last verified date; and
- Watch state.

Portfolio intelligence includes:

- shared risks across projects;
- upcoming fee changes;
- policy exposure;
- nearby competition;
- municipal concentration;
- consultant dependencies; and
- portfolio alerts.

The Watch entry point provides relevant alerts. Portfolio space must be high-ROI; large decorative “needs attention” or “material inputs” cards are not required by the feature and were explicitly criticized in later stakeholder feedback.

### F3 — Create Project

- Start with an address or drawn parcel.
- Municipality limited to Vancouver or Coquitlam for the pilot.
- Type: townhouse, multifamily, or mixed-use.
- Stage can span acquisition through municipal review.
- Capture known proposal data such as units, height, FSR, tenure, and description.
- Allow incomplete projects.
- Trigger the Verified Site Baseline (F6) and Development Review (F10).

### F4 — Document Upload & Versioning

- Support PDF, Word, Excel, and images.
- Categorize documents.
- Store document dates and versions.
- Explicitly supersede older versions without losing history.
- Secure preview and download.
- Link documents to extracted facts and findings.
- Full CAD/BIM interpretation is out of scope.

### F5 — Structured Project Profile

Extract and structure facts from user input and project files, including:

- site area;
- use;
- units;
- height and storeys;
- FSR;
- gross floor area;
- setbacks;
- parking and loading;
- tenure;
- requested variances/departures; and
- project stage.

The user must be able to confirm and correct facts. Conflicts between files or inputs must be visible. The confirmed profile is intended to become the proposed-project source of truth used by downstream review and calculations.

### F6 — Verified Site Baseline

Automatically retrieve and present, where available:

- parcel and location context;
- zoning;
- Official Community Plan and area/neighbourhood plans;
- Development Permit Areas;
- policies and overlays;
- transit context;
- nearby applications;
- site constraints; and
- an aggregated zoning-map view.

The baseline must cover applicable uses, height, density, setbacks, guidelines, Development Permit Areas, and submission requirements. Every material value needs:

- original source;
- page or section;
- effective date;
- last checked date; and
- state: Verified fact, Derived/Calculated result, Tribunus assessment, or Requires confirmation.

### F7 — Fees & Contributions Review

Identify potentially applicable charges, including:

- Vancouver DCLs;
- municipal/regional DCCs;
- application fees;
- Vancouver CAC or density-bonus considerations;
- Coquitlam ACCs;
- utility and regional charges; and
- announced future changes.

Maintain current and historical rates with effective dates and source links. Label every item as:

- deterministically calculable;
- preliminary estimate;
- negotiated/uncertain; or
- requiring municipal confirmation.

All arithmetic uses F8.

### F8 — Deterministic Calculators

Normal tested code—not a language model—must perform:

- FSR calculations;
- unit and area conversions;
- unit-based and area-based charges;
- fee calculations;
- dedication calculations;
- date calculations;
- timeline arithmetic; and
- distances.

Expose formulas and input values. The language model must never be the hidden calculator.

### F9 — Municipal Data Ingestion & Adapters

Create jurisdiction-specific ingestion for Vancouver and Coquitlam sources such as:

- zoning and policy documents;
- applications;
- council reports and minutes; and
- fee schedules.

Track source versions and detect changes. Manual curation is acceptable during the pilot. This is primarily internal infrastructure and operations, with freshness and evidence visible to customers.

### F10 — Run Development Review

This is the primary product action and core “aha” moment. It should run automatically on project creation when possible and return one coherent result, not a bundle of unrelated AI widgets.

The result includes approximately:

- top five material risks;
- top opportunities;
- missing information;
- likely approval pathway;
- applicable charges;
- closest precedents; and
- next five recommended actions.

F10 also contains:

- Application Readiness Review;
- Approval Pathway and requirements checklist; and
- Timeline Forecasting.

Do not produce a single unsupported approval-probability score.

### F11 — Findings Register: Assumptions & Risks

The Findings Register holds two related but distinct record types.

An **assumption** includes:

- value;
- source;
- effective date;
- confidence/status;
- dependent documents or outputs;
- consequence if wrong;
- owner; and
- resolution notes.

A **risk** includes:

- severity and confidence;
- explanation and evidence;
- potential impact;
- recommended action;
- owner and due date;
- status; and
- resolution history.

When an assumption is breached or becomes materially uncertain, it can spawn a linked risk. This register is the central risk-control object and a candidate long-term system of record for verified development assumptions.

### F12 — Precedent & Council Intelligence

Comparable-project search and decision tracing must support roughly 3–10 relevant records using filters such as municipality, distance, type, tenure, density, height, and requested departures.

For each selected precedent, preserve:

- why it is comparable and why it is not;
- original proposal;
- revisions;
- staff concerns and recommendation;
- council/board discussion;
- conditions;
- final outcome; and
- timeline.

Council and staff intelligence includes:

- concerns and support;
- concessions and conditions;
- cited meeting evidence;
- gray-area/discretionary departure precedent;
- meeting summaries; and
- sourced voting behavior.

Manual pilot datasets are acceptable. Limitations and corpus coverage must be visible, especially for parsed council material.

### F13 — Project Watch & Change/Upgrade Alerts

Project Watch is opt-in and monitors project-specific changes involving:

- zoning and policy;
- Official or Neighbourhood Plans;
- fees and contributions;
- council decisions;
- transit and infrastructure;
- senior-government/regional changes; and
- relevant nearby activity.

Every alert should explain:

- what changed;
- which assumption or project is affected;
- why it matters;
- the potential impact;
- the recommended action; and
- the source.

Support a concise weekly digest and portfolio alerts. Do not become a generic real-estate news feed.

### F14 — Evidence, Verification & Citations

This is the trust backbone used everywhere. Every material conclusion should be traceable to:

- original document;
- page or section;
- publication date;
- effective date;
- source authority;
- evidence confidence;
- contradictions; and
- human-review state where relevant.

Customer-facing trust types:

- **Verified fact** — directly supported by an authoritative source.
- **Calculated result** — produced by a deterministic formula with visible inputs.
- **Tribunus assessment** — a reasoned interpretation supported by evidence but not stated verbatim by the source.
- **Requires confirmation** — missing, ambiguous, contradictory, incomplete, or authority-dependent.

Confidence describes evidence quality; it does not replace the trust type. Never present an assessment as a verified fact.

### F15 — Internal Analyst Review Console

Tribunus internal analysts need a separate environment to:

- inspect extracted facts and candidate findings;
- correct or suppress output;
- add or remove sources;
- adjust confidence;
- identify contradictions or unsupported claims;
- re-run workflows; and
- mark a review ready for the customer.

Until approval, the customer sees **Analysis under Tribunus review**. Human-in-the-loop review is acceptable and likely necessary for a trustworthy pilot.

### F16 — Reports & Export / Development Brief

Generate a clean PDF or Word brief containing:

- project profile;
- verified baseline;
- fees;
- assumptions and risks;
- approval pathway;
- comparable projects;
- material risks;
- recommended actions; and
- sources and limitations.

The export is designed for principals, consultants, partners, and investment committees. It should begin with decisions, material risks, and actions—not product marketing.

### F17 — Consultant Requirement & Dependency Checklist

Track disciplines and utility/agency requirements, including items such as:

- civil;
- mechanical;
- electrical;
- sanitary;
- storm;
- water;
- landscape;
- geotechnical; and
- utilities/agencies.

For each requirement, show whether it has been reviewed or received, assign ownership, link deliverables and dependencies, and surface missing/overdue work.

### F18 — City Comment Management

- Upload municipal comment letters.
- Extract individual comments.
- Require review of the extraction.
- Assign comments to owners.
- Track responses.
- Link responses to drawing/document revisions.
- Verify resolution.

“Submitted” must not be treated as “resolved.”

### F19 — Local Sales Comps & Feasibility Check

Provide a lightweight, tenure-aware local feasibility check containing:

- land and product sales comparables;
- dollars per square foot;
- relevant timeframes;
- average cost per unit by product type;
- a quick “does it pencil?” check; and
- tenure context.

This is not automatically approval for a full underwriting suite. The depth of the economic bridge remains an open product question.

---

## 8. Locked visible placeholders — P1 through P6

These are **PLACEHOLDERS**: the user experience should appear coherent and complete, but production backend behavior may remain unwired. The product must label preview/availability honestly and must not fabricate successful work.

### P1 — Ask This Project

A contextual, cited project assistant—not a blank general chatbot. It should use the selected project's confirmed profile, files, municipal sources, findings, and precedents. Answers distinguish facts, calculations, assessments, and unknowns. A useful answer may link to or create a finding, but the interface should not scatter AI actions after every sentence.

### P2 — Development Scenario Comparison

Compare conservative, policy-aligned, and aggressive proposals across:

- units;
- density;
- approval risk;
- fees;
- required studies;
- timeline; and
- estimated yield.

Changed inputs and evidence must be visible. Do not collapse the scenarios into one unsupported approval score.

### P3 — Entity Matching & Linking

Connect:

```text
address ↔ parcel ↔ application ↔ council report ↔ meeting ↔ policy
        ↔ decision ↔ drawing revision ↔ developer ↔ consultant
```

Uncertain matches must stay uncertain. Customers should see the relevant relationship and confidence, not internal graph complexity.

### P4 — Analysis Engine & Run History

Represent automated quality gates and a stored record of each analysis run, including:

- inputs;
- profile and file versions;
- source versions;
- workflows/models used;
- findings;
- user changes; and
- outcome/state.

The customer must never be shown private chain-of-thought or raw internal prompts.

### P5 — Growth Forecasting

Combine regional growth, Official Community Plan, infrastructure, and transit signals. Clearly distinguish approved plans, sourced trends, and projections. This is a placeholder, not permission to publish speculative heat maps as fact.

### P6 — Competitor Extras Analysis

Represent additional product/market features offered by comparable developments. It belongs near local sales and feasibility context and must not distract from the central approval-risk workflow.

---

## 9. Locked feature relationships and build dependencies

The current owner/build grouping is:

| Track | Feature ownership |
| --- | --- |
| A | F1–F3: workspace, portfolio, create project |
| B | F4–F5: documents and structured profile |
| C | F8 and F9 first, then F6 and F7: calculators, municipal data, baseline, fees |
| D | F11 first, then F10; plus P1, P2, P4: findings, review, project assistant/scenarios/run history |
| E | F12 and P5: precedent/council intelligence and growth forecasting |
| F | F14 first, then F13, F15, F16: evidence, Watch, analyst console, exports |
| G | F17–F19 and P6: consultant workflow, City comments, sales/feasibility, extras |

Suggested technical sequencing in the locked document:

- **Tier 1 foundations:** F1, F8, F9, F14, F4.
- **Tier 2 core intelligence:** F5, F6, F7, F11, F12, then F10 and F17–F19.
- **Tier 3 operational delivery:** F13, F15, F16.
- **Especially critical:** F10 (the coherent Development Review) and F14 (trust/evidence).

Important relationships:

- F3 triggers F6 and F10.
- F4 and user input populate F5.
- F5 represents the proposal; F6 represents the applicable rules/context. Comparing them is a central product behavior.
- F7 uses F8 for all math.
- F9 supplies versioned public sources to F6, F7, F12, F13, and F14.
- F10 orchestrates outputs from F5–F9, F11, F12, and F14.
- F11 persists issues and actions discovered by F10, F13, F18, or users.
- F14 applies to every material claim, not one isolated “sources page.”
- F15 gates early customer-ready output.
- F16 packages approved information without removing its evidence or limitations.

---

## 10. Product data model in plain language

The conceptual objects are:

- **Workspace / firm:** tenant boundary, membership, roles, settings.
- **User:** identity, role, access, activity.
- **Project:** address/parcel, municipality, type, stage, ownership, Watch status.
- **Project profile:** the latest confirmed description of what the firm proposes.
- **Project profile fact:** one structured value with provenance and confirmation state.
- **Document:** original private project file.
- **Document version:** current or superseded version, extraction state, metadata.
- **Municipal source:** authoritative or contextual public record with jurisdiction, type, dates, and version.
- **Source version:** point-in-time version preserving current versus superseded material.
- **Citation:** exact connection from a claim to document/page/section or character range.
- **Baseline item:** current rule, policy, overlay, site constraint, or requirement applied to a project.
- **Calculation:** deterministic formula, inputs, output, units, and version.
- **Fee:** charge, authority, basis, trigger, rate/effective date, amount or range, certainty state.
- **Assumption:** a project belief that downstream work depends on.
- **Risk:** an identified exposure with severity, confidence, impact, action, owner, due date, and status.
- **Finding:** shared container/relationship for assumptions and risks.
- **Precedent project:** a potentially comparable historical application.
- **Decision trace event:** proposal, staff concern, revision, recommendation, debate/vote, condition, outcome.
- **Review run:** snapshot of profile/files/sources/workflows and produced results.
- **Alert:** a material change and its effect on a project or assumption.
- **Consultant requirement / deliverable:** discipline-specific dependency and status.
- **City comment / response:** extracted municipal comment and its resolution history.
- **Analyst review item:** internal verification state, correction, waiver, or approval.

The product should preserve history rather than overwrite important truth. Rules, fees, documents, calculations, review runs, and findings need point-in-time context because “current” changes over time.

---

## 11. Trust, evidence, and safety model

Trust is part of the product, not a compliance footer.

### Non-negotiable rules

1. Never mix historical and current rules or fees without an explicit date.
2. Key regulatory data by jurisdiction and effective date.
3. Keep publication date, effective date, and last checked date separate.
4. Preserve original files as the source of truth; indexes and embeddings are derived artifacts.
5. Link material claims to original source locations.
6. Keep fact, deterministic calculation, assessment, and unknown visibly different.
7. Do not hide contradictory evidence.
8. Language models do not perform authoritative arithmetic.
9. An unsupported or ambiguous output goes to confirmation/review rather than being made to sound certain.
10. Never use one customer's private documents for another customer without permission.
11. Customer-ready status requires the defined quality/review gate.
12. Avoid claims that substitute for planning, legal, engineering, environmental, or financial professional advice.

### Security expectations

The proposed production model includes:

- tenant isolation;
- role and project permissions;
- row-level security;
- encryption in transit and at rest;
- secure private file storage;
- audit/activity history;
- data retention/deletion controls;
- no cross-customer private corpus retrieval;
- careful handling of confidential feasibility studies and City correspondence; and
- no training on customer content without explicit permission.

The locked list includes baseline workspace access and activity history. A full security/audit-log console is deferred, but baseline security itself is not optional.

---

## 12. AI and analysis behavior

### Product stance

The proposed AI architecture says Tribunus is not fundamentally a chatbot. It is a project-specific analysis system with documents, structured data, deterministic tools, evidence, durable workflows, and human review. Chat is a secondary interaction over verified context.

### Proposed analysis pattern

- A master Development Review orchestrator coordinates jurisdiction- and source-scoped workflows.
- Retrieval combines semantic recall with keyword/exact search.
- The system opens real files and cites exact locations rather than relying on embeddings as truth.
- Public municipal corpora and private firm corpora are isolated.
- Structured outputs use strict schemas.
- Verification checks citations, contradictions, required fields, and calculation results.
- Long-running work uses durable jobs and named stages.
- Unsupported output becomes `pending_review` or Requires confirmation.
- Internal analysts can correct, suppress, source, re-run, and approve output.

### UX implications

The AI should:

- operate on the selected parcel, project model, documents, findings, or map context;
- ask clarifying questions when necessary;
- explain what it used;
- highlight relevant parcels, layers, documents, or findings;
- preview proposed changes to the project model before applying them;
- keep its output concise and action-oriented; and
- let the user move directly from answer to evidence or a tracked finding.

The AI should not:

- be the default empty home screen;
- generate long reports as the only product experience;
- expose chain-of-thought;
- make arithmetic opaque;
- pretend to have searched sources it did not inspect;
- fabricate placeholder answers; or
- put “AI” buttons on every card.

---

## 13. UX direction: what the product should feel like

### Product character

Tribunus should feel like a calm, professional development operating system or control room: information-rich like Bloomberg Terminal, but substantially friendlier, visually quieter, and learnable without terminal conventions. It should borrow the integration, commandability, persistent context, and high information ROI of professional terminals—not their black-screen density, acronyms, or intimidating interaction style.

The product should also learn from map-led real-estate and GIS tools: a map can be the primary spatial work surface, with project data and evidence in adjacent contextual panels. It should not merely imitate a report layout or a generic SaaS dashboard.

### Stakeholder UX feedback that supersedes the first visual bring-up

The existing prototype was criticized because it felt like reading the outputs of a project report rather than operating a project. Specific missing elements were:

- insufficient user input;
- no prominent, useful project-scoped AI interaction;
- insufficient maps and spatial exploration;
- weak visibility into the project's actual details and editable assumptions;
- pages that showed outputs without letting users understand or change the inputs behind them; and
- low-ROI portfolio cards consuming space.

The desired direction is an interactive workspace where reports are generated artifacts, not the entire interface.

### Proposed high-level shell after that feedback

This is strong stakeholder direction but not yet a locked screen specification:

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ Workspace / project switcher   Global search / command   Alerts  Account │
├──────────────┬──────────────────────────────────┬────────────────────────┤
│ Portfolio /  │ Interactive work surface         │ Project model, evidence│
│ project nav  │ Map, selection, comparison,      │ and contextual copilot │
│              │ scenario, review visualization   │                        │
├──────────────┴──────────────────────────────────┴────────────────────────┤
│ Persistent project command composer / current task / run state           │
└──────────────────────────────────────────────────────────────────────────┘
```

A possible project mode structure identified in research is:

- **Explore** — parcel, policy, applications, precedents, spatial constraints.
- **Model** — editable site and proposal facts, documents, conflicts, provenance.
- **Review** — saved Development Review output and evidence.
- **Track** — findings, assignments, Watch, consultants, and City comments.

This mode structure has not formally replaced the locked features or existing route list. It is a way to integrate them into fewer, more active work surfaces.

### Map behavior expected from stakeholder feedback

A useful map-led workspace may support:

- click/select a parcel;
- draw or identify a site assembly;
- inspect zoning, plans, DPAs, overlays, constraints, transit, and infrastructure layers;
- see nearby applications and precedents;
- filter and compare records;
- pin selected comparables;
- measure distance or area;
- connect map selections to evidence and project facts;
- show layer/source dates and freshness; and
- show affected areas when an alert or policy change is selected.

The original UX document treated the baseline map as compact and secondary to a table. Later stakeholder feedback explicitly calls for maps to have a much stronger role. This is a known UX tension still requiring a final integrated design decision.

### Editable project model

The project model should be visible and editable rather than buried inside a report. Fields should carry provenance such as:

- User-provided;
- Municipal source;
- Extracted from document;
- Calculated; or
- Tribunus assessment.

States should include confirmed, unconfirmed, conflicting, dirty/changed, and stale. If a confirmed input changes, the interface should explain which review outputs may now be stale and offer a clear refresh path.

### Portfolio design direction

Every persistent portfolio element should help the user choose, understand, act, inspect evidence, or move a project forward.

Later stakeholder feedback specifically says:

- “Needs attention” belongs as a filter, sort, or compact row indicator, not a large summary card.
- “Material inputs” belong inside the selected project's model/workspace, not as portfolio real estate.
- Prefer a high-ROI project list or list/map split.
- Project rows should expose useful comparison fields such as project/location, stage, proposal summary, next action, last material change, owner, review freshness, and compact attention state.
- Selecting a project can reveal a contextual preview rather than forcing a full navigation immediately.
- Cross-project exposure belongs in a focused secondary view when it genuinely changes a portfolio decision.

### Review as an artifact

The Development Review remains a primary locked action, but the result should be understood as a saved, citable snapshot of the live project model at a point in time. It is not necessarily the default project home. The user should be able to return from a conclusion to the input, parcel, document, source, formula, precedent, or finding that produced it.

### Original proposed navigation

The existing UX document proposed:

- Global: Portfolio, Watch, Intelligence, recent projects, Internal Operations, Settings.
- Project: Overview, Review, Findings, Data, Precedents, Workflow, Watch.
- Project header: Ask This Project, Export, Run/View Review.
- Evidence and object details: right-side drawers.

This is implemented in the current prototype. It remains useful as feature coverage, but it should not be assumed to be the final product architecture after the report-like UX criticism.

---

## 14. Detailed UI interaction principles from the UX research

These are **PROPOSED** interaction guidelines, not additional locked features.

### General hierarchy

For any selected project or object, prioritize:

1. What needs attention?
2. What should the user do next?
3. Why does it matter?
4. What evidence supports it?
5. What deeper detail is available?

### Actions

- Prefer one dominant action per view.
- Keep common actions in stable locations.
- Use drawers to inspect or edit one object without losing context.
- Use modals for short confirmations or one small decision.
- Use full pages/work surfaces for multi-step creation or complex analysis.
- Confirm destructive or state-invalidating actions, not harmless filter changes.
- Do not scatter “Coming soon” cards; reveal a coherent placeholder or hide it behind a feature flag.

### Evidence

- Put a source control beside the claim, not only in report footnotes.
- Evidence detail should show authority, document, section/page, publication/effective/checked dates, relevant excerpt in context, contradictions, and full-document access.
- Status must never depend on color alone.

### Documents and profile

- Group profile facts by how developers read a proposal: site, program, density/floor area, envelope, access/parking/loading, tenure/stage, and departures.
- Show conflicts directly under affected fields.
- Support bulk profile confirmation after review.
- Documents have explicit current/superseded versions.
- Specific processing states: Uploaded → Extracting → Ready → Needs attention.
- A failed extraction does not mean the original file is lost.

### Development Review

Customer-facing states:

| Internal state | Customer label | Typical action |
| --- | --- | --- |
| Needs input | Profile needs confirmation | Review profile |
| Running | Development Review in progress | View progress |
| Pending internal review | Analysis under Tribunus review | Wait for notification |
| Ready | Review ready | View review |
| Stale | Review may be out of date | Refresh review |
| Failed | Review needs attention | Retry or contact support |

A summary should lead with material risks, opportunities, missing information, likely pathway, fee exposure, and next actions. It should not lead with a giant risk score, approval probability, or essay.

### Findings

- Default sorting: open high-severity items, then due date.
- Keep severity and confidence separate.
- Owner and due date may be edited inline.
- Resolution requires a note or evidence.
- Show relationships between assumptions, risks, documents, calculations, and review sections instead of duplicating records.

### Precedents

- Default to ranked relevant projects rather than an empty search screen.
- Show “why comparable” and “important differences” together.
- Any numeric match score must be deterministic and explainable; otherwise use qualitative labels.
- Support a small structured side-by-side comparison.
- Preserve the decision chronology and source for each event.
- A past discretionary departure is precedent, not permission for the current project.

### Watch

- Alerts explain change → affected project/assumption → impact → action → source.
- Group one common change across affected projects instead of duplicating alerts.
- “Mark read” is secondary to reviewing and resolving impact.
- Default to a weekly digest plus urgent material changes.

### Internal analyst console

- Clearly label it **Tribunus Operations** and visually separate it from customer workspaces.
- Queue by customer impact/SLA and age.
- Flag unsupported findings, contradictory/stale sources, extraction conflicts, and failed calculations.
- Use a three-pane verification pattern: outline, candidate output, evidence/source.
- Require blocking issues to be resolved or explicitly waived with a note before customer approval.

### Responsive and accessibility direction

- Desktop-first authoring and analysis, optimized around 1280–1600 px.
- Tablet support for review and light updates.
- Narrow layouts should support alerts, findings, and report access without implying a full mobile app.
- Target WCAG 2.2 AA.
- Full keyboard access for core workflows.
- Visible focus, semantic forms/tables/headings, sufficient contrast, non-drag alternatives, usable zoom/text resizing, and 40–44 px common action targets.

---

## 15. Brand and visual direction

### Desired character

- Clean and minimal, but not empty.
- Institutional, precise, and credible.
- Calm enough for long professional work sessions.
- Information-rich without looking like a report dump.
- Modern and clearly AI-enabled through behavior, not AI decorations.
- “Professional intelligence platform” rather than “generic SaaS dashboard.”
- Inspiration may come from OpenAI, Anthropic, Bloomberg Terminal, Aladdin, Stripe documentation, Turo's restrained use of color, and map-led property/GIS tools. Tribunus should not copy their marks or screens.

### Proposed product design system in documentation

The written UX/stack proposal uses a warm editorial system:

- Canvas `#faf9f5`
- Soft surface `#f5f0e8`
- Card surface `#efe9de`
- Ink `#141413`
- Body `#3d3d3a`
- Muted `#6c6a64`
- Restrained coral accent `#cc785c`
- Newsreader for selected editorial headings
- Inter for UI/body
- JetBrains Mono for formulas, identifiers, and aligned data

The proposed rule is one restrained accent action per viewport, sparse cards, hairline borders, quiet status tints, and clear tables.

### Current prototype visual system

The current `main/` prototype instead uses:

- white canvas and surfaces;
- near-black primary actions;
- restrained violet `#593cfb` for focus/evidence links;
- system/Inter-like UI typography;
- fixed global and project rails;
- compact tables, quiet dots/status labels, drawers, and modals.

This is descriptive, not an approval that the current prototype styling is final.

### Current public website visual system

The public site currently uses a light blue/violet institutional technology aesthetic with animated background/demo elements. Its active copy is more aligned to the locked product than some archived components. Legacy files in the website repository still contain older broad “permitting AI co-pilot,” building-code, and speed-claim language but are not necessarily rendered. Active-page usage must be checked before treating any website file as current messaging.

### Voice and language

Voice should be calm, precise, candid, and professional—like a senior analyst who separates fact from judgment.

Prefer:

- Development Review ready
- Tribunus assessment
- Likely pathway; material risks; evidence confidence
- Source checked Aug 8, 2026
- View source
- See calculation
- Requires confirmation

Avoid:

- AI analysis complete
- Our AI thinks
- guaranteed approval
- 92% approval probability
- generic “Something went wrong”
- generic “No data”
- vague “Learn more”
- unsupported “faster approvals” claims

---

## 16. Municipal and development domain context

This is background knowledge for designing and interpreting the product. It is not legal or planning advice.

### Authority layers

1. **Province of British Columbia:** enabling legislation and province-wide housing requirements. The Local Government Act governs most municipalities; Vancouver operates under the Vancouver Charter.
2. **Metro Vancouver and regional bodies:** regional growth, utilities, sewer/water systems, and regional development cost charges.
3. **Municipality:** Official Community Plans, neighbourhood/area plans, zoning, Development Permit Areas, policies, applications, fees, staff review, council decisions, and permit requirements.

Terminology differs by jurisdiction. Vancouver commonly uses Development Cost Levies (DCLs), while other B.C. municipalities commonly use Development Cost Charges (DCCs). CACs, ACCs, density bonuses, regional charges, utilities, and application fees have different legal and certainty characteristics.

### Approval pathway ladder

From least to more discretionary, a project may involve:

- by-right development;
- development permit;
- development variance permit;
- rezoning;
- Official Community Plan amendment; and
- subdivision.

A common high-level sequence is:

```text
Rezoning / OCP amendment, if needed
  → Development Permit
  → Building Permit
  → Construction / occupancy
```

Exact stages, decision-makers, referrals, hearings, and consultant requirements vary by municipality and proposal. Coquitlam may involve pre-application review, Development Review Team and advisory processes. Vancouver has CD-1 rezonings, Vancouver-specific policy/bylaw context, and Urban Design Panel processes where applicable.

### Core planning and development metrics

- FSR/FAR: floor space ratio / floor area ratio.
- Gross floor area versus net/saleable/leasable area.
- Height and storeys.
- Density and units.
- Site coverage.
- Front, rear, and side setbacks.
- Parking and loading.
- Tenure: rental, strata/condominium, mixed, affordable components, etc.
- Existing versus proposed use.
- Requested variances or policy departures.

The product must not conflate a proposal with what the rules allow. It must compare them.

### Common studies and external dependencies

- civil/servicing;
- geotechnical;
- environmental and contaminated-site review;
- arborist/tree retention;
- riparian/environmental protection review;
- transportation and access;
- landscape;
- utility capacity and agency referrals; and
- other municipality/project-specific studies.

### Developer economics

A simplified residual-land-value relationship is:

```text
Residual land value = Gross development value
                    − hard and soft costs
                    − financing and carrying costs
                    − fees/contributions
                    − required profit/return
```

A small change in density, time, fees, sale price, construction cost, or financing can materially change land value and project viability. Tribunus is not necessarily the pro forma, but it needs to surface assumptions that feed the pro forma and explain their possible exposure.

### Why precedent matters

Written policy does not completely explain discretionary outcomes. Comparable applications can reveal:

- which concerns staff raised;
- which revisions changed the recommendation;
- what council debated;
- what concessions or conditions were required;
- whether a departure was accepted; and
- how long each stage took.

Precedent reduces uncertainty but cannot guarantee that a different project will receive the same treatment.

---

## 17. Raw developer interview insights

The July 2026 Kevin interview is **RAW INPUT**, not approved scope.

### Workflow validation

For a new municipality, the interviewee described checking:

1. zoning bylaw and OCP;
2. special housing initiatives and neighbourhood plans;
3. municipal GIS layers, including capital projects, creeks, environmental areas, and topography;
4. a call to municipal staff; and
5. paid pre-application meetings.

This validates the baseline ordering and the importance of municipal context, but the specific sequence varies by municipality and user.

### Suggested data/risk additions not approved in the locked list

- B.C. contaminated-sites history and Phase One environmental risk.
- Seismic/geotechnical soil zones and foundation-cost exposure.
- OCP → regional servicing/transit cascade as a long-range growth signal.
- Development/application volume as a more defensible municipal signal than a simplistic “approval speed” score.
- DCC credit nuance for rezoned but unbuilt land.
- Planning-department freezes caused by major mandated bylaw updates.
- Stronger freshness indicators.
- Explicit confidence/coverage limits on council-minutes analysis.

These can inform existing baseline, fee, Watch, or growth features if formally accepted, but they do not independently expand the current locked scope.

### User-fit signal

The interviewee described veteran developers as unlikely to replace their own judgment with the tool. Potential value for them is a staff-work checkpoint, second opinion, and monitoring layer. Newer or expanding developers may depend more heavily on the research/baseline workflow. This is important validation input but not a final segment decision.

---

## 18. Proposed technical architecture

This section is **PROPOSED**, based on [`main_docs/tech_stack.md`](main_docs/tech_stack.md) and [`main_docs/ai_architecture.md`](main_docs/ai_architecture.md).

### Recommended stack

- TypeScript end-to-end.
- Next.js App Router and React for the web application.
- Tailwind CSS and shadcn-style primitives for UI.
- Route handlers/server actions or a typed API boundary.
- Supabase/PostgreSQL for database, Auth, private Storage, `pgvector`, and row-level security.
- Drizzle for schema and migrations.
- Inngest for durable, retryable background workflows.
- Anthropic models behind a centralized AI gateway in the current proposal.
- Resend for transactional email.
- Sentry, structured logs, and LLM tracing/usage metadata.
- Vitest and Playwright.
- pnpm, potentially Turborepo if the codebase becomes a monorepo.
- GitHub Actions and CODEOWNERS.
- Vercel deployment.
- Stripe later if/when billing is approved.

### Architectural shape

- Modular monolith first.
- Vertical feature slices with clear ownership.
- Shared contracts and domain entities.
- Explicit feature registration rather than hidden cross-feature imports.
- Append-only migrations.
- Durable background jobs for extraction, ingestion, review, and export.
- Multi-tenant isolation and indexes designed from the beginning.
- Central model IDs, prompt/version metadata, structured outputs, and verification.

### Retrieval and corpora

- Separate municipal/public sources from private workspace documents.
- Preserve original files as truth.
- Build derived text/index/vector representations incrementally.
- Tag sources with jurisdiction, source type, authority, effective date, and current/superseded status.
- Use hybrid semantic and exact/keyword search.
- Open and cite source passages before material output is approved.

### Known architecture/product tension

The AI architecture document says not to build an automated live GIS engine in the early version, while locked F6 includes parcel context, constraints, and zoning map aggregation. The likely pilot interpretation may involve limited/manual/static municipal layers, but that implementation choice has not been formally resolved in the scope file.

---

## 19. Current application implementation

The working application is in [`main/`](main/). It is a **CURRENT IMPLEMENTATION** snapshot, not a production system.

### Current technology

- Next.js 16.3.0
- React / React DOM 19.2.8
- TypeScript 5.9
- Tailwind CSS 4.3.3
- Lucide icons 1.31.0
- pnpm 10.19

### Current routes

- `/portfolio` — portfolio home and cross-project exposure
- `/watch` — portfolio Watch feed
- `/intelligence` — precedents, council intelligence, and Growth preview
- `/projects/marigold` — project overview
- `/projects/marigold/review` — Development Review
- `/projects/marigold/findings` — assumptions and risks
- `/projects/marigold/data` — profile and documents
- `/projects/marigold/precedents` — comparable projects and decision trace
- `/projects/marigold/workflow` — consultants, City comments, and feasibility
- `/projects/marigold/watch` — project-specific monitoring
- `/operations` — internal analyst review queue
- `/settings` — workspace administration
- `/create` — new-project flow
- `/signin` — sign-in experience

### What is implemented

- Navigable front-end shell.
- Global and project navigation.
- Realistic mock projects, documents, findings, fees, precedents, alerts, consultants, and City comments.
- Table, filter, drawer, modal, status, source, export, and project-chat preview interactions.
- Explicit Preview labels for placeholder behavior.
- Responsive styling and a coherent visual baseline.

### What is not connected

- Production authentication and permissions.
- Persistent database storage.
- Secure production document storage.
- Document extraction/version processing.
- Municipal ingestion/adapters.
- Real GIS/map data.
- Real Development Review workflows.
- Deterministic production calculators.
- Real evidence/citation verification.
- Human analyst operations backend.
- Reports/export generation.
- Notifications and Watch jobs.
- Production project assistant.
- Billing.

### Important usability limitation

The current prototype faithfully covers many feature destinations, but stakeholder review found that its overall experience reads too much like static reports. It does not yet provide the desired central map, continuously editable project model, or sufficiently prominent command/conversation workflow. A future chat must not mistake “route exists with mock data” for “feature or UX is complete.”

---

## 20. Public website and company presentation

The current public website repository is located separately at:

```text
/Users/usmanzia/Desktop/Context Blocks/Tribunus Labs/Website/QuincyAI_Landing2
```

### Active public message

- Tribunus helps professional real-estate development teams see approval risk before it becomes delay, rework, or unexpected cost.
- It turns project files, municipal rules, fees, precedents, and past decisions into Development Reviews backed by source evidence.
- Current pilot coverage is Vancouver and Coquitlam.
- Active product outcomes shown on the site:
  - Verified Site Baseline
  - Development Review
  - Fees & Contributions
  - Precedent & Project Watch
- Current conversion action: Request Access / early-access form.

### Public team listing as of the snapshot

- **Samuel J. Howard — CEO:** Third-generation real-estate developer in British Columbia; CPA candidate.
- **M. Usman Zia — Chief Product Officer:** AMD-trained AI engineer leading product and AI workflow design; CFA candidate.
- **Gurinder Garcha — Chief Technology Officer:** AMD-trained staff engineer leading technical architecture and platform implementation.

### Website maintenance caution

The site repository contains active, archived, stale, and legacy files. Some old components still refer to the prior PermitAI concept, broad building-code compliance, permitting co-pilot language, draft forms, and aggressive speed claims. These should not be treated as current product truth unless they are imported into an active page. The active site README and rendered page composition are more reliable for current messaging.

---

## 21. Business model and go-to-market hypotheses

Everything in this section is a hypothesis pending paid validation.

### Wedge framing

The most consistent strategic framing is **entitlement/development approval risk intelligence**:

> Will this proposal work under the current municipal context, what could kill or delay it, what may it cost, what happened to comparable projects, and what should the team do next?

Acquisition and feasibility are useful onramps but crowded categories. Consultant and City-comment workflow is a natural later/deeper expansion, although F17 and F18 remain locked in the current MVP.

### Pricing hypothesis from prior research

- C$2,500–C$5,000 for an initial project audit.
- C$500–C$1,000 per active project per month for monitoring/re-verification.
- Larger firm contracts may eventually reach C$25,000–C$100,000+ annual value as portfolio and consultant workflows deepen.

No pricing has been validated or approved merely because it appears in research.

### Pilot proof required

The market thesis recommends testing with approximately 10 real Metro Vancouver projects across at least five firms and looking for:

- at least three paying firms;
- material stale, incorrect, or unsupported assumptions in at least three projects;
- findings that change at least two real acquisition, design, pro forma, or submission decisions;
- at least two firms requesting ongoing monitoring;
- at least 90% expert-rated correctness on material factual findings with original-source citations;
- permissioned City comments, consultant files, or revision histories; and
- the ability to add another municipality without rebuilding everything.

These are proposed validation thresholds, not locked engineering features.

### Real incumbent and channel

The practical incumbent is not only software. It is the trusted human planning consultant, municipal expert, development manager, lawyer, engineer, and internal spreadsheet workflow. Tribunus may augment these professionals, become a verification layer, or use them as a channel. It should not assume customers want to replace them.

---

## 22. Competitive context

The July 2026 research names several relevant or adjacent companies. Their status and traction claims are timestamped and should be re-verified before external use.

- **PermitPortal:** conceptually close around site selection, entitlements, jurisdiction behavior, and monitoring. Tribunus should avoid becoming only a Canadian copy.
- **Spark:** regulatory intelligence for energy development; validates the broader document/regulatory intelligence pattern.
- **LandLogic:** Canadian zoning/municipal information breadth. Tribunus differentiation must be deeper than a zoning report.
- **AEDI:** low-cost source-backed feasibility/municipal information. Tribunus aims to be decision-grade and enterprise-oriented.
- **Archistar:** zoning/pre-check and drawing-compliance direction. Tribunus should focus on discretionary approval decisions, assumptions, private workflow data, and evidence.
- **PermitFlow:** downstream permit operations and compliance. Tribunus should own the decision and verification layer before/during approval rather than generic submission administration.
- **Zoneomics, Bassett, GreenLite, and other zoning/permitting products:** adjacent alternatives cited in market research.
- **Human consultants and internal teams:** the most important incumbent behaviorally.

### Proposed differentiation

- Verified, time-versioned assumptions rather than one-off parcel reports.
- Connection between private project files and public municipal evidence.
- Decision traces showing how comparable projects changed and were decided.
- Project-specific Watch that explains impact, not a generic feed.
- Persistent findings, ownership, and resolution.
- Human-verified pilot output.
- Municipality-specific depth.
- Portfolio learning and private project history over time.

The base model alone is not the moat. The proposed moat is the accumulated combination of private permissioned project data, municipal history, verified workflows, outcome knowledge, and distribution with developers/consultants.

---

## 23. Deferred features

The following are explicitly **DEFERRED** unless the locked feature file is formally changed:

1. **Change Detection & Refresh Analysis** as a distinct full feature. F13 still includes locked monitoring/alerts; the deferred item is the broader dedicated refresh/run-comparison capability.
2. **Cross-Document Consistency Checking** as a separate feature.
3. **Municipality Comparison.** A two-city pilot is not enough for a mature comparative product.
4. **Full Municipal Source Registry & Versioning.** F9 still requires source versions/change handling, but manual pilot curation is acceptable; the full productized registry is deferred.
5. **Structured Municipal Knowledge Base / Knowledge Graph** as a standalone system.
6. **Feedback & Outcome Capture** as a formal learning loop.
7. **Full Security & Audit Logs Console.** Baseline security remains mandatory.
8. **Client Standards Absorption.** Future firm-specific standards could become cited project inputs.
9. **Feature-Run Engine with many analysis buttons.** The MVP should use one coherent Run Development Review action.
10. **Approval Sequence & Governance Map** as a separate visualization/product. F10 still includes the locked approval pathway.
11. **Competition alerts / nearby competition monitoring** as a distinct alerting product.

Deferred placement described in the UX research is only future-safe information architecture; it is not authorization to expose active controls now.

---

## 24. Open questions and known tensions

These should be carried into future work rather than silently answered.

### 1. Economic depth

Should Tribunus:

- remain outside feasibility economics;
- show a thin bridge such as impact per buildable square foot and exportable assumptions; or
- eventually offer fuller development feasibility?

F19 locks a lightweight feasibility check, but the broader boundary remains open.

### 2. Initial customer segment

Large professional developers, small-to-mid-sized lean teams, newer/expanding developers, and veteran firms using Tribunus as a checkpoint are all supported by different evidence. The first paid segment and onboarding narrative are not fully settled.

### 3. F17/F18 timing

One strategy recommendation proposed deferring Consultant Dependencies and City Comment Management to protect the entitlement-risk wedge. That recommendation was never approved. F17 and F18 remain fully locked.

### 4. Outcome learning loop

Several strategy documents call feedback/outcome capture important to the moat. It remains deferred and is not currently a locked feature.

### 5. Map centrality

The original UX proposal made maps compact/secondary in many flows. Later stakeholder feedback wants a central map-led work surface. The final balance between map, editable model, AI composer, and saved review is unresolved.

### 6. Navigation architecture

The current implementation has multiple report-like project pages. Later feedback suggests integrated modes such as Explore, Model, Review, and Track. No formal replacement IA has been locked.

### 7. Automation level for the pilot

The locked scope describes broad capabilities, while architecture and sprint documents recommend a concierge-grade pilot with manual municipal curation and analyst review. The UI must present real states honestly; it must not fake full automation.

### 8. GIS implementation

F6 requires parcel context and zoning map aggregation, while the early architecture cautions against building a full live GIS engine. A limited, staged, or manually supported implementation needs definition.

### 9. Council intelligence reliability

Council reports/minutes can have incomplete coverage or hard-to-parse context. Coverage date, source limitations, confidence, and analyst review are required; “voting behavior” must not become personality scoring or unsupported prediction.

### 10. Timeline prediction

Historical timelines are useful but highly contextual. Kevin's interview argues that municipal “speed” scores can be misleading. The product should expose samples, stages, context, and uncertainty instead of false precision.

### 11. Additional acquisition-risk data

Contaminated-sites history, environmental risk, seismic/geotechnical zones, utilities, access, and floodplain conditions are strong raw inputs. Their exact coverage inside F6 or later features has not been formally specified.

---

## 25. Success criteria and product analytics proposed in UX research

The product should measure decision quality and trust, not the amount of generated text.

### Activation

- Time from sign-in to project creation.
- Create-flow drop-off by step.
- Time to first confirmed project profile.
- Time to first customer-ready Development Review.
- Percentage of reviews where the user inspects at least one material citation.

### Value and trust

- Reviews that surface a finding marked actionable or worth discussion.
- Citation-open rate for high-severity findings.
- Findings assigned, resolved, or exported.
- Corrections made to extracted project facts.
- Reviews shared or exported internally.

### Retention

- Projects with Watch enabled.
- Material alerts opened and converted into findings/actions.
- Returns after a municipal source or project-file change.
- Time from alert to acknowledged impact.

Avoid optimizing for chat message count, AI text volume, card views, or meaningless reruns.

---

## 26. Practical usability tests

A professional user should be able to answer the following without training:

1. What are this project's three most important risks?
2. Which assumption creates the greatest exposure?
3. What is the project actually proposing, and which values are unconfirmed?
4. Where did the setback, density, fee, or policy requirement come from?
5. What is calculated versus assessed?
6. What should the team do next, and who owns it?
7. Which precedent is most useful, and what important difference limits the comparison?
8. What changed since the last verified review?
9. Which projects in the portfolio need action today?
10. Can the user ask a project question, inspect the cited answer, and move directly to the relevant map/model/finding?

If those answers are not obvious, visual polish alone is not success.

---

## 27. Glossary

- **ACC:** Amenity Cost Charge, a B.C. municipal growth-related charge with jurisdiction-specific applicability.
- **Assumption:** A belief or value that project work relies on and that may need verification.
- **Baseline:** The dated, cited view of rules, plans, policies, fees, constraints, and requirements applicable to a site.
- **BP:** Building Permit.
- **CAC:** Community Amenity Contribution, often associated with Vancouver rezoning and potentially negotiated/uncertain.
- **Calculated result:** Output from a deterministic formula with visible inputs.
- **Citation:** Link from a claim to an original source location.
- **DCC:** Development Cost Charge.
- **DCL:** Development Cost Levy, terminology commonly used in Vancouver.
- **Development Review:** The coherent Tribunus analysis combining baseline, risks, opportunities, pathway, fees, precedents, missing information, and next actions.
- **DP:** Development Permit.
- **DPA:** Development Permit Area.
- **DVP:** Development Variance Permit.
- **Effective date:** Date a rule, fee, or policy applies; distinct from publication and checked dates.
- **FSR/FAR:** Floor Space Ratio / Floor Area Ratio.
- **Finding:** A persistent project record, including an assumption or risk.
- **GFA:** Gross Floor Area.
- **OCP:** Official Community Plan.
- **Precedent:** A historical development application/decision used for comparison, not a guarantee.
- **Project profile:** Confirmed structured description of the proposed development.
- **Requires confirmation:** Evidence is missing, ambiguous, contradictory, or authority-dependent.
- **Risk:** Identified exposure with severity, confidence, impact, action, ownership, and status.
- **Tribunus assessment:** Evidence-supported interpretation that is not directly stated as fact by a source.
- **Verified fact:** Directly supported by an authoritative source.
- **Watch:** Project-specific monitoring that connects a change to affected assumptions and actions.

---

## 28. Instructions for the next AI chat

When using this file as a handoff:

1. Treat the locked feature list as the only scope authority.
2. Do not remove, add, merge, defer, or reinterpret locked features without explicit authorization.
3. Keep locked features, placeholders, deferred items, proposals, raw research, and current code clearly separated.
4. Do not assume the current front-end layout is the final ideal UX.
5. Carry forward the stakeholder criticism that the product must be an interactive operating workspace—not a sequence of reports.
6. Give maps, editable project inputs, contextual AI, evidence, and actions a meaningful place in future UX work.
7. Keep the Development Review as the central coherent analysis action, not a collection of AI gimmicks.
8. Preserve trust labels, dates, citations, deterministic calculations, contradictions, and human review.
9. Do not make guarantees about approval, timing, fees, or product coverage.
10. Do not use private customer content across tenants or for model training without permission.
11. If documents conflict, surface the conflict rather than choosing silently.
12. If a product or market question is unresolved here, label it open and ask for a decision rather than inventing one.

---

## 29. Repository source map

### Primary product sources

- [`main_docs/locked_feature_list.md`](main_docs/locked_feature_list.md) — locked v2 MVP scope; authoritative.
- [`main_docs/deferred_feature_list.md`](main_docs/deferred_feature_list.md) — deferred capabilities.
- [`main_docs/clarifications.md`](main_docs/clarifications.md) — strategic decisions and unresolved questions; recommendations do not override scope.
- [`main_docs/domain_knowledge.md`](main_docs/domain_knowledge.md) — B.C./Metro Vancouver development and municipal domain model.
- [`main_docs/UX flows.md`](main_docs/UX%20flows.md) — proposed UX flows, placement, interaction, accessibility, visual system, and feature coverage.
- [`main_docs/ai_architecture.md`](main_docs/ai_architecture.md) — proposed AI/retrieval/verification architecture.
- [`main_docs/tech_stack.md`](main_docs/tech_stack.md) — recommended production stack and engineering conventions.
- [`main_docs/startup_viability.md`](main_docs/startup_viability.md) — market validation and risk assessment.
- [`main_docs/feature_consolidation_proposal.md`](main_docs/feature_consolidation_proposal.md) — history of how the 19-feature structure was formed; proposal/status context.

### Product and market research

- [`usman_docs/Tribunus_Product_Thesis_MVP_and_Market_Case.md`](usman_docs/Tribunus_Product_Thesis_MVP_and_Market_Case.md) — product thesis, market case, competitors, pricing hypothesis, and pilot proof.
- [`usman_docs/Final_Feature_List.md`](usman_docs/Final_Feature_List.md) — earlier feature synthesis.
- [`usman_docs/Final_Feature_List_Prioritized.md`](usman_docs/Final_Feature_List_Prioritized.md) — earlier prioritization and plain-language explanations.
- [`usman_docs/additional_info_dump.md`](usman_docs/additional_info_dump.md) — broad historical feature and product notes.
- [`usman_docs/codex_mvp.md`](usman_docs/codex_mvp.md) — concierge-grade sprint/MVP implementation proposal; not current scope authority.
- [`gurinder_docs/Tribunus_Feature_List.md`](gurinder_docs/Tribunus_Feature_List.md) — independent feature research and open decisions.
- [`gurinder_docs/kevin_insights.md`](gurinder_docs/kevin_insights.md) — raw veteran-developer interview insights.

### Current implementation

- [`main/README.md`](main/README.md) — current front-end bring-up, routes, and implementation boundary.
- [`main/`](main/) — mock-data Next.js product prototype.

### Historical / non-authoritative

- [`main_docs/mvp_feature_list_v1_original.md`](main_docs/mvp_feature_list_v1_original.md) — archived pre-consolidation feature list.
- `main_docs/startup_guide.md` and `main_docs/system_prompt.md` — currently empty.

---

## 30. Final compact handoff statement

Tribunus is building a project-first development intelligence and risk-control operating system for professional real-estate developers, beginning with Vancouver and Coquitlam. A user creates a site/project, enters and uploads what the team is proposing, confirms a structured project model, and receives a human-verifiable Development Review covering the current site baseline, material assumptions and risks, fees, likely pathway, comparable municipal decisions, missing information, and next actions. Every material claim needs a source, date, trust type, and clear uncertainty. The team then tracks findings, consultants, and City comments; exports a cited brief; and uses Project Watch to understand changes that affect project assumptions.

The locked MVP contains 19 full features and 6 visible placeholders. The existing application is only a mock-data front-end bring-up. Its feature coverage is useful, but stakeholder review says the next UX direction must feel much more like an interactive, map-aware, editable, AI-assisted professional workspace and much less like reading a set of reports. The startup's central bet is that reliable, time-versioned, project-specific evidence and workflows can reduce the cost of bad assumptions and avoidable approval rework. The product still needs paid-pilot proof, customer-segment clarity, and validation that users trust it enough to change real decisions.
