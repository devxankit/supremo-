"use client";

import { useState } from "react";
import { FormSuccess } from "@/components/FormSuccess";

interface Distributor {
  name: string;
  category: string;
  state: string;
  city: string;
  pincode: string;
  phone: string;
  email: string;
  address: string;
}

const DISTRIBUTORS_DB: Distributor[] = [
  {
    name: "Gupta Trading Company",
    category: "Water Storage Tanks",
    state: "Madhya Pradesh",
    city: "Jabalpur",
    pincode: "482001",
    phone: "+91 98765 43210",
    email: "guptatrading@supremo.com",
    address: "Jabalpur, Madhya Pradesh - 482001",
  },
  {
    name: "Narmada Polymer Distributors",
    category: "Water Storage Tanks",
    state: "Madhya Pradesh",
    city: "Jabalpur",
    pincode: "482008",
    phone: "+91 94251 12345",
    email: "narmada@supremo.com",
    address: "Jabalpur, Madhya Pradesh - 482008",
  },
  {
    name: "Jabalpur Sanitary House",
    category: "Water Storage Tanks",
    state: "Madhya Pradesh",
    city: "Jabalpur",
    pincode: "482002",
    phone: "+91 94258 76543",
    email: "jbp.sanitary@supremo.com",
    address: "Jabalpur, Madhya Pradesh - 482002",
  },
  {
    name: "Sharma Sanitary Store",
    category: "Water Storage Tanks",
    state: "Madhya Pradesh",
    city: "Indore",
    pincode: "452001",
    phone: "+91 91234 56789",
    email: "sharmasanitary@supremo.com",
    address: "Indore, Madhya Pradesh - 452001",
  },
  {
    name: "Bhopal Pipe House",
    category: "PVC/CPVC Pipes",
    state: "Madhya Pradesh",
    city: "Bhopal",
    pincode: "462001",
    phone: "+91 98930 11223",
    email: "bhopalpipe@supremo.com",
    address: "Bhopal, Madhya Pradesh - 462001",
  },
  {
    name: "Patel Polymer & Pipes",
    category: "PVC/CPVC Pipes",
    state: "Gujarat",
    city: "Surat",
    pincode: "395003",
    phone: "+91 98989 09090",
    email: "patelpolymer@supremo.com",
    address: "Surat, Gujarat - 395003",
  },
  {
    name: "Gujarat Water Tech",
    category: "Water Storage Tanks",
    state: "Gujarat",
    city: "Ahmedabad",
    pincode: "380001",
    phone: "+91 97243 88990",
    email: "gujaratwater@supremo.com",
    address: "Ahmedabad, Gujarat - 380001",
  },
  {
    name: "Mahavir Hardware & Tanks",
    category: "Water Storage Tanks",
    state: "Maharashtra",
    city: "Mumbai",
    pincode: "400001",
    phone: "+91 98200 12345",
    email: "mahavirhardware@supremo.com",
    address: "Mumbai, Maharashtra - 400001",
  },
  {
    name: "Pune Polymer Distributors",
    category: "PVC/CPVC Pipes",
    state: "Maharashtra",
    city: "Pune",
    pincode: "411002",
    phone: "+91 95455 66778",
    email: "punepolymers@supremo.com",
    address: "Pune, Maharashtra - 411002",
  },
  {
    name: "Capital Sanitary Emporium",
    category: "PVC/CPVC Pipes",
    state: "Delhi",
    city: "New Delhi",
    pincode: "110001",
    phone: "+91 98111 22233",
    email: "capitalsanitary@supremo.com",
    address: "New Delhi, Delhi - 110001",
  },
  {
    name: "Sri Krishna Enterprises",
    category: "Planters & Accessories",
    state: "Karnataka",
    city: "Bangalore",
    pincode: "560001",
    phone: "+91 98450 98450",
    email: "srikrishna@supremo.com",
    address: "Bangalore, Karnataka - 560001",
  },
  {
    name: "Bengal Pipe & Fittings",
    category: "PVC/CPVC Pipes",
    state: "West Bengal",
    city: "Kolkata",
    pincode: "700001",
    phone: "+91 98300 98300",
    email: "bengalpipes@supremo.com",
    address: "Kolkata, West Bengal - 700001",
  },
  {
    name: "Royal Sanitary & Tanks",
    category: "Water Storage Tanks",
    state: "Rajasthan",
    city: "Jaipur",
    pincode: "302001",
    phone: "+91 98290 98290",
    email: "royalsanitary@supremo.com",
    address: "Jaipur, Rajasthan - 302001",
  }
];

