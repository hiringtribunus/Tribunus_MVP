# Tribunus Product Feature List

## Phase 1 — Deployable MVP

These are the features required to pilot Tribunus with a real development firm.

### 1. Company and User Accounts

* User login and password reset
* Company workspace
* Team-member invitations
* Basic roles: Admin, Member, Viewer
* Project access permissions

### 2. Project Portfolio

A dashboard showing all development projects with:

* Project name and address
* Municipality
* Development type
* Current stage
* Open risks
* Recent changes
* Last analysis date

### 3. Create Project

Users should be able to create a project using:

* Property address or parcel
* Municipality
* Proposed development type
* Current project stage
* Approximate units, height and density
* Short project description

### 4. Project Document Upload

Support uploading:

* Architectural drawings
* Planning rationale
* Site surveys
* Feasibility reports
* Consultant reports
* City correspondence
* Staff comments
* Fee calculations
* Spreadsheets
* PDFs and images

Files should be organized by category and version.

### 5. Automatic Project Profile

Tribunus extracts and structures:

* Existing zoning
* Proposed use
* Site area
* Height
* Density and FSR
* Unit count
* Tenure
* Parking
* Setbacks
* Floor area
* Requested amendments
* Project stage

The user must be able to confirm or correct extracted information.

### 6. Verified Site Baseline

For each property, Tribunus should identify:

* Current zoning
* OCP, NCP or area-plan designation
* Applicable policies
* Permitted uses
* Height, density and setback rules
* Known overlays or constraints
* Relevant transit and infrastructure context
* Source and effective date for each requirement

### 7. Fees and Charges Review

Display the current applicable:

* Development Cost Charges
* Development Cost Levies
* Application fees
* Park contributions
* Utility charges
* Regional charges
* Known community contributions

Include:

* Current rate
* Effective date
* Upcoming announced changes
* Source
* Deterministic calculations where possible

### 8. Development Assumption Ledger

Maintain a list of critical project assumptions:

| Assumption | Current value | Status | Risk |
| --- | --- | --- | --- |
| Permitted density | 2.5 FSR | Verified | Low |
| Achievable density | 3.2 FSR | Assessment | High |
| Road dedication | 3 metres | Needs confirmation | High |
| Applicable DCC rate | $X | Verified | Medium |

Every assumption should include:

* Supporting source
* Last verified date
* Confidence level
* What happens if it is wrong
* Person responsible for confirming it

### 9. Automatic Development Readiness Review

When a project is created, Tribunus automatically produces:

* Approval pathway
* Top risks
* Missing information
* Relevant policies
* Applicable fees
* Comparable projects
* Recommended next steps

This should be the main first-value experience.

### 10. Approval Pathway Analysis

Identify:

* Likely application type
* Rezoning requirements
* Development-permit requirements
* Building-permit dependencies
* Relevant decision bodies
* Expected approval stages
* Required consultants and studies
* Major process dependencies

### 11. Historical Project and Precedent Search

Find comparable developments based on:

* Municipality
* Neighbourhood
* Development type
* Height
* Density
* Unit count
* Tenure
* Requested amendments
* Approval pathway

The user should see why each project is considered comparable.

### 12. Historical Decision Trace

For each comparable project, reconstruct:

```text
Original proposal
→ Staff concerns
→ Community feedback
→ Project revisions
→ Council or board discussion
→ Amendments
→ Conditions
→ Final outcome
```

### 13. Council and Staff Intelligence

Extract and summarize:

* Staff recommendations
* Council concerns
* Public opposition
* Supportive arguments
* Verbal amendments
* Negotiated concessions
* Conditions imposed
* Relevant quotations with source references

### 14. Amendment and Negotiation Risk

Analyze risks related to:

* Height
* Density
* Setbacks
* Parking
* Use
* Building form
* Public realm
* Infrastructure
* Community opposition

Each risk should include:

* Severity
* Confidence
* Supporting precedent
* Recommended response
* Alternative fallback scenario

### 15. Application Readiness Review

Check the project package for:

* Missing documents
* Missing studies
* Unsupported claims
* Inconsistent project statistics
* Conflicting drawings
* Unanswered City comments
* Unaddressed policy requirements
* Missing consultant confirmations

### 16. Risk and Action Register

Every finding becomes a persistent project item containing:

* Finding
* Severity
* Confidence
* Evidence
* Recommended action
* Assigned owner
* Due date
* Status
* Resolution notes

