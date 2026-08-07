# Tribunus — Domain Knowledge: BC / Metro Vancouver Real Estate Development

*A working reference for the permitting, fees, legislation, and developer economics Tribunus has to reason about. Focused on the pilot jurisdictions — City of Vancouver and City of Coquitlam — plus the regional (Metro Vancouver) and provincial layers that sit above them. Companion to [mvp_feature_list.md](mvp_feature_list.md) and [tech_stack.md](tech_stack.md).*

**Status:** Reference · **Compiled:** August 2026 · **Verify rates before quoting — they move.**

> **How to use this doc.** This is the mental model of the customer and their world. Every feature in the MVP exists to answer a question a developer actually asks during a deal. Where a section maps to a feature, it's flagged like `→ #8 Fees`. Rates and dates are point-in-time; the whole reason Tribunus labels facts (Verified / Calculated / Assessment / Requires confirmation) and dates them is that this landscape changed more between 2023 and 2026 than in the prior two decades.

---

## 1. The three layers of authority (who can charge and approve what)

A BC development is governed by three stacked levels. Confusing them is the single most common source of error, and a big part of Tribunus's value is keeping them straight.

- **Provincial (Province of BC).** Sets the enabling statutes — the **Local Government Act (LGA)** for most municipalities and the **Vancouver Charter** for the City of Vancouver specifically (Vancouver has its own charter and does *not* operate under the LGA for most planning powers). Since 2023 the Province has also started mandating *what* municipalities must allow (Bills 44/46/47 — see §5).
- **Regional (Metro Vancouver).** A federation of 21 municipalities. It owns regional water, liquid waste (sewer), and drainage trunk infrastructure and levies its own **regional DCC** collected by member cities on its behalf. Also owns the **Regional Growth Strategy** that local OCPs must align with.
- **Municipal (Vancouver, Coquitlam, etc.).** Does the actual land-use regulation: the **Official Community Plan (OCP)**, zoning bylaw, development permit areas, local DCCs/DCLs and ACCs, and the approval process. This is where the developer spends most of their time.

**Terminology trap:** Vancouver, under its Charter, calls its local growth charge a **Development Cost Levy (DCL)**; every LGA municipality (Coquitlam included) calls the equivalent a **Development Cost Charge (DCC)**. Same idea, different statute and name. Tribunus must key charge logic off jurisdiction, not off a single generic label.

---

## 2. The development approval process, end to end `→ #14 Approval Pathway`

Not every project touches every step. The developer's first strategic question is always *"what's the lightest pathway that gets me the density I need?"* — because each step up adds months and risk.

**The pathway ladder, lightest to heaviest:**

1. **By-right / permitted use.** The zoning already allows what you want. No rezoning — you go straight to permits. Since Bill 44 (§5), small-scale multi-unit housing (3–6 units on former single-family lots) is largely by-right, and Vancouver's **R1-1** zone bakes multiplexes in. This is the fast lane.
2. **Development Permit (DP).** Required in a designated **Development Permit Area (DPA)** for form-and-character, environmental protection, hazard lands, etc. Reviews *how* you build (massing, design, landscaping), not *whether* the use is allowed. Cannot vary use or density on its own.
3. **Development Variance Permit (DVP).** Relaxes specific numeric bylaw provisions (a setback, a height, parking count) without a full rezoning. Approved by Council (or delegate); no public hearing but neighbour notification.
4. **Rezoning.** Changes the zoning itself — the heavy instrument, used when the developer wants more density/height or a different use than the current zone allows. In Vancouver this usually means a **CD-1 (Comprehensive Development) district** custom-written for the site. Requires Council approval by bylaw and, historically, a public hearing (but see §5 — many OCP-consistent residential rezonings can *no longer* hold one).
5. **OCP / community plan amendment.** Needed when the proposal contradicts the plan's land-use designation. The heaviest and riskiest — you're asking Council to change policy, and a public hearing is still mandatory. Developers avoid this where possible.
6. **Subdivision.** Dividing (or consolidating) parcels; approved by an Approving Officer against the Land Title Act and servicing standards. Often runs parallel.

**Sequencing.** Rezoning/OCP amendment first (the "in principle" approval), then DP, then **Building Permit (BP)**, then construction, then occupancy. A DP can't be issued until any required rezoning/OCP amendment gets final approval. DCCs/DCLs/ACCs are collected at **building-permit issuance** (or subdivision), *not* at rezoning — a critical cash-flow fact (§4).

