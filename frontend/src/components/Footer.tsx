import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL, EMAIL, CATALOGUE_URL } from "@/lib/site";

const links = [
  {
    title: "Products",
    items: [
      { label: "Water Tanks", href: "/products?category=water-tanks" },
      { label: "Pipes & Fittings", href: "/products?category=pipes-fittings" },
      { label: "Cooler", href: "/products?category=cooler" },
      { label: "Planters", href: "/products?category=planters" },
      { label: "Unbreakable products", href: "/products?category=unbreakable-products" },
      { label: "Waste Management", href: "/products?category=waste-management" },
      { label: "Toilet Seat", href: "/products?category=toilet-seat" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Gallery", href: "/gallery" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "For Partners",
    items: [
      { label: "Become a Dealer", href: "/dealership" },
      { label: "Bulk Orders", href: "/contact" },
      { label: "Tenders & Projects", href: "/contact" },
      { label: "Download Catalogue", href: CATALOGUE_URL },
    ],
  },
  {
    title: "Contact",
    items: [
      { label: PHONE_DISPLAY, href: `tel:${PHONE_TEL}` },
      { label: EMAIL, href: `mailto:${EMAIL}` },
      { label: "Head Office, Indore", href: "/contact" },
      { label: "WhatsApp", href: WHATSAPP_URL },
    ],
  },
];

export function Footer() {
  return (
    <footer style={{ background: "var(--ink)", color: "rgba(255,255,255,.7)", padding: "40px 0 32px" }}>
      <div className="container">
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr repeat(4,1fr)",
            gap: 48,
            paddingBottom: 56,
            borderBottom: "1px solid rgba(255,255,255,.1)",
          }}
        >
          {/* Brand column */}
          <div className="footer-brand">
            <a href="/" style={{ display: "flex", alignItems: "center", gap: 12, color: "#fff" }}>
              <div style={{ width: 36, height: 36, display: "grid", placeItems: "center", background: "rgba(255,255,255,.12)", borderRadius: 8 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L4 7v8c0 5 8 7 8 7s8-2 8-7V7l-8-5z" fill="#0E55BC" />
                  <path d="M8 12c0-2 2-3 4-3s4 1 4 3-2 4-4 4-4-2-4-4z" fill="#fff" />
                </svg>
              </div>
              <div>
                <b style={{ fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: "-0.02em", fontWeight: 700, color: "#fff", display: "block" }}>SUPREMO</b>
                <small style={{ fontSize: 9, letterSpacing: "0.32em", opacity: 0.5, fontWeight: 600 }}>BUILT TO HOLD</small>
              </div>
            </a>
            <p style={{ fontSize: 15, lineHeight: 1.7, marginTop: 20, maxWidth: "38ch" }}>
              Manufacturer of premium water tanks, PVC pipes, planters and commercial plastic products. Pan-India dealer network, four ISO-certified plants.
            </p>
            {/* Only real, working links — LinkedIn/Instagram removed until real
                handles are available (broken links read as unfinished). */}
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={{ width: 38, height: 38, display: "grid", placeItems: "center", border: "1px solid rgba(255,255,255,.2)", borderRadius: 999, color: "rgba(255,255,255,.8)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.8-.9-2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8 8 0 01-2.3-1.4 9 9 0 01-1.6-2c-.2-.3 0-.4.1-.5l.4-.5a2 2 0 00.3-.5.4.4 0 000-.4 18 18 0 01-.8-2c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 2.9 2.9 0 00-.9 2.2c0 1.3 1 2.5 1 2.7s1.8 2.8 4.4 3.9c1.7.7 2.3.7 3.1.6.5 0 1.5-.6 1.7-1.2a2 2 0 00.2-1.2c-.1 0-.3-.1-.6-.3zM12 2a10 10 0 00-10 10 9.9 9.9 0 001.3 5L2 22l5.2-1.4a10 10 0 0014.8-8.6A10 10 0 0012 2z" /></svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {links.map((col) => (
            <div key={col.title}>
              <h5 style={{ color: "#fff", fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 18, fontWeight: 600 }}>
                {col.title}
              </h5>
              <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {col.items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} style={{ color: "rgba(255,255,255,.65)", fontSize: 14.5, transition: "color .15s" }}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mob-col mob-gap-sm"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 28,
            fontSize: 13,
            color: "rgba(255,255,255,.5)",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <span>© 2026 Supremo Industries Pvt. Ltd. All rights reserved.</span>
          <div style={{ display: "flex", gap: 28 }}>
            {[
              { label: "Privacy", href: "/terms" },
              { label: "Terms", href: "/terms" },
              { label: "Returns & Warranty", href: "/contact" },
            ].map((l) => (
              <a key={l.label} href={l.href} style={{ color: "rgba(255,255,255,.5)" }}>{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
