import type { ThreatArcSample, ThreatSummaryResponse } from "@/lib/threat-feed-types";

/** Coordenadas aproximadas alineadas con nodos de demo (threat-map-data). Incluye campos estilo Elastic. */
const MOCK_ARCS: ThreatArcSample[] = [
  {
    from: { lat: 40.7, lng: -74, label: "US" },
    to: { lat: 50.1, lng: 8.7, label: "DE" },
    color: "#54B399",
    weight: 1.2,
    animate: true,
    pulseAtSource: false
  },
  {
    from: { lat: 51.5, lng: -0.1, label: "UK" },
    to: { lat: 1.35, lng: 103.8, label: "SG" },
    color: "#f97316",
    weight: 2,
    animate: true,
    pulseAtSource: true
  },
  {
    from: { lat: 19.4, lng: -99.1, label: "MX" },
    to: { lat: -23.5, lng: -46.6, label: "BR" },
    weight: 0.85,
    animate: false,
    pulseAtSource: false
  }
];

function windowNow(): { startUtc: string; endUtc: string } {
  const end = Date.now();
  const start = end - 24 * 60 * 60 * 1000;
  return { startUtc: new Date(start).toISOString(), endUtc: new Date(end).toISOString() };
}

export function buildMockThreatSummary(): ThreatSummaryResponse {
  const { startUtc, endUtc } = windowNow();
  return {
    generatedAt: new Date().toISOString(),
    window: {
      label: "rolling_24h",
      startUtc,
      endUtc
    },
    totalSignals: 3_912_854,
    aggregateRatePerSec: 428_350,
    sources: [{ id: "nuo-mock", name: "NUO simulated telemetry", licenseNote: "Synthetic data for UI only." }],
    arcs: MOCK_ARCS,
    disclaimer:
      "Illustrative aggregation only. Not real-time incident data. Replace with provider-specific terms when THREAT_FEED_MODE=upstream.",
    mode: "mock"
  };
}

/**
 * Punto de extensión: llamar a un BFF propio o a un proveedor (OTX, etc.).
 * Mantén claves solo en servidor; nunca en el cliente.
 */
export async function fetchUpstreamThreatSummary(): Promise<ThreatSummaryResponse | null> {
  const base = process.env.THREAT_FEED_UPSTREAM_URL;
  if (!base?.trim()) {
    return null;
  }

  const key = process.env.THREAT_FEED_UPSTREAM_KEY;
  const res = await fetch(`${base.replace(/\/$/, "")}/summary`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...(key ? { Authorization: `Bearer ${key}` } : {})
    },
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    return null;
  }

  const data = (await res.json()) as ThreatSummaryResponse;
  return data;
}
