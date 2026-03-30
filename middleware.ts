import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Edge middleware must not import app aliases (@/) — Vercel Edge flags them as unsupported.
 * Keep locale checks inline; source of truth remains lib/i18n/config.ts for the app.
 *
 * Default locale (es) uses rewrite to /es/... internally. Do NOT redirect /es/* → /* here:
 * that collides with the rewrite and can infinite-loop on some runtimes (Vercel MIDDLEWARE_INVOCATION_FAILED).
 */
const DEFAULT_LOCALE = "es" as const;
const LOCALE_SET = new Set<string>(["es", "en"]);

function isLocaleSegment(value: string): boolean {
  return LOCALE_SET.has(value);
}

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // ACME / security.txt / etc. must not be prefixed with /es
  if (pathname.startsWith("/.well-known")) {
    return NextResponse.next();
  }

  // Static metadata & assets at root (avoid rewriting to /es/...)
  if (
    /\.(?:ico|png|jpg|jpeg|svg|gif|webp|txt|xml|json|webmanifest|woff2?|ttf|eot|map)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first && isLocaleSegment(first)) {
    // /en/* → App Router [locale] as "en". /es/* → pass through (same as internal rewrite target).
    return NextResponse.next();
  }

  const base = request.nextUrl;
  const pathSuffix = pathname === "/" ? "" : pathname;
  const rewriteUrl = new URL(`/${DEFAULT_LOCALE}${pathSuffix}`, base);
  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
