# Tribunus — MVP Feature List Consolidation Proposal

*A project-manager's pass over [mvp_feature_list.md](mvp_feature_list.md) to merge overlapping entries into fewer, cleaner, assignable feature slices — without changing scope. Nothing here is deleted; things are grouped.*

**Status:** Proposal for review (Usman + Gurinder) · **Date:** August 2026 · **The locked list is unchanged; this is a restructuring suggestion.**

---

## 1. Why this pass exists

The current list has **33 line items** — 26 "full" features (groups A–G) and 7 placeholders. That count came from merging Usman's and Gurinder's independent lists, and the seams show: several entries describe the *same underlying object or workflow* from two angles, and a few are genuinely hard to tell apart on a read-through (*"how is this different from the one above it?"*). When each line becomes a ticket assigned to a different engineer, that overlap turns into duplicated tables, duplicated UI, and two people quietly building halves of the same thing.

The goal is **not** a redesign. It's the tidy-up a PM does before sprint planning: collapse the items that are one feature wearing two hats, keep the ones that are truly distinct, and make each resulting slice a clean [Lego block](tech_stack.md) — *one feature = one folder = one owner*. Target: **26 full features → ~19**, with placeholders trimmed **7 → 6**. Scope stays identical; only the packaging changes.

**The test I used for "should these be one feature?"** — do they share the *same core data object*, the *same corpus*, or does one *run as part of* the other? If yes, they're one slice with internal parts. If they merely look similar on screen but operate on different domains, they stay separate (and I call out the distinction so nobody re-confuses them later).

---

## 2. The consolidated set at a glance (26 → 19 full features)

| # | Consolidated feature | Absorbs (original #s) |
| --- | --- | --- |
| **F1** | Firm Workspace & User Accounts | 1 |
| **F2** | Projects & Portfolio Home *(+ portfolio intelligence)* | 2, 26 |
| **F3** | Create Project | 3 |
| **F4** | Document Upload & Versioning | 4 |
| **F5** | Structured Project Profile | 5 |
| **F6** | Verified Site Baseline *(incl. auto parcel/municipal context)* | 6, 7 |
| **F7** | Fees & Contributions Review | 8 |
| **F8** | Deterministic Calculators | 9 |
| **F9** | Municipal Data Ingestion & Adapters | 10 |
| **F10** | **Development Review** *(primary action; incl. Readiness, Pathway, Timeline)* | 12, 13, 14, 24 |
| **F11** | **Findings Register — Assumptions & Risks** | 11, 17 |
| **F12** | **Precedent & Council Intelligence** | 15, 16 |
| **F13** | Project Watch & Alerts *(incl. portfolio alerts)* | 18 (+ alerting from 26) |
| **F14** | Evidence, Verification & Citations | 19 |
| **F15** | Internal Analyst Review Console | 20 |
| **F16** | Reports & Export (Development Brief) | 21 |
| **F17** | Consultant Requirement & Dependency Checklist | 22 |
| **F18** | City Comment Management | 23 |
| **F19** | Local Sales Comps & Feasibility Check | 25 |

Placeholders (**7 → 6**): P1 Ask This Project · P2 Scenario Comparison · P3 Entity Matching & Linking · **P4′ Analysis Engine & Run History** *(merges old P4 + P5)* · P5′ Growth Forecasting *(old P6)* · P6′ Competitor Extras Analysis *(old P7)*.

Four merges do almost all the work: **F10** (the analysis engine), **F11** (the register), **F12** (precedent/council), and **F6** (the baseline). Everything else is minor tidying.

---

## 3. The merges, with reasoning

### F10 — Development Review absorbs Readiness, Pathway, and Timeline (12 + 13 + 14 + 24)

This is the biggest and most clearly-correct consolidation. Read the originals literally: #13 Application Readiness Review says *"Runs as part of the Development Review,"* and #12 already promises to return *"likely pathway"* and *"applicable charges"* — so #14 Approval Pathway is an **output** of #12, not a sibling of it. #24 Timeline Forecasting is just the *temporal* dimension of that same pathway (stages → how long each takes). These aren't four features; they're one orchestrator (#12) and three of the analyses it fires and synthesizes.

This also matches the architecture already written in [tech_stack.md](tech_stack.md), which describes a single `development-review/` feature folder as *"the orchestrator + the workflows."* Keeping them as one feature (with Readiness, Pathway, and Timeline as internal workflow files) means one owner is responsible for the coherence of the headline "Run Development Review" result — instead of three people shipping pieces that have to agree at runtime. **Assign to your strongest engineer; it's the core "aha."**

