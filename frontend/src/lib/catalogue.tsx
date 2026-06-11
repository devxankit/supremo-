import type { ReactNode } from "react";

export type IconType = "tank" | "pipe" | "box" | "plant";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  slug: string;
  category: string;
  name: string;
  tagline: string;
  capacity: string;
  description: string;
  badges: string[];
  features: string[];
  applications: string[];
  sizes: string[];
  colors: ProductColor[];
  specs: { label: string; value: string }[];
  /** Catalogue model number — currently used by the planters category filter. */
  modelNo?: string;
}

export interface Category {
  slug: string;
  label: string;
  eyebrow: string;
  blurb: string;
  icon: IconType;
}

export const categories: Category[] = [
  {
    slug: "water-tanks",
    label: "Water Tanks",
    eyebrow: "Water Storage",
    blurb:
      "Tri-layer roto-moulded tanks in food-grade LLDPE. Every batch is drop-tested, pressure-tested and UV-tested before dispatch.",
    icon: "tank",
  },
  {
    slug: "pipes-fittings",
    label: "Pipes & Fittings",
    eyebrow: "Piping Systems",
    blurb:
      "PVC, CPVC, HDPE and SWR pipes on dedicated extrusion lines — ISI-certified for residential, commercial and agricultural use.",
    icon: "pipe",
  },
  {
    slug: "cooler",
    label: "Cooler",
    eyebrow: "Air Cooling",
    blurb:
      "Blow-moulded air cooler bodies built for tough Indian summers — durable, rust-proof, and high-efficiency.",
    icon: "box",
  },
  {
    slug: "planters",
    label: "Planters",
    eyebrow: "Horticulture",
    blurb:
      "UV-stable, weather-resistant planters for homes, hotels, malls and commercial landscapes — standard and custom sizes.",
    icon: "plant",
  },
  {
    slug: "unbreakable-products",
    label: "Unbreakable products",
    eyebrow: "Durable Utilities",
    blurb:
      "Extremely robust and impact-resistant products designed to handle tough material handling and site work.",
    icon: "box",
  },
  {
    slug: "waste-management",
    label: "Waste Management",
    eyebrow: "Sanitation",
    blurb:
      "Durable, stackable segregation bins and waste containers for household and commercial cleanups.",
    icon: "box",
  },
  {
    slug: "toilet-seat",
    label: "Toilet Seat",
    eyebrow: "Bathroom Utilities",
    blurb:
      "Ergonomic, hygienic, and easy-to-install premium toilet seat covers.",
    icon: "box",
  },
];

