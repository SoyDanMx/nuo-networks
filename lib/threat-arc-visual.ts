/**
 * Estilos de arco para SVG (Threat Map). Compatible con defaults tipo Elastic Threat Map.
 */

/** Devuelve `#RRGGBB` o `undefined` si el valor no es usable. */
export function normalizeHexColor(raw: string | undefined): string | undefined {
  if (!raw?.trim()) return undefined;
  const s = raw.trim();
  if (s.startsWith("#")) {
    return /^#[0-9A-Fa-f]{6}$/.test(s) || /^#[0-9A-Fa-f]{3}$/.test(s) ? s : undefined;
  }
  return /^[0-9A-Fa-f]{6}$/.test(s) ? `#${s}` : undefined;
}

/** Anchos de halo y trazo principal a partir de `weight` (Elastic default 1). */
export function strokeWidthsFromWeight(weight: number | undefined): { halo: number; core: number } {
  const w = Math.max(0.35, Math.min(weight ?? 1, 8));
  return {
    halo: 5 + w * 2.4,
    core: 1.15 + w * 0.7
  };
}
