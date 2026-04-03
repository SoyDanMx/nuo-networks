#!/usr/bin/env node
/**
 * Ejemplo: un hit de Elasticsearch (esquema tipo [Elastic Threat Map](https://www.elastic.co/docs/reference/integrations/threat_map))
 * → un objeto `ThreatArcSample` compatible con `/api/threat-summary` (NUO).
 *
 * Uso:
 *   node scripts/elastic-hit-to-nuo-arc.mjs < sample-hit.json
 *   echo '{"_source":{...}}' | node scripts/elastic-hit-to-nuo-arc.mjs
 *
 * No conecta a Elasticsearch: solo transforma JSON. En producción, ejecuta la query
 * en tu BFF y mapea cada hit con elasticHitToNuoArc().
 */

function num(v) {
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

/**
 * @param {Record<string, unknown>} hit - Documento `_source` o hit completo `{ _source: {...} }`
 * @returns {Record<string, unknown>}
 */
export function elasticHitToNuoArc(hit) {
  const s = /** @type {Record<string, unknown>} */ (hit._source ?? hit);

  const src = /** @type {Record<string, unknown> | undefined} */ (s.source);
  const dst = /** @type {Record<string, unknown> | undefined} */ (s.destination);
  const srcGeo = /** @type {Record<string, unknown> | undefined} */ (src?.geo);
  const dstGeo = /** @type {Record<string, unknown> | undefined} */ (dst?.geo);
  const srcLoc = /** @type {Record<string, unknown> | undefined} */ (srcGeo?.location);
  const dstLoc = /** @type {Record<string, unknown> | undefined} */ (dstGeo?.location);

  const lat0 = num(/** @type {unknown} */ (srcLoc?.lat));
  const lon0 = num(/** @type {unknown} */ (srcLoc?.lon));
  const lat1 = num(/** @type {unknown} */ (dstLoc?.lat));
  const lon1 = num(/** @type {unknown} */ (dstLoc?.lon));

  if (lat0 === null || lon0 === null || lat1 === null || lon1 === null) {
    throw new Error(
      "elasticHitToNuoArc: faltan source.geo.location.lat/lon y destination.geo.location.lat/lon"
    );
  }

  const arc = {
    from: {
      lat: lat0,
      lng: lon0,
      label: typeof s.source_label === "string" ? s.source_label : undefined
    },
    to: {
      lat: lat1,
      lng: lon1,
      label: typeof s.destination_label === "string" ? s.destination_label : undefined
    }
  };

  if (typeof s.color === "string") arc.color = s.color;
  if (typeof s.weight === "number") arc.weight = s.weight;
  if (typeof s.animate === "boolean") arc.animate = s.animate;
  if (typeof s.pulse_at_source === "boolean") arc.pulseAtSource = s.pulse_at_source;

  return arc;
}

async function main() {
  const chunks = [];
  for await (const ch of process.stdin) chunks.push(ch);
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) {
    console.error("Uso: pipe JSON de un hit de Elasticsearch a stdin.");
    process.exit(1);
  }
  let hit;
  try {
    hit = JSON.parse(raw);
  } catch {
    console.error("JSON inválido en stdin.");
    process.exit(1);
  }
  try {
    const arc = elasticHitToNuoArc(hit);
    process.stdout.write(`${JSON.stringify(arc, null, 2)}\n`);
  } catch (e) {
    console.error(e instanceof Error ? e.message : e);
    process.exit(1);
  }
}

main();
