"use client";

import React, { useId, useState } from "react";

/* ─────────────────────────────────────────────────────────
   Dependency-free SVG charts tuned to the Supremo palette.
   AreaChart · BarChart · DonutChart · Sparkline · ProgressBar
───────────────────────────────────────────────────────── */

const BLUE = "#1466E6";

function buildSmoothPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i];
    const p1 = pts[i + 1];
    const cx = (p0.x + p1.x) / 2;
    d += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  return d;
}

export function AreaChart({
  data,
  labels,
  height = 240,
  color = BLUE,
  prefix = "",
  suffix = "",
}: {
  data: number[];
  labels: string[];
  height?: number;
  color?: string;
  prefix?: string;
  suffix?: string;
}) {
  const gid = useId().replace(/:/g, "");
  const [hover, setHover] = useState<number | null>(null);
  const W = 760;
  const H = height;
  const padL = 44;
  const padR = 16;
  const padT = 18;
  const padB = 30;
  const rawMax = data.length > 0 ? Math.max(...data) : 0;
  const max = (rawMax <= 0 || !isFinite(rawMax)) ? 1 : rawMax * 1.12;
  const min = 0;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const pts = data.map((v, i) => ({
    x: padL + (data.length === 1 ? innerW / 2 : (i / (data.length - 1 || 1)) * innerW),
    y: padT + innerH - ((v - min) / (max - min || 1)) * innerH,
  }));

  const line = buildSmoothPath(pts);
  const area = pts.length > 0
    ? `${line} L ${pts[pts.length - 1].x} ${padT + innerH} L ${pts[0].x} ${padT + innerH} Z`
    : "";
  const gridVals = [0, 0.25, 0.5, 0.75, 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", overflow: "visible" }} onMouseLeave={() => setHover(null)}>
      <defs>
        <linearGradient id={`area-${gid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.26" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* gridlines + y labels */}
      {gridVals.map((g, i) => {
        const y = padT + innerH - g * innerH;
        const val = Math.round(min + g * (max - min));
        return (
          <g key={i}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="var(--line-2)" strokeWidth="1" />
            <text x={padL - 8} y={y + 4} textAnchor="end" fontSize="10.5" fill="var(--soft)" fontFamily="var(--font-body)">
              {prefix}{val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}{suffix}
            </text>
          </g>
        );
      })}

      {area && <path d={area} fill={`url(#area-${gid})`} />}
      {line && <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}

      {pts.map((p, i) => (
        <g key={i}>
          <rect
            x={p.x - innerW / (data.length || 1) / 2}
            y={padT}
            width={innerW / (data.length || 1)}
            height={innerH}
            fill="transparent"
            onMouseEnter={() => setHover(i)}
          />
          <circle cx={p.x} cy={p.y} r={hover === i ? 5 : 3} fill="#fff" stroke={color} strokeWidth="2.5" />
          <text x={p.x} y={H - 8} textAnchor="middle" fontSize="10.5" fill="var(--muted)" fontFamily="var(--font-body)">
            {labels[i]}
          </text>
        </g>
      ))}

      {data.length === 0 && (
        <text x={W / 2} y={H / 2} textAnchor="middle" fill="var(--muted)" fontSize="14" fontFamily="var(--font-body)">
          No data available
        </text>
      )}

      {hover !== null && pts[hover] && (
        <g pointerEvents="none">
          <line x1={pts[hover].x} y1={padT} x2={pts[hover].x} y2={padT + innerH} stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          <g transform={`translate(${Math.min(Math.max(pts[hover].x, padL + 36), W - padR - 36)}, ${Math.max(pts[hover].y - 16, padT + 10)})`}>
            <rect x={-38} y={-26} width={76} height={22} rx={5} fill="var(--ink)" />
            <text x={0} y={-11} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" fontFamily="var(--font-display)">
              {prefix}{data[hover].toLocaleString()}{suffix}
            </text>
          </g>
        </g>
      )}
    </svg>
  );
}

export function BarChart({
  data,
  labels,
  height = 240,
  color = BLUE,
  prefix = "",
}: {
  data: number[];
  labels: string[];
  height?: number;
  color?: string;
  prefix?: string;
}) {
  const gid = useId().replace(/:/g, "");
  const [hover, setHover] = useState<number | null>(null);
  const W = 760;
  const H = height;
  const padL = 44;
  const padR = 16;
  const padT = 18;
  const padB = 30;
  const rawMax = data.length > 0 ? Math.max(...data) : 0;
  const max = (rawMax <= 0 || !isFinite(rawMax)) ? 1 : rawMax * 1.14;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const slot = innerW / (data.length || 1);
  const bw = Math.min(slot * 0.52, 42);
  const gridVals = [0, 0.25, 0.5, 0.75, 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", overflow: "visible" }} onMouseLeave={() => setHover(null)}>
      <defs>
        <linearGradient id={`bar-${gid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      {gridVals.map((g, i) => {
        const y = padT + innerH - g * innerH;
        const val = Math.round(g * (max));
        return (
          <g key={i}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="var(--line-2)" strokeWidth="1" />
            <text x={padL - 8} y={y + 4} textAnchor="end" fontSize="10.5" fill="var(--soft)">{prefix}{val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}</text>
          </g>
        );
      })}
      {data.map((v, i) => {
        const h = (v / max) * innerH;
        const x = padL + slot * i + slot / 2 - bw / 2;
        const y = padT + innerH - h;
        return (
          <g key={i} onMouseEnter={() => setHover(i)}>
            <rect x={padL + slot * i} y={padT} width={slot} height={innerH} fill="transparent" />
            <rect x={x} y={y} width={bw} height={h} rx={5} fill={`url(#bar-${gid})`} opacity={hover === null || hover === i ? 1 : 0.45} style={{ transition: "opacity .15s" }} />
            <text x={padL + slot * i + slot / 2} y={H - 8} textAnchor="middle" fontSize="10.5" fill="var(--muted)">{labels[i]}</text>
            {hover === i && (
              <text x={padL + slot * i + slot / 2} y={y - 7} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)">{prefix}{v.toLocaleString()}</text>
            )}
          </g>
        );
      })}
      {data.length === 0 && (
        <text x={W / 2} y={H / 2} textAnchor="middle" fill="var(--muted)" fontSize="14" fontFamily="var(--font-body)">
          No data available
        </text>
      )}
    </svg>
  );
}

