"use client";

import React, { useState, useActionState } from "react";
import editProfile from "./actions";

export default function EditProfileForm({ initialData }) {
  const [userName, setUserName] = useState(initialData?.userName || "");

  // checks if there is ay initialData available and sets it to form
  const [userProfileDescription, setUserProfileDescription] = useState(
    initialData?.userProfileDescription || ""
  );

  const [state, action, pending] = useActionState(editProfile);

  return (
    <div className="flex items-center justify-center pt-8 overflow-hidden">
      <div className="w-full max-w-md bg-opacity-50 bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Edit Profile
        </h1>
        <form action={action}>
          {/* Username */}
          <div className="mb-4">
            <label
              className="block text-[#ad4ef1] font-semibold mb-2"
              htmlFor="userName"
            >
              Your username:
            </label>
            <input
              id="userName"
              type="text"
              name="userName"
              value={userName}
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your username"
              required
              onChange={(e) => setUserName(e.target.value)}
            />
            {state?.errors?.userName && (
              <p className="mt-1 text-red-500">{state.errors.userName}</p>
            )}
          </div>

          {/* Profile Description */}
          <div className="mb-4">
            <label
              className="block text-[#ad4ef1] font-semibold mb-2"
              htmlFor="userProfileDescription"
            >
              Your profile description:
            </label>
            <textarea
              id="userDesc"
              name="userProfileDescription"
              value={userProfileDescription}
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 max-h-[8rem]"
              placeholder="Enter your profile description"
              onChange={(e) => setUserProfileDescription(e.target.value)}
            />
            {state?.errors?.userProfileDescription && (
              <p className="mt-1 text-red-500">
                {state.errors.userProfileDescription}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pb-6 mt-6">
            <button
              type="submit"
              disabled={pending}
              className="w-full py-2 bg-[#ad4ef1] text-white font-bold rounded-lg hover:bg-pink-600 transition"
            >
              {pending ? "Submitting..." : "Accept Changes"}
            </button>
          </div>

          {/* General Error Output */}
          {state?.errors?.general && (
            <div className="mt-4 mb-6 text-red-500 text-center">
              {state.errors.general.map((err, i) => (
                <p key={i}>{err}</p>
              ))}
            </div>
          )}

        </form>
      </div>
    </div>
  );
}