export const products: Product[] = [
  // ─── Water Tanks ──────────────────────────────────────
  {
    slug: "triple-layer-overhead-tank",
    category: "water-tanks",
    name: "Triple Layer Overhead Tank",
    tagline: "Our best-selling tank — three layers of protection.",
    capacity: "200 L – 10,000 L",
    description:
      "The Supremo Triple Layer tank is roto-moulded with a UV-stabilised outer layer, a black middle barrier that blocks sunlight and algae, and an FDA food-grade inner layer. The result is water that stays cooler, cleaner and algae-free for years.",
    badges: ["ISI Marked", "Food-Grade", "UV Protected"],
    features: [
      "UV-stabilised outer layer",
      "Black middle barrier layer blocks algae",
      "FDA food-grade inner layer",
      "ISI IS 12701 certified",
      "10-year warranty",
    ],
    applications: ["Rooftop domestic storage", "Apartments & townships", "Schools & hospitals", "Commercial buildings"],
    sizes: ["200 L", "500 L", "1000 L", "2000 L", "5000 L", "10,000 L"],
    colors: [
      { name: "Charcoal", hex: "#0A1628" },
      { name: "Supremo Blue", hex: "#0E55BC" },
      { name: "Amber", hex: "#FFB020" },
      { name: "Green", hex: "#1FAE6A" },
    ],
    specs: [
      { label: "Layers", value: "3 (tri-layer)" },
      { label: "Material", value: "Food-grade LLDPE" },
      { label: "Standard", value: "IS 12701" },
      { label: "Warranty", value: "10 years" },
      { label: "Shape", value: "Vertical cylindrical" },
    ],
  },
  {
    slug: "single-layer-overhead-tank",
    category: "water-tanks",
    name: "Single Layer Overhead Tank",
    tagline: "Reliable, budget-friendly storage for every home.",
    capacity: "100 L – 5,000 L",
    description:
      "A dependable single-layer roto-moulded tank with uniform wall thickness and a leak-proof locking lid. Ideal for budget-conscious builds without compromising on BIS-certified quality.",
    badges: ["ISI Marked", "BIS Certified"],
    features: [
      "Uniform wall thickness",
      "Rust & corrosion proof",
      "Leak-proof lid with lock",
      "Ideal for budget builds",
    ],
    applications: ["Domestic rooftop storage", "Budget housing projects", "Rural water storage"],
    sizes: ["100 L", "300 L", "500 L", "1000 L", "2000 L", "5000 L"],
    colors: [
      { name: "Supremo Blue", hex: "#0E55BC" },
      { name: "Black", hex: "#0A1628" },
      { name: "Green", hex: "#1FAE6A" },
    ],
    specs: [
      { label: "Layers", value: "1 (single)" },
      { label: "Material", value: "LLDPE" },
      { label: "Standard", value: "IS 12701" },
      { label: "Warranty", value: "5 years" },
      { label: "Shape", value: "Vertical cylindrical" },
    ],
  },
  {
    slug: "loft-tank",
    category: "water-tanks",
    name: "Loft Tank",
    tagline: "Low-profile design that fits under any loft ceiling.",
    capacity: "100 L – 500 L",
    description:
      "A compact, low-height tank engineered to slide neatly into loft spaces and under ceilings. Made from food-grade LLDPE with high-density wall construction for a long service life.",
    badges: ["Food-Grade", "LLDPE"],
    features: [
      "Compact low-profile design",
      "Fits under loft ceilings",
      "Food-grade LLDPE material",
      "High-density wall construction",
    ],
    applications: ["Loft & attic storage", "Bathroom supply tanks", "Compact apartments"],
    sizes: ["100 L", "200 L", "300 L", "500 L"],
    colors: [
      { name: "Off-White", hex: "#E6F0FF" },
      { name: "Supremo Blue", hex: "#0E55BC" },
    ],
    specs: [
      { label: "Profile", value: "Low-height horizontal" },
      { label: "Material", value: "Food-grade LLDPE" },
      { label: "Standard", value: "IS 12701" },
      { label: "Warranty", value: "5 years" },
    ],
  },
  {
    slug: "underground-sump-tank",
    category: "water-tanks",
    name: "Underground Sump Tank",
    tagline: "Heavy-duty ribbed walls built to resist soil pressure.",
    capacity: "500 L – 25,000 L",
    description:
      "A roto-moulded underground sump with high-compression ribbed walls that withstand soil and water pressure. Comes with a manhole access cover and a UV-resistant black shell.",
    badges: ["Heavy Duty", "Roto-Moulded"],
    features: [
      "High-compression ribbed walls",
      "UV-resistant black shell",
      "Manhole access cover included",
      "Roto-moulded for strength",
    ],
    applications: ["Underground water storage", "Rainwater harvesting", "Borewell collection", "Commercial sumps"],
    sizes: ["500 L", "1000 L", "2000 L", "5000 L", "10,000 L", "25,000 L"],
    colors: [{ name: "Black", hex: "#0A1628" }],
    specs: [
      { label: "Install", value: "Underground" },
      { label: "Wall", value: "Ribbed high-compression" },
      { label: "Material", value: "Roto-moulded LLDPE" },
      { label: "Warranty", value: "10 years" },
    ],
  },

  // ─── Pipes & Fittings ─────────────────────────────────
  {
    slug: "pvc-pressure-pipes",
    category: "pipes-fittings",
    name: "PVC Pressure Pipes",
    tagline: "ISI-certified pressure pipes with a smooth high-flow bore.",
    capacity: "15 mm – 315 mm dia",
    description:
      "Supremo PVC pressure pipes are extruded to IS 4985 across five pressure classes. A smooth internal bore ensures high flow rates and low friction loss for water-supply applications.",
    badges: ["ISI IS 4985", "BIS Certified"],
    features: [
      "IS 4985 certified",
      "Class 1/2/3/4/5 pressure ratings",
      "Smooth bore for high flow",
      "UV stabilised",
    ],
    applications: ["Domestic water supply", "Borewell & pump lines", "Irrigation mains"],
    sizes: ["20 mm", "25 mm", "32 mm", "50 mm", "75 mm", "110 mm", "160 mm", "315 mm"],
    colors: [
      { name: "Grey", hex: "#A8B3C7" },
      { name: "Supremo Blue", hex: "#0E55BC" },
    ],
    specs: [
      { label: "Standard", value: "IS 4985" },
      { label: "Pressure", value: "Class 1–5" },
      { label: "Length", value: "3 m / 6 m" },
      { label: "Joint", value: "Solvent / rubber-ring" },
    ],
  },
  {
    slug: "cpvc-hot-cold-pipes",
    category: "pipes-fittings",
    name: "CPVC Hot & Cold Pipes",
    tagline: "Handles hot water up to 93°C — solar-ready.",
    capacity: "15 mm – 100 mm dia",
    description:
      "Chlorinated PVC pipes engineered for hot and cold plumbing. ASTM D2846 compliant and rated for continuous use up to 93°C, making them ideal for solar and geyser hot-water systems.",
    badges: ["CPVC", "Hot Water Safe"],
    features: [
      "Withstands up to 93°C",
      "Chlorinated PVC formulation",
      "ASTM D2846 compliant",
      "For solar & hot water systems",
    ],
    applications: ["Hot & cold plumbing", "Solar water heaters", "Geyser lines", "Commercial plumbing"],
    sizes: ["15 mm", "20 mm", "25 mm", "32 mm", "50 mm", "100 mm"],
    colors: [{ name: "Cream", hex: "#E6F0FF" }],
    specs: [
      { label: "Standard", value: "ASTM D2846" },
      { label: "Max temp", value: "93°C" },
      { label: "Series", value: "SDR 11" },
      { label: "Joint", value: "Solvent cement" },
    ],
  },
  {
    slug: "agriculture-hdpe-pipes",
    category: "pipes-fittings",
    name: "Agriculture HDPE Pipes",
    tagline: "Flexible PE 80/100 pipe for drip and farm irrigation.",
    capacity: "16 mm – 110 mm dia",
    description:
      "IS 4984 grade HDPE pipes that flex around field contours, with low pressure drop and UV-black stabilisation for long outdoor life — built for Indian agriculture.",
    badges: ["HDPE", "Agri Grade"],
    features: [
      "IS 4984 grade PE 80/100",
      "Flexible for drip irrigation",
      "Low pressure drop",
      "UV black stabilised",
    ],
    applications: ["Drip irrigation", "Sprinkler systems", "Farm water supply", "Borewell connections"],
    sizes: ["16 mm", "20 mm", "32 mm", "50 mm", "63 mm", "90 mm", "110 mm"],
    colors: [{ name: "Black", hex: "#0A1628" }],
    specs: [
      { label: "Standard", value: "IS 4984" },
      { label: "Grade", value: "PE 80 / PE 100" },
      { label: "Supply", value: "Coils & straight" },
      { label: "Joint", value: "Compression / weld" },
    ],
  },
  {
    slug: "swr-plumbing-pipes",
    category: "pipes-fittings",
    name: "SWR Plumbing Pipes",
    tagline: "Soil, waste & rainwater pipes with ring-fit joints.",
    capacity: "75 mm – 160 mm dia",
    description:
      "IS 13592 certified SWR pipes for soil, waste and rainwater drainage. Ring-fit rubber-seal joints make installation fast and leak-free, with high impact resistance.",
    badges: ["ISI IS 13592", "SWR"],
    features: [
      "Soil, waste & rain water",
      "IS 13592 certified",
      "Ring-fit rubber seal joints",
      "High impact resistance",
    ],
    applications: ["Building drainage", "Rainwater downpipes", "Waste & soil lines"],
    sizes: ["75 mm", "90 mm", "110 mm", "160 mm"],
    colors: [{ name: "Ivory", hex: "#E6F0FF" }],
    specs: [
      { label: "Standard", value: "IS 13592" },
      { label: "Type", value: "Type A / Type B" },
      { label: "Length", value: "3 m / 6 m" },
      { label: "Joint", value: "Ring-fit" },
    ],
  },

  // ─── Cooler, Unbreakable, Waste Management, Toilet Seat ───────────────────────
  {
    slug: "air-cooler-body",
    category: "cooler",
    name: "Air Cooler Body",
    tagline: "Blow-moulded ABS shell — OEM and white-label ready.",
    capacity: "20 L – 60 L",
    description:
      "A rust-proof, blow-moulded cooler body in durable ABS. Compact and lightweight, available for OEM and white-label supply to cooler manufacturers.",
    badges: ["Blow-Moulded"],
    features: [
      "Blow-moulded ABS shell",
      "Rust-proof construction",
      "Compact design",
      "OEM / white-label available",
    ],
    applications: ["Air cooler manufacturing", "OEM supply", "Replacement cooler bodies"],
    sizes: ["20 L", "35 L", "50 L", "60 L"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Grey", hex: "#A8B3C7" },
      { name: "Blue", hex: "#0E55BC" },
    ],
    specs: [
      { label: "Material", value: "ABS" },
      { label: "Process", value: "Blow moulding" },
      { label: "Supply", value: "OEM / white-label" },
    ],
  },
  {
    slug: "ghamela-tub",
    category: "unbreakable-products",
    name: "Ghamela (Tub)",
    tagline: "Virgin HDPE tub with an ergonomic grip rim.",
    capacity: "10 L – 40 L",
    description:
      "A flexible-yet-rigid construction tub made from virgin HDPE, with an ergonomic grip rim and high load capacity for daily site and household use.",
    badges: ["Virgin HDPE"],
    features: [
      "Virgin HDPE material",
      "Flexible yet rigid",
      "Ergonomic grip rim",
      "High load capacity",
    ],
    applications: ["Construction sites", "Household use", "Agriculture & gardening"],
    sizes: ["10 L", "18 L", "25 L", "40 L"],
    colors: [
      { name: "Black", hex: "#0A1628" },
      { name: "Red", hex: "#FFB020" },
      { name: "Green", hex: "#1FAE6A" },
    ],
    specs: [
      { label: "Material", value: "Virgin HDPE" },
      { label: "Rim", value: "Ergonomic grip" },
    ],
  },
  {
    slug: "milk-can",
    category: "cooler",
    name: "Milk Can",
    tagline: "Food-safe HDPE can with a wide, easy-clean mouth.",
    capacity: "5 L – 20 L",
    description:
      "BIS food-grade approved milk can in food-safe HDPE. A wide mouth makes cleaning effortless and the secure screw cap keeps contents sealed during transport.",
    badges: ["Food-Grade"],
    features: [
      "Food-safe HDPE",
      "Wide mouth for easy clean",
      "Secure screw cap",
      "BIS food-grade approved",
    ],
    applications: ["Milk collection & transport", "Dairy co-operatives", "Liquid food storage"],
    sizes: ["5 L", "10 L", "15 L", "20 L"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Blue", hex: "#0E55BC" },
    ],
    specs: [
      { label: "Material", value: "Food-grade HDPE" },
      { label: "Approval", value: "BIS food-grade" },
      { label: "Cap", value: "Screw cap" },
    ],
  },
  {
    slug: "wheel-barrow",
    category: "unbreakable-products",
    name: "Wheel Barrow",
    tagline: "One-piece HDPE tray on a heavy-duty steel frame.",
    capacity: "65 L tray",
    description:
      "A site-grade wheel barrow with a one-piece HDPE tray, heavy-duty steel frame and pneumatic tyre — rated for loads up to 150 kg.",
    badges: ["Heavy Duty"],
    features: [
      "One-piece HDPE tray",
      "Heavy-duty steel frame",
      "Pneumatic tyre",
      "Load capacity 150 kg",
    ],
    applications: ["Construction sites", "Landscaping", "Farm & nursery use"],
    sizes: ["65 L tray (standard)"],
    colors: [
      { name: "Blue", hex: "#0E55BC" },
      { name: "Amber", hex: "#FFB020" },
    ],
    specs: [
      { label: "Tray", value: "One-piece HDPE" },
      { label: "Frame", value: "Heavy-duty steel" },
      { label: "Load", value: "150 kg" },
      { label: "Tyre", value: "Pneumatic" },
    ],
  },
  {
    slug: "garbage-dust-bin",
    category: "waste-management",
    name: "Garbage / Dust Bin",
    tagline: "Stackable virgin-HDPE bins for home and commercial use.",
    capacity: "60 L – 240 L",
    description:
      "Durable virgin-HDPE bins available with pedal or swing lids in multiple colours. Stackable design saves storage space for dealers and bulk buyers.",
    badges: ["HDPE"],
    features: [
      "Virgin HDPE construction",
      "Pedal or swing lid",
      "Stackable design",
      "Available in multiple colours",
    ],
    applications: ["Municipal waste", "Commercial premises", "Household segregation bins"],
    sizes: ["60 L", "120 L", "240 L"],
    colors: [
      { name: "Green", hex: "#1FAE6A" },
      { name: "Blue", hex: "#0E55BC" },
      { name: "Charcoal", hex: "#0A1628" },
    ],
    specs: [
      { label: "Material", value: "Virgin HDPE" },
      { label: "Lid", value: "Pedal / swing" },
      { label: "Design", value: "Stackable" },
    ],
  },
  {
    slug: "premium-toilet-seat",
    category: "toilet-seat",
    name: "Premium Toilet Seat",
    tagline: "Ergonomic, slow-closing, and heavy-duty seat covers.",
    capacity: "Standard size",
    description:
      "Supremo toilet seats are manufactured with high-quality virgin polypropylene, featuring dual-nozzle compatibility, slow-closing hinges, and anti-bacterial surfaces for maximum hygiene and comfort.",
    badges: ["Soft-Close", "Anti-Bacterial", "Easy Clean"],
    features: [
      "Slow-closing premium hydraulic hinges",
      "Anti-bacterial coating",
      "Scratch-resistant virgin PP",
      "Universal fit closet compatibility",
    ],
    applications: ["Residential bathrooms", "Hotels & luxury suites", "Commercial washrooms"],
    sizes: ["Standard Closet Fit", "Elongated Closet Fit"],
    colors: [
      { name: "Off-White", hex: "#FFFFFF" },
      { name: "Cream", hex: "#E6F0FF" },
    ],
    specs: [
      { label: "Material", value: "Virgin Polypropylene" },
      { label: "Hinges", value: "Soft-Close Hydraulic" },
      { label: "Warranty", value: "2 years" },
    ],
  },

  // ─── Planters ─────────────────────────────────────────
  {
    slug: "decorative-indoor-planter",
    category: "planters",
    name: "Decorative Indoor Planter",
    modelNo: "SP-IND-101",
    tagline: "UV-stable indoor planters in four colour finishes.",
    capacity: "5 L – 30 L",
    description:
      "Lightweight yet durable indoor planters with a UV-stabilised colour finish and a drainage hole with plug. Available in four colours to suit any interior.",
    badges: ["UV Stable"],
    features: [
      "UV-stabilised colour finish",
      "Drainage hole with plug",
      "Lightweight yet durable",
      "Available in 4 colours",
    ],
    applications: ["Indoor décor", "Offices & lobbies", "Balcony gardens"],
    sizes: ["5 L", "10 L", "20 L", "30 L"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Charcoal", hex: "#0A1628" },
      { name: "Stone", hex: "#A8B3C7" },
      { name: "Green", hex: "#1FAE6A" },
    ],
    specs: [
      { label: "Use", value: "Indoor" },
      { label: "Finish", value: "Matte UV-stable" },
      { label: "Drainage", value: "Hole + plug" },
    ],
  },
  {
    slug: "garden-floor-planter",
    category: "planters",
    name: "Garden Floor Planter",
    modelNo: "SP-GRD-201",
    tagline: "Weather-proof outdoor planters with deep root space.",
    capacity: "20 L – 100 L",
    description:
      "A deep-root outdoor planter with a weather-proof shell and a textured terracotta look — built to handle sun, rain and temperature swings.",
    badges: ["Outdoor Safe"],
    features: [
      "Deep root-space design",
      "Weather-proof shell",
      "Textured terracotta look",
      "Suitable for outdoor use",
    ],
    applications: ["Garden landscaping", "Terraces & patios", "Pathway planting"],
    sizes: ["20 L", "40 L", "60 L", "100 L"],
    colors: [
      { name: "Terracotta", hex: "#FFB020" },
      { name: "Stone", hex: "#A8B3C7" },
      { name: "Charcoal", hex: "#0A1628" },
    ],
    specs: [
      { label: "Use", value: "Outdoor" },
      { label: "Finish", value: "Textured terracotta" },
      { label: "Shell", value: "Weather-proof" },
    ],
  },
  {
    slug: "commercial-planter",
    category: "planters",
    name: "Commercial Planter (Large)",
    modelNo: "SP-COM-301",
    tagline: "Roto-moulded large-format planters for B2B projects.",
    capacity: "100 L – 500 L",
    description:
      "Large roto-moulded planters built for malls, hotels and commercial landscapes. Custom branding and a high-gloss finish option are available for project orders.",
    badges: ["Roto-Moulded", "B2B"],
    features: [
      "Roto-moulded for strength",
      "Ideal for malls & hotels",
      "Custom branding available",
      "High-gloss finish option",
    ],
    applications: ["Malls & hotels", "Corporate landscapes", "Public spaces", "Project landscaping"],
    sizes: ["100 L", "200 L", "350 L", "500 L"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Charcoal", hex: "#0A1628" },
      { name: "Supremo Blue", hex: "#0E55BC" },
    ],
    specs: [
      { label: "Use", value: "Commercial outdoor" },
      { label: "Process", value: "Roto-moulded" },
      { label: "Branding", value: "Custom available" },
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug);
}

export function getProduct(category: string, slug: string): Product | undefined {
  return products.find((p) => p.category === category && p.slug === slug);
}

export function getRelated(product: Product): Product[] {
  return products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);
}

