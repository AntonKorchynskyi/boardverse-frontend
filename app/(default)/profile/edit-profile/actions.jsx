"use server";

import { EditProfileSchema } from "@/app/(default)/_lib/definitions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function editProfile(state, formData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  // Validate form data using Zod
  const validationResult = EditProfileSchema.safeParse({
    userName: formData.get("userName"),
    userProfileDescription: formData.get("userProfileDescription"),
  });

  if (!validationResult.success) {
    console.log("Validation failed, skipping DB update.");
    return { errors: validationResult.error.flatten().fieldErrors };
  }

  // send new user details (userName and userProfileDescription) to update the user
  try {
    const userProfileData = validationResult.data;
    const response = await fetch(
      "https://boardverse-backend.onrender.com/user/profile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userProfileData),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }
  } catch (error) {
    return { errors: { general: ["Unexpected error during profile edit"] } };
  }

  redirect("/profile");
}

export default editProfile;
