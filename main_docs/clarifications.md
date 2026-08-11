# Tribunus — MVP Focus: Decisions & Open Questions (for the CEO)

*Purpose: our consolidated MVP is a coherent 19-feature product (see [locked_feature_list.md](locked_feature_list.md)), but a product-lens review found it quietly spanned roughly **three different wedges** — three jobs, three buyers, three competitive fields. MVP doctrine says pick **one** wedge and be undeniably great at it; breadth is the expansion path, not the start. Two of those choices are **already decided** (below); this doc records them so they're not re-litigated, then puts the three **genuinely open** decisions to the CEO. Supporting analysis: [feature_consolidation_proposal.md](feature_consolidation_proposal.md) and [domain_knowledge.md](domain_knowledge.md).*

**Date:** August 2026 · **Outcome:** a focused pilot scope + a "pilot vs. expansion vs. placeholder" tiering of the 19 features.

---

## Already decided (context — not up for debate)

These are settled and are stated here only so the plan builds on them consistently.

**Buyer = large developers.** Sophisticated, portfolio-scale, feel approval risk as a real budget line (a stalled rezoning is millions in carry). They already own underwriting tools (Argus/Excel), and they answer to investment committees.

**Wedge = B, Entitlement & Approval-Risk Intelligence.** *"Will this get approved, what will kill it, and what will it really cost?"* — de-risking the path from concept through municipal approval, every claim cited to a municipal source. This is the pre-permitting intelligence problem, and it's the one wedge with genuine white space (no one does cited, verifiable municipal-risk intelligence today) and the hardest to copy, because it compounds on our municipal corpus and citation engine. The independent product review reached the same conclusion.

**What the other two wedges become.** *Wedge A — Acquisition & Feasibility* ("should we buy?") is a crowded field (Deepblocks, feasibility tools, Excel); we take only its strongest pieces — the address-first baseline and fee stack — as Wedge B's instant-value on-ramp, not as a separate product. *Wedge C — Project & Compliance Management* ("keep the live file on track": consultant tracking, city-comment management) is workflow software competing with Northspyre/Dealpath; it's a natural **expansion after B is proven**, not part of the pilot.

**Two implications of the "large developer" buyer, baked into the plan:**

- **Portfolio monitoring is core, not expansion.** Large developers run many concurrent projects, so cross-project exposure (fee changes, policy shifts, council trends) and Project Watch are part of the pilot's core value.
- **Design for the manager, sell to the principal.** The daily user is the development / project manager who owns the file; the economic buyer is the principal / VP Development who signs off and shows results to an investment committee — which is why the cited report/export and the trust-backbone carry extra weight.

---

## The three open decisions

### Question 1 — How far do we go into the deal's economics?

Large developers ultimately decide on one number: the return / residual land value. Our wedge tells them the fees and risks but currently stops short of connecting to that number. Because they already trust Argus/Excel for the modelling, the question is only how far we reach toward it.

- **Thin bridge** *(Recommended)* — no underwriting engine; just translate a fee or risk into its impact on cost-per-buildable-square-foot or margin, so findings connect to the decision. Turns "interesting report" into "I can't underwrite without this," without competing with the tools they already use.
- **Stay out entirely** — keep Tribunus purely intelligence; defer the feasibility/comps feature; leave all economics to existing tools.
- **Full feasibility** — build real pro-forma / land-value modelling (this re-enters Wedge A and breaks the one-wedge principle).

*Decides:* whether the sales-comps/feasibility feature stays as a bridge, shrinks, or is deferred.

### Question 2 — What do we defer to protect the wedge?

A few strong-sounding features actually belong to Wedge C and dilute focus. They're valuable — later.

- **Defer the Wedge-C features** *(Recommended)* — move the consultant/dependency checklist and city-comment management to placeholders or post-pilot. They're workflow tools with different DNA that don't compound on our intelligence moat, and large developers likely already have process/tools for them.
- **Keep one as a working "hook"** — e.g. keep city-comment management live because its extracted comments feed the Development Review; defer the rest.
- **Keep everything, build thinner** — retain all 19 as full features and accept less depth (against the one-wedge principle).

