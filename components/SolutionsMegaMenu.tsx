"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { SOLUTION_MENU_ICONS } from "@/lib/solutions-menu";
import { useI18n } from "@/lib/i18n/provider";
import { localizedHash } from "@/lib/i18n/paths";

const SolutionsMegaMenu = (): JSX.Element => {
  const { locale, messages } = useI18n();
  const h = messages.header;
  const menu = messages.solutionsMenu;
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent): void => {
      const root = rootRef.current;
      if (!root?.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [open, close]);

  const duration = reduceMotion ? 0 : 0.22;

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[open=true]:text-primary"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
        data-open={open}
        onClick={toggle}
      >
        {h.navSolutions}
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label={menu.backdropAria}
              className="fixed inset-x-0 bottom-0 top-20 z-40 cursor-default bg-background/55 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: duration * 0.9 }}
              onClick={close}
            />
            <motion.div
              id={panelId}
              role="region"
              aria-label={menu.panelAria}
              className="fixed left-0 right-0 top-20 z-50 border-b border-primary/20 bg-[#020617]/95 shadow-[0_28px_80px_-24px_hsl(var(--primary)/0.35)] backdrop-blur-xl"
              initial={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
              transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="pointer-events-auto container mx-auto max-w-7xl px-6 py-10">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-8">
                  {menu.columns.map((col) => (
                    <div key={col.id}>
                      <h3 className="mb-4 border-b border-border/60 pb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                        {col.title}
                      </h3>
                      <ul className="space-y-1">
                        {col.items.map((item, idx) => {
                          const iconKey = "icon" in item ? item.icon : undefined;
                          const Icon = iconKey ? SOLUTION_MENU_ICONS[iconKey] : undefined;
                          const href = localizedHash(locale, item.hash.startsWith("#") ? item.hash : `#${item.hash}`);
                          return (
                            <li key={`${col.id}-${idx}`}>
                              <a
                                href={href}
                                className="group flex items-start gap-2.5 rounded-lg py-2 pl-1 pr-2 text-sm text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary"
                                onClick={close}
                              >
                                {Icon ? (
                                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/5 text-primary transition-colors group-hover:border-secondary/50 group-hover:text-secondary">
                                    <Icon className="h-4 w-4" aria-hidden="true" />
                                  </span>
                                ) : (
                                  <span
                                    className="mt-2 ml-1 h-1 w-1 shrink-0 rounded-full bg-secondary/80 opacity-70 group-hover:bg-secondary"
                                    aria-hidden="true"
                                  />
                                )}
                                <span className="leading-snug">{item.label}</span>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
                <p className="mt-8 border-t border-border/50 pt-6 text-center text-xs text-muted-foreground">
                  {menu.disclaimer}
                </p>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default SolutionsMegaMenu;
