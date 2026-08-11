"use client";

import { useState } from "react";
import { Activity, ArrowRight, BellRing, Building2, CalendarDays, Check, ChevronRight, CircleAlert, Database, FileSearch, LineChart, Map, Search, ShieldCheck, Sparkles, UserPlus, Users } from "lucide-react";
import { alerts, precedents, projects } from "@/components/data";
import { Badge, Button, EmptyState, PageHeader, SectionHeader, SourceLink } from "@/components/ui";

export function GlobalWatchPage({ openEvidence }: { openEvidence: () => void }) {
  const [scope, setScope] = useState("All");
  return <div className="page-container">
    <PageHeader title="Watch" actions={<Button>Watch settings</Button>} />
    <div className="watch-summary panel-soft"><div><span className="live-dot" />Monitoring 126 authoritative sources</div><span>Last checked today at 06:10</span><span>Next digest · Monday</span></div>
    <div className="segmented"><button className={scope === "All" ? "active" : ""} onClick={() => setScope("All")}>All updates <span>8</span></button><button className={scope === "Material" ? "active" : ""} onClick={() => setScope("Material")}>Material <span>3</span></button><button className={scope === "Unread" ? "active" : ""} onClick={() => setScope("Unread")}>Unread <span>4</span></button></div>
    <div className="watch-feed">
      {alerts.filter((a) => scope === "All" || scope === "Unread" || a.level === "Material").map((alert, i) => <article className="watch-card" key={alert.title}>
        <div className={`watch-type ${i === 0 ? "important" : ""}`}>{i === 0 ? <BellRing size={17} /> : <Activity size={17} />}</div>
        <div className="watch-content"><div className="watch-card-head"><div><span className="eyebrow">{alert.type} · {alert.when}</span><h2>{alert.title}</h2></div><Badge tone={alert.level === "Material" ? "high" : "neutral"}>{alert.level}</Badge></div><p>{alert.body}</p><div className="impact-callout"><strong>Potential impact</strong><span>{alert.impact}</span></div><div className="watch-actions"><Button variant={i === 0 ? "primary" : "secondary"}>Review impact<ArrowRight size={15} /></Button><SourceLink onClick={openEvidence} /><span className="affected">Affects {alert.projects}</span></div></div>
      </article>)}
    </div>
  </div>;
}

export function IntelligencePage() {
  const [tab, setTab] = useState("Projects");
  return <div className="page-container">
    <PageHeader title="Intelligence" />
    <div className="intelligence-search"><Search size={20} /><input placeholder="Search an address, policy, council item, or development type" /><button>Search</button></div>
    <div className="tab-row"><button className={tab === "Projects" ? "active" : ""} onClick={() => setTab("Projects")}>Comparable projects</button><button className={tab === "Council" ? "active" : ""} onClick={() => setTab("Council")}>Meetings & council</button><button className={tab === "Growth" ? "active" : ""} onClick={() => setTab("Growth")}>Growth forecast <Badge tone="brand">Preview</Badge></button></div>
    {tab === "Projects" && <div className="intelligence-grid">
      <section className="panel"><SectionHeader title="Recently relevant" detail="Ranked against active portfolio projects" />{precedents.map((precedent) => <div className="intel-row" key={precedent.id}><div className="intel-icon"><Building2 size={17} /></div><div><strong>{precedent.address}</strong><span>{precedent.distance} · {precedent.units} units · {precedent.fsr} FSR</span><small>{precedent.note}</small></div><div><Badge tone="success">{precedent.outcome}</Badge><button>Open<ChevronRight size={14} /></button></div></div>)}</section>
      <aside className="panel coverage-card"><SectionHeader title="Coverage" /><div className="coverage-map"><div className="map-line line-a"/><div className="map-line line-b"/><span className="map-dot van">Vancouver</span><span className="map-dot coq">Coquitlam</span></div><div className="coverage-stat"><strong>2</strong><span>Active municipalities</span></div><div className="coverage-stat"><strong>4,280</strong><span>Indexed source records</span></div><div className="coverage-stat"><strong>Today</strong><span>Last source check</span></div></aside>
    </div>}
    {tab === "Council" && <div className="two-column"><section className="panel"><SectionHeader title="Recent meetings" detail="Customer-facing summaries are limited to reviewed source coverage" />{["Housing agreement and rezoning at 5678 Como Lake", "Development finance framework update", "Neighbourhood plan amendment — transition areas"].map((title, i) => <div className="meeting-row" key={title}><CalendarDays size={18}/><div><strong>{title}</strong><span>{i === 0 ? "Coquitlam Council · Aug 6" : i === 1 ? "Vancouver Council · Aug 4" : "Coquitlam Council · Jul 29"}</span><p>{i === 0 ? "Approved with conditions after discussion of access and tenure." : "Staff recommendation and debated themes available."}</p></div><ChevronRight size={17}/></div>)}</section><aside className="panel limitation-card"><FileSearch size={24}/><h3>Evidence before interpretation</h3><p>Meeting summaries show exactly which records were reviewed and where coverage may be incomplete.</p><button>View methodology</button></aside></div>}
    {tab === "Growth" && <div className="placeholder-page panel"><div className="placeholder-art growth-art"><Map size={38}/><span/><span/><span/></div><Badge tone="brand">Preview</Badge><h2>See where policy and infrastructure point next</h2><p>Growth Forecasting connects regional strategies, municipal plans, and transit announcements into sourced signals—not an unsupported heat map.</p><div className="placeholder-columns"><div><LineChart size={20}/><strong>Policy trajectory</strong><span>Approved plans and amendments</span></div><div><Map size={20}/><strong>Transit & servicing</strong><span>Planned infrastructure timelines</span></div><div><ShieldCheck size={20}/><strong>Evidence labels</strong><span>Plan versus projection</span></div></div><Button variant="primary">Request preview access</Button></div>}
  </div>;
}

