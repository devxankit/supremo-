export const metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions governing the use of Supremo water storage and plumbing products and website services.",
};

export default function TermsPage() {
  return (
    <main>
      {/* Hero Header */}
      <section
        style={{
          position: "relative",
          background: "linear-gradient(135deg, var(--blue-900) 0%, var(--blue-800) 50%, var(--ink) 100%)",
          paddingTop: "calc(var(--nav-h) + 48px)",
          paddingBottom: "64px",
          color: "#fff",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="container" style={{ position: "relative" }}>
          <span className="eyebrow eyebrow-light">Legal &amp; Policies</span>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              marginTop: 12,
              fontWeight: 700,
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.02em",
            }}
          >
            Terms &amp; Conditions
          </h1>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: 16, marginTop: 12, maxWidth: "60ch", lineHeight: 1.6 }}>
            Please read these terms and conditions carefully before using our website or submitting any inquiry forms.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: "80px 0", background: "var(--paper)" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, color: "var(--ink)", fontFamily: "var(--font-display)" }}>
                1. Agreement to Terms
              </h2>
              <p style={{ color: "var(--slate)", lineHeight: 1.7, fontSize: 15 }}>
                By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use Supremo&apos;s website or services if you do not agree to all of the terms and conditions stated on this page.
              </p>
            </div>
            
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, color: "var(--ink)", fontFamily: "var(--font-display)" }}>
                2. Privacy Policy &amp; Data Submission
              </h2>
              <p style={{ color: "var(--slate)", lineHeight: 1.7, fontSize: 15 }}>
                Any information submitted through our inquiry or consultation forms is handled in accordance with our Privacy Policy. By providing your contact details (Name, Contact Number, Zip Code, City), you authorize Supremo and our regional sales team to contact you regarding our products, dealership, or consultation inquiries.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, color: "var(--ink)", fontFamily: "var(--font-display)" }}>
                3. Intellectual Property Rights
              </h2>
              <p style={{ color: "var(--slate)", lineHeight: 1.7, fontSize: 15 }}>
                Unless otherwise stated, Supremo and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may view and/or print pages from the website for your own personal use subject to restrictions set in these terms and conditions.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, color: "var(--ink)", fontFamily: "var(--font-display)" }}>
                4. Limitation of Liability
              </h2>
              <p style={{ color: "var(--slate)", lineHeight: 1.7, fontSize: 15 }}>
                In no event shall Supremo, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website, whether such liability is under contract. Supremo shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, color: "var(--ink)", fontFamily: "var(--font-display)" }}>
                5. Governing Law
              </h2>
              <p style={{ color: "var(--slate)", lineHeight: 1.7, fontSize: 15 }}>
                These terms will be governed by and interpreted in accordance with the laws of India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in India for the resolution of any disputes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
