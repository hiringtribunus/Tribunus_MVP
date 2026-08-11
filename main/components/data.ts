export type Project = {
  id: string;
  name: string;
  address: string;
  municipality: string;
  type: string;
  stage: string;
  risks: number;
  review: "Ready" | "Needs attention" | "Under review" | "Stale";
  verified: string;
  watch: boolean;
  units: number;
  fsr: string;
};

export const projects: Project[] = [
  {
    id: "marigold",
    name: "Marigold & Litchfield",
    address: "1180 Marigold Street, Coquitlam",
    municipality: "Coquitlam",
    type: "Townhouse",
    stage: "Feasibility",
    risks: 3,
    review: "Ready",
    verified: "Aug 8, 2026",
    watch: true,
    units: 80,
    fsr: "1.42",
  },
  {
    id: "robinson",
    name: "Robinson & Spring",
    address: "704 Robinson Street, Coquitlam",
    municipality: "Coquitlam",
    type: "Multifamily",
    stage: "Pre-application",
    risks: 5,
    review: "Needs attention",
    verified: "Aug 5, 2026",
    watch: true,
    units: 312,
    fsr: "3.20",
  },
  {
    id: "harrison",
    name: "Harrison",
    address: "2468 Harrison Drive, Vancouver",
    municipality: "Vancouver",
    type: "Mixed-use",
    stage: "Under municipal review",
    risks: 2,
    review: "Under review",
    verified: "Aug 2, 2026",
    watch: true,
    units: 259,
    fsr: "4.10",
  },
  {
    id: "emerald",
    name: "Emerald",
    address: "820 Emerald Avenue, Vancouver",
    municipality: "Vancouver",
    type: "Multifamily",
    stage: "Acquisition screening",
    risks: 1,
    review: "Stale",
    verified: "Jul 21, 2026",
    watch: false,
    units: 41,
    fsr: "2.60",
  },
];

export const findings = [
  { id: "f1", type: "Assumption", title: "Applicable ACC regime", category: "Fees", severity: "High", confidence: "Medium", owner: "Maya", due: "Aug 14", status: "Open", impact: "+$860K–$1.1M potential cost exposure", detail: "The current underwriting assumes the 2026 rate remains applicable through building permit issuance." },
  { id: "f2", type: "Risk", title: "Rear setback departure unsupported", category: "Setbacks", severity: "High", confidence: "High", owner: "Liam", due: "Aug 16", status: "Reviewing", impact: "May reduce sellable area or require a variance", detail: "The proposed 2.5 m rear setback is below the current 3.0 m requirement and no directly comparable approval is cited." },
  { id: "f3", type: "Risk", title: "Servicing capacity not confirmed", category: "Infrastructure", severity: "Medium", confidence: "Medium", owner: "Unassigned", due: "—", status: "Open", impact: "Potential schedule and off-site works exposure", detail: "No current servicing confirmation is included in the project documents." },
  { id: "f4", type: "Assumption", title: "Proposed unit count is 80", category: "Project data", severity: "Medium", confidence: "High", owner: "Maya", due: "—", status: "Verified", impact: "Drives fee and density calculations", detail: "Confirmed against the current project statistics and concept drawing set." },
  { id: "f5", type: "Assumption", title: "Rezoning can proceed without OCP amendment", category: "Pathway", severity: "High", confidence: "Medium", owner: "Liam", due: "Aug 20", status: "Open", impact: "An OCP amendment could add a public hearing and material delay", detail: "The proposal appears consistent with the neighbourhood plan, but one density interpretation remains ambiguous." },
  { id: "f6", type: "Risk", title: "Tree retention conflicts with access", category: "Environmental", severity: "Low", confidence: "Medium", owner: "Sofia", due: "Aug 26", status: "Open", impact: "Design coordination required", detail: "The concept access location overlaps the preliminary tree retention area." },
];