*Decides:* the concrete cut list. Confirming the wedge without confirming the cuts just re-creates the sprawl.

### Question 3 — The one thing we ADD: the feedback / outcome loop

Not everything is cutting. The review found one real *gap* that's core to Wedge B. Our long-term thesis is that human-in-the-loop analysis today generates proprietary evaluation data that lets us automate and defend the moat tomorrow — but we currently **defer** the feature that captures that data.

- **Pull a lightweight outcome loop into the pilot** *(Recommended)* — capture, per finding: was it correct? how did the municipality actually respond? what was the final outcome (approved / revised / withdrawn)? This is the data moat that justifies the analyst cost and trains future automation.
- **Keep it deferred** — add it only after the base review is proven (risk: we pay the human-in-the-loop cost during the pilot but capture none of the data that was the point).

*Decides:* whether the pilot is a demo or a compounding asset.

---

## Recommended answers (grounded in [startup_viability.md](startup_viability.md))

The market validation sharpens — and does not change — the direction. Recommended answers to take to the CEO:

**Wedge (confirm): B — Entitlement & Approval-Risk Intelligence, spearpoint sharpened to "always-current, cited approval-risk + fee intelligence."** The acute, un-served pain the research surfaced is that BC's rules just changed (Bill 44/46/47) and are still inconsistent and litigated (Bill 25, municipal judicial reviews) — impossible to track by hand. Lead with the one thing only we do: keep every zoning/fee/policy fact current, dated, and cited, and surface what will kill or cost the project. *(Evidence: 13–14-month approvals, fees varying 10×, live regulatory upheaval, no BC developer-side competitor found.)*

**Q1 — Economics: Thin bridge.** Don't build underwriting; connect fees/risks to cost-per-buildable-SF / margin. Large developers already trust Argus/Excel; competing there wastes focus and credibility. *(Evidence: soft costs are 15–30% of budget and already modelled in existing tools.)*

**Q2 — Defer Wedge-C: yes.** Move the consultant checklist and city-comment management to placeholders / post-pilot. They're workflow tools that collide with well-funded US incumbents (PermitFlow ~$91M, GreenLite ~$86M) and don't compound our intelligence moat. Keep only the cheap city-comment *extraction* if it directly feeds the Development Review. *(Evidence: adoption research — you win by being a must-have on one thing, not broad.)*

**Q3 — Pull the feedback / outcome loop IN: yes, strongly.** It's how the pilot proves the *business* (does a finding change a real decision?) and builds the proprietary data moat. Without it we pay the human-in-the-loop cost and learn nothing. *(Evidence: ~67% of proptech implementations fail on nice-to-have / ROI; the loop is our must-have instrument.)*

**Two strategic flags for the CEO (not blocking decisions):**

- **Portfolio monitoring is core, not expansion** for this buyer — large developers run many concurrent projects under changing rules.
- **Design to expand jurisdictions from day one.** BC alone is a narrow, concentrated market (dozens to ~100 accounts); venture-scale needs metro #2 to be a data-slice add, not a rewrite. Consider **planning consultants as a distribution channel**, since they're the trusted incumbent, not just a competitor.

---

## Context that would sharpen the answers (not decisions)

- **Who are our first 1–3 design partners specifically?** Large developers active in Vancouver/Coquitlam approvals reinforce every choice above; a partner focused on land acquisition would pull toward the economics question.
- **Is there a hard pilot deadline?** A tight timeline is itself an argument for the narrowest possible wedge — one feature partners love beats five they tolerate.

---

### What happens once these are answered

With the three decisions settled, the next deliverable is a re-tiered feature list — **Pilot (Wedge B core) / Expansion (Wedge A & C) / Placeholder** — with the added outcome-loop feature slotted in. That becomes the buildable scope for the team.
