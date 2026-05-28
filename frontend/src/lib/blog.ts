export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  body: BlogBlock[];
  image: string;
}

export const blogCategories = [
  "All",
  "Buying Guides",
  "Maintenance",
  "Agriculture",
  "Gardening",
];

export const blogPosts: BlogPost[] = [
  {
    slug: "water-tank-buying-guide",
    title: "Water Tank Buying Guide: How to Choose the Right Tank in 2026",
    excerpt:
      "Triple-layer or single-layer? Overhead or underground? A practical guide to picking the right water tank for your home or project.",
    category: "Buying Guides",
    date: "2026-05-10",
    readTime: "6 min read",
    author: "Supremo Editorial",
    image: "/images/overhead_tank.png",
    body: [
      { type: "p", text: "Choosing a water tank is a long-term decision — a good tank lasts a decade or more. This guide walks through the four factors that matter most: capacity, layers, placement and certification." },
      { type: "h2", text: "1. Work out the right capacity" },
      { type: "p", text: "A common rule of thumb in India is 100–150 litres of storage per person per day. For a family of four, a 500–1000 litre overhead tank is usually sufficient for daily use, with a larger sump tank as backup." },
      { type: "h2", text: "2. Single layer vs triple layer" },
      { type: "p", text: "Triple-layer tanks have a UV-stabilised outer layer, a black middle layer that blocks sunlight, and a food-grade inner layer. The black layer prevents algae growth and keeps water cooler — worth the small premium for rooftop tanks exposed to direct sun." },
      { type: "ul", items: [
        "Single layer — budget-friendly, best for shaded or indoor placement",
        "Triple layer — algae resistance and cooler water, ideal for rooftop tanks",
        "Underground sump — ribbed walls for soil pressure, large backup storage",
      ] },
      { type: "h2", text: "3. Always check certification" },
      { type: "p", text: "Look for the ISI mark against IS 12701 for water tanks. Certified tanks are tested for wall thickness, drop resistance and UV ageing — uncertified tanks often skip these checks." },
      { type: "p", text: "Every Supremo tank is ISI-certified and drop-, pressure- and UV-tested on 100% of production before dispatch." },
    ],
  },
  {
    slug: "pvc-pipe-maintenance-tips",
    title: "PVC Pipe Maintenance: 7 Tips to Prevent Leaks and Extend Life",
    excerpt:
      "Simple, low-cost habits that keep your PVC and CPVC plumbing leak-free for years — from joint care to seasonal checks.",
    category: "Maintenance",
    date: "2026-04-28",
    readTime: "5 min read",
    author: "Supremo Editorial",
    image: "/images/plumbing_pipes.png",
    body: [
      { type: "p", text: "PVC and CPVC pipes are low-maintenance by design, but a few simple habits dramatically extend their service life and prevent costly leaks." },
      { type: "h2", text: "Get the joints right" },
      { type: "p", text: "Most pipe failures happen at joints, not along the pipe. Use the correct solvent cement, apply it evenly, and hold the joint for the recommended set time before releasing." },
      { type: "ul", items: [
        "Clean and dry pipe ends before applying solvent cement",
        "Use CPVC cement for CPVC — never substitute PVC cement",
        "Avoid over-tightening threaded fittings, which can crack them",
        "Insulate exposed pipes from direct sunlight where possible",
        "Check for damp patches on walls and ceilings seasonally",
        "Drain outdoor lines before extreme cold to prevent stress cracks",
        "Replace any fitting that shows hairline cracks immediately",
      ] },
      { type: "h2", text: "Seasonal checks" },
      { type: "p", text: "Twice a year, walk the visible plumbing and look for discoloration, damp patches or reduced flow. Catching a slow leak early is far cheaper than repairing water damage later." },
    ],
  },
  {
    slug: "clean-water-storage-tips",
    title: "5 Water Storage Tips for Cleaner, Safer Drinking Water",
    excerpt:
      "How to keep stored water safe — from tank cleaning frequency to lid hygiene and avoiding algae growth.",
    category: "Maintenance",
    date: "2026-04-12",
    readTime: "4 min read",
    author: "Supremo Editorial",
    image: "/images/tank_sump.png",
    body: [
      { type: "p", text: "Stored water is only as clean as the tank that holds it. These five habits keep your storage safe for drinking and daily use." },
      { type: "h2", text: "1. Clean your tank twice a year" },
      { type: "p", text: "Sediment and biofilm build up over time. A thorough clean every six months keeps water fresh and prevents odour." },
      { type: "h2", text: "2. Keep the lid sealed" },
      { type: "p", text: "A loose or missing lid lets in dust, insects and sunlight. A tight-fitting, lockable lid is the single most effective hygiene measure." },
      { type: "ul", items: [
        "Use a triple-layer tank to block sunlight and prevent algae",
        "Position overhead tanks away from direct, all-day sun where possible",
        "Flush the tank fully if water has been unused for several weeks",
        "Check inlet and overflow screens for blockages",
      ] },
      { type: "h2", text: "Why the black layer matters" },
      { type: "p", text: "Algae needs sunlight to grow. The black middle layer in a triple-layer tank blocks light from reaching the water, stopping algae before it starts." },
    ],
  },
  {
    slug: "agriculture-irrigation-solutions",
    title: "Agriculture Irrigation Solutions: Drip vs Sprinkler vs Flood",
    excerpt:
      "A clear comparison of irrigation methods and how the right HDPE piping can cut water use while improving yield.",
    category: "Agriculture",
    date: "2026-03-30",
    readTime: "7 min read",
    author: "Supremo Editorial",
    image: "/images/pipe_hdpe.png",
    body: [
      { type: "p", text: "Water efficiency is now central to profitable farming. Choosing the right irrigation method — and the right piping to support it — can cut water use by half." },
      { type: "h2", text: "Drip irrigation" },
      { type: "p", text: "Drip delivers water directly to the root zone through a network of flexible HDPE pipes and emitters. It is the most water-efficient method and works well for row crops, orchards and vegetables." },
      { type: "h2", text: "Sprinkler irrigation" },
      { type: "p", text: "Sprinkler systems suit field crops and uneven terrain. They use more water than drip but cover large areas quickly." },
      { type: "h2", text: "Flood irrigation" },
      { type: "p", text: "The traditional method — simple but the least efficient, with significant losses to evaporation and runoff." },
      { type: "ul", items: [
        "Drip — highest efficiency, best for orchards and vegetables",
        "Sprinkler — good area coverage, suits field crops",
        "Flood — lowest cost to set up, highest water loss",
      ] },
      { type: "h2", text: "The role of HDPE piping" },
      { type: "p", text: "Flexible PE 80/100 HDPE pipe is the backbone of modern drip and sprinkler systems. It flexes around field contours, resists UV degradation and has low pressure drop — keeping water moving efficiently from source to crop." },
    ],
  },
  {
    slug: "planter-trends-2026",
    title: "Gardening & Planter Trends to Watch in 2026",
    excerpt:
      "From large-format commercial planters to UV-stable finishes — the planter trends shaping homes and landscapes this year.",
    category: "Gardening",
    date: "2026-03-15",
    readTime: "5 min read",
    author: "Supremo Editorial",
    image: "/images/terrazzo_planter.png",
    body: [
      { type: "p", text: "Planters have moved from afterthought to design feature. Here are the trends shaping gardens, balconies and commercial landscapes in 2026." },
      { type: "h2", text: "Large-format statement planters" },
      { type: "p", text: "Oversized roto-moulded planters are appearing in malls, hotels and corporate lobbies — used to define space and bring greenery indoors at scale." },
      { type: "h2", text: "Matte, textured finishes" },
      { type: "p", text: "Glossy plastic looks dated. Matte finishes with a textured terracotta or stone appearance are now preferred for both indoor and outdoor planters." },
      { type: "ul", items: [
        "UV-stable colour finishes that don't fade outdoors",
        "Deep root-space designs for healthier plants",
        "Neutral palettes — stone, charcoal, off-white",
        "Custom-branded planters for commercial spaces",
      ] },
      { type: "h2", text: "Durability still wins" },
      { type: "p", text: "Whatever the style, weather resistance and UV stability remain the features that decide whether a planter lasts one season or ten." },
    ],
  },
  {
    slug: "isi-certification-explained",
    title: "ISI Certification Explained: What the Mark Really Means",
    excerpt:
      "What the ISI mark guarantees on water tanks and pipes — and why buying certified products protects you.",
    category: "Buying Guides",
    date: "2026-02-26",
    readTime: "4 min read",
    author: "Supremo Editorial",
    image: "/images/6 Layers Gold.png",
    body: [
      { type: "p", text: "The ISI mark is one of India's most recognised quality symbols — but many buyers aren't sure what it actually guarantees." },
      { type: "h2", text: "What ISI certification covers" },
      { type: "p", text: "An ISI mark means the product has been tested against a specific Bureau of Indian Standards (BIS) specification and that the factory's quality system has been audited." },
      { type: "ul", items: [
        "IS 12701 — covers roto-moulded water storage tanks",
        "IS 4985 — covers UPVC pressure pipes",
        "IS 13592 — covers SWR drainage pipes",
      ] },
      { type: "h2", text: "Why it matters for you" },
      { type: "p", text: "Certified products are tested for wall thickness, pressure resistance and UV ageing. Uncertified products often skip these checks to cut cost — leaving you with thin walls, early failure and no recourse." },
      { type: "p", text: "Every Supremo water tank and pipe carries the relevant ISI mark, printed with batch number and manufacturing date for full traceability." },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(post: BlogPost): BlogPost[] {
  return blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
