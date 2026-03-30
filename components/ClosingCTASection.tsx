"use client";

import { Layers, Mail, MessageCircle, ShieldAlert } from "lucide-react";

import {
  NUO_CONTACT_MAILTO,
  NUO_WHATSAPP_MX_URL,
  NUO_WHATSAPP_US_URL,
  nuoContactMailtoSubject
} from "@/lib/constants";
import { useI18n } from "@/lib/i18n/provider";

const ClosingCTASection = (): JSX.Element => {
  const { messages } = useI18n();
  const c = messages.closingCta;

  return (
    <section
      className="border-t border-border/70 bg-gradient-to-b from-card/40 to-background px-4 py-14 sm:px-6 sm:py-16 md:py-20"
      aria-labelledby="closing-cta-heading"
    >
      <div className="container mx-auto max-w-4xl text-center">
        <h2
          id="closing-cta-heading"
          className="font-heading text-2xl font-bold leading-tight text-foreground md:text-5xl"
        >
          {c.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">{c.subtitle}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <a
            href={nuoContactMailtoSubject(c.mailSubjectVuln)}
            className="btn-drop-shadow-cyan inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-6 py-3.5 text-sm font-semibold text-cyan-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-all hover:border-cyan-400/60 hover:bg-cyan-500/15 sm:w-auto"
            aria-label={c.ctaVulnAria}
          >
            <ShieldAlert className="h-5 w-5 shrink-0" aria-hidden="true" />
            {c.ctaVuln}
          </a>
          <a
            href={nuoContactMailtoSubject(c.mailSubjectZeroTrust)}
            className="btn-drop-shadow-magenta inline-flex w-full items-center justify-center gap-2 rounded-xl border border-fuchsia-500/35 bg-fuchsia-500/10 px-6 py-3.5 text-sm font-semibold text-fuchsia-100 transition-all hover:border-fuchsia-400/55 hover:bg-fuchsia-500/15 sm:w-auto"
            aria-label={c.ctaZeroTrustAria}
          >
            <Layers className="h-5 w-5 shrink-0" aria-hidden="true" />
            {c.ctaZeroTrust}
          </a>
        </div>

        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
          <a
            href={NUO_WHATSAPP_US_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 py-4 text-base font-semibold text-white shadow-[0_0_24px_rgba(37,211,102,0.35)] transition-all hover:bg-[#20BD5A] sm:w-auto"
            aria-label={c.whatsappUsAria}
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            {c.whatsappUs}
          </a>
          <a
            href={NUO_WHATSAPP_MX_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 py-4 text-base font-semibold text-white shadow-[0_0_24px_rgba(37,211,102,0.35)] transition-all hover:bg-[#20BD5A] sm:w-auto"
            aria-label={c.whatsappMxAria}
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            {c.whatsappMx}
          </a>
          <a
            href={NUO_CONTACT_MAILTO}
            className="btn-drop-shadow-cyan inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-nuo-cyan transition-all hover:bg-primary/90 sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={c.emailAria}
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
            {c.email}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ClosingCTASection;