### F11 — Findings Register merges the Assumption Ledger and the Risk & Action Register (11 + 17)

These two are 80% the same object. Compare the fields: the Assumption Ledger tracks *value, source, effective date, confidence/status, dependent documents, consequence-if-wrong, owner, resolution notes.* The Risk & Action Register tracks *title, category, severity, confidence, evidence, impact, recommended action, owner, due date, status, resolution notes.* Same persistence, same assignment model, same "resurfaces later" backlog behaviour, same table-and-detail UI. Building them as two features means two engineers independently building the same CRUD-plus-assignment-plus-evidence machinery.

They **are** conceptually distinct — an *assumption* is a belief that could be wrong; a *risk* is an identified problem — but that's a difference of **record type**, not of feature. The clean model is one **Findings Register** feature holding both record types with an explicit relationship: *when an assumption is breached or unconfirmed, it spawns a linked risk.* That relationship is actually easier to build inside one feature than across two.

> **This is the one judgment call worth debating.** Both were tagged "core differentiated feature" in the original, so merging them may feel like demoting the assumption ledger. It isn't — the ledger stays the marquee object; it just shares a home with the risk register instead of duplicating its plumbing. If you and Gurinder would rather keep the assumption ledger visually and organizationally front-and-centre, the fallback is: keep them as two features but have them **share one underlying `findings` table/module** (the tech doc already lists `finding`, `assumption`, `risk` as shared entities). Either way, don't let two people build two registers.

### F12 — Precedent & Council Intelligence merges Comparable Search and Council/Staff Intelligence (15 + 16)

Both features read the **same corpus** (council/board reports, staff recommendations, meeting minutes) and both produce a **decision trace**. #15 is *project-centric* ("find 3–10 comparable projects and reconstruct each one's arc"); #16 is *meeting/member-centric* ("summarize staff recs, council concerns, voting behaviour, discretionary-departure precedent, live-meeting gist"). That's two **views/queries** over one intelligence capability, not two features. Splitting them forces two engineers to build overlapping ingestion, entity resolution, and citation logic against the identical source material. One feature, two entry points (search-by-project and browse-by-council).

### F6 — Verified Site Baseline absorbs Automatic Parcel & Municipal Context (6 + 7)

#6 is the **retrieval** ("on address entry, auto-pull zoning, OCP designation, DPAs, policies, transit, nearby applications, constraints") and #7 is the **presentation** of that same material as the sourced, dated, status-labelled baseline deliverable. Input and output of one capability. A developer experiences these as a single thing — *"tell me the rules for this site, with receipts."* Merge them; the zoning-map aggregation from #6 becomes a sub-capability of the baseline feature.

### F2 — Projects & Portfolio Home absorbs Portfolio-Level Intelligence (2 + 26)

#2 is the home screen that lists projects; #26 is the cross-project analysis (shared risks, upcoming fee changes, municipal concentration, portfolio alerts). #26's analysis **renders on** the portfolio home — it's the intelligence layer of the same screen, not a separate destination. The one piece of #26 that belongs elsewhere is its *alerting*, which is the same machinery as Project Watch (F13) operating at portfolio scope; route it there. Net: the dashboard gains a "portfolio intelligence" view, and portfolio-wide alerts are produced by Project Watch.

### P4′ — Analysis Engine & Run History merges the two analysis-infra placeholders (P4 + P5)

