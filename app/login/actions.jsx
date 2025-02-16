"use server";

import { LoginFormSchema } from "@/app/_lib/definitions";

export async function login(state, formData) {

  // Validate form data using Zod
  const validationResult = LoginFormSchema.safeParse({
    userEmail: formData.get("userEmail"),
    userPassword: formData.get("userPassword"),
  });

  if (!validationResult.success) {
    console.log("Validation failed, skipping DB update.");
    
    
    console.log(validationResult);
    console.log(validationResult.error);
    console.log(validationResult.error.flatten());
    console.log(validationResult.error.flatten().fieldErrors);
    
    
    return { errors: validationResult.error.flatten().fieldErrors };
  }

  const user = validationResult.data;

  console.log(user);

  try {
    const response = await fetch(
      "https://boardverse-backend.onrender.com/user/login",
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
      console.log(`Success: ${data.message}, Welcome ${data.userName}!`);

    } else {
      console.log(`Error: ${data.message || "Login failed!"}`);
    }

  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}
