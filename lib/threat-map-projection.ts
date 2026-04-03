import type { ThreatArcSample } from "@/lib/threat-feed-types";
import { nodeById, quadArcPath } from "@/lib/threat-map-data";

/**
 * Proyección plate carrée al viewBox 1000×520 (alineación aproximada con el fondo SVG).
 */
export function lngLatToPlateCarree(lng: number, lat: number): { x: number; y: number } {
  const x = ((lng + 180) / 360) * 1000;
  const y = ((90 - lat) / 180) * 520;
  return { x, y };
}

/**
 * Si `label` coincide con un id en THREAT_NODES (p. ej. US), usa coordenadas del mapa NUO;
 * si no, proyecta WGS84.
 */
export function endpointToSvgPoint(label: string | undefined, lat: number, lng: number): { x: number; y: number } {
  const id = label?.toUpperCase();
  if (id) {
    const n = nodeById(id);
    if (n) return { x: n.x, y: n.y };
  }
  return lngLatToPlateCarree(lng, lat);
}

export function arcEndpointsFromSample(a: ThreatArcSample): {
  from: { x: number; y: number };
  to: { x: number; y: number };
} {
  const from = endpointToSvgPoint(a.from.label, a.from.lat, a.from.lng);
  const to = endpointToSvgPoint(a.to.label, a.to.lat, a.to.lng);
  return { from, to };
}

export function arcPathFromSample(a: ThreatArcSample): string {
  const { from, to } = arcEndpointsFromSample(a);
  const bulge =
    a.from.label?.toUpperCase() === "AU" || a.to.label?.toUpperCase() === "AU" ? 1.38 : 1.05;
  return quadArcPath(from.x, from.y, to.x, to.y, bulge);
}
