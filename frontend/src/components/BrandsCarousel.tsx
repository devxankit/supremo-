"use client";

const brandImages = [
  "Screenshot 2026-05-30 181242.png",
  "Screenshot 2026-05-30 181329.png",
  "Screenshot 2026-05-30 181344.png",
  "Screenshot 2026-05-30 181417.png",
  "Screenshot 2026-05-30 181423.png",
  "Screenshot 2026-05-30 181454.png",
  "Screenshot 2026-05-30 181500.png",
  "Screenshot 2026-05-30 181510.png",
  "Screenshot 2026-05-30 181518.png",
  "Screenshot 2026-05-30 181524.png",
  "Screenshot 2026-05-30 181531.png",
  "Screenshot 2026-05-30 181539.png",
  "Screenshot 2026-05-30 181549.png",
  "Screenshot 2026-05-30 181600.png"
];

// Double the images to create a seamless infinite scroll loop
const doubleBrands = [...brandImages, ...brandImages];

export function BrandsCarousel() {
  return (
    <section style={{ background: "#ffffff", padding: "48px 0 48px", overflow: "hidden", position: "relative" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .brands-marquee-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          margin-top: 36px;
          display: flex;
          border-top: 1px solid var(--line-2);
          border-bottom: 1px solid var(--line-2);
          padding: 10px 0;
        }

        .brands-marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 38s linear infinite;
        }

        .brands-marquee-track:hover {
          animation-play-state: paused;
        }

        .brand-logo-item {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 220px;
          height: 100px;
          padding: 0 16px;
          border-right: 1px solid var(--line-2);
          flex-shrink: 0;
        }

        .brand-logo-item img {
          max-width: 150px;
          max-height: 52px;
          object-fit: contain;
          filter: grayscale(1);
          opacity: 0.62;
          transition: filter 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
        }

        /* Colour returns only on hover */
        .brand-logo-item:hover img {
          filter: grayscale(0);
          opacity: 1;
          transform: scale(1.06);
        }

        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-220px * ${brandImages.length}));
          }
        }
      `}} />

      <div className="container">
        <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
          Trusted by leading Indian manufacturers
        </h2>
        <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: 8, margin: "8px 0 0" }}>
          Trusted across 22 states.
        </p>
      </div>

      <div className="brands-marquee-container">
        {/* Shadow overlays on edges for smooth premium fade effect */}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 80, background: "linear-gradient(to right, #ffffff, transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 80, background: "linear-gradient(to left, #ffffff, transparent)", zIndex: 2, pointerEvents: "none" }} />

        <div className="brands-marquee-track">
          {doubleBrands.map((img, i) => (
            <div key={i} className="brand-logo-item">
              <img src={`/images/brands/${img}`} alt={`Brand Logo ${i}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
