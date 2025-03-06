import { NextResponse } from "next/server";

export async function POST(request) {
  // get the token from the cookies
  const token = request.cookies.get("access_token")?.value;

  // if there's a token, call backend to delete/invalidate it
  if (token) {
    try {
      await fetch("https://boardverse-backend.onrender.com/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Token successfully deleted");
      
    } catch (error) {
      console.error("Error invalidating token on backend:", error);
    }
  }

  // create a redirect response to home page
  const response = NextResponse.redirect(new URL("/", request.url));

  // clear the access_token cookie by setting it to an empty string and expiring it
  response.cookies.set("access_token", "", {
    path: "/",
    expires: new Date(0),
  });

  return response;
}
