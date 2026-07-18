# Tribunus Feature List

A consolidated list of features to be implemented for Tribunus.

**Version:** 1.0  **Date:** July 2026  **Status:** Working draft for team review

---

## How to read this list

Priority is a first pass, not a final call:

- **P1** Core to the first paid pilot (the assumption audit plus watch wedge).
- **P2** Fast follow, strengthens the wedge or retention.
- **P3** Later phase, expansion or deeper workflow.

---

## 1. Platform and foundation

- **Company, users, and permissions · P1.** Secure organization accounts, role-based access, and project teams. Needed because the workflow spans a developer, analysts, and eventually consultants, each seeing different parts.
- **Project workspace · P1.** Create a project by address or drawn parcel, storing stage, asset type, assumptions, and status. This is the project-first "Google folder" model, where everything for a site lives in one place.
- **File intake and versioning · P1.** Upload PDFs, spreadsheets, correspondence, and drawings, preserving versions and an audit history. Supports the "upload whatever exists" onboarding and the later revision loop.
- **Security and admin controls · P1.** Encryption, logging, data retention, source management, user support, and pilot analytics.

## 2. Municipal data core

The always-current layer the developer cared about most.

- **Vancouver municipal source registry · P1.** Maintain authoritative zoning, plans, policies, fees, GIS, application, council, and permit sources. The backbone that makes everything else trustworthy.
- **Time-versioned rules and fees · P1.** Store current and historical requirements with effective dates and source links. Directly answers the strongest, most repeated ask: an always-updated DCC, DCL, and CAC feed that becomes the developer's "quick source" so he never has to hunt Metro Vancouver fee tables, plus knowing when a change takes effect.
- **Deterministic calculators · P1.** Calculate applicable fees and ratios (FSR, density, unit counts, dedications) using approved formulas, never free-form model math. Matches the "it is just a calculation on my area" point and protects against the FSR or fee surprises that flip a project upside down.
- **Zoning map aggregation · P2.** All the municipalities a user works in, in one place, quickly accessible. Flagged as immediately useful: developers currently keep many municipalities open on one screen and have to learn each city's separate map.

## 3. Project setup and verification

- **Project profile extraction · P1.** Extract height, density, units, tenure, parking, setbacks, floor area, uses, and requested departures, then ask the user to confirm the key facts. This is the ingestion and review-gate flow.
- **Verified Project Baseline · P1.** A single view of current zoning, plans, policies, fees, approval path, site constraints, and effective dates for the site.
- **Assumption Ledger · P1.** Every material assumption, where it came from, when it was last checked, and what happens if it is wrong, with confidence and financial or process exposure. Formalizes the "double-check that nothing has changed" habit.
- **Verification and citations · P1.** Original-source citations, confidence labels, contradictory-evidence checks, and a human-review queue. Aligns with the explicit preference for fact over generative summary, and for stated opinion only when clearly labeled.
- **Client standards absorption · P3.** Pre-load a firm's own historical numbers and standards (their own dollar-per-square-foot from past projects) so their data is ready to drop in without repeated conversations. Suggested as a way to make it fit veterans.

## 4. Analysis features (feature-run engine)

- **Feature-run engine · P1.** One-click analyses: Baseline Review, Fee Verification, Precedent Review, Amendment Risk, and Application Readiness. Each is a predictable job with inputs, verification, and a saved result.
- **Automatic Assumption Audit / Development Readiness Review · P1.** The first output generated automatically on project creation: baseline, risks, precedents, and actions, so value arrives before the user learns any features.

## 5. Precedent and council intelligence

- **Precedent search and decision trace · P1.** Find comparable applications and reconstruct the original proposal, staff concerns, revisions, council discussion, conditions, timeline, and outcome. Covers council-report and staff-report analysis.
- **Gray-area / discretionary departure precedent · P2.** Surface where a specific council member or the municipality has actually allowed a departure from zoning, for example a 2.5 metre setback where 3 is required, within the NCP or even a 500 metre radius. Called out as high value because it saves design time and yields more sellable square footage. The sharpest extension of the council-voting feature.
- **Live council meeting summarization · P2.** Extract the gist of a specific council item from live meeting records and turn it into a short comment, plus a summary of what council actually debated and emphasized versus what the written OCP or NCP says. Described as "a fantastic tool" because it saves sitting through 3-hour meetings or waiting 5 months for an item to reach council.
- **Council voting behaviour profile · P2.** Per-member read of how each council member has voted on comparable projects and the themes they tend to back or resist, each point cited to a specific meeting.

## 6. Consultant coordination

The developer's "real pain" once research is handled. Scoping of this section is an open team question (see Open decisions).

