# TRIBUNUS — Product Thesis, MVP and Market Case

*A concise, evidence-backed working document for developer pilots and partners*

## Executive conclusion

Tribunus should be pursued as a developer-side risk-control product — not another permit portal or zoning chatbot. The first product should verify the assumptions that determine whether a project works, identify what can damage yield, cost or schedule, and continuously monitor material changes. Metro Vancouver is the launch market; North American expansion and deeper project workflows are required for a $100M company.

| THE CUSTOMER | THE WEDGE | THE MOAT |
| --- | --- | --- |
| Small-to-mid-sized developers with lean teams and multiple active sites. | Pre-acquisition / pre-application assumption audit plus project watch. | Private project data, municipal history, verified workflows and developer distribution — not the base AI model. |

---

## 1. Pain Point

*Real-estate development is a chain of expensive decisions made before certainty exists.*

**First principles:** A developer buys or controls land, forms a concept, hires consultants, seeks planning approvals, obtains a building permit, constructs, and finally sells or operates the asset. Each downstream step depends on assumptions made earlier. If zoning, fees, servicing, dedications, policy interpretation or consultant inputs are wrong, the error propagates into the design, pro forma and approval schedule.

**Site / land → Feasibility → Concept + consultants → Rezoning / DP → Building permit → Construction → Sales / operations**

**The information is fragmented:** zoning and Official/Neighbourhood Plans, DCC/DCL/CAC schedules, GIS layers, staff reports, council minutes, application histories, City comments, consultant drawings and internal spreadsheets. Experienced developers compensate with local knowledge and manual double-checks; teams entering a new municipality must rebuild that knowledge from scratch.