export function SettingsPage() {
  const [section, setSection] = useState("Workspace");
  const sections = ["Workspace", "Team & invitations", "Roles & access", "Notifications", "Security"];
  return <div className="page-container settings-page"><PageHeader title="Settings" />
    <div className="settings-layout"><nav>{sections.map((item) => <button className={section === item ? "active" : ""} key={item} onClick={() => setSection(item)}>{item}</button>)}</nav><section className="panel settings-content">
      <SectionHeader title={section} action={section === "Team & invitations" ? <Button variant="primary"><UserPlus size={15}/>Invite member</Button> : undefined} />
      {section === "Workspace" && <div className="form-stack"><label>Workspace name<input defaultValue="Litchfield Development Group" /></label><label>Primary market<select defaultValue="Metro Vancouver"><option>Metro Vancouver</option></select></label><label>Workspace description<textarea defaultValue="Residential development and investment across Metro Vancouver." /></label><div><Button variant="primary">Save changes</Button></div></div>}
      {section === "Team & invitations" && <div className="settings-table"><div className="settings-row header"><span>Member</span><span>Role</span><span>Project access</span><span>Last active</span></div>{[["Maya Chen", "Admin", "All projects", "Today"], ["Liam Foster", "Member", "3 projects", "Today"], ["Sofia Reyes", "Member", "2 projects", "Yesterday"], ["Daniel Wong", "Viewer", "Marigold", "Aug 4"]].map((row) => <div className="settings-row" key={row[0]}><span><i>{row[0].split(" ").map(x => x[0]).join("")}</i><strong>{row[0]}</strong></span><span>{row[1]}</span><span>{row[2]}</span><span>{row[3]}</span></div>)}</div>}
      {section === "Roles & access" && <div className="role-cards">{[["Admin", "Manage workspace, projects, people, and reports"], ["Member", "Create projects, run reviews, and resolve findings"], ["Viewer", "Read approved reviews and exported briefs"]].map((r) => <div key={r[0]}><Users size={19}/><strong>{r[0]}</strong><p>{r[1]}</p><button>Edit defaults</button></div>)}</div>}
      {section === "Notifications" && <div className="toggle-list">{[["Material Watch alerts", "Notify immediately when a verified change could affect cost or pathway"], ["Weekly project digest", "A concise Monday summary for monitored projects"], ["Assignments and due dates", "Notify when work is assigned or becomes overdue"], ["Review ready", "Notify when Tribunus approves a Development Review"]].map((r, i) => <label key={r[0]}><div><strong>{r[0]}</strong><span>{r[1]}</span></div><input type="checkbox" defaultChecked={i !== 2}/><i/></label>)}</div>}
      {section === "Security" && <div className="security-list"><div><ShieldCheck size={20}/><p><strong>Workspace isolation</strong><span>Project data is separated at the workspace level.</span></p><Badge tone="success">Active</Badge></div><div><Database size={20}/><p><strong>Active sessions</strong><span>Review and revoke sessions associated with your account.</span></p><button>Review</button></div><div><Activity size={20}/><p><strong>Activity history</strong><span>See account, access, and project changes.</span></p><button>Open log</button></div></div>}
    </section></div>
  </div>;
}

export function OperationsPage() {
  return <div className="page-container operations-page"><div className="ops-banner"><ShieldCheck size={16}/>Tribunus Operations · Internal only</div><PageHeader title="Review queue" actions={<Button>Source operations</Button>} />
    <div className="metric-grid four compact"><div className="ops-stat"><span>Unassigned</span><strong>8</strong></div><div className="ops-stat"><span>Mine</span><strong>4</strong></div><div className="ops-stat"><span>Blocked</span><strong>2</strong></div><div className="ops-stat"><span>Median age</span><strong>3.8h</strong></div></div>
    <section className="panel"><div className="toolbar"><label className="search-field"><Search size={15}/><input placeholder="Search review queue"/></label><button className="filter-button">Municipality <span>All</span></button><button className="filter-button">Assignee <span>All</span></button></div><div className="ops-table"><div className="ops-row header"><span>Project</span><span>Municipality</span><span>Stage</span><span>Age</span><span>Flags</span><span>Assignee</span><span/></div>{projects.slice(0,3).map((project, i) => <div className="ops-row" key={project.id}><span><strong>{project.name}</strong><small>{project.address}</small></span><span>{project.municipality}</span><span>{i === 0 ? "Verify findings" : i === 1 ? "Source review" : "Profile extraction"}</span><span>{i === 0 ? "2h" : i === 1 ? "6h" : "1d"}</span><span><Badge tone={i === 0 ? "high" : "warning"}>{i === 0 ? "3 conflicts" : i === 1 ? "1 stale source" : "2 unsupported"}</Badge></span><span>{i === 1 ? "Unassigned" : "Maya"}</span><span><ChevronRight size={16}/></span></div>)}</div></section>
  </div>;
}

export function SignInPage() {
  return <div className="auth-page"><div className="auth-brand"><span>Tribunus</span></div><main className="auth-card"><div className="eyebrow">Development decision infrastructure</div><h1>Welcome back</h1><p>Sign in to your firm’s development intelligence workspace.</p><label>Work email<input type="email" placeholder="you@company.com" /></label><Button variant="primary">Continue with email<ArrowRight size={16}/></Button><div className="auth-note"><ShieldCheck size={16}/>Your project documents remain private to your workspace.</div></main><footer>Tribunus Labs · Vancouver, BC</footer></div>;
}
