"use client";

import { useRef, useState } from "react";
import { FormSuccess } from "@/components/FormSuccess";

const AREAS = [
  "Manufacturing",
  "Sales & Distribution",
  "Quality & R&D",
  "Supply Chain",
  "Corporate",
  "General / Other",
];

const MAX_MB = 5;
const ACCEPTED = ".pdf,.doc,.docx";

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function CareersPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    area: "",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setField = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const pickFile = (f: File | null) => {
    if (!f) {
      setFile(null);
      setFileError(null);
      return;
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      setFileError(`File is too large — please keep it under ${MAX_MB} MB.`);
      setFile(null);
      return;
    }
    setFileError(null);
    setFile(f);
  };

  const clearFile = () => {
    setFile(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setFileError("Please attach your resume to continue.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .careers-hero {
          background: linear-gradient(135deg, rgba(14, 26, 48, 0.85) 0%, rgba(14, 26, 48, 0.65) 100%), url('/images/careers_hero_bg.png') no-repeat center/cover;
          border-bottom: 1px solid var(--line);
          padding: clamp(80px, 9vw, 120px) 0;
        }
        .careers-hero h1 {
          color: #ffffff;
          font-size: clamp(30px, 4.5vw, 46px);
          line-height: 1.14;
          margin-top: 18px;
          max-width: 18ch;
        }
        .careers-hero p {
          color: rgba(255, 255, 255, 0.85);
          font-size: 16px;
          line-height: 1.65;
          margin-top: 20px;
          max-width: 56ch;
        }

        /* Two-column layout: intro on the left, form on the right */
        .resume-layout {
          display: grid;
          grid-template-columns: 1fr 1.08fr;
          gap: clamp(32px, 5vw, 64px);
          align-items: center;
          max-width: 1040px;
          margin: 0 auto;
        }
        .resume-intro h2 { margin-top: 14px; }
        .resume-intro p { color: var(--slate); margin-top: 12px; line-height: 1.7; font-size: 15px; }
        .resume-intro .intro-list {
          list-style: none; margin-top: 22px; display: flex; flex-direction: column; gap: 12px;
        }
        .resume-intro .intro-list li {
          display: flex; gap: 11px; font-size: 14px; color: var(--slate); line-height: 1.55;
        }
        .resume-intro .intro-list svg { flex-shrink: 0; color: var(--blue-600); margin-top: 2px; }

        .resume-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: var(--r-lg);
          padding: clamp(20px, 2.6vw, 30px);
          box-shadow: var(--sh-md);
        }
        .resume-form { display: grid; grid-template-columns: 1fr 1fr; gap: 13px; }
        .resume-form .full { grid-column: 1 / -1; }
        .resume-form .field label { font-size: 11px; }
        .resume-form .field input,
        .resume-form .field select { height: 42px; font-size: 14px; }
        .resume-form .field textarea {
          padding: 10px 12px; border: 1px solid var(--line); border-radius: var(--r-sm);
          font: inherit; font-size: 14px; color: var(--ink); background: var(--paper-2);
          resize: vertical; outline: none; width: 100%; box-sizing: border-box;
        }
        .resume-form .field textarea:focus {
          border-color: var(--blue-600); background: #fff; box-shadow: 0 0 0 4px var(--blue-100);
        }

        /* File upload */
        .file-drop {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 6px; text-align: center; cursor: pointer;
          padding: 18px 16px;
          border: 1.5px dashed var(--line); border-radius: var(--r-md);
          background: var(--paper-2); color: var(--muted);
          transition: border-color .15s, background .15s, color .15s;
        }
        .file-drop:hover { border-color: var(--blue-400); background: var(--blue-50); color: var(--blue-700); }
        .file-drop input { display: none; }
        .file-drop .fd-icon { color: var(--blue-600); }
        .file-drop .fd-title { font-weight: 700; font-size: 14.5px; color: var(--ink); }
        .file-drop .fd-hint { font-size: 12.5px; }

        .file-pill {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 14px;
          border: 1px solid var(--blue-200); border-radius: var(--r-md);
          background: var(--blue-50);
        }
        .file-pill .fp-icon {
          flex-shrink: 0; width: 38px; height: 38px; border-radius: var(--r-sm);
          display: grid; place-items: center; background: #fff;
          border: 1px solid var(--blue-100); color: var(--blue-600);
        }
        .file-pill .fp-main { flex: 1; min-width: 0; }
        .file-pill .fp-name {
          font-weight: 600; font-size: 14px; color: var(--ink);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .file-pill .fp-size { font-size: 12px; color: var(--muted); margin-top: 2px; }
        .file-pill .fp-remove {
          flex-shrink: 0; cursor: pointer; border: none; background: none;
          color: var(--muted); display: grid; place-items: center; padding: 6px; border-radius: 6px;
          transition: color .15s, background .15s;
        }
        .file-pill .fp-remove:hover { color: #E5484D; background: #fff; }

        .file-err { color: #E5484D; font-size: 12.5px; margin-top: 8px; }

        @media (max-width: 860px) {
          .resume-layout { grid-template-columns: 1fr; gap: 32px; }
        }
        @media (max-width: 560px) {
          .resume-form { grid-template-columns: 1fr; }
        }
      `}} />

      {/* Hero */}
      <section className="careers-hero">
        <div className="container">
          <span className="eyebrow eyebrow-light">Careers at Supremo</span>
          <h1>Join the Supremo team.</h1>
          <p>
            We&apos;re always glad to hear from talented people. Share your resume and a few details, and
            our HR team will reach out when there&apos;s a fit.
          </p>
        </div>
      </section>

      {/* Resume submission */}
      <section style={{ background: "var(--paper-2)" }}>
        <div className="container">
          <div className="resume-layout">
            {/* Left — heading & supporting text */}
            <div className="resume-intro">
              <span className="eyebrow">Submit Your Resume</span>
              <h2>Tell us about yourself.</h2>
              <p>
                Whether or not we have an opening that matches you right now, we&apos;d love to keep your
                profile on file. Share your details and attach your resume — it only takes a minute.
              </p>
              <ul className="intro-list">
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                  Roles across manufacturing, sales, quality and supply chain.
                </li>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                  We review every application and keep it on file for future openings.
                </li>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                  Our HR team reaches out directly when there&apos;s a fit.
                </li>
              </ul>
            </div>

            {/* Right — form */}
            <div className="resume-card">
            {submitted ? (
              <FormSuccess
                title="Resume received"
                message="Thanks for your interest in joining Supremo. Our HR team will review your resume and get in touch if there's a suitable opportunity."
              />
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="resume-form">
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
                    <label>Area of Interest</label>
                    <select value={form.area} onChange={(e) => setField("area", e.target.value)}>
                      <option value="">Select an area</option>
                      {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>

                  {/* Resume upload */}
                  <div className="field full">
                    <label>Resume<span className="req-mark">*</span></label>
                    {file ? (
                      <div className="file-pill">
                        <span className="fp-icon">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                        </span>
                        <div className="fp-main">
                          <div className="fp-name">{file.name}</div>
                          <div className="fp-size">{formatSize(file.size)}</div>
                        </div>
                        <button type="button" className="fp-remove" onClick={clearFile} aria-label="Remove file">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <label className="file-drop">
                        <span className="fd-icon">
                          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                        </span>
                        <span className="fd-title">Click to upload your resume</span>
                        <span className="fd-hint">PDF or Word document, up to {MAX_MB} MB</span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept={ACCEPTED}
                          onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
                        />
                      </label>
                    )}
                    {fileError && <p className="file-err">{fileError}</p>}
                  </div>

                  <div className="field full">
                    <label>Message (optional)</label>
                    <textarea rows={4} placeholder="A short note about your background and what you're looking for." value={form.message} onChange={(e) => setField("message", e.target.value)} />
                  </div>
                </div>

                <button type="submit" className="btn" style={{ width: "100%", justifyContent: "center", marginTop: 20 }}>
                  Submit Resume
                  <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </button>
              </form>
            )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
