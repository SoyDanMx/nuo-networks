import { WORLD_LAND_PATHS } from "@/lib/threat-map-world-v2";

export type ThreatGlobeVariant = "nuo" | "warm";

interface ThreatMapGlobeLayerProps {
  /** Unique prefix for SVG defs (useId). */
  gid: string;
  variant: ThreatGlobeVariant;
}

/**
 * Océano con gradiente, paralelos estilo globo digital, borde elíptico y masas continentales de alto contraste.
 * Inspiración visual: mapas de amenazas “tipo mercado” (oscuro, arcos sobre geografía legible).
 */
export function ThreatMapGlobeLayer({ gid, variant }: ThreatMapGlobeLayerProps): JSX.Element {
  const warm = variant === "warm";
  const oceanMid = warm ? "hsl(222 45% 9%)" : "hsl(200 55% 10%)";
  const oceanEdge = warm ? "hsl(0 35% 5%)" : "hsl(222 60% 3%)";
  const rim = warm ? "hsl(15 70% 42% / 0.22)" : "hsl(187 86% 48% / 0.2)";
  const latStroke = warm ? "hsl(0 60% 35% / 0.14)" : "hsl(187 70% 45% / 0.11)";
  const landFill = warm ? "hsl(220 28% 14%)" : "hsl(205 32% 14%)";
  const landStroke = warm ? "hsl(15 65% 42% / 0.55)" : "hsl(187 75% 48% / 0.5)";
  const landStrokeHi = warm ? "hsl(25 90% 55% / 0.18)" : "hsl(165 70% 55% / 0.15)";

  const latYs = [68, 118, 178, 248, 318, 388];

  return (
    <>
      <defs>
        <radialGradient id={`${gid}-ocean`} cx="50%" cy="42%" r="72%">
          <stop offset="0%" stopColor={oceanMid} />
          <stop offset="55%" stopColor={oceanEdge} />
          <stop offset="100%" stopColor={warm ? "hsl(0 40% 3%)" : "hsl(225 65% 2%)"} />
        </radialGradient>
        <filter id={`${gid}-land-glow`} x="-8%" y="-8%" width="116%" height="116%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x="0" y="0" width="1000" height="520" fill={`url(#${gid}-ocean)`} />

      {/* Paralelos curvos (lectura de “esfera”) */}
      <g aria-hidden>
        {latYs.map((y, i) => (
          <path
            key={y}
            d={`M 32 ${y} Q 500 ${y - 10 + i * 3} 968 ${y}`}
            fill="none"
            stroke={latStroke}
            strokeWidth={1}
            strokeLinecap="round"
          />
        ))}
      </g>

      <ellipse
        cx="500"
        cy="258"
        rx="472"
        ry="232"
        fill="none"
        stroke={rim}
        strokeWidth={1.25}
        strokeDasharray="4 10"
      />

      <g filter={`url(#${gid}-land-glow)`}>
        {WORLD_LAND_PATHS.map((d, i) => (
          <path
            key={i}
            d={d}
            fill={landFill}
            stroke={landStroke}
            strokeWidth={1.35}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}
        {/* Borde interior luminoso (costa) */}
        {WORLD_LAND_PATHS.map((d, i) => (
          <path
            key={`h-${i}`}
            d={d}
            fill="none"
            stroke={landStrokeHi}
            strokeWidth={0.85}
            strokeLinejoin="round"
            opacity={0.9}
          />
        ))}
      </g>
    </>
  );
}