- **Consultant requirement and dependency checklist · P2/P3.** Per-discipline checks (mechanical, electrical, sanitary, storm, water, landscape, geotechnical) plus utilities (BC Hydro, Telus, Shaw, Fortis gas), confirming each package was reviewed and is "in." The biggest cost and delay example given was a $100k hit from pipes placed wrong that nobody double-checked across drawings.
- **Approval sequence and governance map · P2/P3.** Show the required order of approvals (city first, then BC Hydro, then utilities) and who governs each decision, so the user understands dependencies and the lag they add.

## 7. Monitoring and retention

What keeps veteran users engaged across multi-year project cycles.

- **Project Watch · P1.** Project-specific alerts for policy, fee, infrastructure, and nearby-development changes, with stated impact rather than generic news. Filtered to relevance so the user does not have to scour everything. This is the "watchdog" and weekly news idea.
- **Change and upgrade alerts · P1.** Any upgrade or change brought forward by City Hall departments or higher levels of government: fee changes, tax or political changes (GST, rebates), and regional, provincial, or federal regulation changes affecting the property (example: a setback increased from a creek due to a protected species). Named as the single MVP pick: make the constant bombardment of information simple and all in one place.
- **Issue backlog log · P2.** Keep a running log of past issues tied to the project so they resurface later ("do not forget we had this issue tying into this thing").
- **Competition alerts · P2.** Notify when someone files a similar product type nearby, or a large nearby development is coming (example: 500 condo units two blocks away completing just after yours), filterable by the municipalities and product types the user works in. Partly overlaps Project Watch but was treated as its own retention hook.
- **Competitor extras analysis · P3.** What competitors in the area are offering (second fridge, air conditioning, wood-floor upgrades, basement suite), so the user knows the minimum competitive standard without paying for full marketing research.

## 8. Market and site intelligence

- **Growth forecasting · P3.** Surface the GVRD growth strategy, municipal OCPs, and transit plans (SkyTrain, bus routes) to show where growth is heading, so the user can get into an area first before land prices climb.
- **Neighborhood context and site signals · P3.** Ideally visual: transit, buses, malls, and amenities, so the user can quickly judge whether a site is too far out (the "no mall within a 15-minute drive" test). Also keeps less experienced users out of bad, too-far-out deals.
- **Local sales comps and feasibility check · P3.** Land and product sales in the area with dollar-per-square-foot and the timeframe of sales, plus average cost per unit by product type (condo, townhouse, single family), as a quick "does this pencil" check (build at $600, sell at $1,100, does it make sense here).

## 9. Cost intelligence (construction phase)

- **Construction cost benchmarking · P3.** Cost per square foot by building type across municipalities and provinces (ConCost was referenced), plus component costs (concrete, wood, fixtures), as a quick check that tender numbers are in range. Bidder counts were noted to have jumped from 2 to 3 up to 13 to 14, so prices move and this stays useful during construction.
- **Building permit fee estimation · P3.** Estimate permit fees from cost per square foot, since municipalities charge on that basis, so the user can plug the city's number into a pro forma and avoid surprises (city saying $300 when you assumed $200).

## 10. Outputs and collaboration

- **Risk and Action Register · P1.** Convert findings into persistent issues with owners, due dates, status, and resolution evidence. Covers assign, track, and resolve needs.
- **Exports and reporting · P1.** Shareable decision brief, issue register, and source appendix for internal and consultant review.
- **Project-aware Q&A / Ask This Project · P2.** Source-cited chat over verified project context, completed analyses, and documents. Explicitly not a blank chatbot.

---

## Product principles and constraints

Not features, but hard product requirements. Carry these across every feature above.

- **Simplicity and stability.** Must be dead simple and intuitive for a non-technical user, and must not gratuitously change settings or layouts. The developer will not invest time learning a clunky tool and wants stability over novelty.
- **Sectioned, role-based views.** Break the product into clearly delineated sections (zoning, dollar per square foot, sales, finance) so each role focuses on their part and skips the rest. The developer cares about design and code compliance, only marginally about the pro forma.

## Explicitly deferred (out of V1)

- **No permit submission, building-code certification, construction management, or universal approval-probability score in V1.** Crowded, liability-heavy, or distracting from the first paid decision workflow.
- **Vendor marketplace and advertising, opt-out only if ever built.** Zero tolerance for unsolicited spam was expressed, so any such feature would need a hard off switch. Keep it far future and permissioned.

---

## Open decisions for the team

1. **Consultant coordination scope.** The coordination checklist and approval-sequence map could sit in a later phase, but coordination may be the primary time sink once research is solved. Decide whether it is core to the wedge or a fast follow.
2. **Who the wedge is for.** The audit and baseline features land newer or expanding firms, while the monitoring, competition, and cost-intelligence features are what retain veterans. Tag each feature by which audience it serves so the MVP pulls in both a first user and a paying, sticky user.