const CATEGORIES = [
  "Water Storage Tanks",
  "PVC/CPVC Pipes",
  "Planters & Accessories"
];

const STATES_AND_CITIES: Record<string, string[]> = {
  "Madhya Pradesh": ["Jabalpur", "Indore", "Bhopal", "Gwalior"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
  "Delhi": ["New Delhi"],
  "Karnataka": ["Bangalore", "Mysore", "Hubli"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota"]
};

// "Show everything" sentinels so each filter is optional (standard locator UX).
const ALL_CATEGORIES = "All Categories";
const ALL_STATES = "All States";
const ALL_CITIES = "All Cities";

const APPLY_STEPS = [
  { n: "01", title: "Submit the form", desc: "Tell us about your firm, location and the products you want to stock." },
  { n: "02", title: "Talk to the regional head", desc: "Our team verifies your details and discusses territory, targets and terms." },
  { n: "03", title: "Get onboarded", desc: "Sign the dealer agreement, receive your starter stock and go live." },
];

const DEALER_FAQS = [
  { q: "What investment is required to become a dealer?", a: "It varies by territory and product mix. Most partners start with a modest stocking order; the regional head will share exact numbers for your area during the call." },
  { q: "Do I get an exclusive area?", a: "Yes — active dealers operate in a protected territory so you don't compete with another Supremo partner next door." },
  { q: "Which products can I stock?", a: "Water storage tanks, PVC/CPVC pipes & fittings, and planters & accessories. You can start with one line and expand." },
  { q: "How long does approval take?", a: "Typically 3–5 working days after we receive your application and verify your details." },
];

// Inline SVGs matching design mockup styling
const BoxIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--blue-600)" }}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const MapPinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--blue-600)" }}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const BuildingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--blue-600)" }}>
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <line x1="9" y1="22" x2="9" y2="16" />
    <line x1="15" y1="22" x2="15" y2="16" />
    <line x1="9" y1="16" x2="15" y2="16" />
    <path d="M8 6h2v2H8V6zm4 0h2v2h-2V6zm4 0h2v2h-2V6zM8 10h2v2H8v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z" />
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--blue-600)" }}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.09 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--blue-600)" }}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PaperAirplaneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const RibbonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const TruckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const HeadsetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

