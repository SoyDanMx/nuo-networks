"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { nuoContactMailtoSubjectBody } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/provider";

export type Cpa10ConcernId = "ransomware" | "physical" | "network";

interface Cpa10LeadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Cpa10LeadModal = ({ open, onOpenChange }: Cpa10LeadModalProps): JSX.Element => {
  const { messages } = useI18n();
  const m = messages.cpa10Modal;
  const pillars = m.pillars ?? [];
  const panelId = useId();
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [concern, setConcern] = useState<Cpa10ConcernId | "">("");
  const [touched, setTouched] = useState(false);

  const concernLabel = (id: Cpa10ConcernId): string => {
    const opt = m.concerns.find((c) => c.id === id);
    return opt?.label ?? id;
  };

  const reset = useCallback(() => {
    setName("");
    setEmail("");
    setConcern("");
    setTouched(false);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 80);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const valid =
    name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    concern !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) {
      return;
    }
    if (concern !== "ransomware" && concern !== "physical" && concern !== "network") {
      return;
    }
    const concernId: Cpa10ConcernId = concern;
    const body = [
      `${m.emailBodyName}: ${name.trim()}`,
      `${m.emailBodyEmail}: ${email.trim()}`,
      `${m.emailBodyConcern}: ${concernLabel(concernId)}`,
      "",
      m.emailBodyFooter
    ].join("\n");
    window.location.href = nuoContactMailtoSubjectBody(m.mailSubject, body);
    onOpenChange(false);
    reset();
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[85] flex items-end justify-center p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            aria-label={m.closeAria}
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${panelId}-title`}
            className="relative z-[90] flex max-h-[min(32rem,calc(100dvh-2rem))] w-full max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-2xl border border-cyan-500/35 bg-[#020617]/95 shadow-[0_0_0_1px_rgba(6,182,212,0.2),0_0_48px_rgba(6,182,212,0.15),0_24px_64px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:max-h-[min(36rem,90dvh)] sm:max-w-md"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            <div className="shrink-0 border-b border-white/10 px-4 py-3 sm:px-5 sm:py-4">
              <div className="flex items-start justify-between gap-2 sm:gap-3">
                <div className="min-w-0 flex-1 pr-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fuchsia-400/90">{m.badge}</p>
                  <h2
                    id={`${panelId}-title`}
                    className="mt-2 break-words font-heading text-lg font-bold tracking-tight text-foreground sm:text-xl md:text-2xl"
                  >
                    {m.headline}
                  </h2>
                  <p className="mt-2 text-xs text-muted-foreground sm:text-sm">{m.subhead}</p>
                  {m.frameworkIntro ? (
                    <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground/95 sm:text-xs">{m.frameworkIntro}</p>
                  ) : null}
                </div>
                <button
                  type="button"
                  className="rounded-lg border border-white/10 p-2 text-muted-foreground transition-colors hover:border-cyan-500/30 hover:text-foreground"
                  aria-label={m.closeAria}
                  onClick={() => onOpenChange(false)}
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5 sm:py-5"
            >
              {pillars.length > 0 ? (
                <section className="rounded-xl border border-cyan-500/20 bg-cyan-500/[0.05] p-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300/95">{m.pillarsTitle}</p>
                  <ol className="mt-2 space-y-2 text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
                    {pillars.map((pillar) => (
                      <li key={pillar.id} className="rounded-lg border border-white/10 bg-black/25 px-2.5 py-2">
                        <p className="font-medium text-foreground">
                          {pillar.id}. {pillar.title}
                        </p>
                        <p className="text-cyan-300/90">{pillar.category}</p>
                        <p>{pillar.detail}</p>
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}

              <div>
                <label htmlFor={`${panelId}-name`} className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  {m.fieldName}
                </label>
                <input
                  ref={firstFieldRef}
                  id={`${panelId}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-cyan-500/25 bg-black/40 px-3 py-2.5 text-sm text-foreground outline-none ring-offset-2 ring-offset-[#020617] transition-colors placeholder:text-muted-foreground/50 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/35"
                  placeholder={m.placeholderName}
                />
                {touched && name.trim().length < 2 ? (
                  <p className="mt-1 text-xs text-fuchsia-400/90">{m.errorName}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor={`${panelId}-email`} className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  {m.fieldEmail}
                </label>
                <input
                  id={`${panelId}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-cyan-500/25 bg-black/40 px-3 py-2.5 text-sm text-foreground outline-none ring-offset-2 ring-offset-[#020617] transition-colors placeholder:text-muted-foreground/50 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/35"
                  placeholder={m.placeholderEmail}
                />
                {touched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? (
                  <p className="mt-1 text-xs text-fuchsia-400/90">{m.errorEmail}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor={`${panelId}-concern`} className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  {m.fieldConcern}
                </label>
                <select
                  id={`${panelId}-concern`}
                  name="concern"
                  value={concern}
                  onChange={(e) => setConcern(e.target.value as Cpa10ConcernId | "")}
                  className="w-full appearance-none rounded-xl border border-cyan-500/25 bg-black/40 px-3 py-2.5 text-sm text-foreground outline-none ring-offset-2 ring-offset-[#020617] transition-colors focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/35"
                >
                  <option value="">{m.concernPlaceholder}</option>
                  {m.concerns.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
                {touched && concern === "" ? (
                  <p className="mt-1 text-xs text-fuchsia-400/90">{m.errorConcern}</p>
                ) : null}
              </div>

              <Button type="submit" variant="cyber-solid" size="lg" className="w-full py-6 text-base">
                {m.submit}
              </Button>
              <p className="text-center text-[11px] leading-relaxed text-muted-foreground">{m.disclaimer}</p>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Cpa10LeadModal;
