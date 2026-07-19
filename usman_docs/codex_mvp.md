# Codex MVP — 2-3 Day Design-Partner Sprint

## Bottom line

With **two developers and 2–3 days**, Tribunus should launch as a **concierge-grade design-partner MVP**:

> A developer creates a project, uploads its current documents, clicks **Run Development Review**, and receives a cited project baseline, critical assumptions, relevant precedents, major risks, and recommended actions.

Do **not** attempt fully automated Vancouver and Coquitlam data ingestion, perfect fee calculations, GIS intelligence, continuous monitoring, CAD review, or approval prediction in this build. Those require substantially more data engineering and validation.

Use the **Codex SDK server-side** to run and resume structured agent threads. OpenAI specifically recommends the SDK for application workflows and automated jobs; the App Server is intended for deeper client experiences involving streamed agent events, approval handling, and conversation history. Codex skills can package repeatable instructions, scripts, and reference files for each Tribunus workflow. [[1]](https://developers.openai.com/codex/codex-sdk)

---

## Final 2–3 Day MVP Feature List

### 1. Firm Login

Minimum functionality:

* Email login or magic link
* One design-partner company workspace
* Admin and member roles
* Projects isolated within the firm

Do not build advanced enterprise permissions yet.

### 2. Project Portfolio

A simple homepage showing:

* Project name
* Address
* Municipality
* Development type
* Current stage
* Review status
* Number of open risks
* Last analysis date

Primary action:

> **Create Project**

### 3. Create Project

Required inputs:

* Project name
* Address
* Municipality: Vancouver or Coquitlam
* Project type: townhouse, multifamily, or mixed-use
* Stage:
  * Acquisition screening
  * Feasibility
  * Pre-application
  * Application preparation
  * Under municipal review
* Approximate units
* Height/storeys
* Target FSR, when known
* Short project description

The form must allow incomplete information.

### 4. Document Upload

Support:

* PDF
* Word
* Excel
* Images

Suggested document categories:

* Concept drawings
* Project statistics
* Planning rationale
* Feasibility study
* Consultant report
* City correspondence
* Staff comments
* Fee information
* Other

For the MVP:

* Store the original file
* Extract readable text
* Allow deletion and replacement
* Show the files associated with the project

Do not build advanced drawing interpretation or CAD support.

### 5. Structured Project Profile

Tribunus extracts and displays:

* Site address
* Proposed use
* Units
* Height
* Storeys
* FSR
* Site area
* Parking
* Setbacks
* Tenure
* Requested variances or amendments
* Current project stage

The developer must be able to edit and confirm the extracted facts.

This confirmed profile becomes the source of truth for every analysis.

### 6. One Primary Action: Run Development Review

Do not expose ten different "skills" initially.

The project page should have one main button:

> **Run Development Review**

Internally, it triggers several Codex workflows. Externally, it produces one coherent result.

The review should answer:

1. What assumptions is the project relying on?
2. Which assumptions are verified, uncertain, or unsupported?
3. What requirements and fees appear applicable?
4. Which historical projects are relevant?
5. What are the most important risks?
6. What should the developer do next?

---

## Development Review Output

### 7. Project Baseline

Display:

* Municipality
* Current zoning, when available
* Applicable plan or policy references
* Likely approval pathway
* Key development requirements found
* Potential fees and contributions
* Missing information requiring confirmation

Every item must show one of these labels:

* **Verified**
* **Calculated**
* **Tribunus assessment**
* **Requires confirmation**

Every verified factual claim must link to its source.

For the first pilot, the Tribunus team may manually upload the relevant Vancouver and Coquitlam municipal source files instead of building automatic jurisdiction-wide retrieval.

### 8. Assumption Ledger

Create a table such as:

| Assumption | Value | Status | Potential exposure |
| --- | --- | --- | --- |
| Target density | 3.2 FSR | Requires confirmation | High |
| Proposed units | 180 | Verified from drawings | Medium |
| Applicable DCC rate | Current published rate | Requires review | High |
| Setback relaxation | 2.5 metres | Unsupported | High |

Each assumption needs:

* Value
* Source
* Confidence/status
* Explanation
* Consequence if incorrect

The assumption ledger is the core differentiated feature.

### 9. Comparable Project Research

The user should receive approximately **three to five comparable projects**.

For each comparable:

* Project name/address
* Municipality
* Proposed development
* Why it is comparable
* Important differences
* Staff recommendation
* Known revisions or amendments
* Final outcome
* Source documents

For the design-partner MVP, the comparable-project dataset can be manually curated for Coquitlam and Vancouver.

Do not promise exhaustive municipality-wide search yet.

### 10. Risk and Action Register

Convert the analysis into persistent findings.

Each finding should contain:

* Risk title
* Category
* Severity: High, Medium, or Low
* Confidence
* Explanation
* Supporting evidence
* Potential project impact
* Recommended action
* Status: Open, Reviewing, or Resolved

Initial categories:

* Zoning/policy
* Fees
* Density/height
* Setbacks
* Approval process
* Infrastructure
* Application completeness
* Historical precedent
* Document inconsistency

The user should be able to change the status and add notes.

### 11. Recommended Next Actions

The system should produce no more than five clear actions, for example:

* Confirm the applicable DCC rate with Coquitlam.
* Resolve the conflicting unit count between the planning rationale and drawings.
* Test a lower-density scenario.
* Commission an early servicing review.
* Prepare a precedent brief before the City meeting.

Avoid long AI-generated reports as the primary output.

### 12. Ask This Project

Provide a contextual chat panel using:

* Confirmed project profile
* Uploaded documents
* Development Review result
* Comparable projects
* Curated municipal source files

Example questions:

* Why was density marked high risk?
* Which assumption has the largest financial exposure?
* Show the strongest comparable project.
* What should we ask the City?
* Summarize the unresolved issues.

Answers must cite available source files and clearly label uncertain interpretations.

### 13. Refresh Analysis

After the developer changes the project profile or uploads another file:

> **Refresh Development Review**

The system should:

* Re-run the workflow
* Preserve the previous result
* Show newly added, removed, or changed findings
* Update the assumption and risk registers

This creates the first repeat-use loop.

### 14. Exportable Project Brief

Export a simple PDF containing:

* Project profile
* Baseline findings
* Assumption ledger
* Comparable projects
* Risk register
* Recommended actions
* Sources and limitations

This is necessary because the design partner will likely share the result internally with principals, planners, architects, and consultants.

### 15. Internal Review Console

This is mandatory for a real pilot.

Before publishing an analysis, the Tribunus team must be able to:

* Review extracted project facts
* Edit incorrect findings
* Add or remove sources
* Change confidence levels
* Approve the final review
* Re-run individual workflows
* Mark the result ready for the customer

The first version should display:

> **Analysis under Tribunus review**

until it is approved.

Human review is not a weakness at this stage. It protects trust while generating the examples and evaluation data needed to automate later.

---

## Required Codex Workflows

Implement only these five internal workflows.

**Workflow 1 — Project Fact Extraction**

```text
Uploaded files
→ Extract project facts
→ Detect conflicting values
→ Produce structured project profile
```

**Workflow 2 — Municipal Baseline**

```text
Confirmed project profile
+ curated Vancouver/Coquitlam sources
→ Identify potentially applicable requirements
→ Extract supporting citations
→ Mark unresolved questions
```

**Workflow 3 — Assumption Analysis**

```text
Project profile
+ project documents
+ baseline
→ Identify critical assumptions
→ Classify verified/unsupported/uncertain
→ Estimate consequence if incorrect
```

**Workflow 4 — Precedent and Risk Analysis**

```text
Project characteristics
+ curated comparable-project records
→ Rank relevant projects
→ Compare proposals and outcomes
→ Generate candidate risks and actions
```

**Workflow 5 — Verification and Compilation**

```text
Candidate results
→ Check claims against sources
→ Reject unsupported findings
→ Check output schema
→ Compile final Development Review
```

Codex's documented agent loop follows the same general pattern: plan, execute, run tools, observe results, repair failures, and repeat. OpenAI recommends externalized state, explicit acceptance criteria, and validation before moving to the next milestone. [[2]](https://developers.openai.com/blog/run-long-horizon-tasks-with-codex)

---

## Minimum Technical Modules

The two developers need to implement:

1. Authentication
2. Company and project database
3. File storage and text extraction
4. Project-profile schema
5. Codex SDK execution service
6. Five versioned workflow prompts/skills
7. Curated municipal-source storage
8. Curated comparable-project storage
9. Structured JSON output schemas
10. Citation/source mapping
11. Risk and assumption database
12. Human review console
13. Project-aware chat
14. PDF export
15. Basic deployment, logging, and error handling

---

## Explicitly Excluded

Do not build these during the 2–3 day sprint:

* Automated scraping of every municipal source
* Live GIS or parcel mapping
* Automated DCC/CAC/ACC calculation engine
* Automatic weekly Project Watch
* Nearby-project monitoring
* Council-video transcription
* Full historical application database
* CAD/BIM drawing review
* Consultant coordination
* City comment management
* Approval probability
* Construction-code certification
* Mobile app
* Multi-municipality expansion beyond Vancouver and Coquitlam

---

## Final MVP User Flow

```text
Log in
   ↓
Create project
   ↓
Enter basic project assumptions
   ↓
Upload available documents
   ↓
Tribunus extracts project profile
   ↓
Developer confirms the facts
   ↓
Click "Run Development Review"
   ↓
Codex workflows analyze facts, sources, assumptions and precedents
   ↓
Tribunus team verifies the result
   ↓
Developer receives:
• Project baseline
• Assumption ledger
• Comparable projects
• Risk/action register
• Recommended next actions
   ↓
Developer asks follow-up questions
   ↓
Developer uploads a revision
   ↓
Refresh analysis
```

## Definition of Done

The MVP is complete when your design partner can take **one real Coquitlam project**, upload its current materials, and receive a trustworthy, cited review that identifies at least one assumption or risk worth discussing internally.

That is realistic in 2–3 days.

A fully automated Vancouver-and-Coquitlam intelligence platform is not.

---

**Sources**

1. [OpenAI Developers — Codex SDK.](https://developers.openai.com/codex/codex-sdk)
2. [OpenAI Developers — Run long horizon tasks with Codex.](https://developers.openai.com/blog/run-long-horizon-tasks-with-codex)
