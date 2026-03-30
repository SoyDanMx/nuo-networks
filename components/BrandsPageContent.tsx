"use client";

import type { Route } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

import { PartnerBrandLogo } from "@/components/PartnerBrandLogo";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useI18n } from "@/lib/i18n/provider";
import { localizedHome, localizedPath } from "@/lib/i18n/paths";

const BrandsPageContent = (): JSX.Element => {
  const { locale, messages } = useI18n();
  const b = messages.brandsPage;
  const brands = messages.partners.brands;
  const homeHref = localizedHome(locale) as Route;
  const marcasHref = localizedPath(locale, "/marcas") as Route;

  return (
    <div className="min-h-screen bg-[#020617]">
      <Header />
      <main className="relative overflow-hidden border-b border-cyan-500/10" id="main">
        <div className="pointer-events-none absolute inset-0 cyber-grid-bg opacity-[0.07]" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsl(187_86%_53%/0.12),transparent_50%)]"
          aria-hidden
        />

        <div className="container relative z-10 mx-auto min-w-0 max-w-5xl px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 md:pt-32">
          <Link
            href={homeHref}
            className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-cyan-400"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {b.backHome}
          </Link>

          <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-cyan-400/90">{b.kicker}</p>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">{b.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">{b.subtitle}</p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground/95 md:text-lg">{b.intro}</p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={b.epcomUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-6 py-3.5 font-mono text-sm font-semibold uppercase tracking-wider text-cyan-200 shadow-[0_0_28px_hsl(187_86%_53%/0.2)] transition-all hover:border-cyan-400/60 hover:bg-cyan-500/15"
            >
              {b.epcomButton}
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
            <span className="font-mono text-[10px] text-muted-foreground md:pl-2">
              <span className="text-cyan-500/80">URL:</span>{" "}
              <span className="break-all text-muted-foreground/90">{b.epcomUrl}</span>
            </span>
          </div>

          <p className="mt-14 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{b.gridTitle}</p>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand, i) => (
              <motion.li
                key={brand.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.45), duration: 0.35 }}
              >
                <div className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] backdrop-blur-sm transition-colors hover:border-cyan-500/25">
                  <PartnerBrandLogo brandId={brand.id} label={brand.label} variant="grid" />
                  <span className="text-center font-heading text-sm font-semibold text-foreground md:text-base">{brand.label}</span>
                </div>
              </motion.li>
            ))}
          </ul>

          <p className="mx-auto mt-14 max-w-3xl border-t border-border/50 pt-10 text-center text-xs leading-relaxed text-muted-foreground md:text-sm">
            {b.footnote}
          </p>

          <p className="mt-6 text-center font-mono text-[10px] text-muted-foreground/80">
            {locale === "es" ? "Ruta" : "Path"}:{" "}
            <code className="rounded bg-white/5 px-2 py-0.5 text-cyan-400/90">{marcasHref}</code>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BrandsPageContent;
