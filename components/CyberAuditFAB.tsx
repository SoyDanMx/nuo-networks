"use client";

import { ClipboardCheck, MessageCircle } from "lucide-react";

import { useCpa10LeadModal } from "@/components/Cpa10LeadModalProvider";
import { NUO_WHATSAPP_US_URL } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/provider";

const CyberAuditFAB = (): JSX.Element => {
  const { messages } = useI18n();
  const { openCpa10Modal } = useCpa10LeadModal();
  const f = messages.cyberAuditFab;

  return (
    <div className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] right-[max(0.75rem,env(safe-area-inset-right,0px))] z-[70] flex items-end gap-2 sm:bottom-5 sm:right-5 sm:gap-3 md:bottom-7 md:right-7">
      <a
        href={NUO_WHATSAPP_US_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex h-12 items-center gap-2 rounded-full border border-[#25D366]/70 bg-[#25D366] px-4 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(37,211,102,0.4),0_10px_28px_rgba(37,211,102,0.4),0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-[1.03] hover:bg-[#20BD5A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] sm:h-14 sm:px-5 sm:text-base"
        aria-label={f.whatsappAria}
        title={f.whatsappLabel}
      >
        <MessageCircle className="h-5 w-5 shrink-0 transition-transform group-hover:scale-105" aria-hidden />
        <span>{f.whatsappLabel}</span>
      </a>
      <button
        type="button"
        className="group flex h-12 w-12 items-center justify-center rounded-full border border-fuchsia-400/45 bg-[#020617]/88 text-fuchsia-100 shadow-[0_0_0_1px_rgba(217,70,239,0.35),0_0_32px_rgba(217,70,239,0.42),0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md transition-transform duration-300 hover:scale-[1.06] hover:border-fuchsia-300/55 hover:shadow-[0_0_0_1px_rgba(217,70,239,0.55),0_0_44px_rgba(217,70,239,0.55),0_12px_48px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] sm:h-14 sm:w-14"
        aria-label={f.aria}
        title={f.label}
        onClick={openCpa10Modal}
      >
        <ClipboardCheck className="h-6 w-6 transition-transform group-hover:scale-105" aria-hidden />
        <span className="sr-only">{f.label}</span>
      </button>
    </div>
  );
};

export default CyberAuditFAB;