**Rezoning stage mechanics (LGA cities like Coquitlam):**

- **Pre-application** — mandatory in Coquitlam (since Sept 2023) for most projects. Staff from multiple departments give early direction. Cheap insurance against a doomed design.
- **Formal application → Development Review Team (DRT)** — interdepartmental review, requests revisions.
- **Advisory Design Panel (ADP)** — independent professional design review (architects, landscape architects) advising Council. Common for larger/multifamily projects.
- **Readings & public hearing** — a zoning bylaw gets **first reading**, then (if required) a **public hearing**, then **second and third reading**, then **final adoption**. Between third reading and adoption the developer typically must satisfy conditions (legal agreements, ACC/CAC, servicing).
- **Referrals** — to utilities and agencies (BC Hydro, water/sewer, school district, Ministry of Transportation if near a highway, Fraser Health, etc.). These run in parallel and are a frequent source of delay.

**Vancouver specifics.** Vancouver uses **CD-1 rezonings**, a **Rezoning Policy** and enquiry process, and design review through its **Urban Design Panel**. Major area plans (e.g. the **Broadway Plan**, **Vancouver Plan**) pre-zone large areas and set the density/tenure/amenity expectations, so a lot of the "negotiation" is now policy-driven rather than site-by-site.

**Decision-maker matters.** By-right and most DPs are **staff** decisions (faster, more predictable). Rezonings and OCP amendments are **Council** decisions (political, slower, subject to public opposition). Knowing which body decides — and how that body has behaved on comparable files — is exactly the Council & Staff Intelligence value (`→ #16`).

---

## 3. Zoning & density fundamentals the profile must capture `→ #5 Profile, #7 Baseline, #9 Calculators`

- **FSR / FAR (Floor Space Ratio / Floor Area Ratio).** Ratio of buildable floor area to site area. FSR 2.0 on a 10,000 sq ft lot = 20,000 sq ft buildable. **The single most economically important number** — it's the multiplier on everything. Small definitional differences (what counts as "floor area" — are balconies, parking, mechanical, below-grade in or out?) swing the pro forma hard, which is why Tribunus must capture the *definition*, not just the number.
- **Density** can also be expressed as **units per acre/hectare** or dwelling-unit counts.
- **Site coverage, height (in storeys and metres), setbacks (front/side/rear), and required parking/loading** — the envelope constraints. Setbacks near watercourses or steep slopes can be driven by environmental regs, not just zoning (§6).
- **GFA (Gross Floor Area) vs. net/saleable** — developers care about saleable area; the city regulates GFA. The gap (efficiency ratio) is a real pro-forma line.
- **Tenure** — **strata (for sale)** vs. **secured market rental** vs. **below-market / non-market**. Tenure changes both the economics *and* the fee/incentive treatment dramatically (§4). Rental frequently unlocks fee waivers and extra density.
- **Zoning conflict detection.** A recurring failure mode is a rationale saying one unit count and a stats sheet saying another; the profile is the source of truth and must flag these (`→ #5`).

---

## 4. The fee & contribution stack — where deals live or die `→ #8 Fees, #9 Calculators`

Developers routinely under-budget "city fees" and get blindsided. On a Vancouver multiplex the municipal fee stack alone runs roughly **$185K–$644K** depending on lot width, unit count, and tenure — *before* a nail is hammered and *excluding* consultants and construction. Tribunus's job is to make this stack knowable and current. The pieces:

### 4.1 Development Cost Charges / Levies (DCC / DCL) — the growth-infrastructure charge

- **What:** one-time charge to fund growth-related **hard infrastructure** — water, sewer, drainage, roads, parks, and (post-Bill 46) **fire, police, and solid-waste/recycling facilities**.
- **Authority:** LGA (DCC) or Vancouver Charter (DCL). Set by bylaw; DCC bylaws need approval of the **Inspector of Municipalities**.
- **How calculated:** program cost for each infrastructure category ÷ the new units/floor area it will serve. Charged **per unit** or **per m² of GFA** depending on the city and category. Collected at **BP issuance / subdivision**.
- **Reserve rule:** each category (water, sewer, roads, parks, etc.) sits in its own reserve and can only be spent on that category's capital — deterministic, auditable, calculator-friendly.

