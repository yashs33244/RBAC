import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Check for admin routes
    if (path.startsWith("/admin")) {
      if (token?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
      }
    }

    // Check for moderator routes
    if (path.startsWith("/moderator")) {
      if (!["ADMIN", "MODERATOR"].includes(token?.role)) {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
      }
    }

    // Check for protected routes (dashboard and other authenticated routes)
    if (path.startsWith("/dashboard")) {
      if (!token) {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
      }
    }

    // Allow access to all other routes
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // User must be logged in
    },
  }
);

// Define routes that will be matched by the middleware
export const config = {
  matcher: ["/admin/:path*", "/moderator/:path*", "/dashboard/:path*"],
};
