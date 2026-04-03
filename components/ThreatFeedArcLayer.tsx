"use client";

import { motion } from "framer-motion";

import type { ThreatArcSample } from "@/lib/threat-feed-types";
import { normalizeHexColor, strokeWidthsFromWeight } from "@/lib/threat-arc-visual";
import { arcEndpointsFromSample, arcPathFromSample } from "@/lib/threat-map-projection";

export interface ThreatFeedArcLayerProps {
  arc: ThreatArcSample;
  gid: string;
  reduceMotion: boolean;
  index: number;
}

/**
 * Un arco del feed con estilo alineado a Elastic (`color`, `weight`, `animate`, `pulseAtSource`).
 */
export function ThreatFeedArcLayer({ arc, gid, reduceMotion, index }: ThreatFeedArcLayerProps): JSX.Element {
  const d = arcPathFromSample(arc);
  const hex = normalizeHexColor(arc.color);
  const { halo, core } = strokeWidthsFromWeight(arc.weight);
  const animate = arc.animate !== false;
  const pulseAtSource = Boolean(arc.pulseAtSource);
  const { from, to } = arcEndpointsFromSample(arc);
  const pulsePt = pulseAtSource ? from : to;
  const pulseColor = hex ?? "#fafafa";

  const strokeMain: string = hex ?? `url(#${gid}-arc-live)`;

  const staticLayer = (
    <g opacity={0.9}>
      <path
        d={d}
        fill="none"
        stroke="hsl(0 0% 100% / 0.06)"
        strokeWidth={halo}
        strokeLinecap="round"
      />
      <path
        d={d}
        fill="none"
        stroke={strokeMain}
        strokeWidth={core}
        strokeLinecap="round"
        opacity={0.92}
        filter={hex ? `url(#${gid}-arc-glow)` : undefined}
      />
    </g>
  );

  if (!animate || reduceMotion) {
    return staticLayer;
  }

  return (
    <g>
      <motion.path
        d={d}
        fill="none"
        stroke="hsl(0 0% 100% / 0.05)"
        strokeWidth={halo + 1.5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.85, ease: "easeOut" }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke={strokeMain}
        strokeWidth={core}
        strokeLinecap="round"
        filter={`url(#${gid}-arc-glow)`}
        initial={{ pathLength: 0, opacity: 0.4 }}
        animate={{ pathLength: 1, opacity: hex ? [0.75, 1, 0.85] : [0.55, 0.95, 0.6] }}
        transition={{
          pathLength: { duration: 1.7, ease: "easeOut" },
          opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      <motion.circle
        cx={pulsePt.x}
        cy={pulsePt.y}
        fill="none"
        stroke={pulseColor}
        strokeWidth={1}
        strokeOpacity={0.4}
        initial={{ r: 4, opacity: 0.55 }}
        animate={{ r: 28, opacity: 0 }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeOut",
          delay: index * 0.12
        }}
      />
    </g>
  );
}
