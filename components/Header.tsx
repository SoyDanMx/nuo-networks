"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import SolutionsMegaMenu from "@/components/SolutionsMegaMenu";
import { useI18n } from "@/lib/i18n/provider";
import { localizedHash, localizedHome, localizedPath } from "@/lib/i18n/paths";

const Header = (): JSX.Element => {
  const { locale, messages } = useI18n();
  const h = messages.header;
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = [
    { label: h.navHome, hash: "#hero" as const },
    { label: h.navSectors, hash: "#sectors" as const },
    { label: h.navEcosystem, hash: "#nuo-ecosystem" as const },
    { label: h.navProcess, hash: "#journey" as const },
    { label: h.navContact, hash: "#contact" as const }
  ];

  const homeHref = localizedHome(locale);
  const brandsHref = localizedPath(locale, "/marcas") as Route;
  const eshopHref = localizedPath(locale, "/eshop") as Route;
  const threatMapHref = localizedPath(locale, "/threat-map") as Route;

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-500/15 bg-[#020617]/85 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 min-w-0 items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6">
        <Link
          href={homeHref as Route}
          className="inline-flex shrink-0 items-center"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/logos/nuo-logo-white.png"
            alt="NUO Networks"
            width={240}
            height={60}
            priority
            className="hidden h-12 w-auto md:block"
          />
          <Image
            src="/logos/nuo-isotype-white.png"
            alt="NUO Isotipo"
            width={44}
            height={44}
            priority
            className="block h-11 w-11 md:hidden"
          />
        </Link>

        <nav aria-label={h.navLabel} className="hidden items-center gap-5 lg:flex">
          {nav.slice(0, 1).map((item) => (
            <a
              key={item.hash}
              href={localizedHash(locale, item.hash)}
              className="text-sm text-muted-foreground transition-colors hover:text-cyan-400"
            >
              {item.label}
            </a>
          ))}
          <SolutionsMegaMenu />
          <Link
            href={brandsHref}
            className="text-sm text-muted-foreground transition-colors hover:text-cyan-400"
          >
            {h.navBrands}
          </Link>
          <Link
            href={eshopHref}
            className="text-sm text-muted-foreground transition-colors hover:text-cyan-400"
          >
            {h.navEshop}
          </Link>
          <Link
            href={threatMapHref}
            className="text-sm text-muted-foreground transition-colors hover:text-cyan-400"
          >
            {h.navThreatMap}
          </Link>
          {nav.slice(1).map((item) => (
            <a
              key={item.hash}
              href={localizedHash(locale, item.hash)}
              className="text-sm text-muted-foreground transition-colors hover:text-cyan-400"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className="flex items-center rounded-lg border border-border/80 bg-white/[0.04] p-0.5 backdrop-blur-sm"
            role="group"
            aria-label="Language"
          >
            <Link
              href={"/" as Route}
              className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                locale === "es" ? "bg-cyan-500/20 text-cyan-400" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-current={locale === "es" ? "true" : undefined}
            >
              {h.langEs}
            </Link>
            <Link
              href={"/en" as Route}
              className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                locale === "en" ? "bg-cyan-500/20 text-cyan-400" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-current={locale === "en" ? "true" : undefined}
            >
              {h.langEn}
            </Link>
          </div>

          <a
            href={localizedHash(locale, "#contact")}
            className="hidden rounded-lg border border-fuchsia-500/50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-fuchsia-300 transition-all hover:bg-fuchsia-500/10 sm:inline-flex"
          >
            {h.portal}
          </a>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 transition-colors hover:bg-cyan-500/15 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? h.menuClose : h.menuOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.button
              type="button"
              aria-label={h.menuClose}
              className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              id="mobile-nav"
              className="fixed inset-y-0 right-0 z-[100] flex w-[min(100vw-3rem,20rem)] flex-col border-l border-cyan-500/20 bg-[#020617] shadow-[0_0_60px_rgba(6,182,212,0.12)] lg:hidden"
              aria-label={h.menuNavAria}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
            >
              <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">NUO</span>
                <button
                  type="button"
                  className="rounded-lg p-2 text-muted-foreground hover:text-foreground"
                  aria-label={h.menuClose}
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-6">
                {nav.map((item) => (
                  <li key={item.hash}>
                    <a
                      href={localizedHash(locale, item.hash)}
                      className="block rounded-xl border border-transparent px-4 py-3.5 font-medium text-foreground transition-colors hover:border-cyan-500/25 hover:bg-cyan-500/5 hover:text-cyan-400"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <Link
                    href={brandsHref}
                    className="block rounded-xl border border-transparent px-4 py-3.5 font-medium text-foreground transition-colors hover:border-cyan-500/25 hover:bg-cyan-500/5 hover:text-cyan-400"
                    onClick={() => setMobileOpen(false)}
                  >
                    {h.navBrands}
                  </Link>
                </li>
                <li>
                  <Link
                    href={eshopHref}
                    className="block rounded-xl border border-transparent px-4 py-3.5 font-medium text-foreground transition-colors hover:border-cyan-500/25 hover:bg-cyan-500/5 hover:text-cyan-400"
                    onClick={() => setMobileOpen(false)}
                  >
                    {h.navEshop}
                  </Link>
                </li>
                <li>
                  <Link
                    href={threatMapHref}
                    className="block rounded-xl border border-transparent px-4 py-3.5 font-medium text-foreground transition-colors hover:border-cyan-500/25 hover:bg-cyan-500/5 hover:text-cyan-400"
                    onClick={() => setMobileOpen(false)}
                  >
                    {h.navThreatMap}
                  </Link>
                </li>
                <li>
                  <a
                    href={localizedHash(locale, "#nuo-ecosystem")}
                    className="block rounded-xl border border-transparent px-4 py-3.5 font-medium text-muted-foreground transition-colors hover:border-fuchsia-500/25 hover:bg-fuchsia-500/5 hover:text-fuchsia-300"
                    onClick={() => setMobileOpen(false)}
                  >
                    {h.navSolutions}
                  </a>
                </li>
              </ul>
              <div className="border-t border-border/60 p-4">
                <a
                  href={localizedHash(locale, "#contact")}
                  className="flex w-full items-center justify-center rounded-xl border border-fuchsia-500/50 py-3 text-sm font-semibold uppercase tracking-wider text-fuchsia-300"
                  onClick={() => setMobileOpen(false)}
                >
                  {h.portal}
                </a>
              </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
};

export default Header;