### 17. Project Change Detection

When a new file or drawing version is uploaded:

* Compare it with the previous version
* Identify changed project assumptions
* Identify resolved and newly created risks
* Re-run affected analyses
* Show the user exactly what changed

### 18. Project Watch

Continuously monitor:

* Zoning changes
* OCP and NCP amendments
* Fee changes
* Council decisions
* Nearby development applications
* Transit announcements
* Infrastructure projects
* Provincial and regional policy changes

Only send alerts that affect a specific project.

### 19. Project-Specific Alerts

Each alert should explain:

* What changed
* Which project assumption is affected
* Why it matters
* Potential financial or timeline impact
* Recommended action
* Supporting source

### 20. Ask This Project

A secondary chat interface that understands:

* Project details
* Uploaded files
* Existing findings
* Completed analyses
* Municipal policies
* Comparable projects

Users should be able to ask questions such as:

* Why was this risk flagged?
* Show the closest precedents.
* What changes if we reduce the height?
* What should we ask the City?
* What changed in the latest drawing set?

### 21. Evidence and Citation Viewer

Every material conclusion must link to:

* Original municipal document
* Relevant page or section
* Publication date
* Effective date
* Source authority

Users should clearly see the difference between:

* Verified fact
* Calculated result
* Tribunus assessment
* Unknown requiring confirmation

### 22. Reports and Export

Allow users to export:

* Development Feasibility Brief
* Approval Strategy Brief
* Assumption Audit
* Risk and Action Register
* Council and Precedent Report
* Meeting Preparation Brief

Formats:

* PDF
* Word
* Spreadsheet where appropriate

---

## Phase 2 — Strong Expansion Features

### 23. Consultant Coordination

* Assign requirements to consultants
* Track consultant deliverables
* Monitor missing submissions
* Track dependencies
* Flag overdue or incomplete work

### 24. City Comment Management

* Upload municipal comment letters
* Extract individual comments
* Assign each comment
* Track responses
* Connect revisions to comments
* Verify whether each comment was resolved

### 25. Cross-Document Consistency Checking

Compare:

* Architectural drawings
* Civil drawings
* Landscape plans
* Planning rationale
* Project statistics
* Consultant reports
* Pro forma assumptions

Flag contradictory values and missing coordination.

### 26. Development Scenario Comparison

Compare alternatives such as:

* Conservative proposal
* Policy-aligned proposal
* Aggressive proposal

Show differences in:

* Units
* Density
* Approval risk
* Fees
* Required studies
* Timeline
* Estimated yield

### 27. Timeline Forecasting

Provide:

* Stage-by-stage timeline range
* Comparable project timelines
* Likely review cycles
* Main delay risks
* Actions that could reduce delay

### 28. Nearby Competition Monitoring

Track:

* New applications
* Approved projects
* Competing unit supply
* Construction timing
* Nearby developments
* Changes in product mix

### 29. Municipality Comparison

Compare municipalities based on:

* Approval timelines
* Application volume
* Revision frequency
* Fee structure
* Amendment history
* Project-type suitability
* Data confidence

Avoid one simplistic municipality score.

### 30. Portfolio-Level Intelligence

Across all company projects:

* Shared risks
* Upcoming fee changes
* Policy exposure
* Nearby competition
* Municipal concentration
* Open consultant dependencies
* Portfolio-wide alerts

---

## Internal Administration Features

These are not customer-facing, but they are required to operate Tribunus reliably.

### 31. Municipal Source Registry

Track every authoritative source:

* Website
* Document type
* Municipality
* Update frequency
* Effective dates
* Data owner
* Reliability level

### 32. Municipal Data Ingestion

* Download council reports and minutes
* Import zoning and policy files
* Import application records
* Import fee schedules
* Preserve document versions
* Detect new or changed documents

### 33. Structured Municipal Knowledge Base

Store:

* Projects
* Parcels
* Policies
* Applications
* Meetings
* Staff concerns
* Amendments
* Conditions
* Decisions
* Timelines
* Fees

### 34. Source Versioning

The system must know:

* Which rule applied on a specific date
* When a policy was replaced
* Which fee rate was effective
* Which project analysis used which source version

### 35. Entity Matching

Connect:

* Address
* Parcel
* Application
* Council report
* Meeting
* Decision
* Drawing revision
* Developer
* Consultant

### 36. Analysis Orchestration

