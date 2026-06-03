"use client";

import { useState } from "react";
import { FormSuccess } from "@/components/FormSuccess";

/* ── Data ─────────────────────────────────────────── */

interface Role {
  id: string;
  title: string;
  dept: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
}

const ALL_DEPARTMENTS = "All Departments";

const DEPARTMENTS = [
  "Manufacturing",
  "Sales & Distribution",
  "Quality & R&D",
  "Supply Chain",
  "Corporate",
];

const ROLES: Role[] = [
  {
    id: "production-supervisor",
    title: "Production Supervisor",
    dept: "Manufacturing",
    location: "Pune Plant, Maharashtra",
    type: "Full-time",
    experience: "3–6 years",
    summary:
      "Run a rotomoulding line end-to-end — people, output and quality — and keep the shop floor moving to schedule.",
    responsibilities: [
      "Plan and supervise daily production against the dispatch schedule.",
      "Lead a team of operators and helpers across shifts.",
      "Track yield, downtime and scrap, and drive improvements.",
      "Enforce safety and 5S discipline on the floor.",
    ],
    requirements: [
      "Diploma / B.E. in Mechanical, Production or Plastics.",
      "3+ years supervising a manufacturing line (rotomoulding a plus).",
      "Comfortable with shift work and team handling.",
    ],
  },
  {
    id: "machine-operator",
    title: "Rotomoulding Machine Operator",
    dept: "Manufacturing",
    location: "Jabalpur Plant, Madhya Pradesh",
    type: "Full-time",
    experience: "1–4 years",
    summary:
      "Operate and monitor rotomoulding machines, load moulds and resin, and deliver consistent, defect-free product.",
    responsibilities: [
      "Set up moulds, load polymer and run the moulding cycle.",
      "Monitor temperature and cycle time for each batch.",
      "Carry out first-level quality checks and report deviations.",
      "Maintain a clean, safe workstation.",
    ],
    requirements: [
      "ITI or equivalent technical background.",
      "Hands-on experience with moulding / plastics machinery.",
      "Attention to detail and reliability.",
    ],
  },
  {
    id: "regional-sales-manager",
    title: "Regional Sales Manager",
    dept: "Sales & Distribution",
    location: "Indore, Madhya Pradesh",
    type: "Full-time",
    experience: "5–8 years",
    summary:
      "Own a region's revenue — grow the dealer network, hit targets and represent Supremo to partners on the ground.",
    responsibilities: [
      "Drive primary and secondary sales across the territory.",
      "Appoint, onboard and support dealers and distributors.",
      "Forecast demand and coordinate with the plant on supply.",
      "Build long-term relationships with key accounts.",
    ],
    requirements: [
      "Graduate / MBA in Marketing.",
      "5+ years in building-material, pipes or tanks sales.",
      "Strong network and willingness to travel within the region.",
    ],
  },
  {
    id: "dealer-relationship-executive",
    title: "Dealer Relationship Executive",
    dept: "Sales & Distribution",
    location: "Bhopal, Madhya Pradesh",
    type: "Full-time",
    experience: "2–4 years",
    summary:
      "Be the day-to-day point of contact for our dealers — orders, queries and support that keeps them selling.",
    responsibilities: [
      "Handle dealer orders, follow-ups and grievance resolution.",
      "Coordinate dispatch and payment status with internal teams.",
      "Share product updates, schemes and pricing with partners.",
    ],
    requirements: [
      "Graduate in any discipline.",
      "2+ years in sales support or channel management.",
      "Clear communication in Hindi and English.",
    ],
  },
  {
    id: "qc-engineer",
    title: "Quality Control Engineer",
    dept: "Quality & R&D",
    location: "Pune Plant, Maharashtra",
    type: "Full-time",
    experience: "2–5 years",
    summary:
      "Guard the ISI / ISO standard — test incoming material and finished product, and keep our quality records audit-ready.",
    responsibilities: [
      "Run in-process and final inspections per ISI / ISO norms.",
      "Maintain test records and calibration logs.",
      "Investigate rejections and drive corrective actions.",
    ],
    requirements: [
      "B.E. in Polymer, Mechanical or related field.",
      "Knowledge of plastics testing and quality systems.",
      "Familiarity with ISO-9001 documentation.",
    ],
  },
  {
    id: "rd-product-designer",
    title: "R&D Product Designer (Polymers)",
    dept: "Quality & R&D",
    location: "Pune Plant, Maharashtra",
    type: "Full-time",
    experience: "3–6 years",
    summary:
      "Design the next generation of tanks, pipes and accessories — from concept and CAD to mould and first article.",
    responsibilities: [
      "Develop new products and improve existing designs.",
      "Create 3D models and coordinate mould development.",
      "Run trials and validate against performance targets.",
    ],
    requirements: [
      "B.E. / M.E. in Polymer or Product Design.",
      "Proficiency in CAD (SolidWorks / Creo).",
      "Understanding of rotomoulding design constraints.",
    ],
  },
  {
    id: "logistics-coordinator",
    title: "Logistics & Dispatch Coordinator",
    dept: "Supply Chain",
    location: "Ahmedabad, Gujarat",
    type: "Full-time",
    experience: "2–5 years",
    summary:
      "Keep finished goods moving — plan dispatch, manage transporters and make sure every order reaches the dealer on time.",
    responsibilities: [
      "Plan daily dispatch and optimise vehicle loading.",
      "Negotiate and coordinate with transport partners.",
      "Track deliveries and resolve transit issues.",
    ],
    requirements: [
      "Graduate; supply chain certification a plus.",
      "2+ years in logistics or warehouse operations.",
      "Working knowledge of e-way bills and GST documentation.",
    ],
  },
  {
    id: "hr-executive",
    title: "HR Executive",
    dept: "Corporate",
    location: "Head Office, Pune",
    type: "Full-time",
    experience: "2–4 years",
    summary:
      "Support hiring, onboarding and employee engagement across plants and offices in a fast-growing, people-first company.",
    responsibilities: [
      "Manage the end-to-end recruitment pipeline.",
      "Run onboarding, records and HR compliance.",
      "Help organise engagement and welfare initiatives.",
    ],
    requirements: [
      "MBA / PGDM in HR.",
      "2+ years in a generalist or recruitment HR role.",
      "Good people skills and discretion.",
    ],
  },
];

