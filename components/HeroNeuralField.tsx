"use client";

import { useCallback, useRef, useState } from "react";
import type { ReactNode } from "react";

interface HeroNeuralFieldProps {
  children?: ReactNode;
}

/**
 * Darktrace-inspired neural field: grid + dual radial glows that follow pointer.
 * Degrades gracefully when pointer leaves (centers).
 */
const HeroNeuralField = ({ children }: HeroNeuralFieldProps): JSX.Element => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 42 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / Math.max(r.width, 1)) * 100;
    const y = ((e.clientY - r.top) / Math.max(r.height, 1)) * 100;
    setPos({ x, y });
  }, []);

  const onLeave = useCallback(() => {
    setPos({ x: 50, y: 38 });
  }, []);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 overflow-hidden"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      aria-hidden={true}
    >
      <div className="absolute inset-0 bg-[#020617]" />
      <div className="absolute inset-0 cyber-grid-bg opacity-[0.22]" />
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-500 ease-out"
        style={{
          background: `
            radial-gradient(45% 38% at ${pos.x}% ${pos.y}%, hsl(187 86% 53% / 0.16) 0%, transparent 58%),
            radial-gradient(32% 28% at ${100 - pos.x * 0.85}% ${100 - pos.y * 0.7}%, hsl(292 84% 61% / 0.1) 0%, transparent 52%)
          `
        }}
      />
      {/* Lightweight “synapse” mesh */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.28]" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <defs>
          <linearGradient id="neural-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#d946ef" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        {[
          [80, 120, 320, 280],
          [320, 200, 580, 320],
          [580, 140, 820, 260],
          [200, 420, 440, 520],
          [440, 480, 720, 440],
          [720, 360, 980, 480],
          [900, 200, 1080, 340]
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="url(#neural-stroke)"
            strokeWidth={0.6}
            strokeDasharray="6 10"
          />
        ))}
        {[
          [80, 120],
          [320, 280],
          [580, 320],
          [820, 260],
          [440, 520],
          [720, 440],
          [980, 480]
        ].map(([cx, cy], i) => (
          <circle key={`n-${i}`} cx={cx} cy={cy} r={2.5} fill="#06b6d4" opacity={0.55} />
        ))}
      </svg>
      {children}
    </div>
  );
};

export default HeroNeuralField;