Internal workflows for:

* Project-profile extraction
* Policy analysis
* Precedent retrieval
* Risk analysis
* Application auditing
* Timeline estimation
* Change monitoring
* Evidence verification

### 37. Verification and Quality Gates

Before showing a result:

* Confirm citations
* Check effective dates
* Detect unsupported claims
* Validate calculations
* Identify contradictory evidence
* Apply confidence thresholds
* Mark uncertainty clearly

### 38. Analysis Run History

Store:

* Analysis date
* Workflow version
* Source versions
* Project-file versions
* Generated findings
* User changes
* Final outcome

### 39. Feedback and Correction System

Users should be able to:

* Mark a finding correct or incorrect
* Correct extracted project facts
* Add missing context
* Explain the actual City response
* Record final outcomes

### 40. Security and Audit Logs

* Encryption
* Project-level permissions
* Document-access controls
* Activity logs
* Data-retention controls
* Confidential-project handling

---

## Recommended MVP Cut

For the first real developer pilot, I would implement these **12 core capabilities**:

1. Company and user accounts
2. Project portfolio
3. Create project
4. Document upload and versioning
5. Automatic project profile
6. Verified site baseline
7. Fees and charges review
8. Development assumption ledger
9. Historical precedent and decision trace
10. Risk and action register
11. Project Watch
12. Evidence-backed reports and project chat

Everything else should be added only after firms actively use these features on real projects.

---

# Final Tribunus MVP Feature List

## MVP definition

The first deployable version should support:

> **Multifamily, townhouse, and mixed-use projects in Vancouver and Coquitlam, from acquisition screening through development approval.**

A developer should be able to enter an address, add basic project assumptions, upload available documents, and receive a verified project baseline, key risks, comparable approvals, next actions, and ongoing change alerts.

