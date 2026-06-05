"use client";

import { useState } from "react";
import { FormSuccess } from "@/components/FormSuccess";

type PartnerType = "dealer" | "supplier";

const STATES = [
  "Madhya Pradesh", "Gujarat", "Maharashtra", "Delhi", "Karnataka",
  "West Bengal", "Rajasthan", "Uttar Pradesh", "Tamil Nadu", "Telangana",
  "Punjab", "Haryana", "Other",
];

const PRODUCTS = [
  "Water Storage Tanks",
  "PVC/CPVC Pipes & Fittings",
  "Planters & Accessories",
  "All Products",
];

const SUPPLY_CATEGORIES = [
  "Polymers & Raw Materials",
  "Masterbatch & Additives",
  "Packaging Materials",
  "Machinery & Spares",
  "Logistics & Transport",
  "Other",
];



const STEPS = [
  { n: "01", title: "Submit your application", desc: "Tell us about your firm, your location and how you'd like to partner." },
  { n: "02", title: "Talk to the regional head", desc: "We verify your details and discuss territory, terms and expectations." },
  { n: "03", title: "Get onboarded", desc: "Sign the agreement, receive your starter stock or PO, and go live." },
];

const FAQS = [
  { q: "What's the difference between a dealer and a supplier?", a: "A dealer stocks and sells Supremo products in their territory. A supplier provides raw materials, packaging, machinery or services to our manufacturing. Pick whichever fits your business — the form adapts to each." },
  { q: "What investment is required to become a dealer?", a: "It varies by territory and product mix. Most partners start with a modest stocking order; the regional head shares exact numbers for your area during the call." },
  { q: "Do dealers get an exclusive area?", a: "Yes — active dealers operate in a protected territory so you don't compete with another Supremo partner next door." },
  { q: "How long does approval take?", a: "Typically 3–5 working days after we receive your application and verify your details." },
];

/* ── Icons ─────────────────────────────────────────────── */
const Icon = ({ name, size = 24, stroke = "var(--blue-600)" }: { name: string; size?: number; stroke?: string }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: 1.9, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "shield": return <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
    case "ribbon": return <svg {...p}><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>;
    case "truck": return <svg {...p}><rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>;
    case "headset": return <svg {...p}><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>;
    case "store": return <svg {...p}><path d="M3 9l1.5-5h15L21 9" /><path d="M4 9v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9" /><path d="M3 9h18" /><path d="M9 21v-6h6v6" /></svg>;
    case "factory": return <svg {...p}><path d="M2 20h20" /><path d="M4 20V9l5 4V9l5 4V9l5 4v7" /><path d="M9 20v-4h2v4" /></svg>;
    case "check": return <svg {...p} strokeWidth={3}><polyline points="20 6 9 17 4 12" /></svg>;
    default: return null;
  }
};

