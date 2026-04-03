"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";

const SAT = [
  { a: 0, r: 132 },
  { a: 55, r: 128 },
  { a: 115, r: 125 },
  { a: 180, r: 130 },
  { a: 235, r: 127 },
  { a: 300, r: 124 }
];

/**
 * Glowing “3D” network hub — layered depth, cyan/magenta, satellite nodes (decorative).
 */
const HeroNetworkOrb = (): JSX.Element => {
  const gid = useId().replace(/:/g, "");
  const reduce = useReducedMotion();

  return (
    <div
      className="pointer-events-none relative mx-auto aspect-square w-[min(100%,20rem)] max-w-sm select-none opacity-95 sm:w-[min(100%,22rem)] lg:max-w-none"
      aria-hidden
    >
      <div className="absolute inset-0 flex items-center justify-center [perspective:960px]">
        <motion.div
          className="relative aspect-square w-[92%] [transform-style:preserve-3d]"
          animate={reduce ? undefined : { rotateY: [-5, 7, -5], rotateX: [3, 9, 3] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 animate-nuo-orbit rounded-full border border-cyan-500/25 shadow-[0_0_50px_rgba(6,182,212,0.14)]" />
          <div className="absolute inset-[7%] animate-nuo-orbit-slow rounded-full border border-fuchsia-500/18" />
          <div className="absolute inset-[16%] rounded-full border border-cyan-400/12" />
          <div className="absolute inset-[24%] animate-nuo-ring-pulse rounded-full border border-dashed border-fuchsia-400/30" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[38%]">
              <div className="aspect-square rounded-full bg-gradient-to-br from-cyan-400/35 via-cyan-500/15 to-transparent blur-2xl" />
              <div className="absolute inset-[8%] aspect-square rounded-full bg-gradient-to-b from-cyan-300 to-cyan-700 shadow-nuo-node-core" />
              <div className="absolute inset-[32%] rounded-full bg-white/30 blur-md" />
              {!reduce ? (
                <motion.div
                  className="absolute inset-0 rounded-full border border-white/25"
                  animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.7, 0.35] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                />
              ) : null}
            </div>
          </div>

          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400">
            <defs>
              <linearGradient id={`${gid}-hub-line`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#d946ef" stopOpacity="0.4" />
              </linearGradient>
              <filter id={`${gid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {SAT.map((s, i) => {
              const rad = (s.a * Math.PI) / 180;
              const x2 = 200 + Math.cos(rad) * s.r;
              const y2 = 200 + Math.sin(rad) * s.r * 0.9;
              return (
                <g key={i}>
                  <line
                    x1={200}
                    y1={200}
                    x2={x2}
                    y2={y2}
                    stroke={`url(#${gid}-hub-line)`}
                    strokeWidth={0.85}
                    strokeDasharray="5 9"
                    opacity={0.5}
                  />
                  <circle
                    cx={x2}
                    cy={y2}
                    r={5}
                    fill="#06b6d4"
                    opacity={0.95}
                    filter={`url(#${gid}-glow)`}
                  />
                </g>
              );
            })}
          </svg>
        </motion.div>
      </div>

      <div className="absolute -bottom-8 left-1/2 h-28 w-[72%] -translate-x-1/2 rounded-[100%] bg-cyan-500/12 blur-3xl" />
      <div className="absolute -bottom-5 left-1/2 h-14 w-[48%] -translate-x-1/2 rounded-[100%] bg-fuchsia-500/10 blur-2xl" />
    </div>
  );
};

export default HeroNetworkOrb;
