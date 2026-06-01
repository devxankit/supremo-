"use client";

import { useEffect, useState } from "react";
import { PHONE_TEL, PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/site";

export function FAB() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false); // suppressed over the footer

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 600);
    return () => clearTimeout(t);
  }, []);

  // Suppress the widget while the footer is on screen so the bubbles never
  // overlap footer content (the UX review flagged this).
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setHidden(entry.isIntersecting);
        if (entry.isIntersecting) setOpen(false);
      },
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
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
          transition: opacity .25s ease, transform .25s ease;
        }
        .fab-hidden { opacity: 0; transform: translateY(16px); pointer-events: none; }
        .fab-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: opacity .2s ease, transform .25s cubic-bezier(.16,1,.3,1);
        }
        .fab-actions-closed { opacity: 0; transform: translateY(8px) scale(.96); pointer-events: none; }
        .fab-action {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          height: 48px;
          padding: 0 18px 0 14px;
          border-radius: 999px;
          background: #fff;
          border: 1px solid var(--line);
          box-shadow: var(--sh-md);
          color: var(--ink);
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: transform .15s ease, box-shadow .2s ease;
        }
        .fab-action:hover { transform: translateY(-1px); box-shadow: var(--sh-lg); }
        .fab-action .fab-ico { width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; color: #fff; flex-shrink: 0; }
        .fab-ico-call { background: var(--blue-600); }
        .fab-ico-wa { background: #25D366; }
        .fab-toggle {
          width: 58px; height: 58px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, var(--blue-500) 0%, var(--blue-600) 60%, var(--blue-700) 100%);
          color: #fff;
          display: grid;
          place-items: center;
          box-shadow: 0 8px 24px -6px rgba(36,89,230,.6), 0 2px 8px rgba(0,0,0,.14);
          transition: transform .2s ease;
          animation: fab-enter .45s cubic-bezier(.34,1.56,.64,1) both;
        }
        .fab-toggle:hover { transform: scale(1.05); }
        @keyframes fab-enter { from { opacity: 0; transform: scale(.5); } to { opacity: 1; transform: scale(1); } }
        @media (prefers-reduced-motion: reduce) {
          .fab-toggle, .fab-actions, .fab-root { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div className={`fab-root${hidden ? " fab-hidden" : ""}`} aria-hidden={hidden}>
        {/* Expandable actions */}
        <div className={`fab-actions${open ? "" : " fab-actions-closed"}`}>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="fab-action" aria-label="Chat on WhatsApp">
            <span className="fab-ico fab-ico-wa">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8 8 0 01-2.3-1.4 9 9 0 01-1.6-2c-.2-.3 0-.4.1-.5l.4-.5a2 2 0 00.3-.5.4.4 0 000-.4 18 18 0 01-.8-2c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 2.9 2.9 0 00-.9 2.2c0 1.3 1 2.5 1 2.7s1.8 2.8 4.4 3.9c1.7.7 2.3.7 3.1.6.5 0 1.5-.6 1.7-1.2a2 2 0 00.2-1.2c-.1 0-.3-.1-.6-.3zM12 2a10 10 0 00-10 10 9.9 9.9 0 001.3 5L2 22l5.2-1.4a10 10 0 0014.8-8.6A10 10 0 0012 2z" />
              </svg>
            </span>
            WhatsApp
          </a>
          <a href={`tel:${PHONE_TEL}`} className="fab-action" aria-label={`Call ${PHONE_DISPLAY}`}>
            <span className="fab-ico fab-ico-call">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            Call us
          </a>
        </div>

        {/* Single toggle */}
        {mounted && (
          <button
            type="button"
            className="fab-toggle"
            aria-label={open ? "Close contact options" : "Contact us"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            )}
          </button>
        )}
      </div>
    </>
  );
}
