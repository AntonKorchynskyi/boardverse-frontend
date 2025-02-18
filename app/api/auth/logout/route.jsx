// app/api/auth/logout/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  // Get the token from the cookies (if needed for the backend call)
  const token = request.cookies.get("access_token")?.value;

  // If there's a token, call your backend to delete/invalidate it
  if (token) {
    try {
      await fetch("https://boardverse-backend.onrender.com/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error invalidating token on backend:", error);
      // Optionally handle errors (log, retry, etc.)
    }
  }

  

  // Create a redirect response to home (or login) page
  const response = NextResponse.redirect(new URL("/", request.url));

  // Clear the access_token cookie by setting it to an empty string and expiring it
  response.cookies.set("access_token", "", {
    path: "/",
    expires: new Date(0),
  });

  return response;
}
