# TRIBUNUS — Feature List, Ranked by Priority

*Same features, sorted by importance to THIS startup. Feature A = most central to the core value and defensibility; descending from there.*

**Read the ranking honestly:** this is a sort by *strategic importance*, not build order. A few low-ranked items are hard **[GATE]**s — you can't launch without them even though they don't differentiate you. Those are tagged.

*Each feature has two descriptions: the original (for someone who knows real-estate development) and an **In plain terms** version (for anyone with zero development background — jargon explained inline).*

---

### Feature A — Development Assumption Ledger
The moat. Structured list of every critical assumption with value, source, effective date, confidence, dependent documents, consequence-if-wrong, owner, resolution. This is the "system of record for verified assumptions" the thesis says is the *only* defensible position. Everything else exists to populate and maintain this.

**In plain terms:** Every real-estate project is built on a stack of "we're assuming this is true" beliefs — like "we're allowed to build 6 storeys" or "the city fees will be $2M." If even one of those guesses is wrong, it can wreck the budget or timeline. This feature is a running scoreboard of those risky guesses: for each one it shows where the fact came from, how confident we are, who's responsible for confirming it, and what breaks if it's wrong. It's the heart of the product, because catching a single bad assumption early can save a developer a fortune.

### Feature B — Run Development Review
The primary action and the "aha." One button → one coherent, cited result (top risks, pathway, fees, precedents, next actions). Without it the ledger and registers stay empty; it's how value is delivered and how repeat use starts.

**In plain terms:** This is one big "Analyze my project" button. The user clicks it and the software does all the homework, then hands back a single plain-English report: the biggest dangers, the government approval steps ahead, the fees owed, similar past projects, and what to do next. Instead of ten confusing tools, there's one button and one clear answer. This is the moment the user goes "wow, this is useful."

### Feature C — Verified Site Baseline
First major deliverable per project and the factual foundation everything else reasons from. Every value carries source, page, effective date, and a status label. If this is wrong, all downstream findings are wrong.

**In plain terms:** This is the starting fact-sheet for a piece of land: what you're currently allowed to build there and under what rules. ("Zoning" = the city's rulebook that says what can go on a given lot — how tall, how dense, what use.) Every fact on the sheet shows its source, the date it took effect, and whether it's confirmed or still a guess. If this foundation is wrong, everything the software says after it is wrong too — so it has to be rock solid.

### Feature D — Evidence & Citation Viewer
The trust backbone — the "cited" in your definition of done. Links every material claim to an original source and distinguishes Verified / Calculated / Assessment / Unknown. Cross-cutting, but cutting it makes every other feature untrustworthy. *Non-negotiable for a decision-grade product.*

**In plain terms:** Every claim the software makes comes with a receipt — a link to the original city document, the exact page, and the date. It also clearly labels each statement as a hard fact, a calculation, the software's own opinion, or an unknown that still needs checking. This is how a developer trusts the tool instead of worrying the AI just made something up. Without receipts, none of the other features can be believed.

### Feature E — Risk & Action Register
Turns analysis into persistent, assignable, tracked items — the difference between "a report" and "a risk-control system." Second core differentiated object after the ledger.

**In plain terms:** This is a living to-do list of every problem the software found. Each item shows how serious it is, who owns it, a due date, and whether it's been dealt with. It turns "here's a report you'll read once and forget" into "here are specific tasks someone on the team has to actually close out." That follow-through is what makes it a safety system rather than just an analysis.

### Feature F — Structured Project Profile
The confirmed source of truth every analysis runs off. Extracts the project facts, flags internal conflicts, and forces user confirmation before deeper work. Garbage-in control point.

**In plain terms:** The software reads your uploaded files and pulls out the key numbers — how many homes, how tall, how big the building is — into one tidy summary that you then confirm or correct. It also warns you when two of your own documents disagree (say, one file says 210 apartments and another says 218). Everything the tool does later depends on these confirmed numbers being right. So it's the "check your inputs before you trust the outputs" step.

### Feature G — Comparable Project & Precedent Search
A primary source of differentiated value — precedent/decision intelligence is hard to replicate and directly informs risk. Can be manually curated for the pilot, which lowers cost but not importance.

