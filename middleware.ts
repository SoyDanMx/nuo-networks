import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Edge middleware must not import app aliases (@/) — Vercel Edge flags them as unsupported.
 * Keep locale checks inline; source of truth remains lib/i18n/config.ts for the app.
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

  if (/\.(ico|png|jpg|jpeg|svg|gif|webp|txt|xml|json)$/i.test(pathname)) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first && isLocaleSegment(first)) {
    if (first === DEFAULT_LOCALE) {
      const rest = segments.slice(1).join("/");
      const url = request.nextUrl.clone();
      url.pathname = rest ? `/${rest}` : "/";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
