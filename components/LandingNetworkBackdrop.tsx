"use client";

import { motion, useScroll } from "framer-motion";

/**
 * Línea principal y ramas tipo nodo ligadas al scroll: metáfora de red sin tapar contenido.
 */
const LandingNetworkBackdrop = (): JSX.Element => {
  const { scrollYProgress } = useScroll();

  const nodes = [
    { cx: 34, cy: 140 },
    { cx: 38, cy: 380 },
    { cx: 30, cy: 620 },
    { cx: 36, cy: 860 }
  ];

  return (
    <div
      className="pointer-events-none fixed inset-y-0 left-0 z-[2] hidden w-9 overflow-visible md:block md:w-14 lg:w-[4.25rem]"
      aria-hidden
    >
      <svg className="h-[160%] w-full -translate-y-[8%]" viewBox="0 0 72 1100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="nuoNetLine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(6,182,212,0.5)" />
            <stop offset="50%" stopColor="rgba(217,70,239,0.22)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0.12)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 36 0 C 52 160, 20 320, 44 480 S 18 720, 40 880 S 28 1000, 36 1100"
          fill="none"
          stroke="url(#nuoNetLine)"
          strokeWidth="1.6"
          strokeLinecap="round"
          style={{ pathLength: scrollYProgress }}
        />
        {nodes.map((n) => (
          <g key={`n-${n.cy}`}>
            <motion.path
              d={`M ${n.cx} ${n.cy} L ${n.cx + 12} ${n.cy}`}
              fill="none"
              stroke="rgba(6,182,212,0.38)"
              strokeWidth="1"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
            <motion.circle
              cx={n.cx}
              cy={n.cy}
              r={3.2}
              fill="rgba(6,182,212,0.55)"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="0.5"
              initial={{ scale: 0.65, opacity: 0.3 }}
              whileInView={{ scale: 1, opacity: 0.95 }}
              viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
              transition={{ duration: 0.35 }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default LandingNetworkBackdrop;
