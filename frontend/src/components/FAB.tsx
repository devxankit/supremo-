"use client";

import { useEffect, useState } from "react";
import { WHATSAPP_URL } from "@/lib/site";

export function FAB() {
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false); // suppressed over the footer
  const [whatsappUrl, setWhatsappUrl] = useState(WHATSAPP_URL);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${apiBase}/contact`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.whatsapp) {
          const cleanWa = data.whatsapp.replace(/\D/g, "");
          if (cleanWa) {
            setWhatsappUrl(`https://wa.me/${cleanWa}`);
          }
        }
      })
      .catch(err => {
        console.error("Error fetching FAB WhatsApp number:", err);
      });
  }, []);

  // Suppress the widget while the footer is on screen so it never overlaps
  // footer content.
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const obs = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(footer);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .fab-root {
          position: fixed;
          right: calc(24px + env(safe-area-inset-right, 0px));
          bottom: calc(24px + env(safe-area-inset-bottom, 0px));
          z-index: 50;
          transition: opacity .25s ease, transform .25s ease;
        }
        .fab-hidden { opacity: 0; transform: translateY(16px); pointer-events: none; }
        .fab-wa {
          position: relative;
          width: 60px; height: 60px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: #25D366;
          color: #fff;
          box-shadow: 0 8px 24px -6px rgba(37,211,102,.6), 0 2px 8px rgba(0,0,0,.14);
          animation: fab-enter .45s cubic-bezier(.34,1.56,.64,1) both, fab-pulse 2.4s ease-in-out 1s infinite;
          transition: transform .2s ease;
        }
        .fab-wa:hover { transform: scale(1.07); }
        /* expanding ring */
        .fab-wa::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #25D366;
          z-index: -1;
          animation: fab-ring 2.4s ease-out 1s infinite;
        }
        @keyframes fab-enter { from { opacity: 0; transform: scale(.5); } to { opacity: 1; transform: scale(1); } }
        @keyframes fab-pulse {
          0%, 100% { box-shadow: 0 8px 24px -6px rgba(37,211,102,.6), 0 0 0 0 rgba(37,211,102,.45); }
          50%      { box-shadow: 0 8px 24px -6px rgba(37,211,102,.6), 0 0 0 8px rgba(37,211,102,0); }
        }
        @keyframes fab-ring {
          0%   { opacity: .55; transform: scale(1); }
          70%  { opacity: 0;   transform: scale(1.7); }
          100% { opacity: 0;   transform: scale(1.7); }
        }
        @media (prefers-reduced-motion: reduce) {
          .fab-wa { animation: fab-enter .45s ease both; }
          .fab-wa::before { animation: none; display: none; }
        }
      `}</style>

      <div className={`fab-root${hidden ? " fab-hidden" : ""}`} aria-hidden={hidden}>
        {mounted && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fab-wa"
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
          >
            <svg width="32" height="32" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.2-157zM223.9 438.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
            </svg>
          </a>
        )}
      </div>
    </>
  );
}