| Metric | Detail |
| --- | --- |
| **9.8 months** | Median City of Vancouver development-permit processing time for multi-family and mid-rise projects in 2025, improved from 18.1 months in 2023. [\[1\]](https://vancouver.ca/news-calendar/permitting-easier-multiplex-approvals-faster-june-2026.aspx) |
| **$6,855** | Estimated indirect cost per high-rise unit for each month of approval delay in Vancouver under CHBA / Altus methodology. [\[2\]](https://www.chba.ca/assets/pdf/Municipal-Benchmarking-Vancouver_2024/) |
| **1,452** | Site-plan / development-permit applications reported for 2023 across the B.C. municipalities in the CHBA study, plus 306 rezoning applications. [\[3\]](https://www.chba.ca/assets/pdf/CHBA%2BMunicipal%2BBenchmarking%2BStudy-3rd%2BEdition-2024_compressed/) |

**Why this can be mission-critical:** Using the CHBA / Altus estimate, one month of delay on a 100-unit Vancouver high-rise represents approximately $685,500 of indirect cost; three months represent about $2.06M. This is an illustrative calculation, not a guaranteed project saving. Tribunus only needs to prevent a small number of material mistakes or review cycles to justify a five-figure annual contract.

---

## 2. Solution

*A project-first system that verifies development assumptions and turns information into action.*

**Product promise:** Before a developer buys, redesigns, meets the municipality or submits, Tribunus identifies the assumptions most capable of damaging yield, fees, approval path or schedule — and shows the source, confidence and next action for every finding.

- **Verified Project Baseline** — Current zoning, plans, policies, fees, approval path, site constraints and effective dates.
- **Assumption Ledger** — Every material assumption, where it came from, when it was last checked and what happens if it is wrong.
- **Risk & Action Register** — Prioritized issues, confidence, financial/process exposure, owner and resolution status.
- **Precedent & Decision Trace** — Comparable projects: original proposal, staff concerns, revisions, council discussion, conditions and outcome.
- **Project Watch** — Project-specific alerts for policy, fee, infrastructure and nearby-development changes — with impact, not generic news.
- **Ask This Project** — A secondary, source-cited chat for follow-up questions. The product is not a blank chatbot.

**Brief UX flow**

1. Enter address / draw parcel
2. Add project concept and basic assumptions
3. Upload available drawings, pro forma assumptions and City / consultant files
4. Tribunus builds and asks the user to confirm the project profile
5. Automatic Assumption Audit produces baseline, risks, precedents and actions
6. Team resolves items, assigns work and exports a decision brief
7. Tribunus monitors changes and re-verifies affected assumptions as files evolve

---

## 3. Technical Solution — Deployable MVP Task List

*Modules required to pilot with a real developer firm. Implementation details are intentionally omitted.*

- **Company, users and permissions** — Secure organization accounts, role-based access and project teams.
- **Project workspace** — Create projects by address / parcel; store stage, asset type, assumptions and status.
- **File intake and versioning** — Upload PDFs, spreadsheets, correspondence and drawings; preserve versions and audit history.
- **Vancouver municipal source registry** — Maintain authoritative zoning, plans, policies, fees, GIS, application, council and permit sources.
- **Project profile extraction** — Extract height, density, units, tenure, parking, setbacks, floor area, uses and requested departures; user confirms key facts.
- **Time-versioned rules and fees** — Store current and historical requirements with effective dates and source links.
- **Deterministic calculators** — Calculate applicable fees and ratios using approved formulas; never rely on free-form model arithmetic.
- **Precedent search and decision trace** — Find comparable applications and reconstruct proposal, concerns, revisions, conditions, timeline and outcome.
- **Assumption ledger** — Create, verify and monitor material project assumptions with confidence and exposure.
- **Risk and action register** — Convert findings into persistent issues, owners, due dates, status and resolution evidence.
- **Feature-run engine** — Buttons for Baseline Review, Fee Verification, Precedent Review, Amendment Risk and Application Readiness.
- **Verification and citations** — Original-source citations, confidence labels, contradictory evidence checks and human-review queue.
- **Project watch** — Monitor source changes and nearby applications; alert only when a project assumption or action is affected.
- **Project-aware Q&A** — Chat over verified project context, completed analyses and source documents.
- **Exports and reporting** — Shareable decision brief, issue register and source appendix for internal and consultant review.
- **Security and admin controls** — Encryption, logging, data retention, source management, user support and pilot analytics.

**MVP boundary:** Do not build permit submission, building-code certification, construction management, vendor advertising or a universal approval-probability score in V1. These areas are either crowded, liability-heavy or distract from the first paid decision workflow.

---

## 4. Closest Competitors

*The category is validated. Tribunus must win through local depth, private project data and risk-control workflow — not by claiming "AI for permits."*

| Company | Location / status | Evidence of growth | What Tribunus must do differently |
| --- | --- | --- | --- |
| **PermitPortal** | San Francisco; YC F24; active; 2-person team; public funding not disclosed. | Closest conceptual match: site selection, entitlements, jurisdiction behaviour and project monitoring. | Avoid being only "Canadian PermitPortal." Build the assumption ledger, private-file verification and Metro Vancouver decision depth. |
| **Spark** | United States; YC W24; active; small team; public funding total not disclosed. | Reports 1M+ documents parsed, dozens of energy developers, 90 GW of pipeline and $30B of customer project financing. | Apply the proven regulatory-intelligence model to complex urban development, not energy infrastructure. |
| **LandLogic** | Toronto; founded 2023; private; public funding not disclosed. | 82 municipalities reported by end-2025; Teranet / GeoWarehouse partnership; Google for Startups 2026; One Ontario platform role. | Do not compete on basic zoning reports. Go deeper into project assumptions, negotiations, consultant files and action tracking. |
| **AEDI** | Canada; very early; Stage 1 live in 4 municipalities; Vancouver listed as coming soon; funding not publicly disclosed. | $95 source-backed feasibility report, municipal feeds and policy monitoring; Stage 2 approval-path product planned. | Tribunus must be decision-grade and enterprise-oriented, not a low-cost parcel report. |
| **Archistar** | Sydney HQ with Vancouver office; founded 2010; 51–200 employees; investor-backed. | Burnaby launched AI PreCheck in July 2026; checks 50+ zoning rules before submission. | Do not lead with routine drawing / zoning compliance. Focus on discretionary decisions, project risk and private workflow data. |
| **PermitFlow** *(adjacent)* | New York; YC W22; scaled permit-operations company. | $54M Series B announced in 2025/26; broad submission, tracking and compliance workflow. | Integrate or hand off downstream. Tribunus should own the decisions and verification before / during approval, not generic permit administration. |

**Conclusion from competition:** The problem is proven, but the broad product category is crowded. Tribunus is defensible only if it becomes the system of record for verified assumptions, private project evidence and actions — not merely another interface over public municipal data.

---

## 5. Proof, Economics and Growth Path

*Where Tribunus fits in the developer process and how the product can justify its price.*

**Acquire / screen → Design / feasibility → Municipal approvals → Building / construction**
Site baseline + fatal flaws | Assumption audit + consultant gaps | Precedent, City comments + project watch | *Future expansion:* coordination QA

**Why firms can pay:** The ROI is not "we saved three hours of research." The ROI is reducing the probability of a bad acquisition, stale fee assumption, unsupported density/setback assumption, missing study, consultant conflict or avoidable review cycle.

| Illustrative project | CHBA / Altus delay estimate | Illustrative exposure |
| --- | --- | --- |
| 50-unit low-rise | $6,309 per unit / month | $315,450 per month; $946,350 over three months |
| 100-unit high-rise | $6,855 per unit / month | $685,500 per month; $2.06M over three months |

**Pricing hypothesis for pilots (not yet validated):** C$2,500–C$5,000 for the initial project audit, followed by C$500–C$1,000 per active project per month for monitoring and re-verification. Larger firm contracts should move toward C$25,000–C$100,000+ annual value as consultant QA and portfolio workflows are added.

| Observable starting volume | Illustrative revenue equation | What $100M requires |
| --- | --- | --- |
| B.C. study municipalities reported 1,452 site-plan / development-permit applications and 306 rezoning applications in 2023. Some applications may belong to the same project; this is not all of B.C. | At an illustrative $10,000 of project-year revenue, 1,452 workflows equal $14.5M of annual project revenue at 100% penetration; 10% penetration equals $1.45M. | $100M ARR equals, for example, 2,000 firms at $50,000 ACV or 4,000 firms at $25,000 ACV. Metro Vancouver is the proof market — not the final market. Canada / U.S. expansion and deeper workflow are required. |

**Growth path:** Phase 1: verified site intelligence and project watch. Phase 2: City-comment and revision intelligence. Phase 3: consultant package consistency and dependency checking. Phase 4: development approval control room. Phase 5: repeatable municipality adapters and U.S. entitlement expansion.

---

## 6. Proof Required Before Full Build

*The market is validated; the exact Tribunus product still needs paid-project evidence.*

- Run 10 real Metro Vancouver projects across at least 5 development firms.
- Require at least 3 firms to pay for the initial audit — not merely agree to test.
- Find a material stale, incorrect or unsupported assumption in at least 3 of 10 projects.
- Demonstrate that at least 2 findings change a real acquisition, design, pro forma or submission decision.
- Have at least 2 firms request ongoing project monitoring.
- Achieve at least 90% expert-rated correctness on material factual findings, with original-source citations.
- Obtain permissioned City comments, consultant files or revision histories from design partners.
- Add a second municipality without rebuilding the system from scratch.

**Recommendation:** Proceed with Tribunus and stop broad startup idea-shopping for the next 60–90 days. Commit to the developer problem space, but keep the product flexible. The first wedge is the Pre-Application Assumption Audit plus Project Watch. The winning long-term product may expand into consultant verification and development coordination once real project behaviour reveals the strongest recurring pain.

---

## Source Notes

*Current as of July 18, 2026. Company traction is generally self-reported unless otherwise stated.*

1. [City of Vancouver — "Permitting is getting easier in Vancouver" (June 9, 2026).](https://vancouver.ca/news-calendar/permitting-easier-multiplex-approvals-faster-june-2026.aspx)
2. [CHBA / Altus Group — Municipal Benchmarking Study: Vancouver (2024 edition, published March 2025).](https://www.chba.ca/assets/pdf/Municipal-Benchmarking-Vancouver_2024/)
3. [CHBA / Altus Group — Municipal Benchmarking Study, 3rd Edition (March 2025).](https://www.chba.ca/assets/pdf/CHBA%2BMunicipal%2BBenchmarking%2BStudy-3rd%2BEdition-2024_compressed/)
4. [City of Vancouver — How rezoning works; Development permit process.](https://vancouver.ca/home-property-development/how-rezoning-works.aspx)
5. [City of Vancouver and Metro Vancouver — 2026 DCL / DCC updates.](https://metrovancouver.org/about-us/development-cost-charges)
6. [Y Combinator — PermitPortal company profile (F24).](https://www.ycombinator.com/companies/permitportal)
7. [Y Combinator / Spark — company profile and current traction statements (W24).](https://www.ycombinator.com/companies/spark)
8. [LandLogic — company site, Teranet / One Ontario updates and 2026 accelerator announcements.](https://www.landlogic.ai/)
9. [AEDI — product, coverage, pricing and roadmap.](https://www.aedi.ca/)
10. [City of Burnaby — AI PreCheck Digital Building Permit Review Tool; Archistar deployment.](https://www.burnaby.ca/our-city/projects/ai-precheck-digital-building-permit-review-tool)
11. [PermitFlow — $54M Series B announcement.](https://www.permitflow.com/blog/permitflow-series-b)

**Important qualification:** The delay economics and market-size calculations are illustrative models based on cited public data. They are not forecasts, guarantees or substitutes for project-specific planning, legal, engineering or financial advice.
