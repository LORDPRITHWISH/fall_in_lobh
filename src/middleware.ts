import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";
  console.log("hostname", hostname);
  console.log("url", url);

  if (url.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  if (hostname.endsWith(".zenux.live")) {
    const subdomain = hostname.split(".")[0];
    url.pathname = `/sites/${subdomain}`;
    return NextResponse.rewrite(url);
  }

  if (hostname.endsWith(".myvalentine.live")) {
    const subdomain = hostname.split(".")[0];
    url.pathname = `/sites/${subdomain}`;
    return NextResponse.rewrite(url);
  }

  if (hostname.startsWith("localhost") || hostname.startsWith("192")) {
    if (url.pathname === "/X") {
      url.pathname = "/demo/1";
    }
    return NextResponse.rewrite(url);
  }

  if (hostname === "zenux.live") {
    return NextResponse.next();
  }
  if (hostname === "myvalentine.live") {
    return NextResponse.next();
  }

  if (!hostname.endsWith(".zenux.live")) {
    url.pathname = `/sites/custom/${hostname}`;
    return NextResponse.rewrite(url);
  }
  if (!hostname.endsWith(".myvalentine.live")) {
    url.pathname = `/sites/custom/${hostname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};