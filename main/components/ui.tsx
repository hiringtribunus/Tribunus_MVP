import type { ReactNode } from "react";
import { ChevronRight, ExternalLink, Info, X } from "lucide-react";

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "high" | "medium" | "low" | "success" | "brand" | "warning" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

export function Button({ children, variant = "secondary", className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger" }) {
  return <button className={`button button-${variant} ${className}`} {...props}>{children}</button>;
}

export function PageHeader({ eyebrow, title, description, actions }: { eyebrow?: string; title: string; description?: string; actions?: ReactNode }) {
  return (
    <header className="page-header">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="page-actions">{actions}</div>}
    </header>
  );
}

export function SectionHeader({ title, detail, action }: { title: string; detail?: string; action?: ReactNode }) {
  return <div className="section-header"><div><h2>{title}</h2>{detail && <p>{detail}</p>}</div>{action}</div>;
}

export function Metric({ label, value, detail, tone }: { label: string; value: string; detail?: string; tone?: string }) {
  return <div className={`metric ${tone ? `metric-${tone}` : ""}`}><span>{label}</span><strong>{value}</strong>{detail && <small>{detail}</small>}</div>;
}

export function SourceLink({ label = "View source", onClick }: { label?: string; onClick?: () => void }) {
  return <button className="source-link" onClick={onClick}><ExternalLink size={13} />{label}</button>;
}

export function EmptyState({ icon, title, copy, action }: { icon?: ReactNode; title: string; copy: string; action?: ReactNode }) {
  return <div className="empty-state"><div className="empty-icon">{icon ?? <Info size={22} />}</div><h3>{title}</h3><p>{copy}</p>{action}</div>;
}

export function Drawer({ open, title, eyebrow, children, onClose, footer }: { open: boolean; title: string; eyebrow?: string; children: ReactNode; onClose: () => void; footer?: ReactNode }) {
  if (!open) return null;
  return (
    <div className="overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <aside className="drawer" role="dialog" aria-modal="true" aria-label={title}>
        <header className="drawer-header"><div>{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h2>{title}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close"><X size={18} /></button></header>
        <div className="drawer-body">{children}</div>
        {footer && <div className="drawer-footer">{footer}</div>}
      </aside>
    </div>
  );
}

export function Modal({ open, title, children, onClose, footer, wide = false }: { open: boolean; title: string; children: ReactNode; onClose: () => void; footer?: ReactNode; wide?: boolean }) {
  if (!open) return null;
  return (
    <div className="overlay modal-overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className={`modal ${wide ? "modal-wide" : ""}`} role="dialog" aria-modal="true" aria-label={title}>
        <header className="modal-header"><h2>{title}</h2><button className="icon-button" onClick={onClose} aria-label="Close"><X size={18} /></button></header>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

export function ProgressRow({ done, active, label, detail }: { done?: boolean; active?: boolean; label: string; detail?: string }) {
  return <div className={`progress-row ${done ? "done" : ""} ${active ? "active" : ""}`}><span className="progress-dot">{done ? "✓" : ""}</span><div><strong>{label}</strong>{detail && <small>{detail}</small>}</div></div>;
}

export function InlineLink({ children }: { children: ReactNode }) {
  return <button className="inline-link">{children}<ChevronRight size={14} /></button>;
}
