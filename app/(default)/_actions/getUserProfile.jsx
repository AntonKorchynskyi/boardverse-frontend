"use server";

import { cookies } from "next/headers";

// fetch Profile Data (Server-Side) with token-based auth
/* 
   returns userId, userName, userEmail, userStatus, userProfileDescription, 
   userLevel, userCoins 
*/
export default async function getUserProfile() {
  // retrieve the token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  try {
    const res = await fetch(
      "https://boardverse-backend.onrender.com/user/profile",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // pass the token so the backend can identify the user
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    return data; // Expected data: { userName, userDesc, userLevel, userStatus, ... }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}
