import type { Metadata } from "next";
import { GalleryGrid } from "./_components/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery & Media",
  description:
    "Factory images, product shoots, exhibitions and dealer meets from Supremo India — a look inside our manufacturing and dealer network.",
};

const videos = [
  { title: "Inside the Indore Rotomoulding Plant", duration: "3:42", image: "/images/cat_tanks.png" },
  { title: "How a Triple Layer Tank is Made", duration: "2:18", image: "/images/overhead_tank.png" },
  { title: "Supremo Dealer Success Stories", duration: "4:05", image: "/images/image 1.png" },
];

export default function GalleryPage() {
  return (
    <main>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          background: "linear-gradient(135deg, var(--blue-900) 0%, var(--blue-800) 50%, var(--ink) 100%)",
          minHeight: 320,
          display: "flex",
          alignItems: "center",
          paddingTop: 62,
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
        <div
          className="container"
          style={{ position: "relative", paddingTop: "clamp(40px,5vw,64px)", paddingBottom: "clamp(40px,5vw,64px)" }}
        >
          <span className="eyebrow eyebrow-light">Gallery & Media</span>
          <h1 style={{ color: "#fff", fontSize: "clamp(34px,5vw,60px)", lineHeight: 1.1, marginTop: 16 }}>
            A look inside Supremo
          </h1>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: 17, marginTop: 16, maxWidth: "52ch" }}>
            Our plants, our products and the dealer network that carries them across India.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <GalleryGrid />
        </div>
      </section>

      {/* Videos */}
      <section style={{ background: "var(--paper-2)" }}>
        {/* Inject style for video cards */}
        <style dangerouslySetInnerHTML={{ __html: `
          .video-card {
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            cursor: pointer;
          }
          .video-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 24px -8px rgba(10, 22, 40, 0.12);
            border-color: rgba(14, 85, 188, 0.15) !important;
          }
          .video-card:hover .video-thumb {
            transform: scale(1.06);
          }
          .video-card:hover .video-play-btn {
            transform: scale(1.1);
            background: #fff !important;
            box-shadow: 0 6px 20px rgba(14, 85, 188, 0.25);
          }
          @media (max-width: 1024px) and (min-width: 769px) {
            .video-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}} />
        <div className="container">
          <span className="eyebrow">Watch</span>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", marginTop: 16, marginBottom: 40 }}>
            Videos & walkthroughs
          </h2>
          <div
            className="video-grid mob-1col mob-gap-md"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
          >
            {videos.map((v) => (
              <div
                key={v.title}
                className="video-card"
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-md)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: 170,
                    position: "relative",
                    overflow: "hidden",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <img 
                    src={v.image} 
                    alt={v.title}
                    className="video-thumb"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                  />
                  <div 
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(10, 22, 40, 0.45)",
                      zIndex: 2,
                    }}
                  />
                  <span
                    className="video-play-btn"
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,.95)",
                      display: "grid",
                      placeItems: "center",
                      zIndex: 3,
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--blue-700)">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span
                    style={{
                      position: "absolute",
                      bottom: 12,
                      right: 12,
                      padding: "3px 9px",
                      background: "rgba(0,0,0,.75)",
                      color: "#fff",
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      zIndex: 3,
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {v.duration}
                  </span>
                </div>
                <div style={{ padding: 20 }}>
                  <h3 style={{ fontSize: 16.5, lineHeight: 1.4, fontWeight: 700, color: "var(--ink)" }}>{v.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
