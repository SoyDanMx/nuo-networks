import { NextResponse } from "next/server";

import { buildMockThreatSummary, fetchUpstreamThreatSummary } from "@/lib/threat-feed-server";

export const dynamic = "force-dynamic";

/**
 * Agregador de señales para el mapa de amenazas.
 * - `THREAT_FEED_MODE` ausente o `mock`: datos sintéticos estables para demo.
 * - `upstream`: intenta `THREAT_FEED_UPSTREAM_*`; si falla, responde 503 (o podrías degradar a mock).
 */
export async function GET(): Promise<NextResponse> {
  const mode = (process.env.THREAT_FEED_MODE ?? "mock").toLowerCase();

  if (mode === "upstream") {
    const upstream = await fetchUpstreamThreatSummary();
    if (upstream) {
      return NextResponse.json(upstream, {
        headers: {
          "Cache-Control": "private, s-maxage=60, stale-while-revalidate=120"
        }
      });
    }
    return NextResponse.json(
      {
        error: "upstream_unavailable",
        hint: "Set THREAT_FEED_UPSTREAM_URL (and optional KEY) or use THREAT_FEED_MODE=mock."
      },
      { status: 503 }
    );
  }

  const body = buildMockThreatSummary();
  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60"
    }
  });
}
