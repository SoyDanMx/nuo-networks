/** Normalized plate-carree-ish coords for SVG viewBox 0 0 1000 520. */

export type ThreatNode = { id: string; x: number; y: number };

export const THREAT_NODES: ThreatNode[] = [
  { id: "US", x: 227, y: 158 },
  { id: "MX", x: 218, y: 208 },
  { id: "BR", x: 358, y: 318 },
  { id: "UK", x: 488, y: 118 },
  { id: "DE", x: 512, y: 132 },
  { id: "FR", x: 498, y: 142 },
  { id: "RU", x: 620, y: 105 },
  { id: "CN", x: 782, y: 175 },
  { id: "JP", x: 878, y: 168 },
  { id: "KR", x: 848, y: 172 },
  { id: "IN", x: 692, y: 218 },
  { id: "SG", x: 778, y: 268 },
  { id: "AU", x: 858, y: 348 }
];

export type ThreatRoute = { from: string; to: string };

/** Arcs cycled in the HUD (simulated cross-border telemetry). */
export const THREAT_ROUTES: ThreatRoute[] = [
  { from: "CN", to: "US" },
  { from: "RU", to: "DE" },
  { from: "MX", to: "US" },
  { from: "BR", to: "UK" },
  { from: "IN", to: "SG" },
  { from: "CN", to: "JP" },
  { from: "DE", to: "US" },
  { from: "AU", to: "IN" },
  { from: "KR", to: "CN" }
];

export function nodeById(id: string): ThreatNode | undefined {
  return THREAT_NODES.find((n) => n.id === id);
}

/** Curvas más altas en enlaces largos (lectura tipo gran arco / mapas comerciales). */
export function quadArcPath(x1: number, y1: number, x2: number, y2: number, bulge = 1): string {
  const midx = (x1 + x2) / 2;
  const midy = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const longHop = 1 + Math.min(len / 420, 1.2) * 0.55;
  const nx = ((-dy / len) * 85 * bulge * longHop) as number;
  const ny = ((dx / len) * 85 * bulge * longHop) as number;
  return `M ${x1} ${y1} Q ${midx + nx} ${midy + ny} ${x2} ${y2}`;
}
