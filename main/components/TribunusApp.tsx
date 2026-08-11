"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Activity, ArrowLeft, ArrowRight, Bell, BellRing, BookOpenCheck, Building2, Check, ChevronDown, ChevronRight, CircleAlert, ClipboardCheck, Command, Download, FileCheck2, FileText, FolderOpen, Gauge, HelpCircle, Landmark, LayoutDashboard, Menu, MessageSquareText, MoreHorizontal, PanelLeftClose, PanelLeftOpen, Search, Settings, ShieldCheck, Sparkles, Upload, User, X } from "lucide-react";
import { projects, findings } from "@/components/data";
import { Badge, Button, Drawer, Modal, ProgressRow, SourceLink } from "@/components/ui";
import { PortfolioPage } from "@/components/pages/PortfolioPage";
import { GlobalWatchPage, IntelligencePage, OperationsPage, SettingsPage, SignInPage } from "@/components/pages/GlobalPages";
import { CreateProjectPage, DataPage, FindingsPage, PrecedentsPage, ProjectOverview, ProjectWatchPage, ReviewPage, WorkflowPage } from "@/components/pages/ProjectPages";

const globalNav = [
  { label: "Portfolio", path: "/portfolio", icon: LayoutDashboard },
  { label: "Watch", path: "/watch", icon: BellRing, badge: "3" },
  { label: "Intelligence", path: "/intelligence", icon: Landmark },
];

const projectNav = [
  { label: "Overview", suffix: "", icon: Gauge },
  { label: "Review", suffix: "/review", icon: BookOpenCheck },
  { label: "Findings", suffix: "/findings", icon: ClipboardCheck, badge: "6" },
  { label: "Project data", suffix: "/data", icon: FolderOpen },
  { label: "Precedents", suffix: "/precedents", icon: Building2 },
  { label: "Workflow", suffix: "/workflow", icon: FileCheck2 },
  { label: "Watch", suffix: "/watch", icon: BellRing, dot: true },
];