export function ProductIcon({ type, size = 88 }: { type: IconType; size?: number }): ReactNode {
  const h = Math.round(size * 0.82);
  if (type === "tank") {
    return (
      <svg viewBox="0 0 120 100" width={size} height={h} fill="none">
        <ellipse cx="60" cy="18" rx="42" ry="8" fill="#C5DAFB" />
        <path d="M18 18 Q20 88 60 90 Q100 88 102 18" fill="#E6F0FF" stroke="#1466E6" strokeWidth="2" />
        <ellipse cx="60" cy="18" rx="42" ry="8" fill="#6BA1FF" opacity=".6" />
        <rect x="54" y="4" width="12" height="14" rx="3" fill="#0E55BC" />
      </svg>
    );
  }
  if (type === "pipe") {
    return (
      <svg viewBox="0 0 120 80" width={size} height={Math.round(size * 0.55)} fill="none">
        <rect x="10" y="30" width="100" height="20" rx="10" fill="#C5DAFB" stroke="#1466E6" strokeWidth="2" />
        <rect x="10" y="33" width="100" height="8" rx="4" fill="#6BA1FF" opacity=".5" />
        <rect x="8" y="26" width="16" height="28" rx="4" fill="#0E55BC" />
        <rect x="96" y="26" width="16" height="28" rx="4" fill="#0E55BC" />
      </svg>
    );
  }
  if (type === "plant") {
    return (
      <svg viewBox="0 0 120 100" width={size} height={h} fill="none">
        <path d="M30 85 Q40 55 60 40 Q80 55 90 85" fill="#E6F0FF" stroke="#1466E6" strokeWidth="2" />
        <line x1="60" y1="40" x2="60" y2="86" stroke="#6BA1FF" strokeWidth="2" />
        <ellipse cx="60" cy="88" rx="30" ry="6" fill="#C5DAFB" />
        <circle cx="60" cy="28" r="14" fill="#6BA1FF" opacity=".4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 100" width={size} height={h} fill="none">
      <rect x="20" y="30" width="80" height="60" rx="8" fill="#E6F0FF" stroke="#1466E6" strokeWidth="2" />
      <path d="M20 45 L60 55 L100 45" stroke="#6BA1FF" strokeWidth="2" fill="none" />
      <rect x="48" y="30" width="24" height="16" rx="4" fill="#C5DAFB" />
    </svg>
  );
}