const HIRING_STEPS = [
  { n: "01", title: "Apply online", desc: "Pick a role and send us your details — it takes a couple of minutes." },
  { n: "02", title: "Screening call", desc: "A short call with our HR team to understand your background and goals." },
  { n: "03", title: "Interview & plant visit", desc: "Meet the team, see how we work, and talk through the role in detail." },
  { n: "04", title: "Offer & onboarding", desc: "Get your offer, complete formalities and join the Supremo family." },
];

const CAREER_FAQS = [
  { q: "I don't see a role that fits me. Can I still apply?", a: "Yes — choose “General / Other” in the role dropdown and tell us about yourself. We keep applications on file and reach out when a matching role opens." },
  { q: "Are roles based at the plants or in an office?", a: "Both. Manufacturing, quality and supply-chain roles are largely plant-based; sales roles are field/region-based; corporate roles sit at our Pune head office." },
  { q: "Do you hire freshers?", a: "We do, especially for operator, quality and sales-support roles. Apply to the closest role and mention that you're starting out." },
  { q: "How long does the process take?", a: "Typically 1–2 weeks from application to offer, depending on the role and your availability for interviews." },
];

/* ── Icons (inline, currentColor, ~2px stroke) ───────── */

const MapPinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ClockIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const BriefcaseIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

/* ── Page ─────────────────────────────────────────── */

