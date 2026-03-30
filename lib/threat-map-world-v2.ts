/**
 * Masas continentales estilizadas para viewBox 0 0 1000 520 (proyección tipo plano).
 * Objetivo: leerse como mapa mundi en HUD cyber; no es cartografía precisa.
 * Alineado aproximado con nodos en threat-map-data.
 */
export const THREAT_MAP_VIEWBOX = { w: 1000, h: 520 } as const;

export const WORLD_LAND_PATHS: readonly string[] = [
  // Norteamérica + Centroamérica
  "M 68 118 L 95 82 L 175 68 L 285 88 L 335 128 L 348 188 L 322 248 L 268 278 L 198 272 L 115 228 L 72 178 Z",
  // Sudamérica
  "M 248 278 L 335 268 L 365 335 L 348 428 L 305 468 L 255 448 L 225 365 L 232 302 Z",
  // Groenlandia
  "M 448 42 L 502 38 L 512 92 L 475 102 L 442 72 Z",
  // Europa occidental + islas
  "M 438 92 L 518 78 L 558 118 L 552 168 L 508 192 L 455 178 L 422 138 Z",
  // África
  "M 438 198 L 538 185 L 568 255 L 558 365 L 518 422 L 462 412 L 415 318 L 418 228 Z",
  // Oriente Medio / sur de Asia central
  "M 548 168 L 628 155 L 658 208 L 632 268 L 575 258 L 535 215 Z",
  // Rusia / Asia central (norte)
  "M 528 52 L 698 58 L 752 108 L 738 188 L 648 198 L 565 148 L 518 95 Z",
  // India / subcontinente
  "M 632 198 L 718 188 L 738 248 L 708 298 L 652 288 L 618 248 Z",
  // Este de Asia (CN / KR / JP)
  "M 708 128 L 825 115 L 895 145 L 912 198 L 875 252 L 785 242 L 722 198 L 698 155 Z",
  // Sudeste asiático / arco hacia SG
  "M 712 238 L 798 222 L 825 278 L 788 312 L 738 298 L 705 268 Z",
  // Japón (arco insular)
  "M 848 128 L 905 118 L 918 168 L 882 188 L 838 168 Z",
  // Australia
  "M 778 298 L 925 288 L 948 358 L 918 432 L 848 448 L 792 398 L 775 338 Z"
];
