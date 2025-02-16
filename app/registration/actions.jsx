"use server";

import { SignupFormSchema } from "@/app/_lib/definitions";

export async function register(state, formData) {
  // Validate form data using Zod
  const validationResult = SignupFormSchema.safeParse({
    userName: formData.get("userName"),
    userEmail: formData.get("userEmail"),
    userPassword: formData.get("userPassword"),
  });

  if (!validationResult.success) {
    console.log("Validation failed, skipping DB update.");
    return { errors: validationResult.error.flatten().fieldErrors, };
  }

  const user = validationResult.data

  console.log(user);

  // Normally, you'd save the user to the database here
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

    if (response.ok) {
      console.log(`Success: ${data.message}, User ID: ${data.userId}`);
    } else {
      console.log(`Error: ${data.message || "Registration failed!"}`);
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}