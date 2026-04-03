"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Globe2, Landmark, Mail, MapPin, MessageCircle, Phone, Sprout } from "lucide-react";

import {
  NUO_CONTACT_EMAIL,
  NUO_CONTACT_MAILTO,
  NUO_US_PHONE_TEL,
  NUO_WHATSAPP_MX_URL,
  NUO_WHATSAPP_US_URL
} from "@/lib/constants";
import { useI18n } from "@/lib/i18n/provider";
import { localizedHome } from "@/lib/i18n/paths";

const SECTOR_NICHE_ICONS = [Globe2, Sprout, Landmark] as const;

const Footer = (): JSX.Element => {
  const { locale, messages } = useI18n();
  const f = messages.footer;
  const c = messages.closingCta;
  const base = localizedHome(locale);
  const niches = f.sectorNiches ?? [];

  return (
    <footer id="contact" className="scroll-mt-24 border-t border-border/70 bg-card/40">
      <div className="container mx-auto grid min-w-0 gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-12 lg:gap-12">
        <section className="lg:col-span-4">
          <Image
            src="/logos/nuo-logo-white.png"
            alt="NUO Networks"
            width={300}
            height={76}
            className="mb-5 h-14 w-auto"
          />
          <p className="text-sm leading-relaxed text-muted-foreground">{f.blurb}</p>
        </section>

        <section className="lg:col-span-3">
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary">{f.linesTitle}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>{f.line1}</li>
            <li>{f.line2}</li>
            <li>{f.line3}</li>
            <li>{f.line4}</li>
          </ul>
        </section>

        <section className="space-y-6 lg:col-span-5">
          <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">{f.contactTitle}</h4>

          <div className="space-y-2 border-l-2 border-primary/35 pl-3">
            <p className="text-sm font-semibold text-foreground">{f.usaLegalTitle}</p>
            <p className="text-xs text-muted-foreground">{f.usaLegalSubtitle}</p>
            <p className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span className="whitespace-pre-line">Nuo Networks Inc.
{f.usaLegalAddress}</span>
            </p>
          </div>

          <div className="space-y-2 border-l-2 border-secondary/40 pl-3">
            <p className="text-sm font-semibold text-foreground">{f.mexicoOfficeTitle}</p>
            <p className="text-xs text-muted-foreground">{f.mexicoOfficeSubtitle}</p>
            <p className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
              <span>{f.mexicoOfficeAddress}</span>
            </p>
          </div>

          <ul className="space-y-3 text-sm">
            <li>
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{f.emailLabel}</p>
              <a
                href={NUO_CONTACT_MAILTO}
                className="inline-flex items-center gap-2 text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
              >
                <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {NUO_CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{f.usaPhoneLabel}</p>
              <a
                href={NUO_US_PHONE_TEL}
                className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="tabular-nums">{f.usaPhoneDisplay}</span>
              </a>
            </li>
            <li>
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{f.whatsappUsLabel}</p>
              <a
                href={NUO_WHATSAPP_US_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-xl border border-cyan-400/45 bg-gradient-to-b from-cyan-500/20 to-cyan-950/30 px-4 py-2.5 text-sm font-semibold text-cyan-50 shadow-[0_0_24px_rgba(6,182,212,0.35)] transition-all hover:border-fuchsia-400/45 hover:from-fuchsia-500/20 hover:to-fuchsia-950/25 hover:text-fuchsia-50 hover:shadow-[0_0_28px_rgba(217,70,239,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:inline-flex sm:w-auto"
                aria-label={c.whatsappUsAria}
              >
                <MessageCircle className="h-5 w-5 shrink-0 text-[#25D366]" aria-hidden="true" />
                {c.whatsappUs} · <span className="tabular-nums">{f.whatsappUsDisplay}</span>
              </a>
            </li>
            <li>
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{f.whatsappMxLabel}</p>
              <a
                href={NUO_WHATSAPP_MX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-xl border border-cyan-400/45 bg-gradient-to-b from-cyan-500/20 to-cyan-950/30 px-4 py-2.5 text-sm font-semibold text-cyan-50 shadow-[0_0_24px_rgba(6,182,212,0.35)] transition-all hover:border-fuchsia-400/45 hover:from-fuchsia-500/20 hover:to-fuchsia-950/25 hover:text-fuchsia-50 hover:shadow-[0_0_28px_rgba(217,70,239,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:inline-flex sm:w-auto"
                aria-label={c.whatsappMxAria}
              >
                <MessageCircle className="h-5 w-5 shrink-0 text-[#25D366]" aria-hidden="true" />
                {c.whatsappMx} · <span className="tabular-nums">{f.whatsappMxDisplay}</span>
              </a>
            </li>
          </ul>
        </section>

        {niches.length > 0 && f.sectorNichesTitle ? (
          <section className="border-t border-border/50 pt-8 lg:col-span-12">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary">{f.sectorNichesTitle}</h4>
            <ul className="flex flex-wrap gap-2">
              {niches.map((label, i) => {
                const Ico = SECTOR_NICHE_ICONS[i] ?? Globe2;
                return (
                  <li
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/[0.04] px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    <Ico className="h-3.5 w-3.5 shrink-0 text-cyan-500/75" aria-hidden />
                    {label}
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}
      </div>

      <div className="border-t border-border/60 bg-black/20">
        <div className="container mx-auto min-w-0 px-4 py-6 sm:px-6 sm:py-8">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{f.certsTitle}</p>
          <ul className="mx-auto mt-4 flex max-w-3xl flex-wrap items-center justify-center gap-3">
            {f.certs.map((cert) => (
              <li
                key={cert.id}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-foreground/90"
              >
                <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-cyan-500/80" aria-hidden />
                <span>{cert.label}</span>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[11px] leading-relaxed text-muted-foreground">{f.certsNote}</p>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="container mx-auto flex min-w-0 flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-muted-foreground sm:px-6 sm:py-5 md:flex-row">
          <p>
            © {new Date().getFullYear()} NUO Networks. {f.rights}
          </p>
          <div className="flex items-center gap-4">
            <Link href={base as Route} className="transition-colors hover:text-primary">
              {f.privacy}
            </Link>
            <Link href={base as Route} className="transition-colors hover:text-primary">
              {f.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
