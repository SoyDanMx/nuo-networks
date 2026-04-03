/**
 * Contrato JSON para el agregador `/api/threat-summary`.
 * Pensado para: mock → feed de terceros → SOC propio sin romper el front.
 *
 * Campos opcionales de arco alineados con el modelo del dashboard
 * [Elastic Threat Map](https://www.elastic.co/docs/reference/integrations/threat_map)
 * (`color`, `weight`, `animate`, `pulse_at_source` → camelCase en JSON NUO).
 */

export type ThreatFeedMode = "mock" | "upstream";

/** Punto geográfico WGS84 (mapa 2D Web Mercator o globo). */
export interface ThreatGeoPoint {
  lat: number;
  lng: number;
  /** Equivalente a source_label / destination_label en Elastic. */
  label?: string;
}

/** Muestra de flujo entre regiones (arco en mapa). */
export interface ThreatArcSample {
  from: ThreatGeoPoint;
  to: ThreatGeoPoint;
  /**
   * Color del trazo (hex). Elastic default `#54B399`.
   * Si se omite, el UI usa el degradado naranja por defecto.
   */
  color?: string;
  /**
   * Grosor relativo del arco (Elastic default `1`).
   */
  weight?: number;
  /**
   * Si `false`, el arco se dibuja estático (sin animación de trazo).
   * Elastic default `true`.
   */
  animate?: boolean;
  /**
   * Si `true`, el pulso radial está en el origen; si no, en destino.
   * Elastic `pulse_at_source`, default `false`.
   */
  pulseAtSource?: boolean;
  category?: string;
}

export interface ThreatSummaryResponse {
  /** ISO 8601 UTC */
  generatedAt: string;
  window: {
    label: string;
    startUtc: string;
    endUtc: string;
  };
  totalSignals: number;
  aggregateRatePerSec: number;
  /** Atribución y trazabilidad (cumplimiento / licencias de datos). */
  sources: { id: string; name: string; licenseNote?: string }[];
  arcs: ThreatArcSample[];
  /** Texto legal corto para mostrar junto al mapa cuando mode !== mock. */
  disclaimer: string;
  mode: ThreatFeedMode;
}