export default function CareersPage() {
  const [activeDept, setActiveDept] = useState(ALL_DEPARTMENTS);
  const [openRole, setOpenRole] = useState<string | null>(null);

  const [form, setForm] = useState({
    role: "",
    name: "",
    email: "",
    phone: "",
    experience: "",
    location: "",
    resume: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const setField = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const visibleRoles =
    activeDept === ALL_DEPARTMENTS ? ROLES : ROLES.filter((r) => r.dept === activeDept);

  const applyForRole = (title: string) => {
    setField("role", title);
    if (typeof document !== "undefined") {
      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .careers-hero {
          position: relative;
          background: linear-gradient(135deg, #0947a7 0%, #05265b 100%);
          color: #fff;
          padding: clamp(56px, 7vw, 88px) 0;
          overflow: hidden;
        }
        .careers-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none; z-index: 1;
        }
        .careers-hero .container { position: relative; z-index: 2; }
        .careers-stats {
          display: flex; flex-wrap: wrap; gap: 36px;
          margin-top: 36px; padding-top: 28px;
          border-top: 1px solid rgba(255,255,255,.16);
        }
        .careers-stat .num {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(26px, 3.4vw, 34px); line-height: 1;
        }
        .careers-stat .lbl {
          font-size: 13px; color: rgba(255,255,255,.7); margin-top: 6px;
        }

        /* Department filter */
        .dept-filter {
          display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
          margin-bottom: 28px;
        }
        .dept-filter-label {
          font-size: 13px; font-weight: 600; color: var(--muted);
        }
        .dept-select-wrap { position: relative; display: inline-flex; }
        .dept-select {
          appearance: none; cursor: pointer;
          border: 1px solid var(--line); background: #fff;
          border-radius: var(--r-pill); padding: 11px 42px 11px 18px;
          font: inherit; font-size: 14px; font-weight: 600; color: var(--ink);
          outline: none; transition: border-color .15s, box-shadow .15s;
        }
        .dept-select:focus { border-color: var(--blue-600); box-shadow: 0 0 0 4px var(--blue-100); }
        .dept-select-chevron {
          position: absolute; right: 16px; top: 50%; transform: translateY(-50%);
          color: var(--muted); pointer-events: none; display: flex;
        }
        .dept-count { font-size: 13px; color: var(--muted); margin-left: auto; }

        /* Roles accordion */
        .roles-list { display: flex; flex-direction: column; gap: 12px; }
        .role-item {
          background: #fff; border: 1px solid var(--line);
          border-radius: var(--r-lg); overflow: hidden;
          box-shadow: var(--sh-sm); transition: border-color .18s, box-shadow .18s;
        }
        .role-item.open { border-color: var(--blue-200); box-shadow: var(--sh-md); }
        .role-head {
          width: 100%; text-align: left; cursor: pointer;
          background: none; border: none; padding: 22px 24px;
          display: flex; align-items: center; gap: 18px;
          font: inherit;
        }
        .role-head:hover { background: var(--paper-2); }
        .role-head-main { flex: 1; min-width: 0; }
        .role-title {
          font-family: var(--font-display); font-weight: 700;
          font-size: 18px; color: var(--ink); margin-bottom: 8px;
        }
        .role-meta {
          display: flex; flex-wrap: wrap; gap: 14px;
          font-size: 13px; color: var(--muted);
        }
        .role-meta span { display: inline-flex; align-items: center; gap: 6px; }
        .role-dept-badge {
          flex-shrink: 0; font-size: 11px; font-weight: 700;
          letter-spacing: .04em; text-transform: uppercase;
          color: var(--blue-700); background: var(--blue-50);
          border: 1px solid var(--blue-100);
          padding: 5px 11px; border-radius: var(--r-pill);
        }
        .role-toggle {
          flex-shrink: 0; color: var(--muted);
          transition: transform .25s ease;
        }
        .role-item.open .role-toggle { transform: rotate(180deg); color: var(--blue-600); }

        .role-body {
          padding: 0 24px 24px;
          border-top: 1px solid var(--line-2);
        }
        .role-body-inner {
          padding-top: 20px;
          display: grid; grid-template-columns: 1.2fr 1fr; gap: 28px;
        }
        .role-summary { font-size: 15px; color: var(--slate); line-height: 1.65; margin-bottom: 18px; grid-column: 1 / -1; }
        .role-col h4 {
          font-size: 12px; font-weight: 700; letter-spacing: .06em;
          text-transform: uppercase; color: var(--muted); margin-bottom: 12px;
        }
        .role-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .role-col li {
          font-size: 14px; color: var(--slate); line-height: 1.55;
          display: flex; gap: 10px;
        }
        .role-col li::before {
          content: ""; flex-shrink: 0; margin-top: 7px;
          width: 6px; height: 6px; border-radius: 50%; background: var(--blue-600);
        }
        .role-apply-row { grid-column: 1 / -1; margin-top: 4px; }

        /* Hiring steps */
        .hiring-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .hiring-step-num { font-family: var(--font-display); font-size: 30px; font-weight: 700; color: var(--blue-200); line-height: 1; margin-bottom: 10px; }
        .hiring-step h3 { font-size: 16px; margin-bottom: 6px; color: var(--ink); }
        .hiring-step p { font-size: 13.5px; color: var(--slate); line-height: 1.6; }

        /* Apply form */
        .apply-card {
          max-width: 820px; margin: 0 auto; background: #fff;
          border: 1px solid var(--line); border-radius: var(--r-lg);
          padding: clamp(24px, 4vw, 40px); box-shadow: var(--sh-md);
        }
        .careers-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .careers-form-grid .full { grid-column: 1 / -1; }
        .careers-form-grid .field textarea {
          padding: 12px 14px; border: 1px solid var(--line); border-radius: var(--r-sm);
          font: inherit; font-size: 15px; color: var(--ink); background: var(--paper-2);
          resize: vertical; outline: none; width: 100%; box-sizing: border-box;
        }
        .careers-form-grid .field textarea:focus { border-color: var(--blue-600); background: #fff; box-shadow: 0 0 0 4px var(--blue-100); }

        /* FAQ */
        .careers-faq { max-width: 820px; margin: 0 auto; }
        .careers-faq-item { border-bottom: 1px solid var(--line); padding: 18px 0; }
        .careers-faq-item:first-child { border-top: 1px solid var(--line); }
        .careers-faq-item h3 { font-size: 16px; margin-bottom: 6px; color: var(--ink); }
        .careers-faq-item p { font-size: 14px; color: var(--slate); line-height: 1.65; }

        @media (max-width: 900px) {
          .hiring-steps { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .hiring-steps { grid-template-columns: 1fr; }
          .role-body-inner { grid-template-columns: 1fr; gap: 20px; }
          .careers-form-grid { grid-template-columns: 1fr; }
          .careers-stats { gap: 24px; }
          .dept-count { margin-left: 0; width: 100%; }
        }
      `}} />

      {/* Hero */}
      <section className="careers-hero">
        <div className="careers-grid-bg" />
        <div className="container">
          <span className="eyebrow eyebrow-light">— CAREERS AT SUPREMO</span>
          <h1 style={{ color: "#fff", fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.12, marginTop: 18, maxWidth: "18ch" }}>
            Build what India relies on.
          </h1>
          <p style={{ color: "rgba(255,255,255,.72)", fontSize: 16, lineHeight: 1.65, marginTop: 20, maxWidth: "56ch" }}>
            For 27 years we&apos;ve manufactured the tanks, pipes and products that move and store water across the country.
            Join a stable, growing team that takes pride in making things that last.
          </p>

          <div className="careers-stats">
            {[
              { num: "27+", lbl: "Years in manufacturing" },
              { num: "4", lbl: "ISO-certified plants" },
              { num: "500+", lbl: "People on the team" },
              { num: "22", lbl: "States served" },
            ].map((s) => (
              <div className="careers-stat" key={s.lbl}>
                <div className="num">{s.num}</div>
                <div className="lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <div style={{ marginBottom: 30, maxWidth: "52ch" }}>
            <span className="eyebrow">Open Positions</span>
            <h2 style={{ marginTop: 14 }}>Find your role.</h2>
            <p style={{ color: "var(--muted)", marginTop: 10 }}>
              Filter by department, open a role to see the details, and apply in a couple of minutes.
            </p>
          </div>

          {/* Department dropdown filter */}
          <div className="dept-filter">
            <span className="dept-filter-label">Department</span>
            <div className="dept-select-wrap">
              <select
                className="dept-select"
                value={activeDept}
                onChange={(e) => { setActiveDept(e.target.value); setOpenRole(null); }}
                aria-label="Filter roles by department"
              >
                <option value={ALL_DEPARTMENTS}>{ALL_DEPARTMENTS}</option>
                {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <span className="dept-select-chevron">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
              </span>
            </div>
            <span className="dept-count">
              {visibleRoles.length} open role{visibleRoles.length === 1 ? "" : "s"}
            </span>
          </div>

          {/* Accordion list */}
          <div className="roles-list">
            {visibleRoles.map((role) => {
              const open = openRole === role.id;
              return (
                <div className={`role-item${open ? " open" : ""}`} key={role.id}>
                  <button
                    className="role-head"
                    onClick={() => setOpenRole(open ? null : role.id)}
                    aria-expanded={open}
                  >
                    <div className="role-head-main">
                      <div className="role-title">{role.title}</div>
                      <div className="role-meta">
                        <span><MapPinIcon /> {role.location}</span>
                        <span><BriefcaseIcon /> {role.type}</span>
                        <span><ClockIcon /> {role.experience}</span>
                      </div>
                    </div>
                    <span className="role-dept-badge">{role.dept}</span>
                    <span className="role-toggle">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                    </span>
                  </button>

                  {open && (
                    <div className="role-body">
                      <div className="role-body-inner">
                        <p className="role-summary">{role.summary}</p>
                        <div className="role-col">
                          <h4>What you&apos;ll do</h4>
                          <ul>
                            {role.responsibilities.map((r) => <li key={r}>{r}</li>)}
                          </ul>
                        </div>
                        <div className="role-col">
                          <h4>What we&apos;re looking for</h4>
                          <ul>
                            {role.requirements.map((r) => <li key={r}>{r}</li>)}
                          </ul>
                        </div>
                        <div className="role-apply-row">
                          <button className="btn" onClick={() => applyForRole(role.title)}>
                            Apply for this role
                            <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                              <path d="M7 17L17 7M9 7h8v8" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hiring process */}
      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <div style={{ marginBottom: 36 }}>
            <span className="eyebrow">How hiring works</span>
            <h2 style={{ marginTop: 14 }}>From application to first day.</h2>
          </div>
          <div className="hiring-steps">
            {HIRING_STEPS.map((s) => (
              <div className="hiring-step" key={s.n}>
                <div className="hiring-step-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply form */}
      <section id="apply" style={{ background: "var(--paper-2)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "54ch", margin: "0 auto 36px" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>Apply Now</span>
            <h2 style={{ marginTop: 14 }}>Send us your application.</h2>
            <p style={{ color: "var(--muted)", marginTop: 10 }}>
              Pick the role you&apos;re interested in and tell us a little about yourself. Don&apos;t see a fit? Choose
              &ldquo;General / Other&rdquo; and we&apos;ll keep you in mind.
            </p>
          </div>

          <div className="apply-card">
            {submitted ? (
              <FormSuccess
                title="Application received"
                message="Thanks for your interest in joining Supremo. Our HR team will review your application and get back to you within 1–2 weeks."
              />
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="careers-form-grid">
                  {/* Role dropdown — the multi-role selector */}
                  <div className="field full">
                    <label>Role you&apos;re applying for<span className="req-mark">*</span></label>
                    <select required value={form.role} onChange={(e) => setField("role", e.target.value)}>
                      <option value="" disabled>Select a role</option>
                      {DEPARTMENTS.map((dept) => (
                        <optgroup key={dept} label={dept}>
                          {ROLES.filter((r) => r.dept === dept).map((r) => (
                            <option key={r.id} value={r.title}>{r.title}</option>
                          ))}
                        </optgroup>
                      ))}
                      <option value="General / Other">General / Other</option>
                    </select>
                  </div>

                  <div className="field">
                    <label>Full Name<span className="req-mark">*</span></label>
                    <input type="text" required placeholder="Your full name" value={form.name} onChange={(e) => setField("name", e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Phone<span className="req-mark">*</span></label>
                    <input type="tel" inputMode="tel" required placeholder="+91 90989 89090" value={form.phone} onChange={(e) => setField("phone", e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Email<span className="req-mark">*</span></label>
                    <input type="email" required placeholder="you@example.com" value={form.email} onChange={(e) => setField("email", e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Total Experience</label>
                    <select value={form.experience} onChange={(e) => setField("experience", e.target.value)}>
                      <option value="">Select experience</option>
                      <option value="Fresher">Fresher</option>
                      <option value="1–3 years">1–3 years</option>
                      <option value="3–6 years">3–6 years</option>
                      <option value="6–10 years">6–10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Current Location</label>
                    <input type="text" placeholder="City, State" value={form.location} onChange={(e) => setField("location", e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Resume / Portfolio link</label>
                    <input type="url" placeholder="Google Drive, LinkedIn or website URL" value={form.resume} onChange={(e) => setField("resume", e.target.value)} />
                  </div>
                  <div className="field full">
                    <label>Why this role? (optional)</label>
                    <textarea rows={4} placeholder="Tell us a little about your background and why you'd like to join Supremo." value={form.message} onChange={(e) => setField("message", e.target.value)} />
                  </div>
                </div>
                <button type="submit" className="btn" style={{ width: "100%", justifyContent: "center", marginTop: 20 }}>
                  Submit Application
                  <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>FAQ</span>
            <h2 style={{ marginTop: 14 }}>Questions, answered.</h2>
          </div>
          <div className="careers-faq">
            {CAREER_FAQS.map((f) => (
              <div className="careers-faq-item" key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