export default function DealershipPage() {
  // Filters — every one is optional (defaults to "show everything").
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);
  const [selectedState, setSelectedState]       = useState(ALL_STATES);
  const [selectedCity, setSelectedCity]         = useState(ALL_CITIES);
  const [pincodeInput, setPincodeInput]         = useState("");
  const [textQuery, setTextQuery]               = useState("");

  // Results
  const [activeDistributors, setActiveDistributors] = useState<Distributor[]>(DISTRIBUTORS_DB);
  const [resultSummary, setResultSummary]           = useState("Showing all authorized distributors");
  const [isSearching, setIsSearching]               = useState(false);
  const [isLocating, setIsLocating]                 = useState(false);

  // City options depend on the chosen state.
  const cityOptions = selectedState === ALL_STATES ? [] : (STATES_AND_CITIES[selectedState] || []);

  // Dealer application form
  const [apply, setApply] = useState({
    name: "", firm: "", phone: "", email: "",
    state: "", city: "", category: CATEGORIES[0], business: "", investment: "", message: "",
  });
  const [applySubmitted, setApplySubmitted] = useState(false);
  const setApplyField = (key: keyof typeof apply, value: string) =>
    setApply((prev) => ({ ...prev, [key]: value }));

  // Core multi-field filter: combines dropdowns, pincode prefix and free text.
  const runFilter = () => {
    const q = textQuery.trim().toLowerCase();
    return DISTRIBUTORS_DB.filter((d) => {
      if (selectedCategory !== ALL_CATEGORIES && d.category !== selectedCategory) return false;
      if (selectedState !== ALL_STATES && d.state !== selectedState) return false;
      if (selectedCity !== ALL_CITIES && d.city !== selectedCity) return false;
      if (pincodeInput && !d.pincode.startsWith(pincodeInput)) return false;
      if (q && !`${d.name} ${d.city} ${d.state} ${d.address} ${d.category}`.toLowerCase().includes(q)) return false;
      return true;
    });
  };

  const filtersActive =
    selectedCategory !== ALL_CATEGORIES ||
    selectedState !== ALL_STATES ||
    selectedCity !== ALL_CITIES ||
    pincodeInput.trim() !== "" ||
    textQuery.trim() !== "";

  // Run the filter and update the result list + summary.
  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      const matches = runFilter();
      setActiveDistributors(matches);
      setResultSummary(
        filtersActive
          ? `${matches.length} distributor${matches.length === 1 ? "" : "s"} found`
          : "Showing all authorized distributors"
      );
      setIsSearching(false);
    }, 400);
  };

  // Reset every filter back to "show everything".
  const handleClear = () => {
    setSelectedCategory(ALL_CATEGORIES);
    setSelectedState(ALL_STATES);
    setSelectedCity(ALL_CITIES);
    setPincodeInput("");
    setTextQuery("");
    setActiveDistributors(DISTRIBUTORS_DB);
    setResultSummary("Showing all authorized distributors");
  };

  // Geolocation mock — snaps the filters to a sample serviced city.
  const handleLocate = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      setSelectedState("Madhya Pradesh");
      setSelectedCity("Jabalpur");
      setSelectedCategory(ALL_CATEGORIES);
      setPincodeInput("");
      setTextQuery("");
      const matches = DISTRIBUTORS_DB.filter(
        (d) => d.state === "Madhya Pradesh" && d.city === "Jabalpur"
      );
      setActiveDistributors(matches);
      setResultSummary(`${matches.length} distributor${matches.length === 1 ? "" : "s"} near Jabalpur`);
    }, 1000);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplySubmitted(true);
    if (typeof window !== "undefined") window.scrollTo({ top: window.scrollY, behavior: "smooth" });
  };

  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      {/* Dynamic styles to ensure pixel perfection and fully responsive behavior */}
      <style dangerouslySetInnerHTML={{ __html: `
        .dealership-hero {
          position: relative;
          background: linear-gradient(135deg, #0947a7 0%, #05265b 100%);
          color: #ffffff;
          padding: 80px 0 96px;
          overflow: hidden;
        }

        .grid-bg-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
          z-index: 1;
        }

        .hero-columns {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .collage-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .collage-image {
          max-width: 100%;
          height: auto;
          max-height: 380px;
          object-fit: contain;
          filter: drop-shadow(0px 12px 36px rgba(0, 0, 0, 0.3));
        }

        /* Locator card — a proper search panel, not a cramped strip */
        .locator-card {
          background: #ffffff;
          border: 1px solid var(--line);
          border-radius: 16px;
          box-shadow: var(--sh-lg);
          padding: clamp(18px, 3vw, 28px);
          margin-top: 44px;
          position: relative;
          z-index: 5;
          text-align: left;
        }

        .locator-head { margin-bottom: 18px; }
        .locator-head h3 {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 700;
          color: var(--ink);
          margin: 0 0 4px;
        }
        .locator-head p { font-size: 14px; color: var(--muted); margin: 0; }

        .locator-fields {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .locator-field {
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid var(--line);
          border-radius: 10px;
          background: var(--paper-2);
          padding: 10px 14px;
          min-width: 0;
          transition: border-color .15s, background .15s, box-shadow .15s;
        }
        .locator-field:focus-within {
          border-color: var(--blue-600);
          background: #fff;
          box-shadow: 0 0 0 4px var(--blue-100);
        }
        .locator-field--search { grid-column: 1 / -1; }
        .lf-icon { color: var(--blue-600); display: flex; flex-shrink: 0; }
        .lf-body { display: flex; flex-direction: column; flex: 1; min-width: 0; }
        .lf-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 2px;
        }
        .lf-input {
          border: none; background: transparent; outline: none;
          font-size: 15px; font-weight: 600; color: var(--ink);
          width: 100%; padding: 0;
        }
        .lf-input::placeholder { color: var(--soft); font-weight: 500; }
        .lf-select-wrap { position: relative; display: flex; }
        .lf-select {
          border: none; background: transparent; outline: none;
          font-size: 15px; font-weight: 600; color: var(--ink);
          width: 100%; cursor: pointer; appearance: none;
          padding: 0 18px 0 0;
        }
        .lf-select:disabled { color: var(--soft); cursor: not-allowed; }
        .lf-chevron {
          position: absolute; right: 0; top: 50%; transform: translateY(-50%);
          color: var(--muted); pointer-events: none; display: flex;
        }

        .locator-actions {
          display: flex; align-items: center; gap: 12px;
          margin-top: 16px; flex-wrap: wrap;
        }
        .locator-find {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          background: var(--blue-600); color: #fff; border: none;
          border-radius: 10px; height: 52px; padding: 0 28px;
          font-size: 14.5px; font-weight: 700; cursor: pointer;
          transition: background .2s; flex: 1; min-width: 220px;
        }
        .locator-find:hover { background: var(--blue-700); }
        .locator-locate {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          background: #fff; color: var(--ink); border: 1px solid var(--line);
          border-radius: 10px; height: 52px; padding: 0 20px;
          font-size: 14px; font-weight: 600; cursor: pointer;
          transition: background .2s, border-color .2s;
        }
        .locator-locate:hover { background: var(--paper-2); border-color: var(--soft); }
        .locator-locate:disabled { opacity: .6; cursor: default; }
        .locator-clear {
          background: none; border: none; color: var(--muted);
          font-size: 13px; font-weight: 600; cursor: pointer;
          text-decoration: underline; text-underline-offset: 3px;
        }
        .locator-clear:hover { color: var(--ink); }

        .results-section {
          background: #f6f8fc;
          padding: 80px 0;
        }

        .results-header {
          max-width: 680px;
          margin-bottom: 28px;
        }

        .distributors-list-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          position: relative;
        }

        .dealer-empty-state,
        .loader-overlay { grid-column: 1 / -1; }

        .distributor-display-card {
          background: #ffffff;
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 24px;
          box-shadow: var(--sh-md);
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.3s;
        }
        .distributor-display-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--sh-lg);
        }

        .ddc-head {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .distributor-store-avatar {
          width: 58px;
          height: 58px;
          border-radius: 12px;
          background: #f2f7ff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .distributor-info-details {
          display: flex;
          flex-direction: column;
          gap: 9px;
          padding-top: 4px;
          border-top: 1px solid var(--line-2);
        }

        .ddc-row {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--slate);
          font-size: 14px;
          min-width: 0;
        }
        .ddc-row span { overflow: hidden; text-overflow: ellipsis; }

        .distributor-cta-column {
          display: flex;
          flex-direction: row;
          gap: 10px;
          margin-top: auto;
        }
        .distributor-cta-column > a { flex: 1; }

        .action-button-dir {
          border: 1.5px solid var(--blue-600);
          color: var(--blue-600);
          background: #ffffff;
          border-radius: 8px;
          height: 44px;
          padding: 0 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 600;
          font-size: 13.5px;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s;
        }

        .action-button-dir:hover {
          background: var(--blue-50);
        }

        .action-button-call {
          background: var(--blue-600);
          color: #ffffff;
          border: none;
          border-radius: 8px;
          height: 44px;
          padding: 0 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 13.5px;
          text-decoration: none;
          transition: background 0.2s;
        }

        .action-button-call:hover {
          background: var(--blue-700);
        }

        .trust-metrics-card {
          background: #ffffff;
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 36px;
          box-shadow: var(--sh-sm);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          margin-top: 24px;
          margin-bottom: 24px;
        }

        .trust-metric-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .metric-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #f2f7ff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .metric-text-label {
          font-weight: 700;
          font-family: var(--font-display);
          font-size: 14px;
          color: var(--ink);
          margin-bottom: 2px;
        }

        .metric-text-desc {
          font-size: 12.5px;
          color: var(--muted);
        }

        .disclaimer-text {
          text-align: center;
          font-size: 12px;
          color: var(--muted);
          margin-top: 48px;
        }

        .loader-overlay {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-weight: 600;
          color: var(--blue-600);
          z-index: 10;
        }

        .spinner {
          width: 24px;
          height: 24px;
          border: 3px solid var(--blue-200);
          border-top-color: var(--blue-600);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Responsive Breakpoints */
        @media (max-width: 990px) {
          .dealership-hero {
            padding: 60px 0 80px;
          }

          .hero-columns {
            grid-template-columns: 1fr;
            gap: 48px;
            text-align: center;
          }

          .collage-image {
            max-height: 280px;
          }

          .locator-card {
            margin-top: 32px;
          }

          .locator-fields {
            grid-template-columns: repeat(2, 1fr);
          }

          .locator-find {
            flex: 1 1 100%;
          }

          .distributors-list-container {
            grid-template-columns: 1fr;
          }

          .trust-metrics-card {
            grid-template-columns: repeat(2, 1fr);
            gap: 28px 24px;
            padding: 28px;
          }
        }

        @media (max-width: 640px) {
          .distributor-cta-column {
            flex-direction: column;
            gap: 12px;
          }

          .trust-metrics-card {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .locator-fields {
            grid-template-columns: 1fr;
          }

          .locator-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .locator-locate {
            width: 100%;
          }
        }
      `}} />

      {/* Hero Section */}
      <section className="dealership-hero">
        <div className="grid-bg-overlay" />
        <div className="container">
          <div className="hero-columns">
            {/* Copy */}
            <div>
              <span className="eyebrow eyebrow-light">— DEALERSHIP PROGRAMME</span>
              <h1 style={{
                color: "#fff",
                fontSize: "clamp(34px, 5vw, 56px)",
                lineHeight: 1.12,
                marginTop: 18,
                maxWidth: "20ch"
              }}>
                Find Your Nearest<br />
                <span style={{ 
                  color: "#6BA1FF", 
                  background: "linear-gradient(to right, #7fb0ff, #c3daff)", 
                  WebkitBackgroundClip: "text", 
                  WebkitTextFillColor: "transparent",
                  fontWeight: 800
                }}>Supremo</span> Distributor
              </h1>
              <p style={{
                color: "rgba(255, 255, 255, 0.72)",
                fontSize: "16px",
                lineHeight: 1.6,
                marginTop: 20,
                maxWidth: "48ch"
              }}>
                Locate authorized Supremo distributors and partners across India for genuine products and reliable support.
              </p>
            </div>

            {/* Collage Image */}
            <div className="collage-container">
              <img 
                src="/images/image_1_nobg.png" 
                alt="Supremo Products Collage" 
                className="collage-image"
              />
            </div>
          </div>

          {/* Locator Card */}
          <div className="locator-card">
            <div className="locator-head">
              <h3>Find an authorized distributor</h3>
              <p>Search by dealer name or area, or filter by product and location.</p>
            </div>

            <div className="locator-fields">
              {/* Free-text Search */}
              <div className="locator-field locator-field--search">
                <span className="lf-icon"><SearchIcon /></span>
                <div className="lf-body">
                  <label className="lf-label">Search</label>
                  <input
                    className="lf-input"
                    type="text"
                    placeholder="Dealer name or area — e.g. Gupta Trading, Indore"
                    value={textQuery}
                    onChange={(e) => setTextQuery(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                  />
                </div>
              </div>

              {/* Category */}
              <div className="locator-field">
                <span className="lf-icon"><BoxIcon /></span>
                <div className="lf-body">
                  <label className="lf-label">Category</label>
                  <div className="lf-select-wrap">
                    <select className="lf-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                      <option value={ALL_CATEGORIES}>{ALL_CATEGORIES}</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <span className="lf-chevron">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                    </span>
                  </div>
                </div>
              </div>

              {/* State */}
              <div className="locator-field">
                <span className="lf-icon"><MapPinIcon /></span>
                <div className="lf-body">
                  <label className="lf-label">State</label>
                  <div className="lf-select-wrap">
                    <select
                      className="lf-select"
                      value={selectedState}
                      onChange={(e) => { setSelectedState(e.target.value); setSelectedCity(ALL_CITIES); }}
                    >
                      <option value={ALL_STATES}>{ALL_STATES}</option>
                      {Object.keys(STATES_AND_CITIES).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <span className="lf-chevron">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                    </span>
                  </div>
                </div>
              </div>

              {/* City */}
              <div className="locator-field">
                <span className="lf-icon"><BuildingIcon /></span>
                <div className="lf-body">
                  <label className="lf-label">City</label>
                  <div className="lf-select-wrap">
                    <select
                      className="lf-select"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      disabled={selectedState === ALL_STATES}
                    >
                      <option value={ALL_CITIES}>{ALL_CITIES}</option>
                      {cityOptions.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <span className="lf-chevron">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                    </span>
                  </div>
                </div>
              </div>

              {/* Pincode */}
              <div className="locator-field">
                <span className="lf-icon"><MapPinIcon /></span>
                <div className="lf-body">
                  <label className="lf-label">Pincode</label>
                  <input
                    className="lf-input"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    placeholder="e.g. 482001"
                    value={pincodeInput}
                    onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                  />
                </div>
              </div>
            </div>

            <div className="locator-actions">
              <button className="locator-find" onClick={handleSearch}>
                <SearchIcon />
                Find Distributors
              </button>
              <button className="locator-locate" onClick={handleLocate} disabled={isLocating}>
                {isLocating ? (
                  <div className="spinner" style={{ width: "16px", height: "16px", borderWidth: "2px" }} />
                ) : (
                  <MapPinIcon size={18} />
                )}
                {isLocating ? "Locating…" : "Use my location"}
              </button>
              {filtersActive && (
                <button className="locator-clear" onClick={handleClear}>Clear filters</button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="results-section">
        <div className="container">
          {/* Results header (full width) */}
          <div className="results-header">
            <div>
              <span style={{
                fontSize: "11px",
                fontWeight: "bold",
                textTransform: "uppercase",
                color: "var(--muted)",
                display: "block",
                marginBottom: "6px",
                letterSpacing: "0.08em"
              }}>
                Distributor Network
              </span>
              <h2 style={{
                fontSize: "26px",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                color: "var(--ink)",
                lineHeight: 1.25,
                marginBottom: "16px"
              }}>
                Supremo Authorized Distributors
              </h2>
              <p style={{
                fontSize: "14px",
                color: "var(--slate)",
                lineHeight: 1.6
              }}>
                <span style={{ color: "var(--blue-600)", fontWeight: "bold" }}>{resultSummary}.</span> Reach out to any partner directly for genuine products and support — or <a href="#become-dealer" style={{ color: "var(--blue-600)", fontWeight: 600, textDecoration: "underline" }}>apply to become a dealer</a> yourself.
              </p>
            </div>
          </div>

          {/* Distributor cards (full-width grid) */}
          <div className="distributors-list-container">

              {/* Dynamic Loading Overlay */}
              {(isSearching || isLocating) && (
                <div className="loader-overlay" style={{ borderRadius: "16px" }}>
                  <div className="spinner" />
                  <span>Searching Nearest Distributors...</span>
                </div>
              )}

              {/* Empty state — no distributor matched the filters */}
              {activeDistributors.length === 0 && !isSearching && !isLocating && (
                <div className="dealer-empty-state">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                  <h3>No distributors match your search</h3>
                  <p>Try widening or clearing your filters to see every partner — or apply below to become the first Supremo dealer in your area.</p>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
                    <button onClick={handleClear} className="empty-state-btn">Clear filters</button>
                    <a href="#become-dealer" className="empty-state-btn empty-state-btn--primary">Become a dealer</a>
                  </div>
                </div>
              )}

              {/* Render all matching distributors */}
              {activeDistributors.map((distributor, idx) => (
                <div className="distributor-display-card" key={idx}>

                  {/* Header: avatar + name + address */}
                  <div className="ddc-head">
                    <div className="distributor-store-avatar">
                      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        <div style={{
                          position: "absolute",
                          bottom: "-4px",
                          right: "-4px",
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          background: "var(--blue-600)",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.15)"
                        }}>
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <h3 style={{
                        fontSize: "20px",
                        fontFamily: '"IBM Plex Serif", Georgia, serif',
                        fontWeight: 700,
                        color: "var(--ink)",
                        margin: "0 0 4px",
                        lineHeight: 1.25
                      }}>
                        {distributor.name}
                      </h3>
                      <div className="ddc-row">
                        <MapPinIcon size={16} />
                        <span>{distributor.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact details */}
                  <div className="distributor-info-details">
                    <div className="ddc-row">
                      <PhoneIcon />
                      <span>{distributor.phone}</span>
                    </div>
                    <div className="ddc-row">
                      <MailIcon />
                      <span>{distributor.email}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="distributor-cta-column">
                    <a
                      className="action-button-dir"
                      href={`https://maps.google.com/?q=${encodeURIComponent(distributor.name + " " + distributor.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <PaperAirplaneIcon />
                      GET DIRECTIONS
                    </a>
                    <a
                      className="action-button-call"
                      href={`tel:${distributor.phone.replace(/\s+/g, '')}`}
                    >
                      CALL NOW
                    </a>
                  </div>
                </div>
              ))}
            </div>

          {/* Trust Factors Row */}
          <div className="trust-metrics-card">
            
            {/* 100% Genuine */}
            <div className="trust-metric-item">
              <div className="metric-icon-box">
                <ShieldIcon />
              </div>
              <div>
                <div className="metric-text-label">100% Genuine Products</div>
                <div className="metric-text-desc">Original Supremo Quality</div>
              </div>
            </div>

            {/* Authorized Network */}
            <div className="trust-metric-item">
              <div className="metric-icon-box">
                <RibbonIcon />
              </div>
              <div>
                <div className="metric-text-label">Authorized Network</div>
                <div className="metric-text-desc">Trusted & Verified Partners</div>
              </div>
            </div>

            {/* Pan India */}
            <div className="trust-metric-item">
              <div className="metric-icon-box">
                <TruckIcon />
              </div>
              <div>
                <div className="metric-text-label">Pan India Presence</div>
                <div className="metric-text-desc">Across 500+ Cities</div>
              </div>
            </div>

            {/* Expert Support */}
            <div className="trust-metric-item">
              <div className="metric-icon-box">
                <HeadsetIcon />
              </div>
              <div>
                <div className="metric-text-label">Expert Support</div>
                <div className="metric-text-desc">Assistance You Can Count On</div>
              </div>
            </div>

          </div>

          {/* Footnote */}
          <div className="disclaimer-text">
            * Results shown are based on your search criteria. Please contact the distributor for more details.
          </div>
        </div>
      </section>

      {/* Styles for the dealer-application area */}
      <style dangerouslySetInnerHTML={{ __html: `
        .dealer-empty-state { text-align: center; padding: 44px 20px; display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .dealer-empty-state h3 { font-size: 18px; color: var(--ink); }
        .dealer-empty-state p { font-size: 14px; color: var(--slate); max-width: 48ch; line-height: 1.6; }
        .empty-state-btn { display: inline-flex; align-items: center; height: 42px; padding: 0 18px; border-radius: var(--r-pill); border: 1px solid var(--line); background: #fff; color: var(--ink); font-size: 13px; font-weight: 600; cursor: pointer; text-decoration: none; }
        .empty-state-btn--primary { background: var(--blue-600); color: #fff; border-color: var(--blue-600); }

        .apply-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .apply-step-num { font-family: var(--font-display); font-size: 32px; font-weight: 700; color: var(--blue-200); line-height: 1; margin-bottom: 10px; }
        .apply-step h3 { font-size: 17px; margin-bottom: 6px; color: var(--ink); }
        .apply-step p { font-size: 14px; color: var(--slate); line-height: 1.6; }

        .apply-card { max-width: 780px; margin: 0 auto; background: #fff; border: 1px solid var(--line); border-radius: var(--r-lg); padding: clamp(24px, 4vw, 40px); box-shadow: var(--sh-md); }
        .apply-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .apply-form-grid .full { grid-column: 1 / -1; }
        .apply-card .field textarea { padding: 12px 14px; border: 1px solid var(--line); border-radius: var(--r-sm); font: inherit; font-size: 15px; color: var(--ink); background: var(--paper-2); resize: vertical; outline: none; width: 100%; box-sizing: border-box; }
        .apply-card .field textarea:focus { border-color: var(--blue-600); background: #fff; box-shadow: 0 0 0 4px var(--blue-100); }

        .dealer-faq { max-width: 820px; margin: 0 auto; }
        .dealer-faq-item { border-bottom: 1px solid var(--line); padding: 18px 0; }
        .dealer-faq-item:first-child { border-top: 1px solid var(--line); }
        .dealer-faq-item h3 { font-size: 16px; margin-bottom: 6px; color: var(--ink); }
        .dealer-faq-item p { font-size: 14px; color: var(--slate); line-height: 1.65; }

        @media (max-width: 900px) {
          .apply-steps { grid-template-columns: 1fr; gap: 16px; }
        }
        @media (max-width: 560px) {
          .apply-form-grid { grid-template-columns: 1fr; }
        }
      `}} />



      {/* How to apply */}
      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <div style={{ marginBottom: 36 }}>
            <span className="eyebrow">How it works</span>
            <h2 style={{ marginTop: 14 }}>Three steps to go live.</h2>
          </div>
          <div className="apply-steps">
            {APPLY_STEPS.map((s) => (
              <div className="apply-step" key={s.n}>
                <div className="apply-step-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Dealer — application form */}
      <section id="become-dealer" style={{ background: "var(--paper-2)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "54ch", margin: "0 auto 36px" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>Become a Dealer</span>
            <h2 style={{ marginTop: 14 }}>Apply for a Supremo dealership.</h2>
            <p style={{ color: "var(--muted)", marginTop: 10 }}>
              Fill in your details and our regional head will get in touch within 3–5 working days to discuss territory and terms.
            </p>
          </div>

          <div className="apply-card">
            {applySubmitted ? (
              <FormSuccess title="Application received" message="Thanks for your interest in a Supremo dealership. Our regional head will reach out within 3–5 working days." />
            ) : (
              <form onSubmit={handleApplySubmit}>
                <div className="apply-form-grid">
                  <div className="field">
                    <label>Full Name<span className="req-mark">*</span></label>
                    <input type="text" required placeholder="Your full name" value={apply.name} onChange={(e) => setApplyField("name", e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Firm / Business Name<span className="req-mark">*</span></label>
                    <input type="text" required placeholder="Your firm or shop name" value={apply.firm} onChange={(e) => setApplyField("firm", e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Phone<span className="req-mark">*</span></label>
                    <input type="tel" inputMode="tel" required placeholder="+91 90989 89090" value={apply.phone} onChange={(e) => setApplyField("phone", e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Email</label>
                    <input type="email" placeholder="you@example.com" value={apply.email} onChange={(e) => setApplyField("email", e.target.value)} />
                  </div>
                  <div className="field">
                    <label>State<span className="req-mark">*</span></label>
                    <select required value={apply.state} onChange={(e) => setApplyField("state", e.target.value)}>
                      <option value="" disabled>Select your state</option>
                      {Object.keys(STATES_AND_CITIES).map((s) => <option key={s} value={s}>{s}</option>)}
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>City / District</label>
                    <input type="text" placeholder="Your city or district" value={apply.city} onChange={(e) => setApplyField("city", e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Product Interest</label>
                    <select value={apply.category} onChange={(e) => setApplyField("category", e.target.value)}>
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      <option value="All products">All products</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Investment Capacity</label>
                    <select value={apply.investment} onChange={(e) => setApplyField("investment", e.target.value)}>
                      <option value="">Prefer not to say</option>
                      <option value="Under ₹1 lakh">Under ₹1 lakh</option>
                      <option value="₹1–5 lakh">₹1–5 lakh</option>
                      <option value="₹5–10 lakh">₹5–10 lakh</option>
                      <option value="₹10 lakh+">₹10 lakh+</option>
                    </select>
                  </div>
                  <div className="field full">
                    <label>Current Business / Experience</label>
                    <input type="text" placeholder="e.g. hardware store, sanitary distributor, new to the trade" value={apply.business} onChange={(e) => setApplyField("business", e.target.value)} />
                  </div>
                  <div className="field full">
                    <label>Message</label>
                    <textarea rows={4} placeholder="Anything else we should know?" value={apply.message} onChange={(e) => setApplyField("message", e.target.value)} />
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
            <h2 style={{ marginTop: 14 }}>Dealer questions, answered.</h2>
          </div>
          <div className="dealer-faq">
            {DEALER_FAQS.map((f) => (
              <div className="dealer-faq-item" key={f.q}>
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
