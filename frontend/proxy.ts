import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/", "/about", "/support", "/privacy", "/terms"];
const AUTH_ROUTES_PREFIX = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("jwt")?.value;
  const role = request.cookies.get("role")?.value;

  const isPublic = PUBLIC_ROUTES.includes(pathname);
  const isAuthRoute = AUTH_ROUTES_PREFIX.some((p) => pathname.startsWith(p));

  if (token && isPublic) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Stale role cookie with no valid token — clear it, don't loop
  if (!token && role) {
    const res = NextResponse.redirect(
      new URL(isPublic || isAuthRoute ? pathname : "/login", request.url),
    );
    res.cookies.delete("role");
    return res;
  }

  // Not logged in
  if (!token) {
    if (isPublic || isAuthRoute) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Logged in: keep off auth forms, but public pages stay accessible to everyone
  if (isAuthRoute) {
    return NextResponse.redirect(
      new URL(role === "admin" ? "/admin" : "/dashboard", request.url),
    );
  }

  // Role gating (only outside public routes)
  if (!isPublic) {
    if (role === "admin" && !pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    if (role !== "admin" && pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
