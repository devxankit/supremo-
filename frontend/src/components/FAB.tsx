"use client";

import { useEffect, useState } from "react";

export function FAB() {
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Slight delay before entrance so page loads first
    const t = setTimeout(() => setMounted(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Keyframes injected once */}
      <style>{`
        @keyframes wa-float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes wa-ring {
          0%   { transform: scale(1);   opacity: .55; }
          70%  { transform: scale(2.2); opacity: 0;   }
          100% { transform: scale(2.2); opacity: 0;   }
        }
        @keyframes wa-ring2 {
          0%   { transform: scale(1);   opacity: .35; }
          70%  { transform: scale(2.8); opacity: 0;   }
          100% { transform: scale(2.8); opacity: 0;   }
        }
        @keyframes wa-enter {
          from { opacity: 0; transform: scale(.5) translateY(20px); }
          to   { opacity: 1; transform: scale(1)  translateY(0); }
        }
        @keyframes wa-shake {
          0%,100% { rotate: 0deg; }
          15%     { rotate: -18deg; }
          30%     { rotate: 16deg; }
          45%     { rotate: -12deg; }
          60%     { rotate: 10deg; }
          75%     { rotate: -6deg; }
          90%     { rotate: 4deg; }
        }
      `}</style>

      <a
        href="https://wa.me/919567812345"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "fixed",
          right: 24,
          bottom: 28,
          zIndex: 50,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#2EE272 0%,#25D366 60%,#1aab52 100%)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: hovered
            ? "0 8px 32px -6px rgba(37,211,102,.75), 0 2px 8px rgba(0,0,0,.18)"
            : "0 6px 24px -6px rgba(37,211,102,.6), 0 2px 8px rgba(0,0,0,.14)",
          textDecoration: "none",
          border: "none",
          cursor: "pointer",
          outline: "none",
          /* entrance */
          animation: mounted
            ? `wa-float 3s ease-in-out infinite, wa-enter .45s cubic-bezier(.34,1.56,.64,1) both`
            : "none",
          /* shake on hover */
          ...(hovered ? { animation: "wa-shake .55s ease-in-out" } : {}),
          transition: "box-shadow .25s ease",
        }}
      >
        {/* Ripple ring 1 */}
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "#25D366",
            animation: "wa-ring 2.2s ease-out infinite",
            pointerEvents: "none",
          }}
        />
        {/* Ripple ring 2 — offset */}
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "#25D366",
            animation: "wa-ring2 2.2s ease-out .55s infinite",
            pointerEvents: "none",
          }}
        />

        {/* Official WhatsApp icon (Simple Icons) */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ position: "relative", zIndex: 1, filter: "drop-shadow(0 1px 2px rgba(0,0,0,.2))" }}
        >
          <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.3-.345.45-.523.149-.18.199-.301.3-.5.099-.2.05-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375a9.869 9.869 0 0 1-1.516-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </a>
    </>
  );
}
