"use client";

import { useEffect, useRef } from "react";

interface Bubble {
  x: number; y: number; r: number;
  speed: number; phase: number; alpha: number;
}
interface Dust {
  x: number; y: number; vx: number; vy: number; a: number; s: number;
}

function WaterCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const _maybeCtx = canvas.getContext("2d", { alpha: false });
    if (!_maybeCtx) return;
    const ctx: CanvasRenderingContext2D = _maybeCtx;

    let raf: number;
    let t = 0;
    let W = 0, H = 0;

    const bubbles: Bubble[] = [];
    const dust: Dust[] = [];

    function seed() {
      bubbles.length = 0;
      dust.length = 0;
      const surfY = H * 0.58;
      for (let i = 0; i < 65; i++) {
        bubbles.push({
          x: Math.random() * W,
          y: surfY + 20 + Math.random() * (H - surfY - 20),
          r: Math.random() * 4 + 0.8,
          speed: Math.random() * 0.9 + 0.3,
          phase: Math.random() * Math.PI * 2,
          alpha: Math.random() * 0.38 + 0.08,
        });
      }
      for (let i = 0; i < 110; i++) {
        dust.push({
          x: Math.random() * W,
          y: Math.random() * surfY,
          vx: (Math.random() - 0.5) * 0.22,
          vy: -(Math.random() * 0.22 + 0.04),
          a: Math.random() * 0.22 + 0.04,
          s: Math.random() * 1.4 + 0.3,
        });
      }
    }

    function resize() {
      if (!canvas) return;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      seed();
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const wv = (x: number, T: number, amp: number, freq: number, spd: number, ph: number) =>
      Math.sin(x * freq + T * spd + ph) * amp +
      Math.sin(x * freq * 1.65 + T * spd * 1.42 + ph + 1.1) * amp * 0.44 +
      Math.sin(x * freq * 0.52 + T * spd * 0.68 + ph + 2.4) * amp * 0.26;

    function drawTankSilhouette(tx: number, ty: number, tw: number, th: number, alpha: number) {
      const stroke = `rgba(80,160,255,${alpha})`;
      const fill = `rgba(10,50,140,${alpha * 0.35})`;

      // Body
      ctx.beginPath();
      ctx.roundRect(tx, ty, tw, th, [tw * 0.08, tw * 0.08, tw * 0.05, tw * 0.05]);
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Top dome
      ctx.beginPath();
      ctx.ellipse(tx + tw / 2, ty, tw * 0.48, tw * 0.16, 0, Math.PI, 0);
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Inlet pipe on top
      ctx.beginPath();
      ctx.rect(tx + tw * 0.43, ty - tw * 0.18, tw * 0.14, tw * 0.14);
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Horizontal band
      ctx.beginPath();
      ctx.moveTo(tx, ty + th * 0.38);
      ctx.lineTo(tx + tw, ty + th * 0.38);
      ctx.strokeStyle = `rgba(80,160,255,${alpha * 0.5})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Legs
      ctx.beginPath();
      ctx.moveTo(tx + tw * 0.18, ty + th);
      ctx.lineTo(tx + tw * 0.18, ty + th + th * 0.14);
      ctx.moveTo(tx + tw * 0.82, ty + th);
      ctx.lineTo(tx + tw * 0.82, ty + th + th * 0.14);
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Outlet pipe at bottom
      ctx.beginPath();
      ctx.moveTo(tx + tw, ty + th * 0.85);
      ctx.lineTo(tx + tw + tw * 0.18, ty + th * 0.85);
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    function draw() {
      t += 0.0065;
      const surfY = H * 0.58 + Math.sin(t * 0.18) * H * 0.008;

      // ── BACKGROUND ───────────────────────────────────────
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, "#010c1d");
      bg.addColorStop(0.3, "#041530");
      bg.addColorStop(0.54, "#071e48");
      bg.addColorStop(0.62, "#0c2c66");
      bg.addColorStop(1, "#01080f");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Ambient glows
      {
        const g = ctx.createRadialGradient(W * 0.22, H * 0.16, 0, W * 0.22, H * 0.16, W * 0.52);
        g.addColorStop(0, "rgba(30,95,255,0.17)");
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      }
      {
        const g = ctx.createRadialGradient(W * 0.82, H * 0.72, 0, W * 0.82, H * 0.72, W * 0.42);
        g.addColorStop(0, "rgba(0,140,230,0.13)");
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      }
      {
        // Slow drifting center glow
        const cx = W * 0.5 + Math.sin(t * 0.22) * W * 0.12;
        const cy = H * 0.32 + Math.cos(t * 0.16) * H * 0.06;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.3);
        g.addColorStop(0, "rgba(20,75,210,0.09)");
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      }

      // ── TANK SILHOUETTES (behind waves, above horizon) ────
      // Large tank far right
      {
        const tw = W * 0.11, th = H * 0.32;
        drawTankSilhouette(W * 0.82, surfY - th - H * 0.06, tw, th, 0.08);
      }
      // Medium tank center-right
      {
        const tw = W * 0.07, th = H * 0.22;
        drawTankSilhouette(W * 0.62, surfY - th - H * 0.03, tw, th, 0.05);
      }
      // Small tank far left
      {
        const tw = W * 0.055, th = H * 0.16;
        drawTankSilhouette(W * 0.06, surfY - th - H * 0.02, tw, th, 0.05);
      }

      // ── ABOVE-WATER LIGHT SHAFTS ──────────────────────────
      ctx.save();
      for (let i = 0; i < 6; i++) {
        const sx = W * (0.04 + i * 0.19) + Math.sin(t * 0.28 + i * 1.15) * 28;
        const sw = 18 + Math.sin(t * 0.48 + i * 0.72) * 11;
        const sg = ctx.createLinearGradient(sx, 0, sx, surfY);
        sg.addColorStop(0, `rgba(70,155,255,${0.065 - i * 0.005})`);
        sg.addColorStop(1, "transparent");
        ctx.fillStyle = sg;
        ctx.beginPath();
        ctx.moveTo(sx - sw * 0.18, 0);
        ctx.lineTo(sx + sw * 0.18, 0);
        ctx.lineTo(sx + sw * 0.95, surfY);
        ctx.lineTo(sx - sw * 0.95, surfY);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // ── DUST PARTICLES ────────────────────────────────────
      dust.forEach((d) => {
        d.x += d.vx; d.y += d.vy;
        if (d.y < -4) { d.y = surfY - 4; d.x = Math.random() * W; }
        if (d.x < -4) d.x = W + 4;
        if (d.x > W + 4) d.x = -4;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(175,215,255,${d.a})`;
        ctx.fill();
      });

      // ── WAVE LAYERS ───────────────────────────────────────
      const layers = [
        { dy: 0,  amp: 20, freq: 0.010, spd: 1.15, ph: 0,   fillA: 0.20, lineA: 0.20, lw: 1.6 },
        { dy: 13, amp: 26, freq: 0.007, spd: 0.82, ph: 1.85, fillA: 0.14, lineA: 0.13, lw: 1.1 },
        { dy: 26, amp: 32, freq: 0.005, spd: 0.54, ph: 3.6,  fillA: 0.10, lineA: 0.08, lw: 0.8 },
      ];

      layers.forEach(({ dy, amp, freq, spd, ph, fillA, lineA, lw }) => {
        const baseY = surfY + dy;
        ctx.beginPath();
        ctx.moveTo(0, H);
        for (let x = 0; x <= W; x += 4) ctx.lineTo(x, baseY + wv(x, t, amp, freq, spd, ph));
        ctx.lineTo(W, H);
        ctx.closePath();

        const wg = ctx.createLinearGradient(0, baseY - amp, 0, H);
        wg.addColorStop(0, `rgba(12,65,195,${fillA})`);
        wg.addColorStop(1, `rgba(4,25,95,${fillA * 0.5})`);
        ctx.fillStyle = wg;
        ctx.fill();

        ctx.beginPath();
        for (let x = 0; x <= W; x += 4) {
          const y = baseY + wv(x, t, amp, freq, spd, ph);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(110,195,255,${lineA})`;
        ctx.lineWidth = lw;
        ctx.stroke();
      });

      // ── UNDERWATER LIGHT SHAFTS ───────────────────────────
      ctx.save();
      ctx.globalAlpha = 0.065;
      for (let i = 0; i < 5; i++) {
        const sx = W * (0.10 + i * 0.20) + Math.sin(t * 0.32 + i * 1.95) * 48;
        const sw = 22 + Math.sin(t * 0.25 + i) * 14;
        const sg = ctx.createLinearGradient(sx, surfY, sx, H);
        sg.addColorStop(0, "rgba(70,180,255,0.8)");
        sg.addColorStop(1, "transparent");
        ctx.fillStyle = sg;
        ctx.beginPath();
        ctx.moveTo(sx - sw * 0.28, surfY);
        ctx.lineTo(sx + sw * 0.28, surfY);
        ctx.lineTo(sx + sw * 2.2, H);
        ctx.lineTo(sx - sw * 2.2, H);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // ── BUBBLES ───────────────────────────────────────────
      bubbles.forEach((b) => {
        b.phase += 0.024;
        b.y -= b.speed;
        b.x += Math.sin(b.phase) * 0.52;

        if (b.y < surfY - 8) {
          b.y = H + b.r;
          b.x = Math.random() * W;
          b.alpha = Math.random() * 0.38 + 0.08;
        }

        const fade = Math.min(1, (b.y - surfY + 45) / 45);
        const a = b.alpha * fade;

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(155,225,255,${a})`;
        ctx.lineWidth = 0.75;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.32, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a * 0.62})`;
        ctx.fill();
      });

      // ── SWEEPING GLINTS ───────────────────────────────────
      for (let i = 0; i < 3; i++) {
        const gy = H * 0.08 + i * H * 0.16 + Math.sin(t * 0.28 + i * 2.2) * 22;
        const gx = ((t * (52 + i * 18)) % (W + 560)) - 280;
        const gg = ctx.createLinearGradient(gx - 190, gy, gx + 190, gy);
        gg.addColorStop(0, "transparent");
        gg.addColorStop(0.5, `rgba(115,188,255,${0.055 - i * 0.013})`);
        gg.addColorStop(1, "transparent");
        ctx.fillStyle = gg;
        ctx.fillRect(gx - 190, gy - 1, 380, 2);
      }

      // ── VIGNETTE ─────────────────────────────────────────
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.25, W / 2, H / 2, H * 0.85);
      vig.addColorStop(0, "transparent");
      vig.addColorStop(1, "rgba(1,6,14,0.55)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
    />
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "min(900px, 100vh)",
        overflow: "hidden",
        isolation: "isolate",
        padding: 0,
      }}
    >
      <WaterCanvas />

      {/* Scroll cue */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 22,
          transform: "translateX(-50%)",
          fontSize: 11,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,.5)",
          fontWeight: 600,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          zIndex: 5,
          userSelect: "none",
        }}
      >
        Scroll
        <span
          className="scroll-line"
          style={{
            width: 1,
            height: 36,
            background: "linear-gradient(180deg,transparent,rgba(255,255,255,.55))",
          }}
        />
      </div>
    </section>
  );
}
