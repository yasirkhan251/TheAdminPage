import React, { useMemo, useState } from "react";
import {
  Activity, ArrowDownRight, ArrowUpRight, Bell, BriefcaseBusiness, CalendarDays,
  Check, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Clock3, CreditCard,
  Download, ExternalLink, FileText, Filter, LayoutDashboard, Menu, MoreHorizontal,
  Plus, Search, Settings, ShieldCheck, Users, Wallet, X, Zap, Globe, Code2,
  Megaphone, Palette, Bot, CircleDollarSign
} from "lucide-react";

const initialProjects = [
  { id: 1, name: "Falcon Tech Website", client: "Falcon Technologies", service: "Web Development", budget: 24990, progress: 82, status: "In Progress", due: "Oct 30, 2026", color: "#5968e8" },
  { id: 2, name: "E-commerce Platform", client: "Urban Store", service: "E-commerce", budget: 45000, progress: 58, status: "In Progress", due: "Dec 12, 2026", color: "#16a685" },
  { id: 3, name: "SEO Optimization", client: "Growth Labs", service: "SEO", budget: 12000, progress: 100, status: "Completed", due: "Oct 24, 2026", color: "#e5a43b" },
  { id: 4, name: "CRM Automation", client: "Nova Solutions", service: "Automation", budget: 32000, progress: 35, status: "In Progress", due: "Nov 18, 2026", color: "#9974dd" },
  { id: 5, name: "Business Landing Page", client: "Apex Consulting", service: "Web Development", budget: 18000, progress: 0, status: "Pending", due: "Nov 05, 2026", color: "#e98072" },
];

const initialInvoices = [
  { id: "INV-1042", client: "Falcon Technologies", service: "Website Development", amount: 12495, status: "Paid", date: "Oct 25, 2026" },
  { id: "INV-1041", client: "Urban Store", service: "E-commerce Platform", amount: 15000, status: "Pending", date: "Oct 24, 2026" },
  { id: "INV-1040", client: "Growth Labs", service: "SEO Services", amount: 12000, status: "Paid", date: "Oct 22, 2026" },
  { id: "INV-1039", client: "Nova Solutions", service: "CRM Automation", amount: 8000, status: "Overdue", date: "Oct 15, 2026" },
];

const initialClients = [
  { name: "Falcon Technologies", email: "hello@falcon.example", service: "Web Development", projects: 2, color: "#5968e8" },
  { name: "Urban Store", email: "team@urban.example", service: "E-commerce", projects: 1, color: "#16a685" },
  { name: "Growth Labs", email: "contact@growth.example", service: "SEO Services", projects: 1, color: "#e5a43b" },
  { name: "Nova Solutions", email: "info@nova.example", service: "Automation", projects: 1, color: "#9974dd" },
];

const services = [
  { name: "Web Development", desc: "Business websites, web apps and custom platforms.", icon: Code2, color: "#5968e8", bg: "#eef0ff", price: "Project based" },
  { name: "E-commerce", desc: "Online stores, product catalogs and checkout flows.", icon: Globe, color: "#16a685", bg: "#e8f8f2", price: "Custom pricing" },
  { name: "SEO Services", desc: "Technical SEO, content optimization and reporting.", icon: Megaphone, color: "#d49a36", bg: "#fff5e5", price: "Monthly packages" },
  { name: "UI/UX Design", desc: "Responsive interfaces, wireframes and prototypes.", icon: Palette, color: "#9974dd", bg: "#f3edff", price: "Project based" },
  { name: "Automation", desc: "Business workflows, integrations and CRM automation.", icon: Bot, color: "#e16c70", bg: "#fff0f0", price: "Custom pricing" },
  { name: "Consulting", desc: "Digital strategy, technical planning and support.", icon: BriefcaseBusiness, color: "#438bbf", bg: "#eaf5fc", price: "Hourly / project" },
];

const formatMoney = (value) => new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 0
}).format(value);

