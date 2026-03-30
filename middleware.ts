import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { defaultLocale, isLocale } from "@/lib/i18n/config";

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

  if (first && isLocale(first)) {
    if (first === defaultLocale) {
      const rest = segments.slice(1).join("/");
      const url = request.nextUrl.clone();
      url.pathname = rest ? `/${rest}` : "/";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