Vancouver and Coquitlam provide enough official source material for this initial scope. Vancouver publishes zoning and land-use documents, rezoning and development applications, Council and Development Permit Board records, DCL information, and development-related fee schedules. Coquitlam publishes an interactive Development Information Portal, Council agendas and minutes, its OCP, DCC and ACC rates, and planning-related fees. [[1]](https://www.shapeyourcity.ca/rezoning)

---

## A. Core user-facing features

### 1. Firm workspace and user accounts

The design-partner firm needs:

* Company workspace
* Secure login
* Team invitations
* Admin, member, and viewer roles
* Project-level access permissions
* Activity history

This allows a real firm to use Tribunus collaboratively rather than through one shared account.

### 2. Project portfolio

The landing page should show all active sites and projects.

Each project card should display:

* Project name and address
* Municipality
* Development type
* Current stage
* Number of unresolved risks
* Important recent change
* Last verified date
* Project Watch status

The portfolio is the product homepage — not a blank chatbot.

### 3. Create Project flow

The user creates a project by entering:

* Address
* Municipality
* Property or parcel
* Development type
* Current stage
* Intended use
* Approximate unit count
* Approximate height
* Approximate density or FSR
* Tenure
* Short project description

Supported stages:

* Acquisition screening
* Preliminary feasibility
* Pre-application
* Application preparation
* Submitted / under municipal review

### 4. Automatic parcel and municipal context

After the address is entered, Tribunus should automatically retrieve and display:

* Parcel and location
* Current zoning
* OCP, neighbourhood-plan, or area-plan designation
* Relevant Development Permit Areas
* Applicable policies and overlays
* Nearby transit
* Nearby active development applications
* Relevant environmental or site constraints where authoritative data exists

Coquitlam's OCP includes Development Permit Areas addressing urban design, watercourse protection, wildfire hazards, and unstable slopes. Its Development Information Portal provides current or recent application information. Vancouver separately publishes active and archived rezoning and development applications. [[2]](https://www.coquitlam.ca/616/Official-Community-Plan)

### 5. Project document upload and organization

Users should be able to upload:

* Feasibility studies
* Planning rationale
* Project statistics
* Architectural PDFs
* Site surveys
* Civil and landscape reports
* Consultant memos
* City correspondence
* Comment letters
* Fee estimates
* Spreadsheets
* Earlier document versions

Required capabilities:

* File categories
* Upload dates
* Document versions
* Replacing or superseding old files
* Secure preview and download
* Linking a document to a finding

For the MVP, Tribunus should support PDFs, Word documents, spreadsheets, and images. It should **not** promise full CAD or BIM interpretation yet.

### 6. Structured Project Profile

Tribunus extracts the important project facts from the files and user inputs:

* Site area
* Existing use
* Proposed use
* Unit count
* Tenure
* Height
* Storeys
* FSR
* Gross floor area
* Setbacks
* Parking
* Loading
* Requested variances or amendments
* Current project stage

The user must confirm or correct these facts before deeper analyses run.

The system should also flag conflicts such as:

> Planning rationale says 210 units, but the project statistics sheet says 218.

### 7. Verified Site Baseline

This is the first major deliverable generated for every project.

It should contain:

**Current requirements**

* Current zoning
* Applicable plan designations
* Permitted uses
* Key height and density rules
* Setback requirements
* Relevant development guidelines
* Development Permit Areas
* Known submission requirements

**Verification information**

Every important value must show:

* Source
* Source section or page
* Effective date
* Last checked date
* Confidence/status

The status should be one of:

* Verified fact
* Derived calculation
* Tribunus assessment
* Requires confirmation

### 8. Fees and Contributions Review

Tribunus should identify the charges potentially relevant to the project.

**Vancouver**

* City-wide and area-specific DCLs
* Metro Vancouver DCCs
* Application and development fees
* Relevant CAC or density-bonus considerations
* Announced future rate changes

Vancouver states that most new development pays DCLs based on square footage, while CACs and density bonusing are separate contribution mechanisms. It also publishes annual development and building fee schedules. [[3]](https://vancouver.ca/home-property-development/development-cost-levies.aspx)

**Coquitlam**

* Municipal DCCs
* Metro Vancouver DCCs
* Amenity Cost Charges
* Application fees
* Other identifiable municipal charges
* In-stream protection rules where applicable

Coquitlam publishes current DCC and ACC rate tables and notes that its DCC bylaw is the authoritative source. [[4]](https://www.coquitlam.ca/285/Development-Cost-Charges-DCCs)

Each result must distinguish between:

* Deterministically calculable charge
* Preliminary estimate
* Negotiated or uncertain contribution
* Item requiring confirmation from the municipality

### 9. Development Assumption Ledger

This should be the central product object.

| Assumption | Value | Status | Exposure |
| --- | --- | --- | --- |
| Permitted density | 2.5 FSR | Verified | High |
| Target density | 3.1 FSR | Requires discretion | High |
| Road dedication | 3 metres | Needs confirmation | High |
| Apartment DCC | Current rate | Verified | High |
| Required traffic study | Yes | Verified | Medium |

Each assumption should include:

* Current value
* Supporting evidence
* Effective date
* Confidence
* Documents that rely on it
* Consequence if incorrect
* Assigned owner
* Verification status
* Resolution notes

This is what moves Tribunus from "research software" to a project risk-control system.

### 10. Approval Pathway and Requirements Checklist

Tribunus should identify the likely project pathway:

* By-right development
* Development permit
* Rezoning
* OCP amendment
* Development variance
* Subdivision
* Building permit dependencies

The result should show:

* Likely municipal decision-maker
* Major stages
* Required documents
* Likely consultants
* Studies or confirmations required
* Known sequencing dependencies
* Items that remain uncertain

The workflow must be municipality-specific. Vancouver and Coquitlam use different processes, decision authorities, application portals, and public-consultation rules. Vancouver's Development Permit Board handles certain major or discretionary applications, while other development permits are handled by the Director of Planning or delegates. Coquitlam also distinguishes development permits, OCP amendments, variances, and Council processes. [[5]](https://vancouver.ca/home-property-development/development-permit-board.aspx)

### 11. Comparable Project and Precedent Search

Tribunus should find approximately three to ten relevant historical projects based on:

* Municipality
* Neighbourhood
* Development type
* Height and density
* Unit count
* Tenure
* Site size
* Applicable policy
* Requested variances
* Approval pathway

For every comparable, show:

* Why it is similar
* Why it may not be comparable
* Original proposal
* Important revisions
* Staff recommendation
* Council or board decision
* Conditions
* Outcome
* Timeline where available

The user must be able to open the original source documents.

### 12. Council, Staff, and Decision Trace

For selected comparable projects, Tribunus should reconstruct:

```text
Original application
        ↓
Staff concerns
        ↓
Public or community feedback
        ↓
Applicant revisions
        ↓
Council or board discussion
        ↓
Amendments and conditions
        ↓
Final outcome
```

The MVP should extract:

* Staff concerns
* Staff recommendations
* Council comments
* Recorded public opposition or support
* Verbal or written amendments
* Design concessions
* Conditions of approval
* Important unresolved issues

Coquitlam's Agenda Centre provides Council and committee materials back to 2017, while Vancouver publishes Council and Development Permit Board records alongside its application archives. [[6]](https://www.coquitlam.ca/agendacenter)

### 13. Development Risk and Action Register

The automatic analysis should create persistent findings — not just a report.

Each finding needs:

* Clear title
* Risk category
* Severity
* Confidence
* Explanation
* Supporting evidence
* Potential consequence
* Recommended action
* Assigned owner
* Due date
* Status

Initial risk categories:

* Zoning and policy
* Fees and contributions
* Density and height
* Setbacks and dedications
* Infrastructure and servicing
* Environmental
* Application completeness
* Historical precedent
* Municipal process
* Community or political risk
* Document inconsistency

### 14. Automatic Development Readiness Review

Once the project profile is confirmed, Tribunus automatically runs a baseline review.

The output should be limited to:

* Top five material risks
* Top three opportunities
* Missing critical information
* Likely approval pathway
* Applicable charges
* Closest precedents
* Recommended next five actions

This should be the main "aha" moment for the user.

The product should avoid one unsupported approval probability. It should instead score individual risk categories and explain the evidence.

### 15. Project Watch

The user can turn monitoring on for an active project.

Tribunus should monitor:

* Zoning and policy changes
* OCP or neighbourhood-plan amendments
* DCC, DCL, ACC, and fee changes
* Nearby development applications
* Relevant Council decisions
* Transit and infrastructure announcements
* Provincial and regional regulatory changes
* Changes to municipal submission requirements

Project Watch is essential for recurring value because both cities publish evolving rates, application information, policies, and process changes. [[7]](https://guidelines.vancouver.ca/bulletins/bulletin-development-cost-levies.pdf)

### 16. Project-specific weekly digest

The firm should receive one concise email per project or portfolio.

Each item should answer:

1. What changed?
2. Which project assumption may be affected?
3. Why does it matter?
4. Is action required?
5. What is the authoritative source?

Do not send generic real-estate news.

Example:

> **Coquitlam ACC schedule updated**
> Your project's current feasibility model uses the previous mid-rise rate. Recalculate the preliminary contribution estimate before the next investment review.

### 17. Ask This Project

A contextual chat should be available inside the project.

It can answer questions using:

* Confirmed project facts
* Uploaded documents
* Municipal sources
* Existing findings
* Comparable projects
* Completed analyses

Example questions:

* Why is the target density considered high risk?
* Show the three most comparable Coquitlam applications.
* Which assumptions remain unverified?
* What changed in the new drawing package?
* Prepare questions for our municipal meeting.
* What do we need before submitting?

Chat answers must include citations and clearly label interpretation.

### 18. Exportable Development Brief

The user should be able to generate a clean PDF or Word report containing:

* Project profile
* Verified baseline
* Fees and contributions
* Assumption ledger
* Approval pathway
* Comparable projects
* Material risks
* Recommended actions
* Sources and limitations

This allows the output to be shared with:

* Principals
* Development managers
* Consultants
* Investment committees
* Project partners

---

## B. Required internal and administrative capabilities

These are not optional. Without them, the user-facing product will not be reliable.

### 19. Vancouver municipal adapter

The adapter must ingest and organize:

* Zoning and land-use documents
* ODP and policy documents
* Rezoning applications
* Development applications
* Council reports and decisions
* Development Permit Board materials
* DCLs and fee schedules
* Relevant open-data layers

### 20. Coquitlam municipal adapter

The adapter must ingest and organize:

* Citywide OCP and area plans
* Zoning bylaws
* Development Information Portal records
* Council agendas and minutes
* Public-consultation materials
* DCC and ACC schedules
* Application and building-related fees
* Development Permit Area requirements

### 21. Source registry and versioning

For every source, store:

* Municipality
* Source type
* Official URL
* Publication date
* Effective date
* Last checked date
* Current or superseded status
* File hash/version
* Related policies or projects

Historical and current rules must never be mixed.

### 22. Project and source entity linking

The system needs to connect:

* Address
* Parcel
* Application number
* Council report
* Meeting
* Policy
* Decision
* Project revision
* Fee schedule

This is required to create reliable historical project timelines.

### 23. Deterministic calculators

Use normal software — not generative AI — for:

* FSR calculations
* Site-area conversions
* Unit-based charges
* Square-foot or square-metre charges
* Fee totals
* Date calculations
* Timeline statistics
* Distance calculations

Every calculation should expose its formula and source inputs.

### 24. Analysis orchestration and verification

Each analysis needs:

* Defined inputs
* Specific workflow
* Structured output
* Evidence requirements
* Independent verification
* Bounded retry
* Confidence labels
* Stored analysis history

Unsupported findings must be rejected or marked as uncertain.

### 25. Internal analyst review console

For the first design-partner release, allow the Tribunus team to:

* Review extracted project facts
* Correct source matching
* Approve material findings
* Suppress unreliable findings
* Add missing evidence
* Re-run an analysis
* Record customer feedback

A human-in-the-loop MVP is acceptable. Quietly correcting an analysis before delivery is much better than shipping unreliable automation.

### 26. Feedback and outcome capture

The design partner should be able to indicate:

* Finding was correct
* Finding was incorrect
* Information was already known
* Finding caused an action
* Municipality responded differently
* Project was redesigned
* Project was approved, withdrawn, or abandoned

This is how Tribunus builds its private evaluation data and improves.

### 27. Security and confidentiality

Minimum deployable security:

* Encryption in transit and at rest
* Company-level data separation
* Project access controls
* Secure file storage
* Audit logs
* Data deletion
* Confidential-document handling
* No use of customer documents for other customers without permission

A real developer firm will not upload private feasibility studies or City correspondence without this.

---

## Final MVP screens

The design-partner version should have only six principal screens:

1. **Login and Company Workspace**
2. **Project Portfolio**
3. **Create Project**
4. **Project Overview**
5. **Risks, Assumptions, and Precedents**
6. **Documents, Watch, and Ask This Project**

Avoid creating separate screens for every AI feature.

---

## Explicitly excluded from this MVP

Do **not** include yet:

* Full permit submission
* Municipal portal integration
* Building Code certification
* Full architectural drawing compliance
* CAD or BIM editing
* Construction scheduling
* Consultant messaging
* Procurement or vendor marketplace
* Sales comparables
* Construction-cost benchmarking
* Universal approval probability
* Canada-wide municipality coverage
* Mobile application

These would delay the pilot without proving the core value.

---

## Recommended pilot release boundary

The MVP is ready for the design partner when it can reliably support:

* **Vancouver and Coquitlam**
* **Three development types:** townhouse, multifamily, mixed-use
* **Five to ten active projects**
* **Two approval stages:** acquisition/pre-application and submitted/under review
* **One verified baseline per project**
* **One risk and assumption register**
* **Comparable-project research**
* **Weekly project-specific monitoring**
* **Exportable decision brief**
* **Human QA before critical results are released**

## Final user flow

```text
Developer creates project
        ↓
Tribunus retrieves parcel and municipal context
        ↓
Developer uploads available files
        ↓
Tribunus extracts project assumptions
        ↓
Developer confirms project profile
        ↓
Tribunus produces verified baseline
        ↓
Tribunus identifies fees, pathway, precedents, and risks
        ↓
Findings become assigned project actions
        ↓
Project Watch monitors relevant changes
        ↓
New documents or City feedback are uploaded
        ↓
Affected assumptions and risks are re-verified
```

That is the smallest Tribunus product I would consider genuinely usable by a real Vancouver or Coquitlam development firm.

**Sources**

1. [Shape Your City Vancouver — Rezoning active and archived applications.](https://www.shapeyourcity.ca/rezoning)
2. [Coquitlam — Official Community Plan.](https://www.coquitlam.ca/616/Official-Community-Plan)
3. [City of Vancouver — Development Cost Levies.](https://vancouver.ca/home-property-development/development-cost-levies.aspx)
4. [Coquitlam — Development Cost Charges (DCCs).](https://www.coquitlam.ca/285/Development-Cost-Charges-DCCs)
5. [City of Vancouver — Development Permit Board.](https://vancouver.ca/home-property-development/development-permit-board.aspx)
6. [Coquitlam — Agenda Centre.](https://www.coquitlam.ca/agendacenter)
7. [City of Vancouver — Bulletin: Development Cost Levies (DCLs).](https://guidelines.vancouver.ca/bulletins/bulletin-development-cost-levies.pdf)