Both are placeholder infra describing the same automated-analysis backbone: P4 is the automated quality-gate/verification engine; P5 is the run history that stores each analysis's inputs, versions, findings, and outcome. They're the engine and its ledger — one placeholder feature. (In the MVP the humans do P4's job via the Analyst Review Console, F15, so this stays a placeholder either way.)

---

## 4. What I deliberately did **not** merge (and the distinction to remember)

These pairs *look* similar on a quick read — which is probably part of what made the list feel confusing — but they operate on different objects and should stay separate slices. Stating the boundary here so they don't get re-merged by accident:

- **Structured Project Profile (F5) vs. Verified Site Baseline (F6).** F5 is *what you're proposing* — facts extracted from **the firm's own uploaded documents** (site area, units, height, FSR, requested variances). F6 is *what the rules allow* — facts pulled from **municipal sources** (zoning, height/density limits, DPAs). They get **compared** against each other (proposed vs. permitted); that's the whole point. Different sources, different trust treatment — keep apart.
- **Fees & Contributions Review (F7) vs. Deterministic Calculators (F8).** F7 is the **domain knowledge and labelling** of charges (which DCC/DCL/ACC/density-bonus applies, current vs. historical rate, confidence tag). F8 is the **generic, shared calculation engine** (FSR, area conversions, fee arithmetic, dates, distances) used by *many* features, exposing every formula. F7 *uses* F8; it doesn't contain it. Keep the calculator engine independent so everyone shares one tested library.
- **Evidence/Verification/Citations (F14) vs. Internal Analyst Review Console (F15).** F14 is the **provenance infrastructure** (every claim carries source + page + confidence label) that runs invisibly under everything. F15 is a **human-facing UI** where analysts approve/correct/suppress findings before "ready for customer." Backbone vs. workbench — different owners.
- **Consultant Checklist (F17) vs. City Comment Management (F18).** Both are "assign items, track responses, flag missing/overdue" trackers, so they share a *pattern* — but F17 tracks **consultant disciplines and deliverables** (mechanical, civil, geotech, utilities) while F18 tracks **municipal comment letters and their resolution.** Different domains, different data sources, different lifecycle. *(Optional: if you want to push toward ~17, these two plus the register are the honest candidates for a shared "trackable-item" engine — but I'd keep them separate features for clarity.)*

---

## 5. Optional deeper cuts (only if you want ~17 instead of ~19)

If the target is tighter, these are defensible but more aggressive:

- **Fold Create Project (F3) into Projects & Portfolio Home (F2).** The intake form is a thin flow tightly coupled to the portfolio screen; some PMs would call it one feature. I kept it separate because it owns real logic (accepting incomplete info, kicking off auto-context and the first Development Review) and makes a clean starter ticket. *(19 → 18.)*
- **Merge Consultant Checklist (F17) + City Comment Management (F18)** into one "Requirement & Comment Tracking" feature sharing the assignable-item engine. *(18 → 17.)*

I'd **stop at 19** for the first build. Beyond that you start merging things that different engineers can legitimately own in parallel, which fights the whole Lego-block goal.

---

## 6. Coverage check (nothing dropped)

Every one of the original 33 items maps to exactly one consolidated slice; no capability is removed.

| Original | Lands in | Original | Lands in |
| --- | --- | --- | --- |
| 1 | F1 | 15 | F12 |
| 2 | F2 | 16 | F12 |
| 3 | F3 | 17 | F11 |
| 4 | F4 | 18 | F13 |
| 5 | F5 | 19 | F14 |
| 6 | F6 | 20 | F15 |
| 7 | F6 | 21 | F16 |
| 8 | F7 | 22 | F17 |
| 9 | F8 | 23 | F18 |
| 10 | F9 | 24 | F10 |
| 11 | F11 | 25 | F19 |
| 12 | F10 | 26 | F2 + F13 |
| 13 | F10 | P1 | P1 |
| 14 | F10 | P2 | P2 |
| | | P3 | P3 |
| | | P4 | P4′ |
| | | P5 | P4′ |
| | | P6 | P5′ |
| | | P7 | P6′ |

Result: **26 full → 19**, **7 placeholder → 6**, **33 total → 25**. Scope unchanged.

---

## 7. Final thoughts

The list wasn't bloated with junk — it was a clean *union* of two people's lists, which naturally produces the same feature described twice and a few over-thin splits. Four merges fix most of it and, helpfully, pull the structure **toward** the architecture you already chose rather than against it: the Development Review consolidation (F10) is literally how [tech_stack.md](tech_stack.md) already describes the feature folder, and the shared-entity model there (`finding`, `assumption`, `risk`) already implies the Findings Register (F11).

My one real recommendation to *discuss* rather than just accept is **F11** (merging the assumption ledger and risk register). It's the right engineering call, but the assumption ledger is your strategic centrepiece, so make the merge a deliberate decision, not a silent one — and if it feels wrong, take the fallback (two features, one shared table).

Everything else I'd treat as low-risk cleanup. If you're happy with this, the natural next step is for me to produce a **revised `mvp_feature_list.md`** written against the 19-feature structure (same descriptions, regrouped), plus a suggested **owner-per-feature** cut so you and Gurinder can divide them. Say the word and I'll draft it.
