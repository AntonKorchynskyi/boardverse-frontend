"use server";

import { LoginFormSchema } from "@/app/_lib/definitions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
// import { NextResponse } from "next/server";

export async function login(state, formData) {
  // validate user-inputted form data using Zod
  const validationResult = LoginFormSchema.safeParse({
    userEmail: formData.get("userEmail"),
    userPassword: formData.get("userPassword"),
  });

  if (!validationResult.success) {
    console.log("Validation failed, skipping DB update.");
    return { errors: validationResult.error.flatten().fieldErrors };
  }

  // try to login user
  try {
    const userCreds = validationResult.data;
    const response = await fetch(
      "https://boardverse-backend.onrender.com/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userCreds),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log(`Backend error: ${data.message || "Login failed!"}`);
      return { errors: { general: [data.message || "Login failed!"] } };
    }

    // backend returns a token
    const token = data.token;
    if (!token) {
      console.log("No token returned from backend.");
      return { errors: { general: ["No token provided!"] } };
    }

    // decode token to extract the expiration date
    const decoded = jwtDecode(token);
    // decoded.exp should be a Unix timestamp in seconds.
    const currentTime = Math.floor(Date.now() / 1000); // current time in seconds
    const maxAge = decoded.exp - currentTime; // remaining lifetime in seconds

    // set HTTP-only cookie using next/headers (await the cookies API)
    const cookieStore = await cookies(); // get current cookies
    // add new cookie
    cookieStore.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge,
    });

    redirect("/profile");

  } catch (error) {
    // the redirect exception, need to rethrow it to allow for redirect (catching it breaks the action).
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    console.log(`Login error: ${error}`);
    return { errors: { general: ["Unexpected error during login"] } };
  }
}