const initials = (name) => name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
:root{font-family:'DM Sans',sans-serif;color:#202638;background:#f7f8fc;font-synthesis:none;text-rendering:optimizeLegibility;font-optical-sizing:auto;font-weight:400}
*{box-sizing:border-box}body{margin:0;min-width:320px}button,input,select{font:inherit}button{cursor:pointer}button:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid #bcc6ff;outline-offset:2px}
.app{min-height:100vh}.sidebar{position:fixed;inset:0 auto 0 0;width:250px;background:#fff;border-right:1px solid #edf0f5;display:flex;flex-direction:column;padding:25px 17px;z-index:20;transition:transform .25s ease}
.brand{display:flex;align-items:center;gap:11px;padding:0 9px 32px}.brand-logo{width:39px;height:39px;border-radius:12px;background:linear-gradient(145deg,#6478f2,#4054ce);display:grid;place-items:center;color:#fff;font-size:22px;font-weight:800;box-shadow:0 5px 12px #5266e52c}.brand-name{font-family:Manrope,sans-serif;font-weight:800;font-size:18px;letter-spacing:-.7px}.brand-sub{font-size:9px;color:#9299a8;margin-top:4px;letter-spacing:1.2px}
.nav-label{font-size:10px;font-weight:700;color:#a2a8b5;letter-spacing:1.25px;padding:13px 12px 9px}.nav-item{display:flex;align-items:center;gap:12px;width:100%;border:0;background:transparent;color:#737c8f;padding:12px;border-radius:9px;text-align:left;font-size:13px;margin-bottom:3px;transition:.2s}.nav-item:hover{background:#f5f6ff;color:#4e61d9}.nav-item.active{background:#eef0ff;color:#4d60db;font-weight:700}.nav-icon{width:20px;display:grid;place-items:center}.nav-count{margin-left:auto;background:#e5e9ff;color:#4f61d7;padding:3px 7px;border-radius:6px;font-size:10px}
.sidebar-bottom{margin-top:auto}.help-card{background:#f7f8ff;border:1px solid #e9ecff;border-radius:12px;padding:15px;margin:12px 3px}.help-icon{width:30px;height:30px;background:#e5e9ff;color:#5265de;border-radius:9px;display:grid;place-items:center}.help-card strong{display:block;font-size:12px;margin-top:12px}.help-card p{font-size:11px;color:#858da0;line-height:1.6;margin:6px 0 12px}.help-card button{border:1px solid #e6e8f0;background:#fff;padding:8px;border-radius:7px;font-size:11px;color:#505b70;width:100%}
.user-mini{border-top:1px solid #edf0f5;padding:20px 5px 0;display:flex;align-items:center;gap:10px;margin-top:17px}.avatar{width:36px;height:36px;flex-shrink:0;display:grid;place-items:center;background:#e4e8ff;color:#4b5fce;font-size:12px;font-weight:700;border-radius:11px}.user-info{min-width:0}.user-info strong{font-size:12px;display:block}.user-info span{font-size:10px;color:#9299a8;display:block;margin-top:4px}
.main{margin-left:250px;min-height:100vh}.topbar{height:76px;background:#fff;border-bottom:1px solid #edf0f5;display:flex;align-items:center;justify-content:space-between;padding:0 35px;gap:18px;position:sticky;top:0;z-index:10}.top-left{display:flex;align-items:center;gap:13px;min-width:0}.mobile-menu{display:none;border:1px solid #e7eaf1;background:#fff;border-radius:9px;padding:8px}.breadcrumb{font-size:12px;color:#98a0b0;white-space:nowrap}.breadcrumb b{color:#283044;font-weight:700}.top-actions{display:flex;align-items:center;gap:12px}.search{width:245px;height:39px;border:1px solid #e9ecf2;border-radius:9px;display:flex;align-items:center;gap:9px;padding:0 12px;color:#9aa2b1;background:#fbfcfe}.search input{width:100%;min-width:0;border:0;outline:none;background:transparent;font-size:12px;color:#30384a}.icon-btn{width:38px;height:38px;border:1px solid #e9ecf2;background:#fff;border-radius:10px;color:#70798b;display:grid;place-items:center;position:relative}.notification-dot{position:absolute;width:7px;height:7px;border-radius:50%;background:#f16e71;right:8px;top:7px;border:1px solid white}
.page{padding:31px 35px 45px;max-width:1600px;margin:auto}.welcome-row{display:flex;justify-content:space-between;align-items:center;gap:15px;margin-bottom:25px}h1,h2,h3,p{margin-top:0}h1{font-family:Manrope,sans-serif;font-size:25px;letter-spacing:-1px;margin:0 0 7px;font-weight:800}.subtitle{color:#8a93a5;font-size:12px;margin:0;line-height:1.7}.primary-btn{background:#5367df;color:white;border:0;border-radius:9px;padding:11px 15px;font-weight:600;font-size:12px;display:inline-flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 4px 10px #5367df20;transition:.2s}.primary-btn:hover{background:#4055cf;transform:translateY(-1px)}.secondary-btn{background:#fff;border:1px solid #e7eaf1;color:#596276;border-radius:8px;padding:9px 12px;font-size:11px;font-weight:600}.secondary-btn:hover{background:#f8f9ff}
.stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:17px;margin-bottom:22px}.stat-card,.panel{background:#fff;border:1px solid #edf0f5;border-radius:13px}.stat-card{padding:19px;min-width:0}.stat-head{display:flex;align-items:center;justify-content:space-between;gap:8px}.stat-label{font-size:11px;color:#818a9d;font-weight:500}.stat-icon{width:35px;height:35px;border-radius:10px;display:grid;place-items:center}.stat-number{font-family:Manrope,sans-serif;font-size:25px;font-weight:800;letter-spacing:-1px;margin:17px 0 9px;white-space:nowrap}.stat-foot{display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:10px;color:#9aa2b0}.growth{color:#14a782;font-weight:700}.muted{color:#a0a7b5}
.middle-grid{display:grid;grid-template-columns:minmax(0,1.65fr) minmax(260px,1fr);gap:18px;margin-bottom:22px}.panel{padding:21px;min-width:0}.panel-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:19px}.panel-heading h2{font-size:14px;font-weight:700;margin:0 0 6px;letter-spacing:-.2px}.panel-heading p{font-size:10px;color:#929aab;margin:0}.select{border:1px solid #e9ecf2;background:white;color:#737c8e;padding:8px 10px;border-radius:8px;font-size:10px;outline:none}.chart-summary{display:flex;align-items:center;gap:9px;margin-bottom:12px}.chart-summary strong{font-family:Manrope,sans-serif;font-size:22px;letter-spacing:-.7px}.chart-summary span{font-size:10px;color:#12a17d}.chart-wrap{height:205px;width:100%;position:relative}.chart-wrap svg{width:100%;height:100%;overflow:visible}.chart-grid{stroke:#edf0f6;stroke-width:1;stroke-dasharray:4 5}.chart-label{font-family:'DM Sans',sans-serif;fill:#a0a8b6;font-size:10px}.chart-legend{display:flex;gap:16px;margin-top:13px;font-size:10px;color:#8d96a6;flex-wrap:wrap}.legend-dot{display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:6px}
.donut-wrap{display:flex;justify-content:center;align-items:center;padding:3px 0 15px}.donut{width:148px;height:148px;border-radius:50%;background:conic-gradient(#5669e7 0 48%,#14b69a 48% 73%,#eab456 73% 89%,#e9edf5 89% 100%);display:grid;place-items:center;position:relative}.donut:before{content:"";position:absolute;inset:17px;background:white;border-radius:50%}.donut-center{z-index:1;text-align:center}.donut-center strong{font-family:Manrope,sans-serif;font-size:27px;display:block;letter-spacing:-1px}.donut-center span{font-size:10px;color:#929aab}.legend-list{display:grid;gap:13px}.legend-row{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:11px}.legend-name{display:flex;align-items:center;gap:8px;color:#70798b}.legend-row strong{font-size:11px}.legend-square{width:9px;height:9px;border-radius:3px;flex-shrink:0}
.bottom-grid{display:grid;grid-template-columns:minmax(0,1.8fr) minmax(250px,1fr);gap:18px}.table-panel{padding:0;overflow:hidden}.table-title{padding:20px 21px 17px;display:flex;align-items:center;justify-content:space-between;gap:12px}.table-title h2{font-size:14px;margin:0 0 6px}.table-title p{font-size:10px;color:#949cad;margin:0}.table-scroll{overflow-x:auto;width:100%}table{border-collapse:collapse;width:100%;text-align:left;white-space:nowrap}thead{background:#fafbfe}th{font-size:10px;color:#929aab;font-weight:600;padding:12px 19px;border-top:1px solid #f0f2f7;border-bottom:1px solid #f0f2f7}td{padding:15px 19px;border-bottom:1px solid #f0f2f7;font-size:11px;color:#6e778a}tbody tr:last-child td{border-bottom:0}tbody tr:hover{background:#fbfcff}.project-name{display:flex;align-items:center;gap:10px}.project-mark{width:33px;height:33px;border-radius:9px;display:grid;place-items:center;font-weight:700;font-size:12px;flex-shrink:0}.project-name strong{display:block;font-size:11px;color:#333c50;margin-bottom:4px}.project-name span{font-size:10px;color:#9aa2b0}.status{display:inline-flex;align-items:center;gap:5px;padding:6px 8px;border-radius:6px;font-size:10px;font-weight:600}.status:before{content:"";width:5px;height:5px;background:currentColor;border-radius:50%}.status.in-progress{color:#5769db;background:#eef0ff}.status.completed,.status.paid{color:#129a77;background:#e8f8f2}.status.pending{color:#c18a28;background:#fff5df}.status.overdue{color:#d65d65;background:#fff0f0}.progress-row{display:flex;align-items:center;gap:8px;min-width:95px}.progress-track{height:5px;background:#edf0f6;border-radius:10px;width:64px;overflow:hidden}.progress-fill{height:100%;border-radius:10px;background:#6375e7}.progress-row span{font-size:10px;color:#788195}.activity-list{display:grid;gap:20px}.activity{display:flex;gap:11px;align-items:flex-start}.activity-icon{width:34px;height:34px;flex-shrink:0;border-radius:10px;display:grid;place-items:center;font-size:14px}.activity-content{flex:1;min-width:0}.activity-content p{font-size:11px;line-height:1.6;color:#606a7d;margin:0}.activity-content strong{color:#30394d}.activity-content time{font-size:10px;color:#a2a9b7;display:block;margin-top:5px}.activity-divider{height:1px;background:#f0f2f6;margin-top:-8px}.invoice-amount{font-weight:700;color:#343c50}.empty{padding:35px;text-align:center;color:#9aa2b0;font-size:12px}
.modal-backdrop{position:fixed;inset:0;background:#18203b60;backdrop-filter:blur(3px);z-index:40;display:grid;place-items:center;padding:18px}.modal{background:white;width:min(100%,480px);padding:25px;border-radius:16px;box-shadow:0 20px 70px #15204430;max-height:90vh;overflow:auto}.modal-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}.modal-head h2{font-family:Manrope,sans-serif;font-size:20px;margin:0}.close-btn{width:32px;height:32px;border:1px solid #e9ecf2;border-radius:8px;background:white;font-size:18px;color:#778093}.modal-sub{font-size:12px;color:#8b94a5;margin-bottom:23px}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:15px}.form-field{display:grid;gap:7px;margin-bottom:15px}.form-field.full{grid-column:1/-1}.form-field label{font-size:11px;font-weight:600;color:#596276}.form-field input,.form-field select{height:40px;width:100%;padding:0 11px;border:1px solid #e5e9f0;border-radius:8px;background:white;color:#30394d;font-size:12px}.form-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:10px}.toast{position:fixed;right:25px;bottom:25px;background:#242d42;color:white;border-radius:10px;padding:14px 18px;font-size:12px;box-shadow:0 8px 30px #18203b25;z-index:50;animation:appear .2s ease}@keyframes appear{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.client-grid,.service-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px}.client-card,.service-card{border:1px solid #edf0f5;border-radius:12px;background:#fff;padding:19px}.client-card .avatar{width:43px;height:43px;border-radius:12px;margin-bottom:15px}.client-card h3,.service-card h3{font-size:13px;margin-bottom:6px}.client-card p,.service-card p{font-size:11px;color:#9098a8;margin-bottom:15px;line-height:1.7;overflow-wrap:anywhere}.client-meta{padding-top:13px;border-top:1px solid #f0f2f7;display:flex;justify-content:space-between;font-size:10px;color:#8a93a4;gap:8px}.service-card .stat-icon{margin-bottom:18px}.service-card p{min-height:37px}.service-card strong{font-size:14px}.settings-card{max-width:650px}.setting-row{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:18px 0;border-bottom:1px solid #f0f2f7}.setting-row strong{display:block;font-size:12px;margin-bottom:5px}.setting-row span{font-size:11px;color:#929aab}.toggle{width:38px;height:21px;border:0;border-radius:20px;background:#d9deea;padding:3px;flex-shrink:0}.toggle.on{background:#5b6fe5}.toggle:after{content:"";display:block;width:15px;height:15px;background:white;border-radius:50%;transition:.2s}.toggle.on:after{transform:translateX(17px)}.notice-panel{position:absolute;right:0;top:45px;width:260px;background:white;border:1px solid #edf0f5;border-radius:12px;padding:16px;box-shadow:0 12px 35px #18203b18;z-index:25}
@media(min-width:1500px){.page{padding-left:45px;padding-right:45px}.stats{gap:20px}.stat-card{padding:23px}}@media(max-width:1150px){.sidebar{width:220px}.main{margin-left:220px}.topbar{padding:0 24px}.page{padding:27px 24px}.stats{grid-template-columns:repeat(2,minmax(0,1fr))}.middle-grid{grid-template-columns:minmax(0,1.4fr) minmax(240px,1fr)}.bottom-grid{grid-template-columns:1fr}.client-grid,.service-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:760px){.sidebar{width:250px;transform:translateX(-100%);box-shadow:none}.sidebar.open{transform:translateX(0);box-shadow:15px 0 40px #202b491f}.main{margin-left:0}.topbar{height:65px;padding:0 16px}.mobile-menu{display:grid;place-items:center}.breadcrumb{font-size:11px}.search{width:165px}.top-actions{gap:7px}.page{padding:25px 16px 35px}.welcome-row{align-items:flex-start}.stats{gap:11px}.stat-card{padding:15px}.stat-number{font-size:21px}.middle-grid{grid-template-columns:1fr}.bottom-grid{grid-template-columns:1fr}.client-grid,.service-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:480px){.topbar{gap:8px}.search{width:38px;padding:0 10px;justify-content:center;border-color:transparent;background:#f7f8fc}.search input{display:none}.search:focus-within{position:absolute;left:60px;right:108px;width:auto;background:white;border-color:#e9ecf2;z-index:15}.search:focus-within input{display:block}.top-actions{gap:5px}.icon-btn{width:34px;height:34px}.welcome-row{gap:8px}.welcome-row h1{font-size:21px}.welcome-row .primary-btn{padding:10px;font-size:11px;white-space:nowrap}.stats{gap:10px}.stat-card{padding:13px 11px}.stat-number{font-size:19px}.stat-label{font-size:10px}.stat-icon{width:29px;height:29px}.stat-foot{font-size:9px}.client-grid,.service-grid{grid-template-columns:1fr}.form-grid{grid-template-columns:1fr}.form-field.full{grid-column:auto}.panel{padding:17px}.table-panel{padding:0}.panel-heading{gap:8px}.chart-wrap{height:180px}.table-title{padding:17px}.table-title .secondary-btn{padding:8px}.toast{left:16px;right:16px;bottom:16px;text-align:center}}
`;

function Badge({ status }) {
  return <span className={"status " + status.toLowerCase().replaceAll(" ", "-")}>{status}</span>;
}

function RevenueChart({ period }) {
  const datasets = {
    "7 days": [12, 24, 19, 34, 27, 43, 38],
    "30 days": [16, 29, 22, 38, 31, 50, 43, 61, 47, 67, 55, 75],
    "90 days": [18, 25, 20, 42, 36, 48, 41, 62, 51, 73, 63, 85],
    "12 months": [17, 23, 31, 27, 42, 38, 50, 46, 61, 56, 72, 85],
  };
  const data = datasets[period];
  const points = data.map((value, index) => (42 + index * (540 / (data.length - 1))) + "," + (155 - value * 1.42)).join(" ");
  const area = "42,165 " + points + " 582,165";
  return <div className="chart-wrap">
    <svg viewBox="0 0 610 200" role="img" aria-label={"Illustrative revenue trend for " + period}>
      {[30,65,100,135,170].map((y) => <line key={y} x1="35" y1={y} x2="595" y2={y} className="chart-grid" />)}
      <defs><linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6477ed" stopOpacity=".2"/><stop offset="100%" stopColor="#6477ed" stopOpacity="0"/></linearGradient></defs>
      <polygon points={area} fill="url(#revenueGradient)" />
      <polyline points={points} fill="none" stroke="#6173e9" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
      {points.split(" ").map((point,index) => { const xy = point.split(","); return <circle key={index} cx={xy[0]} cy={xy[1]} r="3" fill="#fff" stroke="#6173e9" strokeWidth="2" />; })}
      {["01","05","10","15","20","25","30"].map((label,index) => <text key={label} x={42 + index * 90} y="192" textAnchor="middle" className="chart-label">{label}</text>)}
    </svg>
  </div>;
}

function ProjectModal({ onClose, onSave }) {
  const [form, setForm] = useState({ name: "", client: "", service: "Web Development", budget: "", due: "" });
  const change = (key,value) => setForm((old) => ({ ...old, [key]: value }));
  function submit(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.client.trim() || !form.budget || Number(form.budget) <= 0) return;
    onSave(form);
  }
  return <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-head"><h2 id="modal-title">Create new project</h2><button className="close-btn" onClick={onClose} aria-label="Close dialog"><X size={17}/></button></div>
      <p className="modal-sub">Add a service project to your workspace.</p>
      <form onSubmit={submit}>
        <div className="form-grid">
          <div className="form-field full"><label>Project name *</label><input required value={form.name} onChange={(e) => change("name",e.target.value)} placeholder="e.g. Company website"/></div>
          <div className="form-field full"><label>Client name *</label><input required value={form.client} onChange={(e) => change("client",e.target.value)} placeholder="Client or company"/></div>
          <div className="form-field"><label>Service type</label><select value={form.service} onChange={(e) => change("service",e.target.value)}>{["Web Development","E-commerce","SEO","UI/UX Design","Automation","Consulting"].map((s) => <option key={s}>{s}</option>)}</select></div>
          <div className="form-field"><label>Budget (₹) *</label><input required min="1" type="number" value={form.budget} onChange={(e) => change("budget",e.target.value)} placeholder="25000"/></div>
          <div className="form-field full"><label>Expected deadline</label><input type="date" value={form.due} onChange={(e) => change("due",e.target.value)}/></div>
        </div>
        <div className="form-actions"><button type="button" className="secondary-btn" onClick={onClose}>Cancel</button><button type="submit" className="primary-btn"><Plus size={15}/> Create project</button></div>
      </form>
    </div>
  </div>;
}

export default function App() {
  const [page,setPage] = useState("Overview");
  const [projects,setProjects] = useState(initialProjects);
  const [clients,setClients] = useState(initialClients);
  const [invoices,setInvoices] = useState(initialInvoices);
  const [search,setSearch] = useState("");
  const [period,setPeriod] = useState("30 days");
  const [filter,setFilter] = useState("All");
  const [showModal,setShowModal] = useState(false);
  const [menuOpen,setMenuOpen] = useState(false);
  const [toast,setToast] = useState("");
  const [notificationsOpen,setNotificationsOpen] = useState(false);
  const [settings,setSettings] = useState({ email: true, updates: true, reports: false });

  function notify(message) {
    setToast(message);
    window.clearTimeout(window.__dashboardToast);
    window.__dashboardToast = window.setTimeout(() => setToast(""),2800);
  }

  const filteredProjects = useMemo(() => projects.filter((p) => {
    const matches = [p.name,p.client,p.service,p.status].join(" ").toLowerCase().includes(search.toLowerCase());
    return matches && (filter === "All" || p.status === filter);
  }),[projects,search,filter]);
  const filteredInvoices = useMemo(() => invoices.filter((i) => [i.id,i.client,i.service,i.status].join(" ").toLowerCase().includes(search.toLowerCase())),[invoices,search]);
  const filteredClients = useMemo(() => clients.filter((c) => [c.name,c.email,c.service].join(" ").toLowerCase().includes(search.toLowerCase())),[clients,search]);

  const collected = invoices.filter((i) => i.status === "Paid").reduce((sum,i) => sum + i.amount,0);
  const outstanding = invoices.filter((i) => i.status !== "Paid").reduce((sum,i) => sum + i.amount,0);
  const activeCount = projects.filter((p) => p.status === "In Progress").length;
  const completedCount = projects.filter((p) => p.status === "Completed").length;
  const pendingCount = projects.filter((p) => p.status === "Pending").length;

  function navigate(name) { setPage(name); setMenuOpen(false); setSearch(""); }
  function addProject(form) {
    const colors = ["#5968e8","#16a685","#9974dd","#e5a43b","#e98072"];
    const due = form.due ? new Date(form.due + "T12:00:00").toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}) : "Not set";
    const project = { id: Date.now(), name: form.name.trim(), client: form.client.trim(), service: form.service, budget: Number(form.budget), progress: 0, status: "Pending", due, color: colors[projects.length % colors.length] };
    setProjects((old) => [project,...old]);
    const existing = clients.some((c) => c.name.toLowerCase() === form.client.trim().toLowerCase());
    if (!existing) setClients((old) => [...old,{name:form.client.trim(),email:"Not provided",service:form.service,projects:1,color:project.color}]);
    else setClients((old) => old.map((c) => c.name.toLowerCase() === form.client.trim().toLowerCase() ? {...c,projects:c.projects+1} : c));
    setShowModal(false); navigate("Projects"); setFilter("All"); notify("Project created successfully.");
  }
  function updateProjectStatus(id,status) {
    setProjects((old) => old.map((p) => p.id === id ? {...p,status,progress:status === "Completed" ? 100 : status === "Pending" ? 0 : Math.max(p.progress,10)} : p));
    notify("Project status updated.");
  }
  function toggleInvoice(id) {
    setInvoices((old) => old.map((invoice) => invoice.id === id ? {...invoice,status:invoice.status === "Paid" ? "Pending" : "Paid"} : invoice));
    notify("Invoice status updated.");
  }
  function exportProjects() {
    const rows = [["Project","Client","Service","Budget","Progress","Status","Deadline"],...filteredProjects.map((p) => [p.name,p.client,p.service,p.budget,p.progress + "%",p.status,p.due])];
    const csv = rows.map((row) => row.map((v) => '"' + String(v).replaceAll('"','""') + '"').join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["\ufeff" + csv],{type:"text/csv;charset=utf-8;"}));
    const link = document.createElement("a"); link.href = url; link.download = "service-projects.csv"; link.click(); URL.revokeObjectURL(url);
    notify("Project report exported.");
  }

  const navGroups = [
    { label:"WORKSPACE", items:[{name:"Overview",icon:LayoutDashboard},{name:"Projects",icon:BriefcaseBusiness,count:projects.length},{name:"Clients",icon:Users},{name:"Services",icon:Zap}] },
    { label:"FINANCE", items:[{name:"Invoices",icon:FileText},{name:"Analytics",icon:Activity}] },
    { label:"PREFERENCES", items:[{name:"Settings",icon:Settings}] },
  ];
  const title = page === "Overview" ? "Dashboard Overview" : page;
  const subtitle = page === "Overview" ? "Here's what's happening with your business today." : "Manage your " + page.toLowerCase() + " and keep your business organized.";

  return <>
    <style>{styles}</style>
    <div className="app">
      <aside className={"sidebar " + (menuOpen ? "open" : "")}>
        <div className="brand"><div className="brand-logo">F</div><div><div className="brand-name">FlowServices</div><div className="brand-sub">BUSINESS WORKSPACE</div></div></div>
        <nav aria-label="Main navigation">{navGroups.map((group) => <div key={group.label}><div className="nav-label">{group.label}</div>{group.items.map((item) => { const NavIcon = item.icon; return <button key={item.name} className={"nav-item " + (page === item.name ? "active" : "")} onClick={() => navigate(item.name)}><span className="nav-icon"><NavIcon size={17} strokeWidth={1.8}/></span><span>{item.name}</span>{item.count !== undefined && <span className="nav-count">{item.count}</span>}</button>; })}</div>)}</nav>
        <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><CircleHelp size={17}/></div><strong>Need a hand?</strong><p>Find answers or get help managing your workspace.</p><button onClick={() => notify("Contact your workspace administrator for support.")}>Visit Help Center ↗</button></div><div className="user-mini"><div className="avatar">YK</div><div className="user-info"><strong>Admin User</strong><span>Workspace Owner</span></div><ChevronDown size={15} style={{marginLeft:"auto",color:"#929aab"}}/></div></div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="top-left"><button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X size={17}/> : <Menu size={17}/>}</button><div className="breadcrumb">Workspace&nbsp; / &nbsp;<b>{page}</b></div></div>
          <div className="top-actions">
            <label className="search"><Search size={16}/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search anything..." aria-label="Search"/></label>
            <div style={{position:"relative"}}><button className="icon-btn" aria-label="Notifications" onClick={() => setNotificationsOpen(!notificationsOpen)}><Bell size={17}/><span className="notification-dot"/></button>{notificationsOpen && <div className="notice-panel"><strong style={{fontSize:13}}>Notifications</strong><p style={{fontSize:11,color:"#7e8799",lineHeight:1.7,margin:"12px 0 0"}}>You have {invoices.filter((i) => i.status !== "Paid").length} invoice(s) awaiting payment.</p><button className="secondary-btn" style={{marginTop:12}} onClick={() => {navigate("Invoices");setNotificationsOpen(false);}}>View invoices</button></div>}</div>
            <button className="icon-btn" aria-label="Settings" onClick={() => navigate("Settings")}><Settings size={17}/></button>
          </div>
        </header>

        <div className="page">
          <div className="welcome-row"><div><h1>{title}</h1><p className="subtitle">{subtitle}</p></div><button className="primary-btn" onClick={() => setShowModal(true)}><Plus size={16}/> New Project</button></div>

          {page === "Overview" && <>
            <section className="stats">
              {[
                {label:"Total Revenue",value:formatMoney(collected),icon:Wallet,bg:"#e8f8f2",color:"#10a47d",foot:"From paid invoices",growth:"Collected"},
                {label:"Active Projects",value:activeCount,icon:BriefcaseBusiness,bg:"#eef0ff",color:"#5669e7",foot:projects.length + " projects in workspace",growth:activeCount + " active"},
                {label:"Total Clients",value:clients.length,icon:Users,bg:"#fff5e5",color:"#d59b36",foot:"Across your service business",growth:"Client accounts"},
                {label:"Pending Payments",value:formatMoney(outstanding),icon:CreditCard,bg:"#fff0f0",color:"#e16c70",foot:"Pending and overdue",growth:invoices.filter((i) => i.status !== "Paid").length + " invoices"},
              ].map((s) => {const StatIcon=s.icon;return <article className="stat-card" key={s.label}><div className="stat-head"><span className="stat-label">{s.label}</span><span className="stat-icon" style={{background:s.bg,color:s.color}}><StatIcon size={17}/></span></div><div className="stat-number">{s.value}</div><div className="stat-foot"><span className="growth">{s.growth}</span><span className="muted">{s.foot}</span></div></article>;})}
            </section>
            <section className="middle-grid">
              <article className="panel"><div className="panel-heading"><div><h2>Revenue overview</h2><p>Monitor your business performance</p></div><select className="select" value={period} onChange={(e) => setPeriod(e.target.value)} aria-label="Revenue period"><option>7 days</option><option>30 days</option><option>90 days</option><option>12 months</option></select></div><div className="chart-summary"><strong>{formatMoney(collected)}</strong><span>● Paid invoices</span></div><RevenueChart period={period}/><div className="chart-legend"><span><i className="legend-dot" style={{background:"#6173e9"}}/>Revenue trend</span><span className="muted">Illustrative trend · not historical accounting data</span></div></article>
              <article className="panel"><div className="panel-heading"><div><h2>Project status</h2><p>Current project distribution</p></div><span style={{fontSize:10,color:"#969eac"}}>All projects</span></div><div className="donut-wrap"><div className="donut"><div className="donut-center"><strong>{projects.length}</strong><span>Total projects</span></div></div></div><div className="legend-list">{[{label:"In Progress",color:"#5669e7",count:activeCount},{label:"Completed",color:"#14b69a",count:completedCount},{label:"Pending",color:"#eab456",count:pendingCount}].map((s) => <div className="legend-row" key={s.label}><span className="legend-name"><i className="legend-square" style={{background:s.color}}/>{s.label}</span><strong>{s.count}</strong></div>)}</div></article>
            </section>
            <section className="bottom-grid">
              <article className="panel table-panel"><div className="table-title"><div><h2>Recent projects</h2><p>Track your latest client work</p></div><button className="secondary-btn" onClick={() => navigate("Projects")}>View all <ExternalLink size={12} style={{verticalAlign:"middle"}}/></button></div><div className="table-scroll"><table><thead><tr><th>PROJECT</th><th>BUDGET</th><th>PROGRESS</th><th>STATUS</th></tr></thead><tbody>{filteredProjects.slice(0,5).map((p) => <tr key={p.id}><td><div className="project-name"><div className="project-mark" style={{background:p.color+"18",color:p.color}}>{p.name.slice(0,1)}</div><div><strong>{p.name}</strong><span>{p.client}</span></div></div></td><td style={{color:"#384154",fontWeight:600}}>{formatMoney(p.budget)}</td><td><div className="progress-row"><div className="progress-track"><div className="progress-fill" style={{width:p.progress+"%"}}/></div><span>{p.progress}%</span></div></td><td><Badge status={p.status}/></td></tr>)}</tbody></table>{filteredProjects.length===0 && <div className="empty">No matching projects found.</div>}</div></article>
              <article className="panel"><div className="panel-heading"><div><h2>Recent activity</h2><p>Your workspace at a glance</p></div><MoreHorizontal size={18} color="#9ba3b1"/></div><div className="activity-list"><div className="activity"><div className="activity-icon" style={{background:"#eef0ff",color:"#5669e7"}}><BriefcaseBusiness size={16}/></div><div className="activity-content"><p><strong>Project workspace</strong><br/>You have {activeCount} active projects to follow up on.</p><time>Current overview</time></div></div><div className="activity-divider"/><div className="activity"><div className="activity-icon" style={{background:"#e8f8f2",color:"#0ea782"}}><CircleDollarSign size={16}/></div><div className="activity-content"><p><strong>Payments collected</strong><br/>Total paid invoices: {formatMoney(collected)}.</p><time>Based on current invoice records</time></div></div><div className="activity-divider"/><div className="activity"><div className="activity-icon" style={{background:"#fff4e3",color:"#d49a36"}}><Users size={16}/></div><div className="activity-content"><p><strong>Client relationships</strong><br/>You're managing {clients.length} client accounts.</p><time>Workspace summary</time></div></div></div><button className="secondary-btn" style={{width:"100%",marginTop:24}} onClick={() => navigate("Analytics")}>View business analytics ↗</button></article>
            </section>
          </>}

          {page === "Projects" && <section className="panel table-panel"><div className="table-title"><div><h2>All projects</h2><p>{filteredProjects.length} project(s) · Manage your client deliverables</p></div><button className="secondary-btn" onClick={exportProjects}><Download size={13} style={{verticalAlign:"middle"}}/> Export CSV</button></div><div style={{padding:"0 21px 17px",display:"flex",gap:8,flexWrap:"wrap"}}>{["All","In Progress","Pending","Completed"].map((f) => <button key={f} className="secondary-btn" style={{background:filter===f?"#eef0ff":"#fff",color:filter===f?"#5367df":"#687286",borderColor:filter===f?"#dfe3ff":"#e7eaf1"}} onClick={() => setFilter(f)}>{f}</button>)}</div><div className="table-scroll"><table><thead><tr><th>PROJECT</th><th>SERVICE</th><th>BUDGET</th><th>DEADLINE</th><th>PROGRESS</th><th>STATUS</th></tr></thead><tbody>{filteredProjects.map((p) => <tr key={p.id}><td><div className="project-name"><div className="project-mark" style={{background:p.color+"18",color:p.color}}>{p.name.slice(0,1)}</div><div><strong>{p.name}</strong><span>{p.client}</span></div></div></td><td>{p.service}</td><td className="invoice-amount">{formatMoney(p.budget)}</td><td>{p.due}</td><td><div className="progress-row"><div className="progress-track"><div className="progress-fill" style={{width:p.progress+"%"}}/></div><span>{p.progress}%</span></div></td><td><select className="select" value={p.status} aria-label={"Status for "+p.name} onChange={(e) => updateProjectStatus(p.id,e.target.value)}><option>Pending</option><option>In Progress</option><option>Completed</option></select></td></tr>)}</tbody></table>{filteredProjects.length===0 && <div className="empty">No projects match your search or filter.</div>}</div></section>}

          {page === "Clients" && <section className="page-section"><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:17}}><p className="subtitle">{filteredClients.length} client accounts</p><button className="secondary-btn" onClick={() => {const name=window.prompt("Enter the client or company name:");if(!name || !name.trim()) return;if(clients.some((c)=>c.name.toLowerCase()===name.trim().toLowerCase())) return notify("That client already exists.");setClients((old)=>[...old,{name:name.trim(),email:"Not provided",service:"General Services",projects:0,color:"#5968e8"}]);notify("Client added.");}}>＋ Add Client</button></div><div className="client-grid">{filteredClients.map((c) => <article className="client-card" key={c.name}><div className="avatar" style={{background:c.color+"19",color:c.color}}>{initials(c.name)}</div><h3>{c.name}</h3><p>{c.email}</p><Badge status="In Progress"/><div className="client-meta"><span>{c.service}</span><strong>{c.projects} project(s)</strong></div></article>)}</div>{filteredClients.length===0 && <div className="panel empty">No clients found.</div>}</section>}

          {page === "Services" && <section className="service-grid">{services.map((s) => {const ServiceIcon=s.icon;return <article className="service-card" key={s.name}><div className="stat-icon" style={{background:s.bg,color:s.color}}><ServiceIcon size={18}/></div><h3>{s.name}</h3><p>{s.desc}</p><strong>{s.price}</strong><button className="secondary-btn" style={{width:"100%",marginTop:18}} onClick={() => setShowModal(true)}><Plus size={13} style={{verticalAlign:"middle"}}/> Create project</button></article>;})}</section>}

          {page === "Invoices" && <section className="panel table-panel"><div className="table-title"><div><h2>Invoices & payments</h2><p>Track client payments and outstanding balances</p></div><button className="secondary-btn" onClick={() => {const client=window.prompt("Client or company name:");if(!client || !client.trim()) return;const input=window.prompt("Invoice amount in INR:");if(input===null) return;const amount=Number(input);if(!Number.isFinite(amount)||amount<=0) return notify("Enter a valid invoice amount.");const id="INV-"+(1043+invoices.length-initialInvoices.length);setInvoices((old)=>[{id,client:client.trim(),service:"Service invoice",amount,status:"Pending",date:new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})},...old]);notify("Invoice added.");}}>＋ New invoice</button></div><div className="table-scroll"><table><thead><tr><th>INVOICE</th><th>CLIENT</th><th>SERVICE</th><th>AMOUNT</th><th>ISSUED</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>{filteredInvoices.map((i) => <tr key={i.id}><td style={{fontWeight:700,color:"#49556d"}}>{i.id}</td><td>{i.client}</td><td>{i.service}</td><td className="invoice-amount">{formatMoney(i.amount)}</td><td>{i.date}</td><td><Badge status={i.status}/></td><td><button className="secondary-btn" onClick={() => toggleInvoice(i.id)}>{i.status==="Paid"?"Mark pending":"Mark paid"}</button></td></tr>)}</tbody></table>{filteredInvoices.length===0 && <div className="empty">No invoices found.</div>}</div><div style={{padding:20,display:"flex",flexWrap:"wrap",gap:24}}><div><span className="muted" style={{fontSize:11}}>Collected</span><h2 style={{fontSize:20,margin:"6px 0"}}>{formatMoney(collected)}</h2></div><div><span className="muted" style={{fontSize:11}}>Outstanding</span><h2 style={{fontSize:20,margin:"6px 0"}}>{formatMoney(outstanding)}</h2></div></div></section>}

          {page === "Analytics" && <><section className="stats"><article className="stat-card"><span className="stat-label">Collected revenue</span><div className="stat-number">{formatMoney(collected)}</div><div className="stat-foot">From invoices marked paid</div></article><article className="stat-card"><span className="stat-label">Project value</span><div className="stat-number">{formatMoney(projects.reduce((sum,p)=>sum+p.budget,0))}</div><div className="stat-foot">Total listed project budgets</div></article><article className="stat-card"><span className="stat-label">Completion rate</span><div className="stat-number">{projects.length?Math.round(completedCount/projects.length*100):0}%</div><div className="stat-foot">Projects marked completed</div></article><article className="stat-card"><span className="stat-label">Average project budget</span><div className="stat-number">{formatMoney(projects.length?Math.round(projects.reduce((sum,p)=>sum+p.budget,0)/projects.length):0)}</div><div className="stat-foot">Across all projects</div></article></section><section className="middle-grid"><article className="panel"><div className="panel-heading"><div><h2>Revenue trend</h2><p>Illustrative chart · Not historical accounting data</p></div><select className="select" value={period} onChange={(e)=>setPeriod(e.target.value)}><option>7 days</option><option>30 days</option><option>90 days</option><option>12 months</option></select></div><RevenueChart period={period}/></article><article className="panel"><div className="panel-heading"><div><h2>Project performance</h2><p>Distribution by status</p></div></div><div className="legend-list">{[{label:"In Progress",count:activeCount,color:"#6173e9"},{label:"Completed",count:completedCount,color:"#14b69a"},{label:"Pending",count:pendingCount,color:"#eab456"}].map((s)=>{const pct=projects.length?Math.round(s.count/projects.length*100):0;return <div key={s.label} style={{marginBottom:13}}><div className="legend-row"><span>{s.label}</span><strong>{pct}%</strong></div><div className="progress-track" style={{width:"100%",marginTop:9,height:7}}><div className="progress-fill" style={{width:pct+"%",background:s.color}}/></div></div>;})}</div></article></section></>}

          {page === "Settings" && <section className="panel settings-card"><div className="panel-heading"><div><h2>Workspace settings</h2><p>Manage your dashboard preferences</p></div><ShieldCheck size={20} color="#6677e7"/></div>{[{key:"email",title:"Email notifications",desc:"Receive updates about invoices and projects."},{key:"updates",title:"Project status updates",desc:"Keep project progress notifications enabled."},{key:"reports",title:"Weekly reports",desc:"Enable a weekly business summary preference."}].map((s)=> <div className="setting-row" key={s.key}><div><strong>{s.title}</strong><span>{s.desc}</span></div><button className={"toggle "+(settings[s.key]?"on":"")} aria-label={"Toggle "+s.title} aria-pressed={settings[s.key]} onClick={()=>setSettings((old)=>({...old,[s.key]:!old[s.key]}))}/></div>)}<div style={{marginTop:22}}><button className="primary-btn" onClick={()=>notify("Preferences saved for this session.")}>Save preferences</button></div><p className="subtitle" style={{marginTop:15}}>Preferences are held in browser memory and reset when the page is refreshed.</p></section>}
        </div>
      </main>
      {showModal && <ProjectModal onClose={()=>setShowModal(false)} onSave={addProject}/>}
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  </>;
}
