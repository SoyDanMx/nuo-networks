"use client";

import type { Route } from "next";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ExternalLink,
  Flame,
  LayoutGrid,
  Search,
  ShoppingCart,
  Sparkles,
  Warehouse,
  Zap
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { EshopQuoteDrawer } from "@/components/eshop/EshopQuoteDrawer";
import { useEshopCart } from "@/components/eshop/EshopCartContext";
import { ESHOP_DEPARTMENTS } from "@/data/eshop-catalog";
import { getEshopCatalogRows } from "@/data/eshop-catalog-flat";
import { EPCOM_URLS, epcomSearchUrl } from "@/lib/epcom";
import { useI18n } from "@/lib/i18n/provider";
import { localizedHash, localizedHome } from "@/lib/i18n/paths";

const ROWS = getEshopCatalogRows();

export function EshopStorefront(): JSX.Element {
  const { locale, messages } = useI18n();
  const e = messages.eshopPage;
  const s = e.store;
  const labels = e.departmentLabels as Record<string, string>;
  const home = localizedHome(locale) as Route;
  const contactHref = localizedHash(locale, "#contact");

  const [query, setQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [flashId, setFlashId] = useState<string | null>(null);

  const { addLine, totalUnits } = useEshopCart();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ROWS.filter((row) => {
      if (deptFilter && row.deptId !== deptFilter) return false;
      if (!q) return true;
      const dept = (labels[row.deptId] ?? row.deptId).toLowerCase();
      return row.line.toLowerCase().includes(q) || dept.includes(q) || row.deptId.toLowerCase().includes(q);
    });
  }, [query, deptFilter, labels]);

  const onAdd = (row: (typeof ROWS)[number]) => {
    addLine({ id: row.id, deptId: row.deptId, line: row.line });
    setFlashId(row.id);
    window.setTimeout(() => setFlashId((cur) => (cur === row.id ? null : cur)), 900);
  };

  return (
    <>
      <article className="container relative z-10 mx-auto max-w-7xl px-4 pb-28 pt-24 sm:px-6 md:pt-28">
        <Link
          href={home}
          className="mb-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-cyan-400"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {e.backHome}
        </Link>

        {/* Bento hero */}
        <div className="grid gap-4 md:grid-cols-12 md:gap-5">
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/15 via-[#0a1628] to-fuchsia-950/30 p-6 shadow-[0_0_60px_rgba(6,182,212,0.12)] md:col-span-7 md:p-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute -bottom-16 left-10 h-48 w-48 rounded-full bg-cyan-500/15 blur-3xl" aria-hidden />
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300/90">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              {s.heroBadge}
            </span>
            <h1 className="mt-5 font-heading text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              {e.title}
            </h1>
            <p className="mt-4 max-w-xl text-base text-cyan-100/75 md:text-lg">{e.subtitle}</p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">{e.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={contactHref}
                className="inline-flex items-center gap-2 rounded-xl border border-fuchsia-500/50 bg-fuchsia-500/15 px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-fuchsia-100 shadow-[0_0_24px_rgba(217,70,239,0.2)] transition-all hover:border-fuchsia-400/70"
              >
                <Zap className="h-4 w-4" aria-hidden />
                {e.ctaContact}
              </a>
              <a
                href={EPCOM_URLS.brands}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white/90 transition-colors hover:border-cyan-400/40"
              >
                {s.epcomBrands}
                <ExternalLink className="h-4 w-4 opacity-70" aria-hidden />
              </a>
            </div>
          </motion.div>

          <div className="grid gap-4 md:col-span-5 md:grid-rows-2">
            <motion.a
              href={EPCOM_URLS.superdeals}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-amber-500/25 bg-gradient-to-br from-amber-500/10 to-transparent p-5 transition-all hover:border-amber-400/45"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.06 }}
            >
              <Flame className="h-8 w-8 text-amber-400/90" aria-hidden />
              <div>
                <p className="font-heading text-lg font-semibold text-amber-100">{s.epcomDeals}</p>
                <p className="mt-2 text-sm text-amber-100/60">{s.epcomDealsHint}</p>
              </div>
              <ExternalLink className="absolute right-4 top-4 h-4 w-4 text-amber-200/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
            <motion.div
              className="grid grid-cols-3 gap-2 rounded-3xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              <div className="rounded-2xl border border-cyan-500/15 bg-cyan-500/5 p-3 text-center">
                <p className="font-heading text-2xl font-bold text-cyan-300">{ROWS.length}</p>
                <p className="mt-1 font-mono text-[9px] uppercase leading-tight tracking-wider text-muted-foreground">
                  {s.statLines}
                </p>
              </div>
              <div className="rounded-2xl border border-fuchsia-500/15 bg-fuchsia-500/5 p-3 text-center">
                <p className="font-heading text-2xl font-bold text-fuchsia-300">{ESHOP_DEPARTMENTS.length}</p>
                <p className="mt-1 font-mono text-[9px] uppercase leading-tight tracking-wider text-muted-foreground">
                  {s.statFamilies}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3 text-center">
                <Warehouse className="mx-auto h-6 w-6 text-white/40" aria-hidden />
                <p className="mt-2 font-mono text-[9px] uppercase leading-tight tracking-wider text-muted-foreground">
                  {s.statEpcom}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-muted-foreground md:text-sm">{s.epcomNote}</p>

        {/* Command bar */}
        <div className="sticky top-[4.5rem] z-30 mt-10 -mx-4 border-y border-white/5 bg-[#020617]/90 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:rounded-2xl sm:border sm:px-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-500/50" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(ev) => setQuery(ev.target.value)}
                placeholder={s.searchPlaceholder}
                className="w-full rounded-xl border border-white/10 bg-black/30 py-2.5 pl-10 pr-4 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 outline-none ring-cyan-500/30 transition-shadow focus:border-cyan-500/35 focus:ring-2"
                autoComplete="off"
                aria-label={s.searchAria}
              />
            </div>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="relative inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-cyan-200 transition-all hover:bg-cyan-500/15"
            >
              <ShoppingCart className="h-4 w-4" aria-hidden />
              {s.openCart}
              {totalUnits > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-fuchsia-500 px-1 font-mono text-[10px] font-bold text-white">
                  {totalUnits > 99 ? "99+" : totalUnits}
                </span>
              ) : null}
            </button>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-thin [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              onClick={() => setDeptFilter(null)}
              className={`shrink-0 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                deptFilter === null
                  ? "border-cyan-500/50 bg-cyan-500/15 text-cyan-200"
                  : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/20"
              }`}
            >
              {s.filterAll}
            </button>
            {ESHOP_DEPARTMENTS.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDeptFilter((cur) => (cur === d.id ? null : d.id))}
                className={`max-w-[200px] shrink-0 truncate rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                  deptFilter === d.id
                    ? "border-fuchsia-500/45 bg-fuchsia-500/10 text-fuchsia-200"
                    : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/20"
                }`}
                title={labels[d.id] ?? d.id}
              >
                {labels[d.id] ?? d.id}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2 font-mono uppercase tracking-wider">
            <LayoutGrid className="h-3.5 w-3.5" aria-hidden />
            {s.showingCount.replace("{n}", String(filtered.length))}
          </span>
          {query || deptFilter ? (
            <button
              type="button"
              className="font-mono text-[10px] uppercase tracking-wider text-cyan-500/80 hover:text-cyan-400"
              onClick={() => {
                setQuery("");
                setDeptFilter(null);
              }}
            >
              {s.resetFilters}
            </button>
          ) : null}
        </div>

        {/* Product mosaic */}
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((row) => (
            <motion.li
              key={row.id}
              layout
              transition={{ duration: 0.2 }}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-gradient-to-b from-white/[0.07] to-transparent p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-all hover:border-cyan-500/30 hover:shadow-[0_0_32px_rgba(6,182,212,0.08)] ${
                flashId === row.id ? "border-cyan-400/60 ring-2 ring-cyan-500/30" : "border-white/10"
              }`}
            >
              <span className="inline-block max-w-full truncate rounded-md border border-cyan-500/20 bg-cyan-500/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-cyan-400/85">
                {labels[row.deptId] ?? row.deptId}
              </span>
              <p className="mt-3 flex-1 font-medium leading-snug text-foreground">{row.line}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => onAdd(row)}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-fuchsia-500/40 bg-fuchsia-500/10 px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-fuchsia-200 transition-colors hover:border-fuchsia-400/60 min-[380px]:flex-none"
                >
                  {s.addToQuote}
                </button>
                <a
                  href={epcomSearchUrl(row.line)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/12 bg-black/25 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-cyan-300/90 transition-colors hover:border-cyan-500/35"
                >
                  {s.openEpcom}
                  <ExternalLink className="h-3 w-3 opacity-70" aria-hidden />
                </a>
              </div>
            </motion.li>
          ))}
        </ul>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-sm text-muted-foreground">{s.noResults}</p>
        ) : null}

        {/* SEO fold — keeps long text crawlable */}
        <details className="group mt-20 rounded-2xl border border-white/[0.06] bg-white/[0.02] open:border-cyan-500/20">
          <summary className="cursor-pointer list-none px-5 py-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors marker:content-none group-open:text-cyan-400/90 [&::-webkit-details-marker]:hidden">
            <span className="inline-flex items-center gap-2">
              {s.seoFoldLabel}
              <span className="text-[10px] text-muted-foreground/70">▸</span>
            </span>
          </summary>
          <div className="border-t border-white/5 px-5 py-6">
            <section aria-labelledby="eshop-seo-heading" className="max-w-4xl">
              <h2 id="eshop-seo-heading" className="font-heading text-lg font-semibold text-foreground md:text-xl">
                {e.seoSectionHeading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{e.seoSectionBody}</p>
            </section>
            <nav aria-label={e.tocLabel} className="mt-10">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{e.tocLabel}</p>
              <ul className="columns-1 gap-x-8 gap-y-1 sm:columns-2 lg:columns-3">
                {ESHOP_DEPARTMENTS.map((dept) => (
                  <li key={dept.id} className="break-inside-avoid py-1">
                    <a href={`#cat-${dept.id}`} className="text-sm text-cyan-400/90 hover:underline">
                      {labels[dept.id] ?? dept.id}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-12 space-y-12">
              {ESHOP_DEPARTMENTS.map((dept) => (
                <section key={dept.id} id={`cat-${dept.id}`} className="scroll-mt-32">
                  <h3 className="border-b border-cyan-500/15 pb-2 font-heading text-lg font-semibold text-foreground">
                    {labels[dept.id] ?? dept.id}
                  </h3>
                  <ul className="mt-3 columns-1 gap-x-10 text-sm text-muted-foreground sm:columns-2 lg:columns-3">
                    {dept.lines.map((line) => (
                      <li key={line} className="break-inside-avoid py-1">
                        <span className="text-cyan-500/35">· </span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </details>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-muted-foreground">{e.disclaimer}</p>
      </article>

      <EshopQuoteDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} departmentLabels={labels} />

      <AnimatePresence>
        {totalUnits > 0 && !drawerOpen ? (
          <motion.button
            type="button"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            className="fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/40 bg-[#020617]/95 text-cyan-300 shadow-[0_0_40px_rgba(6,182,212,0.25)] backdrop-blur-md md:hidden"
            onClick={() => setDrawerOpen(true)}
            aria-label={s.openCart}
          >
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-fuchsia-500 px-1 text-[10px] font-bold text-white">
              {totalUnits > 99 ? "99+" : totalUnits}
            </span>
          </motion.button>
        ) : null}
      </AnimatePresence>
    </>
  );
}