### 4.2 Metro Vancouver regional DCC — the fast-rising one

Collected by the city on Metro Vancouver's behalf for **regional water, sewer (liquid waste), and drainage**. Charged **per dwelling unit** and climbing steeply:

| Year | Metro Van DCC per unit |
| --- | --- |
| 2025 | $21,941 |
| 2026 | $29,197 |
| 2027 | $34,133 |

That's a **~56% increase over two years** — the kind of "announced future change" Project Watch (`→ #18`) exists to flag, because a 2027 build should be modelled at the 2027 rate *today*.

### 4.3 Vancouver DCLs (current, point-in-time — verify)

- **City-wide DCL:** **$49.88/m²** (Bylaw 9755) — reflects a temporary **20% reduction** effective Dec 10, 2025 (pre-reduction $62.35/m²). Funds parks, childcare, transportation, replacement housing.
- **Utilities DCL:** **$39.06/m²** (Bylaw 12183, 20% reduction applied) — water/sewer/drainage.
- Combined ≈ **$88.94/m²** of GFA.
- **Payment terms:** 1/3 at permit, 1/3 at 12 months, 1/3 at 24 months (helps cash flow, but the first third is due *before* the lender's first draw).
- These are being folded into Vancouver's new **Financing Growth** framework — a new **ACC by-law + updated DCL by-law** targeted to take effect **Sept 30, 2026**, with built-in annual escalators through ~2030. Rates above are current-state and will move.

### 4.4 Community Amenity Contributions (CAC) → Amenity Cost Charges (ACC) — the big regime change

- **CAC (the old way):** a contribution (cash or in-kind — parks, daycare, affordable units, community space) negotiated **case-by-case during rezoning**. Opaque, slow, "closed-door," and a major source of the uncertainty and delay developers hate. Typically only triggered by **rezoning** (a by-right multiplex pays **no CAC**).
- **ACC (the new way, from Bill 46):** a **pre-set, published, by-law charge** based on location / land use / density — no negotiation. Predictable and transparent; the trade-off is less flexibility. Charged at **building permit**; instalment options for large amounts.
- **Rollout is staggered and inconsistent** (the Province set no hard deadline): **Burnaby 2024, Coquitlam July 2025, Surrey 2026, Vancouver targeting Sept 30 2026.** During the transition a given site might still be under CAC, under ACC, or between the two — so Tribunus must track *which regime applies to this parcel on this date*. This is precisely a "historical vs. current, never mix" problem.

### 4.5 Density bonusing — paying for extra floor area

Historically, cities granted density **above a base** in exchange for a contribution (cash or amenity). Vancouver's **Schedule F** sets density-bonus rates by **sub-area and lot frontage**, and the numbers are enormous on wide lots:

| Lot frontage | Sub-area A (west of Oak) | Sub-area B (Oak–Fraser) | Sub-area C (east of Fraser) |
| --- | --- | --- | --- |
| ≤33 ft | $32.29/m² | $32.29/m² | $32.29/m² |
| 40–50 ft | $699.65/m² | $538.20/m² | $322.92/m² |
| 50+ ft | $1,506.95/m² | $1,076.39/m² | $645.84/m² |

A 50-ft lot in Sub-area A can carry **~$1M+** in density-bonus contribution vs. **~$22K** for a 33-ft lot in the same neighbourhood — a **46× swing** driven purely by frontage. **Lot geometry is a pricing input, not a detail.** Under the new Financing Growth framework, ACCs are meant to *replace* most density bonusing in Vancouver.

### 4.6 Other charges the profile should expect

Building permit fees (Vancouver ~$729 base + tiered per $1,000 of construction value, ≈ $15K–$30K on a multiplex), development permit fees (~$5K), **GST** (5%, big on new construction), **Property Transfer Tax** on land acquisition, school site acquisition charges, utility connection fees, and Coquitlam-style servicing/latecomer agreements. In Coquitlam, indicative **DCC per unit** figures: multiplex ≈ $41,448, rowhouse/townhouse ≈ $37,418, multi-family apartment ≈ $23,715 (per-unit DCCs fall as density rises — apartments spread trunk costs over more doors). Coquitlam's **ACC program** (adopted July 7, 2025; 10-year, ~$387M capital, ~31,000 pop / 13,920 units) charges per sq ft by built form (low-rise / mid-rise ≤12 storeys / high-rise >12), with figures like ~$39/sq ft cited for high-rise. **Verify all before quoting.**

### 4.7 The tenure lever (why this all matters strategically)

In Vancouver, **secured market rental** (min. 60-year covenant) can pay **$0 density bonus**, get the DCL reduction, and avoid CACs — a swing of **$180K–$1M+** vs. the same building as strata. Below-market units are exempt from density-bonus charges. So tenure choice isn't just a revenue question (rent vs. sale prices) — it can be a six/seven-figure *fee* decision. Any "does this pencil" analysis (`→ #25`) has to model tenure explicitly.

**Fee-labelling discipline (`→ #8, #19`).** Every charge should carry a status: **deterministically calculable** (DCC/DCL from published rate × known GFA/units), **preliminary estimate** (density bonus before survey confirms frontage/sub-area), **negotiated-uncertain** (legacy CAC still under the old regime), or **requires municipal confirmation** (transition-period ambiguity, site-specific relaxations). And rates must be **dated** — the "20% DCL reduction until Financing Growth lands" is a textbook example of a value that's true today and wrong next quarter.

---

## 5. The 2023–2026 provincial legislation that reset everything `→ #6 Municipal Context, #18 Project Watch`

Between late 2023 and 2026 the Province overrode a lot of municipal discretion. Any credible advisor has to know these cold, because they change what's allowed, what's charged, and how fast approval goes.

- **Bill 44 — Small-Scale Multi-Unit Housing (SSMUH), Nov 2023.** Municipalities >5,000 pop had to amend zoning by **June 30, 2024** to allow **3–6 units** on most lots formerly zoned single-family/duplex (more near frequent transit; laneways/secondary suites broadly). Much of this becomes **by-right** (no rezoning). It also **prohibits public hearings** for rezonings that are (a) consistent with the OCP and (b) primarily residential (≥50% GFA) — collapsing a former 6–12 month process into a council-vote-only path. Public hearings remain for OCP amendments and non-consistent proposals.
- **Bill 47 — Transit-Oriented Areas (TOAs), Nov 2023.** Designates land near rapid-transit stations/exchanges and **mandates minimum densities/heights** — e.g. up to ~10 storeys within 200 m and ~6 storeys within 200–400 m of a designated station, and removes parking minimums in TOAs. Where a site is in both a TOA and SSMUH area, **TOA generally governs** (higher density wins). Hugely relevant to Coquitlam's SkyTrain-served corridors (Evergreen/Millennium Line).
- **Bill 46 — Development Financing (ACCs), Nov 2023.** Creates the **ACC** tool replacing negotiated CACs, and **expands DCC/DCL scope** to fire, police, and solid-waste facilities (and, conditionally, provincial highway works). Basis of the fee regime change in §4.4.
- **Bill 16 & related (2024) — tenant protections, inclusionary/tenant-relocation, "proactive planning."** Rounds out the package with OCP-update requirements and interim development approval constraints.

**Net effect for the developer:** more density available *by right*, faster approvals where the proposal fits the plan, and a shift from unpredictable negotiated amenities toward fixed published charges — but a messy, city-by-city transition where the rules depend on *which municipality* and *what date*. That transition messiness is Tribunus's opening.

---

## 6. Site constraints & the consultant/study team `→ #22 Consultant Checklist, #13 Readiness`

A rezoning/DP package is only as strong as its supporting studies, and a missing or contradictory one stalls the file. The usual disciplines:

- **Civil / servicing engineer** — water, sanitary sewer, storm/drainage, roadworks, grading, site servicing; confirms capacity and designs offsite works. Frequent source of six-figure surprises when trunk capacity is short or a main is mislocated.
- **Geotechnical engineer** — soil, slope stability, seepage, foundation design; required on steep or unstable sites. (Vancouver's **peat bog** zones can add $50K–$150K+ to foundations — the kind of site-specific gotcha that belongs in the baseline.)
- **Arborist** — tree survey/retention/replacement; tree bylaws are strict and can constrain the buildable envelope.
- **Environmental** — **Riparian Areas Protection Regulation (RAPR)** assessments near watercourses set streamside protection/enhancement setbacks; species-at-risk and habitat can enlarge setbacks beyond zoning (a live example: a creek setback increased due to a protected species — exactly a Project Watch trigger, `→ #18`).
- **Transportation** — traffic impact study, access, parking/loading (note TOA parking-minimum removal).
- **Others as triggered** — acoustic, archaeological/First Nations, hazardous materials, shadow/wind for towers, heritage.

**Utilities & agencies ("who else has to say yes").** Beyond the city: **BC Hydro, Telus, Shaw, FortisBC (gas)**, the **school district**, **Fraser Health**, and the **Ministry of Transportation** (sites near provincial highways). These referrals sequence *after* certain city approvals and add lag — an approval-sequence/governance question developers routinely underestimate. Cost ranges are meaningful: traffic studies ~$10K–$40K, geotech ~$5K–$20K, environmental more if habitat is involved.

---

## 7. How a developer actually thinks `→ everything, esp. #11 Ledger, #12 Review, #25 Feasibility`

The product has to reason the way the customer does. The core mental model:

- **It's a backward calculation from value.** Developers price land by **residual land value (RLV)**: `RLV = (Gross Development Value of the finished project) − (all costs: construction, soft costs, fees, financing) − (required profit)`. Whatever's left is the most they can pay for the dirt. If the seller's ask exceeds RLV, the deal doesn't pencil.
- **Target returns.** Typically a **profit margin of ~15–25% of GDV**, or a target IRR/return-on-cost. Thin deals die on small cost swings.
- **The pro forma is a stack of assumptions, and it's fragile.** RLV is *highly sensitive* — a change in FSR, a fee that jumps (see the Metro DCC table), a construction-cost bump, an interest-rate move, or six extra months of carry can flip a viable project to a loss. **This sensitivity is the entire reason the Assumption Ledger (`→ #11`) is the core object** — the developer is holding dozens of load-bearing assumptions, and the risk is that one is wrong and nobody re-checked it across the drawing set.
- **What flips a deal (the surprises Tribunus prevents):** an FSR that's lower than assumed once you net out exclusions; a density-bonus/CAC/ACC bill nobody modelled; a required study that reveals a servicing or geotech cost; a setback enlarged by an environmental reg; a pathway that turns out to need an OCP amendment (adding a year + public hearing risk); a Metro/city fee escalation between underwriting and permit.
- **Time is money, literally.** Every month of delay is carrying cost on the land loan plus opportunity cost. The developer's instinct is always toward the **lightest, fastest, most certain pathway** — which is why the post-Bill-44 by-right and no-public-hearing routes are so valuable, and why timeline forecasting (`→ #24`) and pathway identification (`→ #14`) are high-value.
- **Precedent is how they de-risk politics.** Because rezonings are political, developers (and their planners) lean heavily on *"what did Council actually approve on a comparable site, and what concessions/conditions did they extract?"* — the gray-area departure precedents, voting-behaviour profiles, and decision traces (`→ #15, #16`) that save design cycles and yield more sellable area.
- **They live in fear of the silent miss.** The failure mode that hurts most isn't a known risk — it's the riparian buffer, the superseded rate, the policy overlay, the unaddressed City comment that *nobody saw*. That's why the trust backbone (`→ #19`) and hybrid agentic retrieval (recall + verified citation) matter: a risk-control tool is judged on what it *doesn't* miss.

---

## 8. Direct line from this domain to the Tribunus MVP

| Developer question / pain | Real-world mechanic (this doc) | Tribunus feature |
| --- | --- | --- |
| "What can I build here, by-right or with rezoning?" | Pathway ladder, Bill 44/47 by-right density, TOA | #6, #7, #14 |
| "What's the total fee bill and when is it due?" | DCC/DCL/ACC/density-bonus stack, BP-timing, escalators | #8, #9 |
| "Is my FSR/yield real?" | FSR definitions, GFA vs. saleable, envelope constraints | #5, #9 |
| "Which assumptions could sink this?" | Fragile pro forma, RLV sensitivity | #11, #12 |
| "Is my application actually complete?" | Consultant/study team, referrals, City comments | #13, #22, #23 |
| "What has Council done on deals like mine?" | Political approval, precedent, departure history | #15, #16 |
| "What just changed that affects my site?" | Fee escalations, ACC rollout, reg changes, setbacks | #18 |
| "Can I trust this / where's the source?" | Historical-vs-current rates, jurisdiction-specific rules | #19, #20 |
| "Does it pencil?" | RLV, tenure lever, sales comps | #25 |

---

## 9. Standing rules Tribunus must never violate (learned from this domain)

1. **Never mix historical and current rates.** Fee schedules supersede constantly (the 20% DCL reduction, the annual Metro DCC steps, the CAC→ACC transition). Every rate is dated and status-tagged; old rates are marked superseded, not deleted.
2. **Key everything off jurisdiction + date.** Vancouver Charter vs. LGA; CAC vs. ACC depending on the city *and* when. A rule true in Coquitlam may be false in Vancouver and vice-versa.
3. **The LLM never does the arithmetic.** FSR, fee totals, dedications — deterministic calculators with exposed formulas (`→ #9`). The model decides *which* charge applies; code computes it.
4. **Distinguish verified fact / calculated / assessment / requires-confirmation** on every material claim, with a real municipal-source citation (`→ #19`).
5. **Flag the silent miss.** Recall (semantic search) exists so the riparian buffer or policy overlay is *reachable*; verified file-reading exists so it's *cited*. Missing a risk is the cardinal sin.

---

## Sources

Provincial legislation & framework:
- [Development finance — Province of BC](https://www2.gov.bc.ca/gov/content/housing-tenancy/local-governments-and-housing/housing-initiatives/development-finance)
- [Development cost charges — Province of BC](https://www2.gov.bc.ca/gov/content/governments/local-governments/finance/local-government-development-financing/development-cost-charges)
- [Bill 46: A new and expanded development financing framework in BC — MLT Aikins](https://www.mltaikins.com/insights/bill-46-a-new-and-expanded-development-financing-framework-in-british-columbia/)
- [New BC Housing Legislation Brings Changes to the Public Hearings Process — BC Law Institute](https://www.bcli.org/new-bc-housing-legislation-brings-changes-to-the-public-hearings-process/)
- [New Provincial Regulations: Bill 44 and Bill 47 — Pacific Land Group](https://pacificlandgroup.ca/land-planner-corner/bill-44-and-bill-47)
- [New legislation on development finance — UBCM](https://www.ubcm.ca/about-ubcm/latest-news/new-legislation-development-finance)

Regional & municipal:
- [Development Cost Charges — Metro Vancouver](https://metrovancouver.org/about-us/development-cost-charges)
- [Development Cost Levies — City of Vancouver](https://vancouver.ca/home-property-development/development-cost-levies.aspx)
- [Vancouver updates development contributions (ACC/DCL, July 2026) — City of Vancouver](https://vancouver.ca/news-calendar/update-housing-jobs-complete-neighbourhoods-july-2026.aspx)
- [Vancouver Multiplex City Fees 2026 (DCL/DCC/density bonus) — VanPlex](https://www.vanplex.ca/blog/vancouver-multiplex-city-fees-2026)
- [Vancouver Unveils New ACC Program, Updated DCL Program — Howard Chai](https://howardchai.substack.com/p/vancouver-amenity-cost-charges-acc-program-dcl-update-2026)
- [Development Cost Charges — Coquitlam](https://www.coquitlam.ca/285/Development-Cost-Charges-DCCs)
- [Amenity Cost Charges — Coquitlam](https://www.coquitlam.ca/1399/Amenity-Cost-Charges)
- [Density Bonus for Affordable Housing — Coquitlam](https://www.coquitlam.ca/1244/Density-Bonus-for-Affordable-Housing)
- [Pre-Application — Coquitlam](https://www.coquitlam.ca/253/Pre-Application)
- [City of Coquitlam Outlines Rates for New ACC Program — Storeys](https://storeys.com/coquitlam-amenity-cost-charges-program/)

Process, consultants & economics:
- [Apply to rezone your property — City of Vancouver](https://vancouver.ca/home-property-development/enquire-about-and-apply-for-rezoning.aspx)
- [Rezoning Cost in BC: Full Breakdown — Beyond Programs](https://beyondprograms.ca/how-much-does-rezoning-cost-bc/)
- [BCNPHA Guide to Hiring and Working with Development Consultants](https://bcnpha.ca/wp-content/uploads/2021/07/BCNPHA_Guide-to-Hiring-and-Working-with-Development-Consultants_200806.pdf)
- [Property development feasibility / residual land value — Altus Group](https://www.altusgroup.com/featured-insights/property-development-feasibility/part-3-land-valuations/)
- [Residual land value vs profit margin — Lead Developer](https://leaddeveloper.com/residual-land-value-vs-profit-margin/)
