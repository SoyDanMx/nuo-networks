"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Copy, ExternalLink, Minus, Plus, Send, ShoppingBag, Trash2, X } from "lucide-react";
import { useCallback } from "react";

import { useEshopCart } from "@/components/eshop/EshopCartContext";
import { NUO_CONTACT_EMAIL, NUO_CONTACT_MAILTO } from "@/lib/constants";
import { epcomSearchUrl } from "@/lib/epcom";
import { useI18n } from "@/lib/i18n/provider";

interface EshopQuoteDrawerProps {
  open: boolean;
  onClose: () => void;
  departmentLabels: Record<string, string>;
}

export function EshopQuoteDrawer({ open, onClose, departmentLabels }: EshopQuoteDrawerProps): JSX.Element {
  const { locale, messages } = useI18n();
  const s = messages.eshopPage.store;
  const { lines, totalUnits, setQty, removeLine, clear } = useEshopCart();

  const formatListText = useCallback(() => {
    return lines
      .map((l) => {
        const dept = departmentLabels[l.deptId] ?? l.deptId;
        return `${l.line} × ${l.qty}  (${dept})`;
      })
      .join("\n");
  }, [lines, departmentLabels]);

  const mailtoHref = useCallback(() => {
    const list = formatListText();
    const subject = s.emailSubject;
    const body =
      locale === "es"
        ? `Hola NUO,\n\nSolicito cotización por las siguientes líneas del E-Shop (referencia EPCOM):\n\n${list}\n\nGracias.`
        : `Hello NUO,\n\nPlease quote the following E-Shop lines (EPCOM reference):\n\n${list}\n\nThank you.`;
    return `${NUO_CONTACT_MAILTO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [formatListText, locale, s.emailSubject]);

  const copyList = useCallback(async () => {
    const text = formatListText();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* ignore */
    }
  }, [formatListText]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label={s.drawerClose}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="eshop-drawer-title"
            className="fixed bottom-0 right-0 top-0 z-[210] flex w-full max-w-md flex-col border-l border-cyan-500/20 bg-[#020617]/98 shadow-[0_0_80px_rgba(6,182,212,0.15)] backdrop-blur-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
                  <ShoppingBag className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h2 id="eshop-drawer-title" className="font-heading text-lg font-semibold text-foreground">
                    {s.cartTitle}
                  </h2>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {totalUnits} {s.unitsLabel}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                onClick={onClose}
                aria-label={s.drawerClose}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              {lines.length === 0 ? (
                <p className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-10 text-center text-sm text-muted-foreground">
                  {s.emptyCart}
                </p>
              ) : (
                <ul className="flex flex-col gap-3">
                  {lines.map((l) => (
                    <li
                      key={l.id}
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
                    >
                      <p className="text-sm font-medium leading-snug text-foreground">{l.line}</p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-cyan-500/70">
                        {departmentLabels[l.deptId] ?? l.deptId}
                      </p>
                      <div className="mt-3 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-black/20 p-0.5">
                          <button
                            type="button"
                            className="rounded-md p-1.5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                            aria-label={s.decreaseQty}
                            onClick={() =>
                              l.qty <= 1 ? removeLine(l.id) : setQty(l.id, l.qty - 1)
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-[2rem] text-center font-mono text-sm text-foreground">{l.qty}</span>
                          <button
                            type="button"
                            className="rounded-md p-1.5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                            aria-label={s.increaseQty}
                            onClick={() => setQty(l.id, l.qty + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex gap-1">
                          <a
                            href={epcomSearchUrl(l.line)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2 py-1.5 font-mono text-[10px] uppercase tracking-wider text-cyan-400/90 transition-colors hover:border-cyan-500/40 hover:bg-cyan-500/10"
                          >
                            EPCOM
                            <ExternalLink className="h-3 w-3" aria-hidden />
                          </a>
                          <button
                            type="button"
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-red-500/10 hover:text-red-400"
                            aria-label={s.removeLine}
                            onClick={() => removeLine(l.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-white/10 p-4 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-3 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-cyan-500/30"
                  onClick={() => void copyList()}
                  disabled={lines.length === 0}
                >
                  <Copy className="h-4 w-4" aria-hidden />
                  {s.copyList}
                </button>
                <a
                  href={mailtoHref()}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-fuchsia-500/40 bg-fuchsia-500/10 px-3 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-fuchsia-200 transition-colors hover:border-fuchsia-400/60 disabled:pointer-events-none disabled:opacity-40"
                  onClick={onClose}
                  aria-disabled={lines.length === 0}
                  style={{ pointerEvents: lines.length === 0 ? "none" : undefined, opacity: lines.length === 0 ? 0.4 : 1 }}
                >
                  <Send className="h-4 w-4" aria-hidden />
                  {s.emailQuote}
                </a>
              </div>
              <p className="text-center font-mono text-[10px] text-muted-foreground">
                {s.emailTo} <span className="text-cyan-500/80">{NUO_CONTACT_EMAIL}</span>
              </p>
              {lines.length > 0 ? (
                <button
                  type="button"
                  className="w-full py-2 text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-red-400/90"
                  onClick={() => clear()}
                >
                  {s.clearCart}
                </button>
              ) : null}
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
