import { CATALOGUE_URL } from "@/lib/site";

export async function Footer() {
  let footerAboutText = "";
  let phone = "";
  let email = "";
  let address = "";
  
  let socialFacebook = "";
  let socialInstagram = "";
  let socialLinkedin = "";
  let socialYoutube = "";
  
  let showFacebook = false;
  let showInstagram = false;
  let showLinkedin = false;
  let showYoutube = false;
  
  let copyright = "";
  let catalogueLink = CATALOGUE_URL;
  let categoryItems = [
    { label: "Water Tanks", href: "/products?category=water-tanks" },
    { label: "Pipes & Fittings", href: "/products?category=pipes-fittings" },
    { label: "Cooler", href: "/products?category=cooler" },
    { label: "Planters", href: "/products?category=planters" },
    { label: "Unbreakable products", href: "/products?category=unbreakable-products" },
    { label: "Waste Management", href: "/products?category=waste-management" },
    { label: "Toilet Seat", href: "/products?category=toilet-seat" },
  ];

  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
    const [settingsRes, heroRes, categoriesRes] = await Promise.all([
      fetch(`${apiBase}/settings`, { cache: "no-store" }),
      fetch(`${apiBase}/hero`, { cache: "no-store" }),
      fetch(`${apiBase}/categories`, { cache: "no-store" }),
    ]);

    if (settingsRes.ok) {
      const settings = await settingsRes.json();
      if (settings?.footerAboutText) footerAboutText = settings.footerAboutText;
      if (settings?.contactPhone) phone = settings.contactPhone;
      if (settings?.contactEmail) email = settings.contactEmail;
      if (settings?.contactAddress) address = settings.contactAddress;
      
      if (settings?.socialFacebook !== undefined) socialFacebook = settings.socialFacebook;
      if (settings?.socialInstagram !== undefined) socialInstagram = settings.socialInstagram;
      if (settings?.socialLinkedin !== undefined) socialLinkedin = settings.socialLinkedin;
      if (settings?.socialYoutube !== undefined) socialYoutube = settings.socialYoutube;
      
      if (settings?.socialFacebookVisible !== undefined) showFacebook = settings.socialFacebookVisible;
      if (settings?.socialInstagramVisible !== undefined) showInstagram = settings.socialInstagramVisible;
      if (settings?.socialLinkedinVisible !== undefined) showLinkedin = settings.socialLinkedinVisible;
      if (settings?.socialYoutubeVisible !== undefined) showYoutube = settings.socialYoutubeVisible;
      
      if (settings?.footerCopyright) copyright = settings.footerCopyright;
    }

    if (heroRes.ok) {
      const hero = await heroRes.json();
      if (hero?.secondaryLink && hero.secondaryLink !== "javascript:void(0)" && hero.secondaryLink !== "/") {
        catalogueLink = hero.secondaryLink;
      }
    }

    if (categoriesRes.ok) {
      const categories = await categoriesRes.json();
      if (Array.isArray(categories) && categories.length > 0) {
        categoryItems = categories.slice(0, 7).map((c: any) => ({
          label: c.name,
          href: `/products?category=${c.slug}`
        }));
      }
    }
  } catch (error) {
    console.error("Error loading footer settings/categories:", error);
  }

  const dynamicLinks = [
    {
      title: "Products",
      items: categoryItems,
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
        { label: "Download Catalogue", href: catalogueLink },
      ],
    },
    {
      title: "Contact",
      items: [
        phone ? { label: phone, href: `tel:${phone.replace(/\s+/g, "")}` } : null,
        email ? { label: email, href: `mailto:${email}` } : null,
        address ? { label: address, href: "/contact" } : null,
      ].filter(Boolean) as { label: string; href: string }[],
    },
  ];

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
            {footerAboutText && (
              <p style={{ fontSize: 15, lineHeight: 1.7, marginTop: 20, maxWidth: "38ch" }}>
                {footerAboutText}
              </p>
            )}
            {/* Social Links */}
            {(showFacebook || showInstagram || showLinkedin || showYoutube) && (
              <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                {showFacebook && socialFacebook && (
                  <a href={socialFacebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ width: 38, height: 38, display: "grid", placeItems: "center", border: "1px solid rgba(255,255,255,.2)", borderRadius: 999, color: "rgba(255,255,255,.8)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                  </a>
                )}
                {showInstagram && socialInstagram && (
                  <a href={socialInstagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ width: 38, height: 38, display: "grid", placeItems: "center", border: "1px solid rgba(255,255,255,.2)", borderRadius: 999, color: "rgba(255,255,255,.8)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                  </a>
                )}
                {showLinkedin && socialLinkedin && (
                  <a href={socialLinkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ width: 38, height: 38, display: "grid", placeItems: "center", border: "1px solid rgba(255,255,255,.2)", borderRadius: 999, color: "rgba(255,255,255,.8)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                )}
                {showYoutube && socialYoutube && (
                  <a href={socialYoutube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={{ width: 38, height: 38, display: "grid", placeItems: "center", border: "1px solid rgba(255,255,255,.2)", borderRadius: 999, color: "rgba(255,255,255,.8)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.528 3.545 12 3.545 12 3.545s-7.528 0-9.388.51a3.003 3.003 0 0 0-2.11 2.108C0 8.022 0 12 0 12s0 3.978.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.86.51 9.388.51 9.388.51s7.528 0 9.388-.51a3.003 3.003 0 0 0 2.11-2.108C24 15.978 24 12 24 12s0-3.978-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Link columns */}
          {dynamicLinks.map((col) => (
            <div key={col.title}>
              <h5 style={{ color: "#fff", fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 18, fontWeight: 600 }}>
                {col.title}
              </h5>
              <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {col.items.map((item) => {
                  const isDownload = item.label === "Download Catalogue";
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        download={isDownload ? "Supremo_Catalogue.pdf" : undefined}
                        target={isDownload ? "_blank" : undefined}
                        rel={isDownload ? "noopener noreferrer" : undefined}
                        style={{ color: "rgba(255,255,255,.65)", fontSize: 14.5, transition: "color .15s" }}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
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
          {copyright && <span>{copyright}</span>}
          <div style={{ display: "flex", gap: 28 }}>
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "Returns & Warranty", href: "/warranty" },
            ].map((l) => (
              <a key={l.label} href={l.href} style={{ color: "rgba(255,255,255,.5)" }}>{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
