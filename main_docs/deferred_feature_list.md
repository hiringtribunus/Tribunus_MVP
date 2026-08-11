# Tribunus — Deferred Feature List

*Features agreed to be valuable but deliberately deferred out of the first MVP build. Revisit after the pilot proves the core wedge. Merged and de-duplicated from Usman's and Gurinder's feature lists.*

**Status:** Deferred (post-MVP) · **Date:** July 2026

For the features being built now, see [locked_feature_list.md](locked_feature_list.md).

---

### Change Detection & Refresh Analysis
On a new file/drawing version or profile edit: compare to previous, identify changed assumptions, resolved vs. newly-created risks, re-run affected analyses, and show exactly what changed while preserving prior results. The first repeat-use loop — deferred until the base review is proven.

### Cross-Document Consistency Checking
Compare architectural, civil, landscape, planning rationale, project stats, consultant reports, and pro forma; flag contradictory values and missing coordination across the full drawing set.

### Municipality Comparison
Compare municipalities on approval timelines, application volume, revision frequency, fee structure, amendment history, type suitability, and data confidence. Avoid one simplistic score.

### Municipal Source Registry & Versioning
Track every authoritative source: municipality, type, official URL, publication/effective dates, last-checked, current-vs-superseded status, file hash/version, and related policies/projects. Historical and current rules must never be mixed. (For the pilot, sources are manually curated via the ingestion adapters instead.)

### Structured Municipal Knowledge Base
Store projects, parcels, policies, applications, meetings, staff concerns, amendments, conditions, decisions, timelines, and fees in a fully structured municipal graph.

### Feedback & Outcome Capture
Let the design partner mark findings correct / incorrect / already-known, note when a finding caused an action, record how the municipality actually responded, and log final outcome (approved / withdrawn / redesigned / abandoned). Builds private evaluation data.

### Security & Audit Logs
Encryption in transit and at rest, company-level data separation, project access controls, secure file storage, audit logs, data deletion, confidential-document handling, and no cross-customer document use without permission. (Baseline security applies from day one; the full feature-level security/audit console is deferred.)

### Client Standards Absorption
Pre-load a firm's own historical numbers and standards (their dollar-per-square-foot from past projects) so their data is ready to drop in without repeated conversations. Makes the product fit veterans.

### Feature-Run Engine (multi-button analyses)
The full multi-button engine (separate Baseline Review, Fee Verification, Precedent Review, Amendment Risk, Application Readiness buttons). The MVP exposes a single **Run Development Review** action instead; the expanded engine is deferred.

### Approval Sequence & Governance Map
Show the required order of approvals (city first, then BC Hydro, then utilities) and who governs each decision, so the user understands dependencies and the lag they add.

### Competition Alerts / Nearby Competition Monitoring
Notify when someone files a similar product type nearby, or a large nearby development is coming (e.g., 500 condo units two blocks away completing just after yours), filterable by the municipalities and product types the user works in. Track new/approved applications, competing unit supply, construction timing, and product-mix changes.
