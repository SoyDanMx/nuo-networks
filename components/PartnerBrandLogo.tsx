"use client";

import type { SimpleIcon } from "simple-icons";

import { getPartnerSimpleIcon } from "@/lib/partner-simple-icons";

interface PartnerBrandLogoProps {
  brandId: string;
  label: string;
  /** Carrusel: ancho fijo; página marcas: más ancho */
  variant?: "marquee" | "grid";
}

function WordmarkTile({ label, compact }: { label: string; compact: boolean }): JSX.Element {
  const h = compact ? 48 : 56;
  const w = compact ? 200 : 240;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={compact ? "h-12 w-[200px]" : "h-14 w-full max-w-[240px]"}
      role="img"
      aria-label={label}
    >
      <title>{label}</title>
      <rect width={w} height={h} rx="6" fill="rgba(15,23,42,0.72)" stroke="rgba(6,182,212,0.28)" />
      <text
        x={w / 2}
        y={compact ? 30 : 34}
        textAnchor="middle"
        fill="#94a3b8"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize={compact ? 10 : 11}
        fontWeight="600"
        textLength={w - 24}
        lengthAdjust="spacingAndGlyphs"
      >
        {label}
      </text>
    </svg>
  );
}

function SimpleIconTile({ icon, label, compact }: { icon: SimpleIcon; label: string; compact: boolean }): JSX.Element {
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] ${
        compact ? "h-12 w-[200px]" : "h-16 w-full max-w-[260px]"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        role="img"
        aria-label={label}
        className={
          compact
            ? "h-[34px] w-auto max-w-[min(168px,calc(100%-1.5rem))]"
            : "h-10 w-auto max-w-[min(220px,calc(100%-1.5rem))]"
        }
      >
        <title>{label}</title>
        <path fill={`#${icon.hex}`} d={icon.path} />
      </svg>
    </div>
  );
}

/**
 * Logotipos vectoriales embebidos (Simple Icons) cuando existen; si no, wordmark tipográfico estable.
 */
export function PartnerBrandLogo({ brandId, label, variant = "marquee" }: PartnerBrandLogoProps): JSX.Element {
  const compact = variant === "marquee";
  const icon = getPartnerSimpleIcon(brandId);

  if (icon) {
    return <SimpleIconTile icon={icon} label={label} compact={compact} />;
  }

  return <WordmarkTile label={label} compact={compact} />;
}