export default function DealershipPage() {
  const [partnerType, setPartnerType] = useState<PartnerType>("dealer");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", phone: "", state: "",
    product: PRODUCTS[0],            // dealer
    supplyCategory: SUPPLY_CATEGORIES[0], // supplier
    message: "",                     // shared
  });

  const setField = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const choosePath = (t: PartnerType) => {
    setPartnerType(t);
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isDealer = partnerType === "dealer";

  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .dlr-hero {
          position: relative;
          background:
            radial-gradient(1100px 480px at 78% -10%, rgba(99,153,255,.28), transparent 60%),
            linear-gradient(135deg, #0947a7 0%, #052a63 60%, #04203f 100%);
          color: #fff;
          padding: clamp(56px, 8vw, 96px) 0 clamp(56px, 8vw, 100px);
          overflow: hidden;
        }
        .dlr-hero-grid-bg {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px);
          background-size: 34px 34px;
          mask-image: radial-gradient(120% 100% at 50% 0%, #000 40%, transparent 100%);
        }
        .dlr-hero-inner { position: relative; z-index: 1; display: grid; grid-template-columns: 1.15fr .85fr; gap: 48px; align-items: center; }
        .dlr-hero h1 { color: #fff; font-size: clamp(34px, 5vw, 58px); line-height: 1.08; margin: 18px 0 0; letter-spacing: -0.02em; }
        .dlr-hero h1 .grad { background: linear-gradient(90deg, #8fb8ff, #d6e6ff); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .dlr-hero p { color: rgba(255,255,255,.74); font-size: 17px; line-height: 1.6; margin-top: 20px; max-width: 50ch; }
        .dlr-hero-cta { display: flex; gap: 12px; margin-top: 32px; flex-wrap: wrap; }
        .dlr-hero-stats { display: flex; gap: 36px; margin-top: 40px; flex-wrap: wrap; }
        .dlr-hero-stat .n { font-family: var(--font-display); font-size: clamp(24px, 3vw, 32px); font-weight: 800; color: #fff; line-height: 1; }
        .dlr-hero-stat .l { font-size: 13px; color: rgba(255,255,255,.6); margin-top: 6px; }
        .dlr-hero-art { position: relative; display: flex; justify-content: center; }
        .dlr-hero-art img { max-width: 100%; max-height: 380px; object-fit: contain; filter: drop-shadow(0 18px 44px rgba(0,0,0,.4)); }

        /* Benefits */
        .dlr-benefits { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .dlr-benefit {
          background: #fff; border: 1px solid var(--line); border-radius: var(--r-lg);
          padding: 26px; box-shadow: var(--sh-sm); transition: transform .2s, box-shadow .2s, border-color .2s;
        }
        .dlr-benefit:hover { transform: translateY(-4px); box-shadow: var(--sh-md); border-color: var(--blue-200); }
        .dlr-benefit .ic { width: 50px; height: 50px; border-radius: 14px; background: var(--blue-50); display: grid; place-items: center; margin-bottom: 18px; }
        .dlr-benefit h3 { font-size: 17px; color: var(--ink); margin-bottom: 8px; }
        .dlr-benefit p { font-size: 14px; color: var(--slate); line-height: 1.6; }

        /* Path selector */
        .dlr-paths { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 36px; }
        .path-card {
          position: relative; text-align: left; cursor: pointer; background: #fff;
          border: 1.5px solid var(--line); border-radius: var(--r-lg); padding: 26px 26px 24px;
          display: flex; flex-direction: column; gap: 14px; transition: border-color .2s, box-shadow .2s, transform .2s;
        }
        .path-card:hover { border-color: var(--blue-200); box-shadow: var(--sh-md); }
        .path-card.sel { border-color: var(--blue-600); box-shadow: 0 0 0 4px var(--blue-100), var(--sh-md); }
        .path-card .ic { width: 52px; height: 52px; border-radius: 14px; background: var(--blue-50); display: grid; place-items: center; transition: background .2s; }
        .path-card.sel .ic { background: var(--blue-600); }
        .path-card .ic svg { transition: stroke .2s; }
        .path-card h3 { font-size: 20px; color: var(--ink); margin: 0; }
        .path-card .sub { font-size: 14px; color: var(--slate); line-height: 1.55; }
        .path-card ul { list-style: none; padding: 0; margin: 4px 0 0; display: flex; flex-direction: column; gap: 7px; }
        .path-card li { font-size: 13px; color: var(--muted); display: flex; align-items: center; gap: 8px; }
        .path-card li svg { flex-shrink: 0; }
        .path-radio {
          position: absolute; top: 22px; right: 22px; width: 24px; height: 24px; border-radius: 50%;
          border: 2px solid var(--line); display: grid; place-items: center; transition: all .2s; color: #fff;
        }
        .path-card.sel .path-radio { background: var(--blue-600); border-color: var(--blue-600); }

        /* Apply: sticky aside + form */
        .apply-shell { display: grid; grid-template-columns: .9fr 1.1fr; gap: 40px; align-items: start; }
        .apply-aside { position: sticky; top: calc(var(--nav-h) + 28px); }
        .apply-aside .eyebrow { margin-bottom: 14px; }
        .apply-aside h2 { font-size: clamp(26px, 3vw, 36px); line-height: 1.15; letter-spacing: -0.01em; }
        .apply-aside p { color: var(--slate); margin-top: 14px; line-height: 1.65; font-size: 15px; }
        .apply-ministeps { margin-top: 28px; display: flex; flex-direction: column; gap: 18px; }
        .apply-ministep { display: flex; gap: 14px; align-items: flex-start; }
        .apply-ministep .dot { flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%; background: var(--blue-50); color: var(--blue-600); font-weight: 700; font-size: 13px; display: grid; place-items: center; font-family: var(--font-display); }
        .apply-ministep .t { font-size: 14.5px; font-weight: 600; color: var(--ink); }
        .apply-ministep .d { font-size: 13px; color: var(--muted); margin-top: 2px; line-height: 1.5; }

        .apply-card { background: #fff; border: 1px solid var(--line); border-radius: var(--r-lg); padding: clamp(24px, 3.5vw, 36px); box-shadow: var(--sh-md); }
        .apply-typebadge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: var(--r-pill); background: var(--blue-50); color: var(--blue-700); font-size: 13px; font-weight: 700; font-family: var(--font-display); margin-bottom: 22px; }
        .apply-card .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .apply-card .full { grid-column: 1 / -1; }
        .apply-card .field textarea { padding: 12px 14px; border: 1px solid var(--line); border-radius: var(--r-sm); font: inherit; font-size: 15px; color: var(--ink); background: var(--paper-2); resize: vertical; outline: none; width: 100%; box-sizing: border-box; transition: border-color .15s, box-shadow .15s, background .15s; }
        .apply-card .field textarea:focus { border-color: var(--blue-600); background: #fff; box-shadow: 0 0 0 4px var(--blue-100); }

        /* FAQ */
        .dlr-faq { max-width: 820px; margin: 0 auto; }
        .dlr-faq-item { border-bottom: 1px solid var(--line); padding: 20px 0; }
        .dlr-faq-item:first-child { border-top: 1px solid var(--line); }
        .dlr-faq-item h3 { font-size: 16px; color: var(--ink); margin-bottom: 7px; }
        .dlr-faq-item p { font-size: 14px; color: var(--slate); line-height: 1.65; }

        @media (max-width: 980px) {
          .dlr-hero-inner { grid-template-columns: 1fr; gap: 40px; }
          .dlr-hero-art { order: -1; }
          .dlr-benefits { grid-template-columns: repeat(2, 1fr); }
          .apply-shell { grid-template-columns: 1fr; gap: 28px; }
          .apply-aside { position: static; }
        }
        @media (max-width: 600px) {
          .dlr-benefits { grid-template-columns: 1fr; }
          .dlr-paths { grid-template-columns: 1fr; }
          .apply-card .grid { grid-template-columns: 1fr; }
        }

        /* ── Supremo Offer Section ── */
        .supremo-offer-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px 0;
          position: relative;
        }

        .offer-content-wrapper {
          position: relative;
        }

        .offer-interactive-container {
          display: grid;
          grid-template-columns: 1fr 300px 1fr;
          gap: 24px;
          align-items: center;
          position: relative;
        }

        .offer-col {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .offer-col-left {
          text-align: right;
        }

        .offer-col-right {
          text-align: left;
        }

        .offer-item {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: var(--r-md);
          padding: 22px 24px;
          box-shadow: var(--sh-sm);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          position: relative;
          z-index: 2;
        }

        .offer-item:hover {
          transform: translateY(-4px);
          box-shadow: var(--sh-md);
          border-color: var(--blue-400);
        }

        .offer-item h4 {
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 700;
          color: var(--ink);
          margin: 0 0 8px;
          line-height: 1.35;
        }

        .offer-item p {
          font-size: 13.5px;
          color: var(--slate);
          margin: 0;
          line-height: 1.55;
        }

        .offer-center {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          height: 380px;
        }

        .center-glow-container {
          position: relative;
          width: 220px;
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-circle {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid var(--blue-600);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(14, 85, 188, 0.15), 0 0 0 8px rgba(14, 85, 188, 0.04);
          z-index: 10;
          padding: 20px;
        }

        .center-logo {
          width: 100%;
          height: auto;
          object-fit: contain;
        }

        .ripple {
          position: absolute;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          border: 1.5px solid rgba(14, 85, 188, 0.18);
          animation: ripple-effect 4s infinite linear;
          opacity: 0;
          z-index: 1;
          pointer-events: none;
        }

        .ripple-1 { animation-delay: 0s; }
        .ripple-2 { animation-delay: 1.33s; }
        .ripple-3 { animation-delay: 2.66s; }

        @keyframes ripple-effect {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }

        .connector-svg {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 348px;
          height: 526px;
          pointer-events: none;
          z-index: 1;
        }

        .connector-svg path {
          stroke: var(--blue-200);
          stroke-width: 1.5px;
          fill: none;
          stroke-dasharray: 6 6;
          animation: dash 35s linear infinite;
          transition: stroke 0.3s ease, stroke-width 0.3s ease;
        }

        .connector-svg circle {
          fill: #ffffff;
          stroke: var(--blue-400);
          stroke-width: 2px;
          r: 4px;
          transition: fill 0.3s ease, stroke 0.3s ease, r 0.3s ease;
        }

        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }

        .offer-bottom-row {
          display: flex;
          justify-content: center;
          margin-top: 36px;
        }

        .item-bot-center {
          max-width: 540px;
          width: 100%;
          text-align: center;
        }

        @media (min-width: 1025px) {
          .offer-col {
            height: 380px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 0;
          }
          .offer-item {
            height: 110px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 14px 20px;
          }
          .item-bot-center {
            height: 110px;
          }
        }

        @media (max-width: 1024px) {
          .offer-interactive-container {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .offer-col-left {
            text-align: left;
          }
          .offer-center {
            height: auto;
            margin: 28px 0;
            order: -1;
          }
          .connector-svg {
            display: none !important;
          }
          .offer-col {
            gap: 24px;
            height: auto;
          }
          .offer-item {
            height: auto;
          }
          .offer-bottom-row {
            margin-top: 24px;
          }
          .item-bot-center {
            max-width: 100%;
            text-align: left;
            height: auto;
          }
        }

        /* ── Hover Highlighting for Radial Connectors ── */
        .offer-content-wrapper:has(.item-top-left:hover) .line-top-left { stroke: var(--blue-600); stroke-width: 2.5px; }
        .offer-content-wrapper:has(.item-top-left:hover) .dot-top-left { fill: var(--blue-600); stroke: var(--blue-600); r: 6px; }

        .offer-content-wrapper:has(.item-mid-left:hover) .line-mid-left { stroke: var(--blue-600); stroke-width: 2.5px; }
        .offer-content-wrapper:has(.item-mid-left:hover) .dot-mid-left { fill: var(--blue-600); stroke: var(--blue-600); r: 6px; }

        .offer-content-wrapper:has(.item-bot-left:hover) .line-bot-left { stroke: var(--blue-600); stroke-width: 2.5px; }
        .offer-content-wrapper:has(.item-bot-left:hover) .dot-bot-left { fill: var(--blue-600); stroke: var(--blue-600); r: 6px; }

        .offer-content-wrapper:has(.item-top-right:hover) .line-top-right { stroke: var(--blue-600); stroke-width: 2.5px; }
        .offer-content-wrapper:has(.item-top-right:hover) .dot-top-right { fill: var(--blue-600); stroke: var(--blue-600); r: 6px; }

        .offer-content-wrapper:has(.item-mid-right:hover) .line-mid-right { stroke: var(--blue-600); stroke-width: 2.5px; }
        .offer-content-wrapper:has(.item-mid-right:hover) .dot-mid-right { fill: var(--blue-600); stroke: var(--blue-600); r: 6px; }

        .offer-content-wrapper:has(.item-bot-right:hover) .line-bot-right { stroke: var(--blue-600); stroke-width: 2.5px; }
        .offer-content-wrapper:has(.item-bot-right:hover) .dot-bot-right { fill: var(--blue-600); stroke: var(--blue-600); r: 6px; }

        .offer-content-wrapper:has(.item-bot-center:hover) .line-bot-center { stroke: var(--blue-600); stroke-width: 2.5px; }
        .offer-content-wrapper:has(.item-bot-center:hover) .dot-bot-center { fill: var(--blue-600); stroke: var(--blue-600); r: 6px; }
      `}} />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="dlr-hero">
        <div className="dlr-hero-grid-bg" />
        <div className="container">
          <div className="dlr-hero-inner">
            <div>
              <span className="eyebrow eyebrow-light">Partner Programme</span>
              <h1>
                Grow your business <br />with <span className="grad">Supremo</span>.
              </h1>
              <p>
                Become an authorized dealer or supply to our plants. Either way, you partner
                with one of India&apos;s most trusted names in water tanks, pipes and polymer products.
              </p>
              <div className="dlr-hero-cta">
                <button className="btn btn--white" onClick={() => choosePath("dealer")}>
                  Become a Dealer
                  <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
                </button>
                <button className="btn btn--ghost" onClick={() => choosePath("supplier")}>
                  Supply to Supremo
                </button>
              </div>
              <div className="dlr-hero-stats">
                <div className="dlr-hero-stat"><div className="n">500+</div><div className="l">Cities served</div></div>
                <div className="dlr-hero-stat"><div className="n">3–5 days</div><div className="l">Approval time</div></div>
                <div className="dlr-hero-stat"><div className="n">100%</div><div className="l">ISI-certified</div></div>
              </div>
            </div>
            <div className="dlr-hero-art">
              <img src="/images/image_1_nobg.png" alt="Supremo products" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits: Interactive Astral-style Radial Grid ── */}
      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <div className="supremo-offer-section">
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span className="eyebrow" style={{ justifyContent: "center" }}>Why partner with us</span>
              <h2 style={{ marginTop: 14 }}>What Supremo Offers</h2>
            </div>

            <div className="offer-content-wrapper">
              {/* SVG Connector Lines (Hidden on mobile) */}
              <svg className="connector-svg" viewBox="0 0 348 526" fill="none">
                {/* Top-left line */}
                <path d="M 0,55 H 120 V 190 H 174" className="line-top-left" />
                <circle cx="0" cy="55" className="dot-top-left" />

                {/* Mid-left line */}
                <path d="M 0,190 H 174" className="line-mid-left" />
                <circle cx="0" cy="190" className="dot-mid-left" />

                {/* Bot-left line */}
                <path d="M 0,325 H 120 V 190 H 174" className="line-bot-left" />
                <circle cx="0" cy="325" className="dot-bot-left" />

                {/* Top-right line */}
                <path d="M 348,55 H 228 V 190 H 174" className="line-top-right" />
                <circle cx="348" cy="55" className="dot-top-right" />

                {/* Mid-right line */}
                <path d="M 348,190 H 174" className="line-mid-right" />
                <circle cx="348" cy="190" className="dot-mid-right" />

                {/* Bot-right line */}
                <path d="M 348,325 H 228 V 190 H 174" className="line-bot-right" />
                <circle cx="348" cy="325" className="dot-bot-right" />

                {/* Bot-center line */}
                <path d="M 174,416 V 190" className="line-bot-center" />
                <circle cx="174" cy="416" className="dot-bot-center" />
              </svg>

              <div className="offer-interactive-container">
                {/* Left Column */}
                <div className="offer-col offer-col-left">
                  <div className="offer-item item-top-left">
                    <h4>Certifications</h4>
                    <p>Our products are manufactured to national benchmarks (ISI, ISO 9001:2015) and undergo strict quality audits.</p>
                  </div>
                  <div className="offer-item item-mid-left">
                    <h4>Strong Marketing Support</h4>
                    <p>Supremo offers robust marketing support, dealership branding, and marketing assets to build customer loyalty.</p>
                  </div>
                  <div className="offer-item item-bot-left">
                    <h4>Pioneers in Polymer</h4>
                    <p>With 27+ years of expertise in blow-moulding and rotomoulding, Supremo delivers superior strength and durability.</p>
                  </div>
                </div>

                {/* Center Column: Logo + Ripples */}
                <div className="offer-center">
                  <div className="center-glow-container">
                    {/* Ripples */}
                    <div className="ripple ripple-1"></div>
                    <div className="ripple ripple-2"></div>
                    <div className="ripple ripple-3"></div>
                    {/* Inner Logo Circle */}
                    <div className="logo-circle">
                      <img src="/images/logo.png" alt="Supremo Logo" className="center-logo" />
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="offer-col offer-col-right">
                  <div className="offer-item item-top-right">
                    <h4>Leading Polymer Brand</h4>
                    <p>Operating across key categories: Multi-Layer Water Tanks, PVC/CPVC Pipes, Utility Accessories, and Planters.</p>
                  </div>
                  <div className="offer-item item-mid-right">
                    <h4>Unmatched Rewards</h4>
                    <p>Boost your profitability with our competitive pricing, quarterly incentives, turnover discounts (TOD), and partner benefits.</p>
                  </div>
                  <div className="offer-item item-bot-right">
                    <h4>Dedicated Support</h4>
                    <p>Dedicated regional heads and responsive support teams across 22 states to assist with order fulfillment and queries.</p>
                  </div>
                </div>
              </div>

              {/* Bottom Center Item */}
              <div className="offer-bottom-row">
                <div className="offer-item item-bot-center">
                  <h4>Wide Range of Products</h4>
                  <p>Over 20+ specialized polymer products to cater to domestic, agricultural, and commercial piping and storage needs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Apply: choose path + form ────────────────────── */}
      <section id="apply" style={{ background: "var(--paper-2)", scrollMarginTop: "var(--nav-h)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "60ch", margin: "0 auto 40px" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>Apply to partner</span>
            <h2 style={{ marginTop: 14 }}>Choose how you&apos;d like to work with us.</h2>
            <p style={{ color: "var(--muted)", marginTop: 12, lineHeight: 1.6 }}>
              Select dealer or supplier — the application below adapts to your choice.
            </p>
          </div>

          {/* Path cards */}
          <div className="dlr-paths">
            <button
              type="button"
              className={`path-card${isDealer ? " sel" : ""}`}
              onClick={() => setPartnerType("dealer")}
              aria-pressed={isDealer}
            >
              <span className="path-radio">{isDealer && <Icon name="check" size={13} stroke="#fff" />}</span>
              <span className="ic"><Icon name="store" stroke={isDealer ? "#fff" : "var(--blue-600)"} /></span>
              <h3>Dealer / Distributor</h3>
              <span className="sub">Stock and sell Supremo products in your territory with protected pricing and support.</span>
              <ul>
                <li><Icon name="check" size={14} /> Protected sales territory</li>
                <li><Icon name="check" size={14} /> Dealer pricing & margins</li>
                <li><Icon name="check" size={14} /> Branding & marketing support</li>
              </ul>
            </button>

            <button
              type="button"
              className={`path-card${!isDealer ? " sel" : ""}`}
              onClick={() => setPartnerType("supplier")}
              aria-pressed={!isDealer}
            >
              <span className="path-radio">{!isDealer && <Icon name="check" size={13} stroke="#fff" />}</span>
              <span className="ic"><Icon name="factory" stroke={!isDealer ? "#fff" : "var(--blue-600)"} /></span>
              <h3>Supplier / Vendor</h3>
              <span className="sub">Supply raw materials, packaging, machinery or services to our manufacturing units.</span>
              <ul>
                <li><Icon name="check" size={14} /> Long-term purchase orders</li>
                <li><Icon name="check" size={14} /> Timely, transparent payments</li>
                <li><Icon name="check" size={14} /> Growing pan-India demand</li>
              </ul>
            </button>
          </div>

          {/* Split: sticky aside + form */}
          <div className="apply-shell">
            <aside className="apply-aside">
              <span className="eyebrow">{isDealer ? "Dealer application" : "Supplier application"}</span>
              <h2>{isDealer ? "Sell Supremo in your area." : "Become a Supremo vendor."}</h2>
              <p>
                {isDealer
                  ? "Fill in a few details and our regional head will call you back within 3–5 working days to discuss territory and terms."
                  : "Share your supply profile and our procurement team will reach out to evaluate a fit and next steps."}
              </p>
              <div className="apply-ministeps">
                {STEPS.map((s) => (
                  <div className="apply-ministep" key={s.n}>
                    <span className="dot">{s.n}</span>
                    <div>
                      <div className="t">{s.title}</div>
                      <div className="d">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            <div className="apply-card">
              {submitted ? (
                <FormSuccess
                  title="Application received"
                  message={`Thanks for your interest in partnering with Supremo as a ${isDealer ? "dealer" : "supplier"}. Our team will reach out within 3–5 working days.`}
                />
              ) : (
                <form onSubmit={handleSubmit}>
                  <span className="apply-typebadge">
                    <Icon name={isDealer ? "store" : "factory"} size={15} stroke="var(--blue-700)" />
                    {isDealer ? "Dealer / Distributor" : "Supplier / Vendor"}
                  </span>

                  <div className="grid">
                    <div className="field">
                      <label>Full Name<span className="req-mark">*</span></label>
                      <input type="text" required placeholder="Your full name" value={form.name} onChange={(e) => setField("name", e.target.value)} />
                    </div>
                    <div className="field">
                      <label>{isDealer ? "Firm / Business Name" : "Company Name"}<span className="req-mark">*</span></label>
                      <input type="text" required placeholder={isDealer ? "Your firm or shop" : "Your company"} value={form.company} onChange={(e) => setField("company", e.target.value)} />
                    </div>
                    <div className="field">
                      <label>Phone<span className="req-mark">*</span></label>
                      <input type="tel" inputMode="tel" required placeholder="+91 90989 89090" value={form.phone} onChange={(e) => setField("phone", e.target.value)} />
                    </div>
                    <div className="field">
                      <label>State<span className="req-mark">*</span></label>
                      <select required value={form.state} onChange={(e) => setField("state", e.target.value)}>
                        <option value="" disabled>Select your state</option>
                        {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="field full">
                      <label>{isDealer ? "Product Interest" : "Supply Category"}</label>
                      {isDealer ? (
                        <select value={form.product} onChange={(e) => setField("product", e.target.value)}>
                          {PRODUCTS.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      ) : (
                        <select value={form.supplyCategory} onChange={(e) => setField("supplyCategory", e.target.value)}>
                          {SUPPLY_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      )}
                    </div>
                    <div className="field full">
                      <label>Message</label>
                      <textarea rows={4} placeholder={isDealer ? "Anything else we should know about your business?" : "Tell us about your products, certifications and key clients."} value={form.message} onChange={(e) => setField("message", e.target.value)} />
                    </div>
                  </div>

                  <button type="submit" className="btn" style={{ width: "100%", justifyContent: "center", marginTop: 22 }}>
                    {isDealer ? "Submit Dealer Application" : "Submit Supplier Application"}
                    <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>FAQ</span>
            <h2 style={{ marginTop: 14 }}>Partner questions, answered.</h2>
          </div>
          <div className="dlr-faq">
            {FAQS.map((f) => (
              <div className="dlr-faq-item" key={f.q}>
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
