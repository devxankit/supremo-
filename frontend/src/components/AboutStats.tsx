"use client";

import { useEffect, useRef, useState } from "react";

/* ════════════════════════════════════════════════════════════════
   ABOUT · ANIMATED STATISTICS COUNTER
   Numbers count up from 0 → target the first time the strip scrolls
   into view (IntersectionObserver + requestAnimationFrame easing).
   Mirrors the on-scroll counter on the reference About page.
═══════════════════════════════════════════════════════════════ */

interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const stats: Stat[] = [
  { value: 27, suffix: "+", label: "Years of Legacy" },
  { value: 700, suffix: "+", label: "Products" },
  { value: 22, suffix: "+", label: "States Covered" },
  { value: 1200, suffix: "+", label: "Active Dealers" },
];

function formatNumber(n: number) {
  return n.toLocaleString("en-IN");
}

function StatItem({ stat, run }: { stat: Stat; run: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!run) return;

    // Honour the OS "reduce motion" setting — duration 0 snaps straight to the
    // value on the first frame (kept inside rAF so we never setState synchronously).
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = prefersReduced ? 0 : 1800;

    let raf = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = duration === 0 ? 1 : Math.min((now - startTime) / duration, 1);
      // easeOutExpo — fast start, gentle settle
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(eased * stat.value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, stat.value]);

  return (
    <div className="about-stat">
      <div className="about-stat-num">
        {stat.prefix}
        {formatNumber(display)}
        {stat.suffix}
      </div>
      <div className="about-stat-label">{stat.label}</div>
    </div>
  );
}

export function AboutStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRun(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(135deg, var(--blue-700) 0%, var(--blue-900) 100%)",
        padding: "clamp(48px, 6vw, 72px) 0",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .about-stat {
          text-align: center;
          padding: 8px 20px;
          border-right: 1px solid rgba(255,255,255,.16);
        }
        .about-stat:last-child { border-right: none; }
        .about-stat-num {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(34px, 4.5vw, 56px);
          line-height: 1;
          color: #fff;
          letter-spacing: -0.02em;
          font-variant-numeric: tabular-nums;
        }
        .about-stat-label {
          margin-top: 12px;
          font-size: 13.5px;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: rgba(255,255,255,.68);
        }
        @media (max-width: 860px) {
          .about-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 28px 0;
          }
          .about-stat { padding: 16px 16px; }
          .about-stat:nth-child(odd) { border-right: 1px solid rgba(255,255,255,.16); }
          .about-stat:nth-child(even) { border-right: none; }
          .about-stat:last-child { border-right: none; }
        }
      `,
        }}
      />
      <div className="container">
        <div className="about-stats-grid">
          {stats.map((s) => (
            <StatItem key={s.label} stat={s} run={run} />
          ))}
        </div>
      </div>
    </section>
  );
}
