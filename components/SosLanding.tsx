"use client";

import type { Route } from "next";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Lock, Radio, Shield, Zap } from "lucide-react";
import { useCallback, useId, useState } from "react";

import { NUO_WHATSAPP_MX_URL } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/provider";
import { localizedHome } from "@/lib/i18n/paths";
import { cn } from "@/lib/utils";

function buildWhatsAppEmergencyUrl(body: string): string {
  const u = new URL(NUO_WHATSAPP_MX_URL);
  u.searchParams.set("text", body);
  return u.toString();
}

export function SosLanding(): JSX.Element {
  const { locale, messages } = useI18n();
  const m = messages.sosLanding;
  const formId = useId();
  const reduceMotion = useReducedMotion();
  const homeHref = localizedHome(locale) as Route;

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [touched, setTouched] = useState(false);

  const valid =
    name.trim().length >= 2 &&
    company.trim().length >= 2 &&
    website.trim().length >= 3 &&
    whatsapp.replace(/\D/g, "").length >= 10;

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setTouched(true);
      if (!valid) return;
      const body = [
        m.whatsappLeadTitle,
        "",
        `${m.fieldName}: ${name.trim()}`,
        `${m.fieldCompany}: ${company.trim()}`,
        `${m.fieldWebsite}: ${website.trim()}`,
        `${m.fieldWhatsapp}: ${whatsapp.trim()}`,
        "",
        m.whatsappLeadFooter
      ].join("\n");
      window.open(buildWhatsAppEmergencyUrl(body), "_blank", "noopener,noreferrer");
    },
    [valid, name, company, website, whatsapp, m]
  );

  return (
    <div className="relative min-h-[100dvh] bg-[#020617] text-zinc-100">
      <a
        href="#sos-form"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-cyan-500 focus:px-3 focus:py-2 focus:text-black"
      >
        {m.skipToForm}
      </a>

      {/* Sticky emergency bar — Neon Cyan */}
      <div
        className="sticky top-0 z-50 flex items-center justify-center gap-2 border-b border-cyan-400/40 bg-[#22d3ee] px-4 py-2.5 text-center shadow-[0_0_24px_rgba(34,211,238,0.45)] sm:py-3"
        role="banner"
      >
        <Radio className="h-4 w-4 shrink-0 text-[#020617] motion-safe:animate-pulse sm:h-5 sm:w-5" aria-hidden />
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#020617] sm:text-xs sm:tracking-[0.18em]">
          {m.emergencyBar}
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-1/4 top-0 h-[60vh] w-[80%] rounded-full bg-fuchsia-600/10 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 h-[50vh] w-[70%] rounded-full bg-cyan-500/8 blur-[100px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
        <div className="mb-8 flex items-center justify-between gap-3">
          <Link href={homeHref} className="inline-flex items-center gap-2 opacity-90 transition-opacity hover:opacity-100">
            <Image src="/logos/nuo-isotype-white.png" alt="" width={36} height={36} className="h-9 w-9" />
            <span className="font-heading text-sm font-semibold tracking-tight text-white">NUO Networks</span>
          </Link>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-cyan-400/90 sm:inline">
            {m.badgeCorner}
          </span>
        </div>

        <header className="text-center sm:text-left">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-fuchsia-400/95">{m.kicker}</p>
          <h1 className="mt-3 font-heading text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-[2.1rem]">
            {m.headline}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 sm:mx-0 sm:text-base">
            {m.subhead}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <span className="inline-flex items-center rounded-full border border-cyan-400/35 bg-cyan-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan-300">
              {m.pillResponse}
            </span>
            <span className="inline-flex items-center rounded-full border border-fuchsia-500/35 bg-fuchsia-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-fuchsia-200/90">
              {m.pillLocal}
            </span>
          </div>
        </header>

        {/* Visual: magenta pulse + blocked attacks */}
        <section className="relative mx-auto mt-10 flex min-h-[200px] max-w-md items-center justify-center sm:mt-12" aria-hidden>
          <div className="relative flex h-48 w-48 items-center justify-center sm:h-56 sm:w-56">
            {!reduceMotion ? (
              <>
                <motion.span
                  className="absolute inset-0 rounded-full border border-fuchsia-500/30"
                  animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.span
                  className="absolute inset-4 rounded-full border border-fuchsia-400/25"
                  animate={{ scale: [1, 1.28], opacity: [0.45, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
                />
                <motion.span
                  className="absolute inset-10 rounded-full border border-cyan-400/20"
                  animate={{ scale: [1, 1.2], opacity: [0.35, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
                />
              </>
            ) : (
              <span className="absolute inset-8 rounded-full border border-fuchsia-500/40" />
            )}
            <div className="relative z-10 flex h-28 w-28 flex-col items-center justify-center rounded-full border border-fuchsia-500/50 bg-[#020617]/90 shadow-[0_0_40px_rgba(217,70,239,0.35),inset_0_0_24px_rgba(34,211,238,0.08)] backdrop-blur-sm sm:h-32 sm:w-32">
              <Shield className="h-10 w-10 text-fuchsia-400 drop-shadow-[0_0_12px_rgba(217,70,239,0.6)] sm:h-12 sm:w-12" />
              <span className="mt-1 font-mono text-[9px] uppercase tracking-widest text-cyan-300/90">{m.visualLabel}</span>
            </div>
          </div>
          <p className="absolute bottom-0 left-0 right-0 text-center font-mono text-[10px] text-zinc-600">{m.visualCaption}</p>
        </section>

        {/* Form */}
        <section id="sos-form" className="mt-14 scroll-mt-28">
          <form
            onSubmit={onSubmit}
            className={cn(
              "rounded-2xl border border-cyan-400/25 bg-white/[0.03] p-5 shadow-[0_0_0_1px_rgba(34,211,238,0.08),0_0_48px_rgba(6,182,212,0.12),0_24px_64px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8"
            )}
            noValidate
          >
            <h2 className="font-heading text-lg font-semibold text-white sm:text-xl">{m.formTitle}</h2>
            <p className="mt-1 text-sm text-zinc-500">{m.formSubtitle}</p>

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor={`${formId}-name`} className="mb-1.5 block text-xs font-medium text-zinc-400">
                  {m.fieldName}
                </label>
                <input
                  id={`${formId}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none ring-cyan-400/30 placeholder:text-zinc-600 focus:border-cyan-400/50 focus:ring-2"
                  placeholder={m.placeholderName}
                />
              </div>
              <div>
                <label htmlFor={`${formId}-company`} className="mb-1.5 block text-xs font-medium text-zinc-400">
                  {m.fieldCompany}
                </label>
                <input
                  id={`${formId}-company`}
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none ring-cyan-400/30 placeholder:text-zinc-600 focus:border-cyan-400/50 focus:ring-2"
                  placeholder={m.placeholderCompany}
                />
              </div>
              <div>
                <label htmlFor={`${formId}-website`} className="mb-1.5 block text-xs font-medium text-zinc-400">
                  {m.fieldWebsite}
                </label>
                <input
                  id={`${formId}-website`}
                  name="website"
                  type="url"
                  inputMode="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none ring-cyan-400/30 placeholder:text-zinc-600 focus:border-cyan-400/50 focus:ring-2"
                  placeholder="https://"
                />
              </div>
              <div>
                <label htmlFor={`${formId}-whatsapp`} className="mb-1.5 block text-xs font-medium text-zinc-400">
                  {m.fieldWhatsapp}
                </label>
                <input
                  id={`${formId}-whatsapp`}
                  name="whatsapp"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none ring-cyan-400/30 placeholder:text-zinc-600 focus:border-cyan-400/50 focus:ring-2"
                  placeholder={m.placeholderWhatsapp}
                />
              </div>
            </div>

            {touched && !valid ? (
              <p className="mt-4 text-sm text-amber-400/95" role="alert">
                {m.formError}
              </p>
            ) : null}

            <button
              type="submit"
              className="mt-8 w-full rounded-xl border-2 border-cyan-400/55 bg-gradient-to-b from-cyan-500/25 to-cyan-600/10 py-4 text-base font-bold uppercase tracking-[0.14em] text-cyan-50 shadow-[0_0_28px_rgba(34,211,238,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] transition hover:border-cyan-300/70 hover:from-cyan-400/35 hover:shadow-[0_0_40px_rgba(34,211,238,0.45)] sm:text-lg"
            >
              {m.cta}
            </button>
            <p className="mt-4 text-center font-mono text-[10px] leading-relaxed text-zinc-600">{m.formNote}</p>
          </form>
        </section>

        {/* Technical promise */}
        <section className="mt-14 border-t border-white/[0.06] pt-10">
          <h2 className="text-center font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">{m.techTitle}</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Shield, title: m.tech1Title, body: m.tech1Body },
              { icon: Zap, title: m.tech2Title, body: m.tech2Body },
              { icon: Lock, title: m.tech3Title, body: m.tech3Body }
            ].map(({ icon: Icon, title, body }) => (
              <li
                key={title}
                className="rounded-xl border border-cyan-500/15 bg-black/30 p-4 text-center shadow-[inset_0_0_0_1px_rgba(34,211,238,0.06)] sm:text-left"
              >
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/35 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)] sm:mx-0">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="font-heading text-sm font-semibold text-white">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">{body}</p>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-12 text-center font-mono text-[10px] leading-relaxed text-zinc-600">{m.disclaimer}</p>
      </main>
    </div>
  );
}
