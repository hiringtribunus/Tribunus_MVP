# Kevin Interview — Extracted Insights

*Domain-extraction session with Kevin, a veteran developer at the firm (~31 wood-frame projects, self-described as "not technological"). Interview walked through recent acquisitions, deals passed on, the site-evaluation workflow, product types, deal size, and what he'd trust the tool to do.*

**Status:** Raw input for the feature list · **Date:** July 2026
**Note:** Transcription is rough — treat all proper names as approximate.

---

## What happened

A discovery interview that doubled as a candid product-fit gut check. Kevin gave real portfolio history, walked through his actual evaluation workflow, and — most valuably — stated plainly who he thinks the tool is and isn't for. No decisions were made; this is raw input.

---

## Portfolio facts (useful as pilot test data)

- **Marigold & Litchfield** — last two acquired; townhouse sites, 80 townhouses, slab on grade.
- **Robinson & Spring(?)** — two sites across the street from each other; 312 rental units, 6-storey wood frame over 2-storey concrete parkade; three buildings (~112 / 109 / 120), deliberately sized in the sweet spot so each can be built and rented in sequence.
- **Harrison** — 6-storey wood frame, 259 units over 2.5 storeys underground parkade; phased into two large + two small buildings for cash-flow. Not yet finished.
- **Emerald** (41 units), **Rindall(?)** (44 units), **Bin / Aura** (112 units) — completed stacked-townhouse / wood-over-concrete projects, mostly North Van / Capilano.
- **Moody** — strip office bought, rented, then redeveloped; carries a 1% interest rate expiring in ~2 years.
- **Capilano** — land held ~10 years, still fighting the city to final approval.

---

## Land-assembly strategy

- Buy single-family lots and join them into a project-sized parcel.
- **"Block breaking"** — buy strategic lots (including future road-access lots) so competitors can't assemble the neighbourhood, or so they must come to the firm to proceed. Charge a premium later, or hold as a blocker.
- Buy the good lots first, then organize the rest around them.
- **Sweet-spot sizing:** ~150-unit condominiums; 70–80 unit townhouses; **~140 units per building** for 6-storey wood frame. Too few units = no economy of scale; too many = hard to sell out.
- The real money is finding the property first, before anyone "gets their lift on it" — every hand it passes through (realtors, land assemblers) bumps the price, like paying a premium up each round of a private financing.
- **Assembly risk:** sellers now demand ~$100k upfront plus payments over ~6 months rather than being tied up. Your dad took a ~$1.5M loss in the Oakdale / Robinson-Spring area when the market turned and deposits weren't recovered.

---

## Deals passed on (good "why we said no" signal for the risk engine)

- **Port Coquitlam near Costco** — floodplain, land below grade needing lift, single access point, oversized 2,400 sqft duplexes out of market. Numbers never penciled.
- **PoCo downtown** — bankrupt developer, city as part-owner; parkade steel already in the ground under a building permit for poor "adaptable suites." Fixing it meant going back to council (1–1.5 yrs), redrawing everything, and working around a fixed elevator core and ground-floor commercial. Killed it. (Later sold to another builder — "Libby," using "Trillium" — now stalled.)
- **Burke Mountain / Rockland** — city land bid to the highest offer; a competitor paid $300k/door when market was ~$225k/door.

---

## New details to add to the product (not in current docs)

These are the most valuable extractions — concrete features or data sources not currently listed.

### 1. Phase One Environmental / contaminated-site history
Banks require a Phase One review before lending. It traces property history back to first use, looking for gas stations, dry cleaners, and auto shops — contamination at *any* depth can block financing. Kevin named a specific data source: the **BC contaminated sites registry** (public, FOI-accessible, with remediation statuses online). His insight flips it into an opportunity feature: **already-remediated sites are valuable to buy** because the Phase One hurdle is gone. Real example: a former gas station at Hwy 7 (Lougheed) & 224th required the province to remediate the entire site — millions of dollars. → New data adapter + a "site history / contamination flag" feature.

### 2. Seismic / geotechnical zones
Canadian geological maps grade soil A–D (liquefaction, bedrock vs. bog). A C/D zone means far costlier foundations — Richmond, for instance, needs a ~12-ft raft foundation — and can kill a deal outright. → Belongs in the "what kills a project at acquisition" checks alongside floodplain and soil conditions.

