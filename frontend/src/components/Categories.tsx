"use client";

import { useRef } from "react";
import Link from "next/link";

interface CategoryItem {
  title: string;
  image: string;
  link: string;
  textColor: string;
}

const categoryList: CategoryItem[] = [
  {
    title: "Water Tanks",
    image: "/images/cat_tanks.png",
    link: "/products?category=water-tanks",
    textColor: "#4E3629", // themed dark brown/gold
  },
  {
    title: "Planters",
    image: "/images/cat_planters.png",
    link: "/products?category=planters",
    textColor: "#3A2E20", // themed dark warm brown
  },
  {
    title: "PVC Pipes",
    image: "/images/cat_pipes.png",
    link: "/products?category=pipes-fittings",
    textColor: "#3F2D17", // themed dark bronze
  },
  {
    title: "Coolers",
    image: "/images/acc_cooler.png",
    link: "/products?category=accessories",
    textColor: "#1A1A1A", // themed charcoal/black
  },
];

export function Categories() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector(".cat-card") as HTMLElement;
      const cardWidth = card ? card.offsetWidth + 24 : 320; // card width + gap
      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section style={{ background: "#ffffff", padding: "48px 0 8px" }}>
      <div className="container">
        {/* Style block for hover effects and responsiveness */}
        <style dangerouslySetInnerHTML={{ __html: `
          .categories-scroll::-webkit-scrollbar {
            display: none;
          }
          .categories-scroll {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          
          .cat-card {
            flex: 0 0 calc(25% - 18px);
            min-width: 260px;
            height: 350px;
            background: #EDEDED;
            border-radius: 20px;
            padding: 28px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            overflow: hidden;
            transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease;
            text-decoration: none;
            scroll-snap-align: start;
          }
          
          .cat-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 16px 32px rgba(10, 22, 40, 0.08);
          }
          
          .cat-card-img-container {
            display: flex;
            align-items: flex-end;
            justify-content: center;
            height: 220px;
            width: 100%;
            position: relative;
            margin-top: auto;
          }
          
          .cat-card-img {
            max-height: 100%;
            max-width: 100%;
            object-fit: contain;
            display: block;
            transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          
          .cat-card:hover .cat-card-img {
            transform: scale(1.06);
          }

          .nav-btn {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            border: 1px solid var(--line);
            background: transparent;
            color: var(--muted);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.25s ease;
          }

          .nav-btn:hover {
            background: var(--blue-50);
            border-color: var(--blue-400);
            color: var(--blue-700);
          }

          .nav-btn-next-active {
            border-color: var(--blue-600);
            color: var(--blue-600);
          }

          .nav-btn-next-active:hover {
            background: var(--blue-600);
            color: #fff;
            border-color: var(--blue-600);
          }
          
          @media (max-width: 1024px) {
            .cat-card {
              flex: 0 0 calc(50% - 12px);
            }
          }
          
          @media (max-width: 640px) {
            .cat-card {
              flex: 0 0 82%;
            }
            .categories-scroll {
              margin-left: -20px;
              margin-right: -20px;
              padding-left: 20px;
              padding-right: 20px;
            }
          }
        `}} />

        {/* Heading + Nav buttons row */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 36,
        }}>
          <h2>Featured Product Categories</h2>

          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={() => scroll("left")}
              className="nav-btn"
              aria-label="Previous Category"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="nav-btn nav-btn-next-active"
              aria-label="Next Category"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* Cards Carousel Container */}
        <div
          ref={scrollRef}
          className="categories-scroll"
          style={{
            display: "flex",
            gap: 24,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
            paddingTop: 8,
            paddingBottom: 16,
          }}
        >
          {categoryList.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.link}
              className="cat-card"
            >
              {/* Text aligned to top right */}
              <div style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}>
                <span style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: cat.textColor,
                  fontFamily: "var(--font-display)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4
                }}>
                  {cat.title} &rarr;
                </span>
              </div>

              {/* Centered/bottom product image */}
              <div className="cat-card-img-container">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="cat-card-img"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
