import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Edge: do not import `@/` modules (Vercel flags them). Locale list duplicated here.
 * Default locale uses internal rewrite to /es/... — never redirect /es/* → unprefixed (rewrite loop).
 *
 * Use `nextUrl.clone()` for rewrites — `new URL(path, request.nextUrl)` can throw on Vercel Edge
 * (NextURL as base), causing MIDDLEWARE_INVOCATION_FAILED.
 */
const DEFAULT_LOCALE = "es" as const;
const LOCALE_SET = new Set<string>(["es", "en"]);

function isLocaleSegment(value: string): boolean {
  return LOCALE_SET.has(value);
}

export function middleware(request: NextRequest): NextResponse {
  try {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/_vercel")) {
      return NextResponse.next();
    }

    if (pathname.startsWith("/.well-known")) {
      return NextResponse.next();
    }

    if (
      /\.(?:ico|png|jpg|jpeg|svg|gif|webp|txt|xml|json|webmanifest|woff2?|ttf|eot|map)$/i.test(pathname)
    ) {
      return NextResponse.next();
    }

    const segments = pathname.split("/").filter(Boolean);
    const first = segments[0];

    if (first && isLocaleSegment(first)) {
      return NextResponse.next();
    }

    const dest = request.nextUrl.clone();
    dest.pathname =
      pathname === "/" ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.rewrite(dest);
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
