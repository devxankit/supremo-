"use client";

import { useState } from "react";

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
  // Selector state management
  const [selectedCategory, setSelectedCategory] = useState("Water Storage Tanks");
  const [selectedState, setSelectedState]       = useState("Madhya Pradesh");
  const [selectedCity, setSelectedCity]         = useState("Jabalpur");
  const [pincodeInput, setPincodeInput]         = useState("482001");

  // Query and results display states
  // We now support multiple active distributors matching our search criteria
  const [activeDistributors, setActiveDistributors] = useState<Distributor[]>([
    DISTRIBUTORS_DB[0],
    DISTRIBUTORS_DB[1],
    DISTRIBUTORS_DB[2]
  ]);
  const [searchQuery, setSearchQuery]             = useState({
    category: "Water Storage Tanks",
    state: "Madhya Pradesh",
    city: "Jabalpur",
    pincode: "482001",
  });

  const [isSearching, setIsSearching]   = useState(false);
  const [isLocating, setIsLocating]     = useState(false);
  const [noMatchFound, setNoMatchFound] = useState(false);

  // Search logic handler
  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      
      const matches = DISTRIBUTORS_DB.filter(
        (d) =>
          d.state === selectedState &&
          d.city === selectedCity &&
          d.category === selectedCategory
      );

      if (matches.length > 0) {
        setActiveDistributors(matches);
        setNoMatchFound(false);
      } else {
        // Find matches in the selected state as nearest fallback
        const stateMatches = DISTRIBUTORS_DB.filter((d) => d.state === selectedState);
        if (stateMatches.length > 0) {
          setActiveDistributors(stateMatches);
        } else {
          // Absolute fallback
          setActiveDistributors([DISTRIBUTORS_DB[0]]);
        }
        setNoMatchFound(true);
      }

      setSearchQuery({
        category: selectedCategory,
        state: selectedState,
        city: selectedCity,
        pincode: pincodeInput || "482001",
      });
    }, 500);
  };

  // Location mock handler
  const handleLocate = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      setSelectedState("Madhya Pradesh");
      setSelectedCity("Jabalpur");
      setPincodeInput("482001");
      setSelectedCategory("Water Storage Tanks");
      
      // Default to Jabalpur water storage tank dealers
      const jabalpurMatches = DISTRIBUTORS_DB.filter(
        d => d.state === "Madhya Pradesh" && d.city === "Jabalpur" && d.category === "Water Storage Tanks"
      );
      setActiveDistributors(jabalpurMatches);
      setNoMatchFound(false);
      setSearchQuery({
        category: "Water Storage Tanks",
        state: "Madhya Pradesh",
        city: "Jabalpur",
        pincode: "482001",
      });
    }, 1000);
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

        .search-container-box {
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid var(--line);
          box-shadow: var(--sh-lg);
          padding: 6px;
          display: flex;
          align-items: center;
          width: 100%;
          margin-top: 40px;
          position: relative;
          z-index: 5;
        }

        .search-field-item {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 18px;
          border-right: 1px solid var(--line);
          min-width: 0;
        }

        .search-field-item:nth-of-type(4) {
          border-right: none;
        }

        .field-dropdown {
          border: none;
          background: transparent;
          outline: none;
          font-size: 15px;
          font-weight: 600;
          color: var(--ink);
          padding: 4px 16px 0 0;
          width: 100%;
          cursor: pointer;
          appearance: none;
        }

        .dropdown-wrapper {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
          position: relative;
        }

        .chevron-indicator {
          position: absolute;
          right: 0;
          bottom: 6px;
          font-size: 8px;
          color: var(--muted);
          pointer-events: none;
        }

        .or-divider-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 24px;
          width: 100%;
          position: relative;
          z-index: 2;
        }

        .or-line {
          height: 1px;
          background: rgba(255, 255, 255, 0.2);
          flex: 1;
          max-width: 180px;
        }

        .or-text {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          letter-spacing: 0.05em;
        }

        .locate-button-row {
          display: flex;
          justify-content: center;
          margin-top: 16px;
          position: relative;
          z-index: 2;
        }

        .locate-btn {
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 14.5px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          padding: 8px 16px;
          border-radius: 99px;
          transition: background 0.2s, opacity 0.2s;
        }

        .locate-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .results-section {
          background: #f6f8fc;
          padding: 80px 0;
        }

        .results-grid-layout {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 64px;
          align-items: start;
        }

        .distributors-list-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
        }

        .distributor-display-card {
          background: #ffffff;
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 36px;
          box-shadow: var(--sh-md);
          display: flex;
          align-items: center;
          gap: 32px;
          position: relative;
          overflow: hidden;
          transition: opacity 0.3s;
        }

        .distributor-store-avatar {
          width: 96px;
          height: 96px;
          border-radius: 12px;
          background: #f2f7ff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .distributor-info-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .distributor-cta-column {
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex-shrink: 0;
        }

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

          .search-container-box {
            flex-direction: column;
            padding: 16px;
            gap: 12px;
            margin-top: 32px;
          }

          .search-field-item {
            width: 100%;
            border-right: none;
            border-bottom: 1px solid var(--line-2);
            padding: 10px 4px 14px;
          }

          .search-field-item:nth-of-type(4) {
            border-bottom: none;
            padding-bottom: 0;
          }

          .search-container-box button {
            width: 100%;
            margin: 12px 0 0;
            height: 52px;
          }

          .results-grid-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .distributor-display-card {
            flex-direction: column;
            align-items: stretch;
            padding: 28px;
            gap: 24px;
          }

          .distributor-store-avatar {
            align-self: center;
          }

          .distributor-cta-column {
            flex-direction: row;
            width: 100%;
            gap: 16px;
          }

          .distributor-cta-column a {
            flex: 1;
            justify-content: center;
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

          {/* Search Card Container */}
          <div className="search-container-box">
            {/* Category Select */}
            <div className="search-field-item">
              <BoxIcon />
              <div className="dropdown-wrapper">
                <span style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 600 }}>Select Product Category</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="field-dropdown"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <span className="chevron-indicator">▼</span>
              </div>
            </div>

            {/* State Select */}
            <div className="search-field-item">
              <MapPinIcon />
              <div className="dropdown-wrapper">
                <span style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 600 }}>Select State</span>
                <select
                  value={selectedState}
                  onChange={(e) => {
                    const nextState = e.target.value;
                    setSelectedState(nextState);
                    const cities = STATES_AND_CITIES[nextState] || [];
                    if (cities.length > 0) {
                      setSelectedCity(cities[0]);
                    }
                  }}
                  className="field-dropdown"
                >
                  {Object.keys(STATES_AND_CITIES).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <span className="chevron-indicator">▼</span>
              </div>
            </div>

            {/* City Select */}
            <div className="search-field-item">
              <BuildingIcon />
              <div className="dropdown-wrapper">
                <span style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 600 }}>Select City</span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="field-dropdown"
                >
                  {(STATES_AND_CITIES[selectedState] || []).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <span className="chevron-indicator">▼</span>
              </div>
            </div>

            {/* Pincode Input */}
            <div className="search-field-item">
              <MapPinIcon size={20} />
              <div className="dropdown-wrapper">
                <span style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 600 }}>Enter Pincode</span>
                <input
                  type="text"
                  pattern="[0-9]*"
                  maxLength={6}
                  placeholder="Enter Pincode"
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                  style={{
                    border: "none",
                    background: "transparent",
                    outline: "none",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "var(--ink)",
                    padding: "4px 0 0",
                    width: "100%"
                  }}
                />
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              style={{
                background: "var(--blue-600)",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                padding: "0 28px",
                height: "56px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                fontWeight: "bold",
                fontSize: "14px",
                cursor: "pointer",
                margin: "4px",
                whiteSpace: "nowrap",
                transition: "background 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--blue-700)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "var(--blue-600)"}
            >
              <SearchIcon />
              FIND DISTRIBUTOR
            </button>
          </div>

          {/* Divider */}
          <div className="or-divider-row">
            <span className="or-line" />
            <span className="or-text">OR</span>
            <span className="or-line" />
          </div>

          {/* Current Location Button */}
          <div className="locate-button-row">
            <button className="locate-btn" onClick={handleLocate} disabled={isLocating}>
              {isLocating ? (
                <div className="spinner" style={{ width: "16px", height: "16px", borderWidth: "2px" }} />
              ) : (
                <MapPinIcon size={18} />
              )}
              {isLocating ? "Locating..." : "Use My Current Location"}
            </button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="results-section">
        <div className="container">
          <div className="results-grid-layout">
            
            {/* Left Column - Query Copy */}
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
                Nearest Distributor
              </span>
              <h2 style={{
                fontSize: "26px",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                color: "var(--ink)",
                lineHeight: 1.25,
                marginBottom: "16px"
              }}>
                Supremo Authorized Distributor
              </h2>
              <p style={{
                fontSize: "14px",
                color: "var(--slate)",
                lineHeight: 1.6
              }}>
                Showing results for <span style={{ color: "var(--blue-600)", fontWeight: "bold" }}>{searchQuery.category}</span> in <span style={{ color: "var(--blue-600)", fontWeight: "bold" }}>{searchQuery.city}</span>, <span style={{ color: "var(--blue-600)", fontWeight: "bold" }}>{searchQuery.state} - {searchQuery.pincode}</span>
              </p>
            </div>

            {/* Right Column - Results Card List */}
            <div className="distributors-list-container">
              
              {/* Dynamic Loading Overlay */}
              {(isSearching || isLocating) && (
                <div className="loader-overlay" style={{ borderRadius: "16px" }}>
                  <div className="spinner" />
                  <span>Searching Nearest Distributors...</span>
                </div>
              )}

              {/* Exact match vs Fallback warning message */}
              {noMatchFound && !isSearching && !isLocating && (
                <div style={{
                  background: "#FFFBEB",
                  border: "1px solid #FDE68A",
                  borderRadius: "8px",
                  padding: "10px 16px",
                  fontSize: "13.5px",
                  color: "#B45309",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 8
                }}>
                  ⚠️ No exact distributor matches in this location. Showing our primary state distributor instead.
                </div>
              )}

              {/* Render all matching distributors */}
              {activeDistributors.map((distributor, idx) => (
                <div className="distributor-display-card" key={idx}>
                  
                  {/* Store Icon Avatar */}
                  <div className="distributor-store-avatar">
                    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                      <div style={{
                        position: "absolute",
                        bottom: "-2px",
                        right: "-2px",
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        background: "var(--blue-600)",
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.15)"
                      }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Details with serif font for dealer name and outlines for icons */}
                  <div className="distributor-info-details">
                    <h3 style={{
                      fontSize: "23px",
                      fontFamily: '"IBM Plex Serif", Georgia, serif',
                      fontWeight: 700,
                      color: "var(--ink)",
                      margin: 0
                    }}>
                      {distributor.name}
                    </h3>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--slate)", fontSize: "14px" }}>
                      <MapPinIcon size={16} />
                      <span>{distributor.address}</span>
                    </div>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--slate)", fontSize: "14px" }}>
                      <PhoneIcon />
                      <span>{distributor.phone}</span>
                    </div>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--slate)", fontSize: "14px" }}>
                      <MailIcon />
                      <span>{distributor.email}</span>
                    </div>
                  </div>

                  {/* Actions (GET DIRECTIONS with outline paper-airplane, CALL NOW with solid color and no icon) */}
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
    </main>
  );
}