export const documents = [
  { name: "Project statistics", category: "Project stats", version: "v3", uploaded: "Aug 7", status: "Current", size: "1.2 MB" },
  { name: "Planning rationale", category: "Rationale", version: "v2", uploaded: "Aug 4", status: "Current", size: "4.8 MB" },
  { name: "Concept drawing set", category: "Drawings", version: "v5", uploaded: "Aug 1", status: "Current", size: "18.4 MB" },
  { name: "Concept drawing set", category: "Drawings", version: "v4", uploaded: "Jul 18", status: "Superseded", size: "16.9 MB" },
  { name: "Preliminary servicing memo", category: "Consultant report", version: "v1", uploaded: "Jul 14", status: "Needs attention", size: "2.1 MB" },
  { name: "City pre-application notes", category: "City correspondence", version: "v1", uploaded: "Jul 9", status: "Current", size: "940 KB" },
];

export const precedents = [
  { id: "p1", address: "5678 Como Lake Avenue", match: "Strong match", outcome: "Approved with conditions", distance: "0.7 km", fsr: "1.48", units: 76, note: "Same plan area, tenure, and built form. Rear setback remained compliant." },
  { id: "p2", address: "2200 Austin Avenue", match: "Good match", outcome: "Revised", distance: "1.4 km", fsr: "1.62", units: 92, note: "Comparable density; larger site and a different access condition." },
  { id: "p3", address: "931 Foster Avenue", match: "Partial match", outcome: "Approved", distance: "2.1 km", fsr: "1.35", units: 68, note: "Similar townhouse form, but approved under an older policy version." },
];

export const alerts = [
  { type: "Fee change", title: "Regional DCC schedule changed", when: "Today · 06:10", level: "Material", projects: "3 projects", body: "The announced 2027 rate affects projects expected to reach building permit after Jan 1.", impact: "+$1.08M estimated exposure on Marigold at the current unit count." },
  { type: "Council decision", title: "Comparable project approved with conditions", when: "Aug 7", level: "Relevant", projects: "Marigold", body: "Council approved a nearby townhouse application after a revised access plan.", impact: "Potential supporting precedent; important site differences remain." },
  { type: "Policy", title: "Neighbourhood plan amendment published", when: "Aug 4", level: "Review", projects: "2 projects", body: "A draft update changes the language applied to transition areas.", impact: "One pathway assumption should be confirmed before submission." },
];

export const fees = [
  { charge: "Municipal DCC", authority: "City of Coquitlam", basis: "80 townhouse units", amount: "$2.99M", status: "Calculated", effective: "Jan–Dec 2026" },
  { charge: "Regional DCC", authority: "Metro Vancouver", basis: "80 dwelling units", amount: "$2.34M", status: "Calculated", effective: "Jan–Dec 2026" },
  { charge: "Amenity Cost Charge", authority: "City of Coquitlam", basis: "Gross floor area", amount: "$1.18M–$1.42M", status: "Estimate", effective: "Jul 2025 onward" },
  { charge: "Application & permit fees", authority: "City of Coquitlam", basis: "Application pathway", amount: "$84K–$112K", status: "Confirm", effective: "2026 schedule" },
];

export const consultants = [
  { discipline: "Civil / servicing", owner: "Aplin Martin", deliverable: "Servicing feasibility", needed: "Pre-application", due: "Aug 18", status: "Overdue" },
  { discipline: "Geotechnical", owner: "TBD", deliverable: "Desktop geotechnical review", needed: "Rezoning", due: "Aug 28", status: "Missing" },
  { discipline: "Landscape", owner: "Durante Kreuk", deliverable: "Tree retention plan", needed: "Pre-application", due: "Aug 20", status: "In review" },
  { discipline: "Transportation", owner: "Bunt & Associates", deliverable: "Access memo", needed: "Pre-application", due: "Aug 22", status: "On track" },
  { discipline: "BC Hydro", owner: "Unassigned", deliverable: "Capacity enquiry", needed: "Development permit", due: "Sep 10", status: "Not started" },
];

export const comments = [
  { id: "C-01", title: "Revise emergency access geometry", section: "Engineering · p. 2", owner: "Liam", status: "Response drafted" },
  { id: "C-02", title: "Confirm tree retention at west property line", section: "Parks · p. 3", owner: "Sofia", status: "Assigned" },
  { id: "C-03", title: "Provide updated unit and parking statistics", section: "Planning · p. 1", owner: "Maya", status: "Confirmed resolved" },
  { id: "C-04", title: "Clarify proposed tenure", section: "Planning · p. 1", owner: "Maya", status: "Submitted" },
];
