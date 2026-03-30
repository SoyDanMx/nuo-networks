"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  PARTNER_LOGO_DOMAIN_BY_ID,
  logoUrlClearbit,
  logoUrlGoogleFavicon
} from "@/lib/partner-logo-domains";

type LogoStage = 0 | 1 | "wordmark";

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

/**
 * Intenta logo Clearbit → favicon Google → wordmark tipográfico.
 * Los logos remotos dependen de terceros; el wordmark asegura siempre una lectura clara.
 */
export function PartnerBrandLogo({ brandId, label, variant = "marquee" }: PartnerBrandLogoProps): JSX.Element {
  const domain = PARTNER_LOGO_DOMAIN_BY_ID[brandId];
  const [stage, setStage] = useState<LogoStage>(domain ? 0 : "wordmark");

  useEffect(() => {
    setStage(domain ? 0 : "wordmark");
  }, [brandId, domain]);

  const urls = useMemo(() => {
    if (!domain) return [];
    return [logoUrlClearbit(domain), logoUrlGoogleFavicon(domain)];
  }, [domain]);

  const onError = useCallback(() => {
    setStage((s) => {
      if (s === 0) return 1;
      if (s === 1) return "wordmark";
      return "wordmark";
    });
  }, []);

  const compact = variant === "marquee";

  if (stage === "wordmark" || urls.length === 0) {
    return <WordmarkTile label={label} compact={compact} />;
  }

  const src = stage === 0 ? urls[0] : urls[1];
  const width = compact ? 200 : 240;
  const height = compact ? 48 : 56;

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] ${
        compact ? "h-12 w-[200px]" : "h-16 w-full max-w-[260px]"
      }`}
    >
      <Image
        src={src}
        alt={label}
        width={width - 24}
        height={height - 16}
        className="max-h-[36px] w-auto max-w-[calc(100%-1.5rem)] object-contain opacity-90 md:max-h-[40px]"
        unoptimized
        onError={onError}
      />
    </div>
  );
}
