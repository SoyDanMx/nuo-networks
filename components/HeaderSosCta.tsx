"use client";

import type { Route } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";

import { cn } from "@/lib/utils";

interface HeaderSosCtaProps {
  href: Route;
  label: string;
  ariaLabel: string;
  drawerSubline?: string;
  /** Barra superior (compacta) o tarjeta hero en drawer móvil */
  variant?: "bar" | "drawer-hero";
  className?: string;
  onNavigate?: () => void;
}

/**
 * CTA de emergencia hacia /sos — borde en gradiente, glow y pulso (estilo “cyber-emergency”).
 */
export function HeaderSosCta({
  href,
  label,
  ariaLabel,
  drawerSubline,
  variant = "bar",
  className,
  onNavigate
}: HeaderSosCtaProps): JSX.Element {
  if (variant === "drawer-hero") {
    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        onClick={onNavigate}
        className={cn(
          "group relative isolate flex w-full flex-col overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#020617] shadow-[0_0_48px_rgba(217,70,239,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] transition-transform active:scale-[0.99]",
          className
        )}
      >
        <span
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.12),transparent_40%,rgba(217,70,239,0.1),transparent_65%,rgba(251,146,60,0.08))] opacity-80 transition-opacity group-hover:opacity-100"
        />
        <span className="relative flex items-center gap-3 px-4 py-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-fuchsia-500/45 bg-gradient-to-br from-fuchsia-500/15 to-cyan-500/10 text-fuchsia-300 shadow-[0_0_24px_rgba(217,70,239,0.45)]">
            <ShieldAlert className="h-6 w-6" aria-hidden />
          </span>
          <span className="min-w-0 text-left">
            <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-400">24/7</span>
            <span className="mt-1 block font-heading text-base font-semibold leading-tight text-white">{label}</span>
            {drawerSubline ? (
              <span className="mt-1 block text-xs leading-snug text-zinc-500">{drawerSubline}</span>
            ) : null}
          </span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      onClick={onNavigate}
      className={cn(
        "group relative isolate inline-flex max-w-[min(100%,11rem)] shrink-0 items-center sm:max-w-none",
        className
      )}
    >
      <span
        aria-hidden
        className="absolute -inset-px -z-10 rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 opacity-75 blur-[6px] motion-safe:animate-pulse"
      />
      <span className="rounded-full bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-orange-400 p-[1.5px] shadow-[0_0_20px_rgba(34,211,238,0.2)] sm:p-[2px]">
        <span className="flex items-center gap-1.5 rounded-full bg-[#020617] px-2 py-1.5 sm:gap-2 sm:px-3 sm:py-2">
          <motion.span
            className="flex shrink-0 items-center justify-center"
            whileHover={{ scale: 1.08, rotate: [-2, 2, 0] }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <ShieldAlert
              className="h-3.5 w-3.5 text-fuchsia-400 drop-shadow-[0_0_10px_rgba(217,70,239,0.9)] sm:h-4 sm:w-4"
              aria-hidden
            />
          </motion.span>
          <span className="min-w-0 truncate font-mono text-[9px] font-bold uppercase leading-none tracking-[0.12em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-fuchsia-200 sm:text-[10px] sm:tracking-[0.16em]">
            {label}
          </span>
          <span
            className="hidden h-2 w-2 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee,0_0_24px_rgba(34,211,238,0.5)] motion-safe:animate-pulse sm:block"
            aria-hidden
          />
        </span>
      </span>
    </Link>
  );
}
