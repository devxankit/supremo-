import Link from "next/link";
import { LazyImage } from "@/components/LazyImage";

interface CategoryItem {
  title: string;
  image: string;
  link: string;
}

export async function Categories({ heading, sub }: { heading?: string; sub?: string }) {
  const displayHeading = heading || "";
  const displaySub = sub || "";

  let categoryList: CategoryItem[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      categoryList = data.map((cat: any) => ({
        title: cat.name,
        image: cat.image || "/images/logo.png",
        link: `/products?category=${cat.slug}`
      }));
    }
  } catch (err) {
    console.error("Error loading dynamic categories:", err);
  }

  if (categoryList.length === 0) {
    return null;
  }

  return (
    <section style={{ background: "#ffffff", padding: "48px 0 8px" }}>
      <div className="container">
        <style dangerouslySetInnerHTML={{ __html: `
          .cat-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }
          .cat-tile {
            display: flex;
            flex-direction: column;
            background: #fff;
            border: 1px solid var(--line);
            border-radius: var(--r-md);
            overflow: hidden;
            text-decoration: none;
            transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
            height: 100%;
          }
          .cat-tile:hover {
            transform: translateY(-4px);
            box-shadow: var(--sh-md);
            border-color: var(--blue-200);
          }
          /* Uniform "stage": every product sits in the same padded frame,
             regardless of the source photo's shape, scale or tone. */
          .cat-tile-img {
            position: relative;
            width: 100%;
            aspect-ratio: 4 / 3;
            background: var(--paper-2);
            border-bottom: 1px solid var(--line);
            overflow: hidden;
            flex-shrink: 0;
          }
          .cat-tile-img img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: calc(100% - 48px);
            max-height: calc(100% - 48px);
            object-fit: contain;
            transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          .cat-tile:hover .cat-tile-img img {
            transform: translate(-50%, -50%) scale(1.04);
          }
          .cat-tile-label {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-family: var(--font-display);
            font-size: 16px;
            font-weight: 700;
            color: var(--ink);
            padding: 16px 18px;
            flex-grow: 1;
          }
          .cat-tile-label svg { color: var(--blue-600); transition: transform 0.2s ease; flex-shrink: 0; }
          .cat-tile:hover .cat-tile-label svg { transform: translateX(3px); }

          @media (max-width: 900px) {
            .cat-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
            .cat-tile-img img {
              max-width: calc(100% - 36px);
              max-height: calc(100% - 36px);
            }
            .cat-tile-label { padding: 14px 14px; font-size: 15px; }
          }
        `}} />

        <div style={{ marginBottom: 32 }}>
          <h2>{displayHeading}</h2>
          <p style={{ color: "var(--muted)", fontSize: 16, marginTop: 8 }}>
            {displaySub}
          </p>
        </div>

        <div className="cat-grid mob-scroll">
          {categoryList.map((cat) => (
            <Link key={cat.title} href={cat.link} className="cat-tile mob-card-md">
              <div className="cat-tile-img">
                <LazyImage src={cat.image} alt={cat.title} />
              </div>
              <div className="cat-tile-label">
                {cat.title}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            </Link>
          ))}
          <Link href="/products" className="cat-tile mob-card-md">
            <div className="cat-tile-img" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(20, 102, 230, 0.05)" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(20, 102, 230, 0.15)", color: "var(--blue-600)" }}>
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </div>
            </div>
            <div className="cat-tile-label" style={{ color: "var(--blue-600)" }}>
              View All Products
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
