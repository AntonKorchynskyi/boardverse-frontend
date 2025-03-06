import { NextResponse } from "next/server";

export function middleware(request) {
  // if the request is for /profile (or anything under it)
  if (request.nextUrl.pathname.startsWith("/profile")) {
    // check if we have a cookie named 'access_token'
    const token = request.cookies.get("access_token")?.value;
    if (!token) {
      // No token => redirect to /login using absolute URL
      return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
    }
    // If token exists, continue
  }
  return NextResponse.next();
}

// Optional: restrict which paths the middleware runs on
export const config = {
  matcher: ["/profile/:path*"],
};
