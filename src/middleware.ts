import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  if (url.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  if (hostname.endsWith(".zenux.live")) {
    const subdomain = hostname.split(".")[0];
    url.pathname = `/sites/${subdomain}`;
    return NextResponse.rewrite(url);
  }

  if (!hostname.endsWith(".zenux.live")) {
    url.pathname = `/sites/custom/${hostname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};