export function DonutChart({
  data,
  size = 180,
  thickness = 26,
}: {
  data: { label: string; value: number; color: string }[];
  size?: number;
  thickness?: number;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const divisor = total || 1;
  const r = (size - thickness) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
      <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--line-2)" strokeWidth={thickness} />
          {data.map((d, i) => {
            const frac = d.value / divisor;
            const dash = frac * circ;
            const seg = (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={d.color}
                strokeWidth={thickness}
                strokeDasharray={`${dash} ${circ - dash}`}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
                transform={`rotate(-90 ${cx} ${cy})`}
              />
            );
            offset += dash;
            return seg;
          })}
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: "var(--ink)", fontFamily: "var(--font-display)", lineHeight: 1 }}>{total}</div>
          <div style={{ fontSize: 10.5, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 3 }}>Total</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
        {data.length > 0 ? (
          data.map((d) => (
            <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: d.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12.5, color: "var(--slate)", flex: 1 }}>{d.label}</span>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>{Math.round((d.value / divisor) * 100)}%</span>
            </div>
          ))
        ) : (
          <span style={{ fontSize: 12.5, color: "var(--soft)", fontStyle: "italic" }}>No data available</span>
        )}
      </div>
    </div>
  );
}

export function Sparkline({ data, color = BLUE, width = 96, height = 34 }: { data: number[]; color?: string; width?: number; height?: number }) {
  if (!data || data.length === 0) {
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: "block" }}>
        <line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke="var(--line-2)" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    );
  }
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1 || 1)) * width,
    y: height - ((v - min) / (max - min || 1)) * height,
  }));
  const line = buildSmoothPath(pts);
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: "block" }}>
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ProgressBar({ value, color = BLUE }: { value: number; color?: string }) {
  return (
    <div style={{ height: 7, background: "var(--line-2)", borderRadius: 999, overflow: "hidden" }}>
      <div style={{ width: `${Math.min(100, value)}%`, height: "100%", background: color, borderRadius: 999, transition: "width .4s" }} />
    </div>
  );
}
