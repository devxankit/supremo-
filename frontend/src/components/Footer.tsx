const links = [
  {
    title: "Products",
    items: [
      { label: "Water Tanks", href: "/products?category=water-tanks" },
      { label: "Pipes & Fittings", href: "/products?category=pipes-fittings" },
      { label: "Utility Accessories", href: "/products?category=accessories" },
      { label: "Planters", href: "/products?category=planters" },
      { label: "Commercial Plastic", href: "/products" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Manufacturing", href: "/manufacturing" },
      { label: "Gallery", href: "/gallery" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "For Partners",
    items: [
      { label: "Become a Dealer", href: "/dealership" },
      { label: "Bulk Orders", href: "/contact" },
      { label: "Tenders & Projects", href: "/contact" },
      { label: "Download Catalogue", href: "/catalogue.pdf" },
    ],
  },
  {
    title: "Contact",
    items: [
      { label: "+91 95 678 12 345", href: "tel:+919567812345" },
      { label: "supremoindore@gmail.com", href: "mailto:supremoindore@gmail.com" },
      { label: "Head Office, Indore", href: "/contact" },
      { label: "WhatsApp", href: "https://wa.me/919567812345" },
    ],
  },
];

export function Footer() {
  return (
    <footer style={{ background: "var(--ink)", color: "rgba(255,255,255,.7)", padding: "80px 0 32px" }}>
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
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              {[
                { label: "LinkedIn", path: "M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  style={{ width: 38, height: 38, display: "grid", placeItems: "center", border: "1px solid rgba(255,255,255,.2)", borderRadius: 999, color: "rgba(255,255,255,.8)", transition: "background .2s, border-color .2s" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d={s.path} /></svg>
                </a>
              ))}
              <a href="#" aria-label="Instagram" style={{ width: 38, height: 38, display: "grid", placeItems: "center", border: "1px solid rgba(255,255,255,.2)", borderRadius: 999, color: "rgba(255,255,255,.8)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.4a4 4 0 11-7.9 1.2 4 4 0 017.9-1.2z" /><circle cx="17.5" cy="6.5" r=".5" fill="currentColor" /></svg>
              </a>
              <a href="#" aria-label="WhatsApp" style={{ width: 38, height: 38, display: "grid", placeItems: "center", border: "1px solid rgba(255,255,255,.2)", borderRadius: 999, color: "rgba(255,255,255,.8)" }}>
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
            {["Privacy", "Terms", "Returns & Warranty"].map((l) => (
              <a key={l} href="#" style={{ color: "rgba(255,255,255,.5)" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
