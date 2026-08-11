"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, BellRing, Building2, ChevronRight, CircleAlert, Eye, Filter, Plus, Search, ShieldCheck } from "lucide-react";
import { projects } from "@/components/data";
import { Badge, Button, Metric, PageHeader, SectionHeader } from "@/components/ui";

export function PortfolioPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const visible = useMemo(() => projects.filter((project) => {
    const matchesQuery = `${project.name} ${project.address} ${project.municipality}`.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "All" || (filter === "Attention" && project.review !== "Ready") || (filter === "Watch" && project.watch);
    return matchesQuery && matchesFilter;
  }), [query, filter]);

  return (
    <div className="page-container">
      <PageHeader
        title="Portfolio"
        actions={<Button variant="primary" onClick={() => router.push("/create")}><Plus size={15} />Create project</Button>}
      />

      <div className="metric-grid four">
        <button className={`metric-button ${filter === "Attention" ? "selected" : ""}`} onClick={() => setFilter(filter === "Attention" ? "All" : "Attention")}><Metric label="Needs attention" value="3" /></button>
        <button className={`metric-button ${filter === "Watch" ? "selected" : ""}`} onClick={() => setFilter(filter === "Watch" ? "All" : "Watch")}><Metric label="Material changes" value="3" /></button>
        <Metric label="Open high risks" value="6" detail="2 due this week" />
        <Metric label="Reviewed" value="75%" detail="3 of 4 current" />
      </div>

      <div className="portfolio-layout">
        <section className="panel projects-panel">
          <SectionHeader title="Projects" />
          <div className="toolbar">
            <label className="search-field"><Search size={15} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search project or address" /></label>
            <button className="filter-button"><Filter size={14} />Stage<span>All</span></button>
            <button className="filter-button"><Building2 size={14} />Municipality<span>All</span></button>
          </div>
          <div className="project-list-head">
            <span>Project</span><span>Review</span><span>Risks</span><span>Verified</span><span />
          </div>
          <div className="project-list">
            {visible.map((project) => (
              <button className="project-row" key={project.id} onClick={() => router.push(`/projects/${project.id}`)}>
                <div className="project-main"><strong>{project.name}</strong><span>{project.address}</span></div>
                <div className="project-meta"><Badge tone={project.review === "Ready" ? "success" : project.review === "Stale" ? "warning" : "medium"}>{project.review}</Badge></div>
                <div className="project-meta"><strong className={project.risks >= 3 ? "danger-text" : ""}>{project.risks}</strong></div>
                <div className="project-meta verified-cell"><strong>{project.verified}</strong></div>
                <ChevronRight size={15} className="row-arrow" />
              </button>
            ))}
          </div>
        </section>

        <aside className="portfolio-side">
          <section className="panel exposure-panel">
            <SectionHeader title="Exposure" action={<button className="icon-link"><ArrowUpRight size={15} /></button>} />
            <div className="exposure-item"><div><strong>Fee schedule</strong><p>3 projects may reach permit after the new regional rate takes effect.</p><button>Review affected</button></div></div>
            <div className="exposure-item"><div><strong>Shared policy dependency</strong><p>2 projects rely on the same neighbourhood-plan interpretation.</p><button>Compare assumptions</button></div></div>
            <div className="exposure-item"><div><strong>Source freshness</strong><p>Vancouver and Coquitlam checked today.</p><button>View coverage</button></div></div>
          </section>
          <section className="panel upcoming-panel">
            <SectionHeader title="Upcoming" />
            <div className="timeline-list">
              <div><span>Aug 14</span><p><strong>2 finding deadlines</strong>Marigold & Robinson</p></div>
              <div><span>Aug 18</span><p><strong>Weekly Watch digest</strong>4 monitored projects</p></div>
              <div><span>Jan 1</span><p><strong>Fee rate effective date</strong>Regional DCC schedule</p></div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
