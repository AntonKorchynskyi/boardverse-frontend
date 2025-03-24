"use server";

import { SignupFormSchema } from "@/app/(default)/_lib/definitions";
import { redirect } from "next/navigation";

export async function register(state, formData) {
  // Validate form data using Zod
  const validationResult = SignupFormSchema.safeParse({
    userName: formData.get("userName"),
    userEmail: formData.get("userEmail"),
    userPassword: formData.get("userPassword"),
  });

  if (!validationResult.success) {
    console.log("Validation failed, skipping DB update.");
    return { errors: validationResult.error.flatten().fieldErrors };
  }

  const user = validationResult.data;

  // Send user info to backend
  try {
    const response = await fetch(
      "https://boardverse-backend.onrender.com/user/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      return { errors: { general: [data.error || "Registration failed!"] } };
    }

  } catch (error) {
    return { errors: { general: [error.message] } };
  }

  redirect("/login");
}