### 3. OCP → Metro Vancouver approval cascade (predictive)
A municipality proposes an OCP → Metro Vancouver approves/rejects → approval triggers TransLink, water, sewer, storm, and BC Hydro long-range planning for the area. So once Metro Van approves an area for density (e.g., CD zones), you can predict servicing + transit arriving in ~5–10 years. → A genuine AI/scenario-planning feature that beats manual work — exactly the "value beyond a hub" the interviewer was pushing for. Get in before land prices climb.

### 4. "Volume of development," not "speed"
Kevin was explicit: you *can't* reliably score municipal speed without insider input — too subjective. Reframe municipality scoring around **application-register volume** (DP/PP counts, unit counts, stages) as a growth signal (e.g., "6,000 units currently at [stage]"). → Affects Timeline Forecasting and Municipality Comparison.

### 5. DCC-credit nuance
Confirmed from their Oakdale deal: no credits if nothing was built and the land wasn't zoned for the new use; if already rezoned, the DCCs were paid by the rezoner and baked into a premium price. → The Fees module should model this, not just compute totals.

### 6. Zoning hierarchy + the freeze risk
Federal housing strategy → provincial mandate → municipal zoning bylaw → OCP. When the provincial mandate hit, planning departments froze everything else for ~8 months (Harrison and Robinson-Spring were delayed while the firm paid interest). → Worth capturing as an alert type: "municipality consumed by a mandated bylaw update → expect delays."

### 7. Evaluation workflow to model
For a new municipality Kevin checks, in order: **zoning bylaw + OCP first**, then special housing initiatives / neighbourhood plans, then a call to a city clerk, then paid pre-application meetings (Surrey ~$750 with planning / engineering / parks). Plus municipal GIS layers — capital projects, environmental creeks (a creek = a problem), DP areas, topography exported into AutoCAD. → Mirrors the intended baseline + parcel-context features; validates their ordering.

---

## Municipal reputations (from Kevin)

Hard to work with: **Vancouver** (own bylaw, own construction standards, "militant" planning dept), **Mission**, **Abbotsford**, **Pitt Meadows**. These change over time when a municipality needs money/development. Fast-growing: **Surrey** (large immigration base). Slow / resistant: Maple Ridge, Pitt Meadows, Mission, West Van and rural areas that actively fight development.

Only enter a "bad" municipality for an extraordinary reason: dirt-cheap land, unbelievable density, or all utilities/services already at the property line (water, sanitary, storm — just add sidewalks), with transit and malls nearby. The further out the site, the more that "special" factor matters.

---

## Product types & deal size

Townhouse, wood-frame low-rise, and **6-storey wood frame over concrete parkade** — **not high-rise**. High-rise is a funding constraint: the firm does $60–80M projects; high-rise runs ~$200M, where big-money partners take the lion's share and the firm's real return shrinks. Rocky Point may push toward 6-storey wood frame. Timeline rule of thumb: **City Hall process is 18–24 months** average — faster if non-contentious, longer in new OCP areas with public opposition.

---

## The positioning signal (do not lose this)

Kevin said repeatedly and unprompted: **this is a tool for people who don't do this often** — new/aspiring developers, and firm staff as a double-check. He and your dad won't use it as a primary tool; at best it's an office-wide **checkpoint** to verify staff work. That's a direct answer to the open decision on who the wedge is for: audit/baseline features land newer firms, and the veteran value is the **double-check + monitoring** layer, not the core research.

Supporting points:

- He doesn't care about the pro forma / pricing section ("not for me — Francis might"). → Validates **sectioned, role-based views**.
- A **freshness indicator** ("updated today / last week") matters a lot — the real failure mode is stale or missed info. Weekly updates are fine to start; cost-driven.
- His one genuine distrust is **AI parsing of council minutes / capital plans** — a report can surface late or predate the tool's coverage, and he'd never catch it. → Reflect as an explicit confidence/limitation label on the Council Intelligence feature. "The tool's as good as you let it be."

---

## Suggested feature-list changes

1. Add **contaminated-sites (BC registry)** and **seismic/geotechnical zone** data sources to the municipal data core and the acquisition-kill checklist.
2. Add an **OCP → Metro Van servicing/transit prediction** feature (scenario planning) — a differentiator beyond a data hub.
3. Reframe any municipality scoring as **development volume**, not speed.
4. Extend the **Fees module** to model DCC-credit rules on rezoned-but-unbuilt land.
5. Add a **"planning-department freeze / mandated-bylaw-update"** alert type.
6. Add a visible **freshness/last-updated indicator** across the product.
7. Add an explicit **confidence/limitation label** on council-minutes parsing.
8. Confirm the wedge audience: **newer/expanding firms** as primary users; **veterans** as checkpoint + monitoring users.
