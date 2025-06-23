import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "algosync_jwt_secret"
);

const protectedPaths = ["/onboarding", "/dashboard"];
const publicPaths = ["/", "/about", "/term", "/privacy"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // Check if route is protected
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  // Check if current route is public
  const isPublic = publicPaths.includes(pathname);

  // If no token and trying to access protected page, redirect to /
  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If token exists, verify it and decode payload
  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      const isOnboarded = payload.isOnboarded;

      // If user tries to access "/" or public pages, redirect them based on onboarding
      if (isPublic) {
        const redirectTo = isOnboarded ? "/dashboard" : "/onboarding";
        return NextResponse.redirect(new URL(redirectTo, req.url));
      }

      if (pathname.startsWith("/dashboard") && isOnboarded == false) {
        // Not onboarded yet → block dashboard access
        return NextResponse.redirect(new URL("/onboarding", req.url));
      }

      // If user accesses onboarding but already onboarded, redirect to dashboard
      if (pathname.startsWith("/onboarding") && isOnboarded == true) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      // Otherwise allow the request to proceed
      return NextResponse.next();
    } catch (error) {
      // Invalid token — clear cookie and redirect to login
      const response = NextResponse.redirect(new URL("/", req.url));
      response.cookies.delete("token");
      return response;
    }
  }

  // No token and not accessing protected, allow request
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/onboarding/:path*", "/dashboard/:path*"],
};