export function TribunusApp() {
  const pathname = usePathname();
  const router = useRouter();
  const [railCollapsed, setRailCollapsed] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [evidence, setEvidence] = useState<string | null>(null);
  const [findingId, setFindingId] = useState<string | null>(null);
  const [exportOpen, setExportOpen] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [askSent, setAskSent] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault(); setSearchOpen(true);
      }
      if (event.key === "Escape") { setSearchOpen(false); setActivityOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (pathname === "/signin") return <SignInPage />;
  if (pathname === "/create") return <CreateProjectPage />;

  const match = pathname.match(/^\/projects\/([^/]+)/);
  const projectId = match?.[1];
  const project = projects.find((item) => item.id === projectId) ?? projects[0];
  const isProject = Boolean(match);
  const selectedFinding = findings.find((item) => item.id === findingId) ?? findings[0];

  const navigate = (path: string) => { router.push(path); setMobileNav(false); };

  const renderPage = () => {
    const common = { project, openEvidence: (title?: string) => setEvidence(title ?? "Evidence"), openFinding: setFindingId, openAsk: () => setAskOpen(true), openExport: () => setExportOpen(true) };
    if (pathname === "/" || pathname === "/portfolio") return <PortfolioPage />;
    if (pathname === "/watch") return <GlobalWatchPage openEvidence={common.openEvidence}/>;
    if (pathname === "/intelligence") return <IntelligencePage />;
    if (pathname === "/settings") return <SettingsPage />;
    if (pathname === "/operations") return <OperationsPage />;
    if (pathname.endsWith("/review")) return <ReviewPage {...common}/>;
    if (pathname.endsWith("/findings")) return <FindingsPage {...common}/>;
    if (pathname.endsWith("/data")) return <DataPage {...common}/>;
    if (pathname.endsWith("/precedents")) return <PrecedentsPage {...common}/>;
    if (pathname.endsWith("/workflow")) return <WorkflowPage {...common}/>;
    if (pathname.endsWith("/watch")) return <ProjectWatchPage {...common}/>;
    if (isProject) return <ProjectOverview {...common}/>;
    return <PortfolioPage />;
  };

  return (
    <div className={`app-shell ${railCollapsed ? "rail-collapsed" : ""}`}>
      <header className="topbar">
        <button className="mobile-menu" onClick={() => setMobileNav(true)}><Menu size={20}/></button>
        <button className="wordmark" onClick={() => navigate("/portfolio")}><strong>Tribunus</strong></button>
        <button className="workspace-switch"><div><strong>Litchfield Development</strong></div><ChevronDown size={13}/></button>
        <button className="global-search" onClick={() => setSearchOpen(true)}><Search size={15}/><span>Search projects, findings, sources…</span><kbd><Command size={12}/>K</kbd></button>
        <div className="topbar-actions"><button aria-label="Help"><HelpCircle size={16}/></button><button aria-label="Activity" className="has-dot" onClick={() => setActivityOpen(!activityOpen)}><Bell size={16}/><i/></button><button className="avatar" aria-label="Account">MC</button></div>
        {activityOpen && <div className="activity-popover"><header><strong>Activity</strong><button onClick={() => setActivityOpen(false)}><X size={15}/></button></header><div><span className="activity-mini-icon danger"><CircleAlert size={14}/></span><p><strong>Fee schedule changed</strong><small>3 projects affected · 18m ago</small></p></div><div><span className="activity-mini-icon success"><Check size={14}/></span><p><strong>Review approved</strong><small>Marigold & Litchfield · 2h ago</small></p></div><div><span className="activity-mini-icon"><Upload size={14}/></span><p><strong>Document processed</strong><small>Project statistics v3 · yesterday</small></p></div><button className="popover-footer">View all activity</button></div>}
      </header>

      <aside className={`global-rail ${mobileNav ? "mobile-open" : ""}`}>
        <button className="mobile-rail-close" onClick={() => setMobileNav(false)}><X size={18}/></button>
        <nav className="primary-nav">{globalNav.map((item) => <button key={item.path} className={pathname === item.path ? "active" : ""} onClick={() => navigate(item.path)} title={item.label}><item.icon size={16}/><span>{item.label}</span>{item.badge && <b>{item.badge}</b>}</button>)}</nav>
        <div className="rail-section"><div className="rail-label"><span>Recent projects</span><button>+</button></div>{projects.slice(0,4).map((item) => <button key={item.id} className={`recent-project ${projectId === item.id ? "active" : ""}`} onClick={() => navigate(`/projects/${item.id}`)} title={item.name}><i>{item.name.split(" ").slice(0,2).map((word) => word[0]).join("")}</i><span><strong>{item.name}</strong><small>{item.municipality}</small></span>{item.review !== "Ready" && <b/>}</button>)}</div>
        <div className="rail-bottom"><button className={pathname === "/operations" ? "active" : ""} onClick={() => navigate("/operations")}><ShieldCheck size={16}/><span>Internal review</span></button><button className={pathname === "/settings" ? "active" : ""} onClick={() => navigate("/settings")}><Settings size={16}/><span>Settings</span></button><button onClick={() => router.push("/signin")}><User size={16}/><span>Account</span></button></div>
        <button className="collapse-button" onClick={() => setRailCollapsed(!railCollapsed)}>{railCollapsed ? <PanelLeftOpen size={16}/> : <PanelLeftClose size={16}/>}<span>Collapse</span></button>
      </aside>

      {isProject && <aside className="project-rail"><button className="back-portfolio" onClick={() => navigate("/portfolio")}><ArrowLeft size={14}/>Portfolio</button><div className="rail-project-name"><div>{project.name.split(" ").slice(0,2).map((word) => word[0]).join("")}</div><p><strong>{project.name}</strong><span>{project.municipality}</span></p><MoreHorizontal size={16}/></div><nav>{projectNav.map((item) => { const path = `/projects/${project.id}${item.suffix}`; const active = item.suffix === "" ? pathname === path : pathname === path; return <button key={item.label} className={active ? "active" : ""} onClick={() => navigate(path)}><item.icon size={16}/><span>{item.label}</span>{item.badge && <b>{item.badge}</b>}{item.dot && <i/>}</button>; })}</nav><div className="project-rail-state"><span><i/>Watch on</span><small>Checked today at 06:10</small></div></aside>}

      <main className={`main-content ${isProject ? "with-project-rail" : ""}`}>
        {isProject && <ProjectHeader project={project} onAsk={() => setAskOpen(true)} onExport={() => setExportOpen(true)} onRun={() => navigate(`/projects/${project.id}/review`)}/>} 
        {renderPage()}
      </main>

      <Drawer open={Boolean(evidence)} title={evidence ?? "Evidence"} eyebrow="Verified fact · High confidence" onClose={() => setEvidence(null)} footer={<><Button variant="ghost">Download source</Button><Button variant="primary">Open full document</Button></>}>
        <div className="evidence-summary"><ShieldCheck size={20}/><div><strong>Supported by an authoritative municipal source</strong><span>Checked Aug 8, 2026</span></div></div>
        <div className="source-card"><div className="source-card-head"><div className="source-file-icon"><FileText size={19}/></div><div><strong>Coquitlam Zoning Bylaw No. 3000</strong><span>City of Coquitlam · Current</span></div><Badge tone="success">Authoritative</Badge></div><dl><div><dt>Location</dt><dd>§ 1204.3 · p. 214</dd></div><div><dt>Published</dt><dd>Jul 7, 2025</dd></div><div><dt>Effective</dt><dd>Jul 7, 2025</dd></div><div><dt>Last checked</dt><dd>Aug 8, 2026</dd></div></dl></div>
        <div className="source-excerpt"><span>Highlighted source context</span><p>“The minimum rear lot line setback for principal buildings in the RT-2 zone shall be <mark>3.0 metres</mark>, except where otherwise varied by permit…”</p><small>Surrounding text retained for interpretation. Open the full document before relying on the excerpt.</small></div>
        <div className="evidence-check"><Check size={15}/><p><strong>No current contradiction found</strong><span>One superseded version is retained in source history.</span></p><button>View history</button></div>
      </Drawer>

      <Drawer open={Boolean(findingId)} title={selectedFinding.title} eyebrow={`${selectedFinding.type} · ${selectedFinding.category}`} onClose={() => setFindingId(null)} footer={<><Button variant="ghost">Add note</Button><Button variant="primary">Save changes</Button></>}>
        <div className="finding-badges"><Badge tone={selectedFinding.severity === "High" ? "high" : "medium"}>{selectedFinding.severity} severity</Badge><Badge tone="neutral">{selectedFinding.confidence} confidence</Badge><Badge tone="warning">{selectedFinding.status}</Badge></div>
        <section className="drawer-section"><h3>Why it matters</h3><p>{selectedFinding.detail}</p><div className="impact-callout"><strong>Potential impact</strong><span>{selectedFinding.impact}</span></div></section>
        <section className="drawer-section"><h3>Recommended action</h3><p>Confirm the applicable interpretation with the municipality and update the project review before the next decision meeting.</p></section>
        <div className="drawer-field-grid"><label>Owner<select defaultValue={selectedFinding.owner}><option>{selectedFinding.owner}</option><option>Maya</option><option>Liam</option><option>Sofia</option></select></label><label>Due date<input defaultValue={selectedFinding.due}/></label><label>Status<select defaultValue={selectedFinding.status}><option>{selectedFinding.status}</option><option>Open</option><option>Reviewing</option><option>Resolved</option></select></label><label>Severity<select defaultValue={selectedFinding.severity}><option>{selectedFinding.severity}</option><option>High</option><option>Medium</option><option>Low</option></select></label></div>
        <section className="drawer-section"><h3>Evidence</h3><button className="linked-source" onClick={() => setEvidence(`${selectedFinding.title} evidence`)}><FileText size={17}/><span><strong>2 supporting sources</strong><small>Municipal bylaw and current project document</small></span><ChevronRight size={15}/></button></section>
        <section className="drawer-section"><h3>Resolution history</h3><div className="mini-history"><span/><p><strong>Finding created by Development Review</strong><small>Aug 8 · Tribunus</small></p></div><div className="mini-history"><span/><p><strong>Assigned to {selectedFinding.owner}</strong><small>Aug 9 · Maya Chen</small></p></div></section>
      </Drawer>

      <Drawer open={askOpen} title={`Ask ${project.name}`} eyebrow="Project-scoped · Preview" onClose={() => {setAskOpen(false);setAskSent(false);}} footer={<div className="ask-input"><input defaultValue={askSent ? "" : "What should we ask the City about the setback?"} placeholder="Ask about this project…"/><button onClick={() => setAskSent(true)}><ArrowRight size={17}/></button></div>}>
        {!askSent ? <div className="ask-empty"><div className="ask-mark"><MessageSquareText size={24}/></div><h3>Ask from verified project context</h3><p>Answers use the confirmed profile, documents, municipal sources, findings, and precedents.</p><div className="suggested-questions"><button onClick={() => setAskSent(true)}>Explain the highest-risk assumption<ChevronRight size={14}/></button><button onClick={() => setAskSent(true)}>Show the strongest comparable<ChevronRight size={14}/></button><button onClick={() => setAskSent(true)}>Summarize unresolved issues<ChevronRight size={14}/></button></div><div className="preview-notice"><Sparkles size={15}/><span>This interaction previews the P1 experience. The production analysis backend is intentionally not connected yet.</span></div></div> : <div className="chat-thread"><div className="user-message">What should we ask the City about the setback?</div><div className="assistant-message"><div className="assistant-avatar">T</div><div><p>Ask whether staff would support the proposed 2.5 m rear setback through a variance, and what design or landscape conditions they would expect in return.</p><p>The strongest nearby precedent remained compliant at 3.0 m, so it does not directly support the departure. A second, less comparable file received a relaxation after increasing tree retention.</p><div className="answer-sources"><button onClick={() => setEvidence("Setback requirement")}>1 · Zoning bylaw p. 214</button><button onClick={() => setEvidence("Comparable decision")}>2 · Council decision</button></div><span className="answer-type">Tribunus assessment · Requires municipal confirmation</span></div></div></div>}
      </Drawer>

      <Modal open={exportOpen} title="Export Development Brief" onClose={() => setExportOpen(false)} wide footer={<><Button variant="ghost" onClick={() => setExportOpen(false)}>Cancel</Button><Button variant="primary"><Download size={15}/>Generate brief</Button></>}>
        <div className="export-layout"><div><label className="field-label">Audience / preset<select defaultValue="Full Development Brief"><option>Full Development Brief</option><option>Executive / investment committee</option><option>Findings and actions</option><option>Sources appendix</option></select></label><h3>Include sections</h3><div className="export-checks">{["Decision summary", "Project profile", "Verified baseline", "Fees and calculations", "Approval pathway", "Assumptions and risks", "Comparable projects", "Recommended actions", "Sources and limitations"].map((x) => <label key={x}><input type="checkbox" defaultChecked/><span><Check size={12}/></span>{x}</label>)}</div><div className="format-row"><label><input type="radio" name="format" defaultChecked/>PDF</label><label><input type="radio" name="format"/>Word</label></div></div><aside className="export-preview"><div className="report-sheet"><span>Tribunus</span><div className="report-rule"/><small>DEVELOPMENT REVIEW</small><h2>{project.name}</h2><p>{project.address}</p><div className="report-box"><strong>Decision summary</strong><i/><i/><i/></div><div className="report-meta"><span>Customer-ready</span><span>Verified Aug 8, 2026</span></div></div><p><strong>Estimated 18 pages</strong><span>Current customer-ready review · 48 sources</span></p></aside></div>
      </Modal>

      <Modal open={searchOpen} title="Search Tribunus" onClose={() => setSearchOpen(false)} wide>
        <div className="command-search"><Search size={19}/><input autoFocus placeholder="Search projects, findings, documents, and sources"/></div><div className="command-results"><span className="eyebrow">Quick access</span><button onClick={() => {navigate("/projects/marigold");setSearchOpen(false);}}><Gauge size={17}/><div><strong>Marigold & Litchfield</strong><span>Project · Coquitlam</span></div><kbd>↵</kbd></button><button onClick={() => {navigate("/projects/marigold/findings");setSearchOpen(false);}}><CircleAlert size={17}/><div><strong>Applicable ACC regime</strong><span>Assumption · High severity</span></div></button><button><FileText size={17}/><div><strong>Project statistics v3.xlsx</strong><span>Document · Marigold & Litchfield</span></div></button><span className="eyebrow">Commands</span><button onClick={() => {navigate("/create");setSearchOpen(false);}}><span className="command-plus">+</span><div><strong>Create project</strong><span>Start with an address or parcel</span></div></button></div>
      </Modal>
    </div>
  );
}

function ProjectHeader({ project, onAsk, onExport, onRun }: { project: typeof projects[number]; onAsk: () => void; onExport: () => void; onRun: () => void }) {
  return <header className="project-header"><div><div className="project-breadcrumb">Projects<ChevronRight size={13}/>{project.municipality}</div><h1>{project.name}</h1><p>{project.address} · {project.type} · {project.stage}</p><div className="project-status-line"><Badge tone="success">Review ready</Badge><span>Verified {project.verified}</span><span className="watch-on"><i/>Watch on</span></div></div><div className="project-header-actions"><Button variant="ghost" onClick={onAsk}><MessageSquareText size={15}/>Ask project<Badge tone="brand">Preview</Badge></Button><Button variant="secondary" onClick={onExport}><Download size={15}/>Export</Button><Button variant="primary" onClick={onRun}>View review<ArrowRight size={15}/></Button></div></header>;
}
