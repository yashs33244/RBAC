import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Get pathname
    const path = req.nextUrl.pathname;
    
    // Get token
    const token = req.nextauth.token;

    // Redirect authenticated users away from auth pages
    if (token && (path.startsWith("/auth"))) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Allow the request to proceed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    // Add routes that require authentication
    "/dashboard/:path*",
  ],
};