**In plain terms:** This finds past projects near you that are similar to yours and shows how they turned out. ("Density" or "FSR" = how much building you're allowed to pack onto a lot.) If a similar nearby project had its height cut by the city or got hit with an extra fee, that's a strong warning the same could happen to you. It's learning from real history instead of guessing — and that local memory is hard for competitors to copy.

### Feature H — Approval Pathway & Requirements Checklist
High-value, municipality-specific deliverable: pathway, decision-maker, stages, required docs/consultants/studies, dependencies, unknowns. Core to the "what actually happens next" question developers pay for.

**In plain terms:** This is a roadmap of every government approval your project needs and in what order. ("Rezoning" = asking the city to change its rulebook so you can build something the current rules don't allow; a "development permit" = the city's sign-off on your specific design.) It also lists which outside experts and studies you'll have to hire and produce. So you can see the whole obstacle course before you start running it, instead of discovering hurdles halfway through.

### Feature I — Fees & Contributions Review
Concrete, high-exposure output (DCLs/DCCs/CACs/ACCs). Directly tied to the pro forma — a stale rate is exactly the kind of costly assumption Tribunus exists to catch.

**In plain terms:** This adds up the government fees your project will owe. Cities charge developers various fees (DCCs, DCLs, CACs, ACCs — money collected to help pay for roads, parks, and public services) that can run into the millions and change often. The tool shows the current rate, when it's about to change, and where the number came from. Using an out-of-date fee number can quietly blow a hole in a project's budget, which is exactly what this catches.

### Feature J — Document Upload & Versioning
The raw material intake. No uploads → nothing to analyze. Foundational input plumbing.

**In plain terms:** This is where the user drags in their project files — PDFs, architectural drawings, spreadsheets, city letters. It keeps everything organized by type and remembers the old versions when a file gets replaced. It's not glamorous, but without files coming in, the software has nothing to analyze.

### Feature K — Internal Analyst Review Console
Mandatory for a trustworthy pilot. Lets your team verify/correct/approve before results ship ("under Tribunus review" until approved). This is the lever that lets you *concierge* half the customer-facing list instead of building it.

**In plain terms:** This is a behind-the-scenes control room where the Tribunus team checks the AI's work before the customer ever sees it. They can fix mistakes, approve the good findings, and stamp the result "ready." Early on, having a human quietly double-check is far safer than trusting the robot completely. It also lets you *pretend* many features are automated while a person actually does the work — a smart shortcut for a pilot.

### Feature L — Analysis Orchestration & Verification (Quality Gates)
Enforces evidence requirements, confidence labels, and rejection of unsupported findings. Cheap to build, and it's what keeps the AI from confidently lying — protecting the trust the whole pitch rests on.

**In plain terms:** These are the internal rules that force the AI to back up every claim with proof — or else keep quiet. If a finding has no source behind it, it gets thrown out or clearly marked "unsure." Think of it as the seatbelt that stops the AI from confidently stating something false. It's cheap to build but protects the trust the entire product depends on.

### Feature M — Create Project
The entry point to the whole workflow. Simple, but everything begins here; must accept incomplete info.

**In plain terms:** This is the simple form where a user starts a new project by typing in the address and a few basics. It's the front door to everything else the tool does. Importantly, it lets people begin even when they don't have every detail yet.

### Feature N — Reports & Export (Development Brief)
How value escapes the app and spreads inside the firm (principals, IC, consultants). Drives internal advocacy and renewal conversations.

**In plain terms:** This is a one-click clean PDF or Word summary the user can email to their boss, investors, or partners. It packages up the findings so the work spreads through the company instead of staying trapped in the app. Often this is how more people at a firm get won over and decide to keep paying for the tool.

### Feature O — Deterministic Calculators
Non-AI math for FSR, fees, areas, dates. Small but essential — free-form model arithmetic on fees is a credibility-killer. Underpins Features I and C.

**In plain terms:** This is plain, reliable math done by normal computer code — not by the AI — for things like fees and floor-area calculations. AI is great at reading documents but surprisingly bad at arithmetic, so anything involving money is handed to a regular calculator that always gives the same correct answer. Each result also shows its formula, so the numbers can be trusted. Small piece, but a wrong fee number destroys credibility instantly.

### Feature P — Municipal Source Registry & Versioning
Keeps current vs. superseded rules from mixing — the integrity layer behind every "effective date" claim. Curated manually at pilot scale, but the discipline can't be skipped.

**In plain terms:** This is a carefully kept library of every official city document the tool relies on, each tagged with dates. City rules change over time, so the system must never confuse "the rule today" with "the rule from three years ago." This careful bookkeeping is what makes every "as of this date" claim honest. At pilot size a person can maintain it by hand, but the discipline can't be skipped.

### Feature Q — Project Portfolio Dashboard
The product home and daily-use surface. Important for the multi-project firm story, but only matters once single-project value exists.

**In plain terms:** This is the home screen that lists all your projects at a glance, with a quick status snapshot for each one. It matters most for firms juggling several sites at the same time. But it only becomes useful once a single project already delivers real value — so it follows, rather than leads.

### Feature R — Firm Workspace & User Accounts  **[GATE]**
Table-stakes plumbing, low differentiation — but required for a real firm to use it collaboratively. Rank low on importance, but it's a prerequisite, not a "later."

**In plain terms:** This is the basic login and team setup, so a whole company can use the tool together with the right people getting the right access. It's boring and doesn't make the product special. But nobody can use the product at all without a way to log in — so despite its low "importance," you can't skip it.

### Feature S — Security & Confidentiality / Audit Logs  **[GATE]**
Not a differentiator, but a hard gate: firms will not upload private feasibility studies or City correspondence without encryption, data separation, and access controls. Low importance, non-optional.

**In plain terms:** These are the locks on the door — encryption, access controls, and keeping each company's private files walled off from every other company's. Developers won't upload their sensitive financial documents and private city correspondence unless they're confident it's safe. It doesn't make the product more impressive, but if it's missing, the deal is dead.

### Feature T — Council, Staff & Decision Trace
Deepens precedent value (the "why did it get approved/changed" narrative). High value but an enrichment of Feature G — can start shallow.

**In plain terms:** This digs into the *story* behind how a past project got approved — what city staff objected to, what the developer changed in response, and what the council finally decided. It answers "*why* did it turn out that way," not just "what happened." That helps you anticipate the negotiation and pushback you'll face on your own project. It's a deeper layer on top of the comparable-projects feature, so it can start simple.

### Feature U — Automatic Parcel & Municipal Context
Valuable auto-fill on address entry, but the highest data-engineering cost and a strong concierge candidate for the pilot — hence ranked below the things it merely accelerates.

**In plain terms:** The moment you type in an address, the tool automatically fills in what it knows about that lot — its rules, nearby projects, transit access. It's a nice convenience, but it's expensive to build, so early on a person can just look this up by hand for the handful of pilot projects. That's why it ranks lower than it might feel — it speeds things up rather than being the value itself.

### Feature V — Ask This Project (Contextual Chat)
Useful, sticky, but secondary — the product's value must land *before* chat, and it depends on everything above already existing.

**In plain terms:** This is a chat box that answers questions about your specific project, using your uploaded files and the city's rules — and it always shows its sources. It's like ChatGPT, except it only knows and talks about this one project. It's handy and keeps people coming back, but the tool has to prove its worth first — chat alone isn't the selling point.

### Feature W — Change Detection & Refresh Analysis
Creates the repeat-use loop, but only relevant after the first review delivers value. Important for retention, not for the first "aha."

**In plain terms:** When you upload a new version of a drawing or plan, the tool spots exactly what changed and re-checks only the parts affected. It tells you which risks are now solved and which new ones just appeared. This is what makes people keep using the tool over the life of a project instead of just once. Valuable for retention, but it only matters after the first analysis has already impressed them.

### Feature X — Project Watch (Monitoring, Alerts & Digest)
The recurring-revenue justification — but heaviest ongoing data-ops burden and only matters after a project exists in the system. Can start as a manual weekly process.

**In plain terms:** This is an automatic watchdog that keeps monitoring the city for changes that affect your project — new fees, rule changes, nearby developments — and pings you only when something actually matters to you. This is the "keep paying us every month" feature, because the world keeps changing after your analysis is done. It's also the most work to run reliably, so it can start as a human checking once a week. Important for long-term revenue, but not needed for the first impression.

### Feature Y — Application Readiness Review
Genuine value, but overlaps heavily with Features F and E — likely a *mode* of the Development Review rather than a standalone build.

**In plain terms:** This is a pre-submission check that hunts for gaps before you hand your package to the city — missing studies, documents that contradict each other, city questions you never answered. It's genuinely useful, but it overlaps a lot with checks the tool already does elsewhere. So it may just be one setting of the main review rather than a separate feature to build.

### Feature Z — Feedback & Outcome Capture
Builds your private evaluation dataset (the real long-term moat), but yields compounding value over time, not at pilot launch.

**In plain terms:** This lets customers tell the tool when it was right or wrong, and what actually ended up happening with the city. Over time, all that feedback becomes private training data that makes Tribunus smarter than any competitor. It's hugely valuable in the long run, but it pays off gradually — not on day one of a pilot.

### Feature AA — Municipal Data Ingestion & Adapters
The scalable version of Features P and U. Ranked low *only for MVP* — you fake it with curation now; it becomes critical the moment you add a third municipality.

**In plain terms:** This is the machinery that automatically pulls in and updates city documents, instead of a person copying them over by hand. You don't need it while you only cover two cities and can keep them current manually. But it becomes essential the day you expand to a third city and manual work stops scaling. Low priority now, high priority later.

### Feature AB — Structured Municipal Knowledge Base
The organized backing store for ingested data. Follows from Feature AA; premature before you have volume.

**In plain terms:** This is the organized database where all the collected city information gets stored so the tool can use it. It only really makes sense once you have a large amount of data worth organizing. Before that point, building it is premature.

### Feature AC — Entity Matching & Linking
Connects address ↔ parcel ↔ application ↔ decision, etc. Required for reliable timelines at scale; overkill for a handful of curated pilot projects.

**In plain terms:** This is the plumbing that connects the dots — recognizing that this address, this application, this council decision, and this drawing all belong to the same project. It's needed to build reliable project histories automatically at scale. For a small set of hand-picked pilot projects, though, it's overkill — a person can connect those dots.

### Feature AD — Analysis Run History
Auditability and debugging of analyses. Good hygiene, low urgency for the first pilot.

**In plain terms:** This is a logbook that records every analysis the tool ran and what it produced. It's useful for tracking down bugs and proving what the tool actually said and when. Good housekeeping, but not urgent for the very first pilot.

### Feature AE — City Comment Management
Strong expansion feature (deepens the workflow into active applications), but explicitly Phase 2 in your own docs.

**In plain terms:** When the city reviews your application, it usually sends back a letter full of comments and objections. This feature tracks each comment individually and whether you've answered it. It's great for projects already deep in the approval process — but your own plan puts it in the "later" pile.

### Feature AF — Consultant Coordination
High future value (the "coordination control room" vision) but clearly post-MVP; adds surface area without proving the core wedge.

**In plain terms:** A project needs outside experts — engineers, architects, environmental specialists ("consultants"). This feature tracks who owes what and whether they've delivered. It's valuable later as a coordination hub, but it adds a lot of complexity without proving the core idea, so it waits.

### Feature AG — Cross-Document Consistency Checking
Powerful but hard, and depends on richer document understanding than the MVP has. Later.

**In plain terms:** This automatically compares all your different drawings and reports against each other to catch spots where they disagree. It's powerful but technically hard, and it needs the basics working solidly first. Definitely a later addition.

### Feature AH — Development Scenario Comparison
Compelling for feasibility, but requires the core analysis to be solid first. Expansion.

**In plain terms:** This lets you compare a "safe" version of a project against an "ambitious" version side by side — how many homes, how much risk, how many fees, how long each would take. It's compelling for early planning, but it only works once the core analysis underneath is reliable. An expansion feature.

### Feature AI — Timeline Forecasting
Valuable but data-hungry (needs comparable-timeline volume you won't have early). Later.

**In plain terms:** This estimates how long each approval stage will take, based on how long similar projects took in the past. To do that well it needs a lot of historical timing data — which you won't have early on. So it comes later.

### Feature AJ — Portfolio-Level Intelligence
Only meaningful once firms run many projects in Tribunus. Naturally late.

**In plain terms:** This zooms out to spot patterns and shared risks across *all* of a company's projects at once. It's only meaningful once a firm is running many projects inside the tool. Naturally, that's a late-stage feature.

### Feature AK — Nearby Competition Monitoring
Adjacent value (market supply), further from the core risk-control wedge. Expansion.

**In plain terms:** This watches other developments going up near yours, so you can judge how much competing housing supply is coming. It's useful market information, but it's off to the side of the tool's core job of catching costly mistakes. An expansion feature.

### Feature AL — Municipality Comparison
Only relevant with broad multi-municipality coverage — the furthest from the two-city MVP. Lowest priority.

**In plain terms:** This compares whole cities against each other on how fast they approve projects, how high their fees are, and how developer-friendly they are. It only becomes useful once the tool covers many cities. For a two-city product, it's the lowest priority of all.

---

## The one judgment call to challenge me on

The top 5 (Features A–E: Ledger, Development Review, Baseline, Citations, Risk Register) are the irreducible core — I'm confident there. The contestable zone is **Features G–P**: how much precedent/pathway/fee depth is needed for the *first* cited review, versus how much your Internal Review Console (Feature K) lets you fake with human curation. If concierge can cover Features G–I for 5–10 pilot projects, your true build list shrinks dramatically. That's the conversation worth having with your co-founder.
