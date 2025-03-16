"use client";

import React, { useState } from "react";
import { register } from "@/app/(default)/registration/actions";
import { useActionState } from "react"; // Assuming you're using this hook from Next.js or your library.
import { EyeClosedIcon, EyeIcon } from "lucide-react";

const RegistrationPage = () => {
  const [state, action, pending] = useActionState(register);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="flex items-center justify-center pt-8 overflow-hidden">
      <div className="w-full max-w-md bg-opacity-50 bg-gray-800 p-8 rounded-lg shadow-lg mb-4">
        <h1 className="text-3xl font-bold text-center text-white pb-6">
          Registration
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
              <p className="mt-1 text-red-500">
                {state.errors.userName.join(", ")}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-[#ad4ef1] font-semibold mb-2"
              htmlFor="userEmail"
            >
              Email:
            </label>
            <input
              id="userEmail"
              type="email"
              name="userEmail"
              value={userEmail}
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your email"
              required
              onChange={(e) => setUserEmail(e.target.value)}
            />
            {state?.errors?.userEmail && (
              <p className="mt-1 text-red-500">
                {state.errors.userEmail.join(", ")}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              className="block text-[#ad4ef1] font-semibold mb-2"
              htmlFor="userPassword"
            >
              Password:
            </label>

            <div className="relative">
              <input
                id="userPassword"
                type={passwordVisible ? "text" : "password"}
                name="userPassword"
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Enter your password"
                required
              />

              {/* Toggle Button / Icon */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-[0.65rem] text-gray-500 hover:text-gray-700 transition"
              >
                {passwordVisible ? (
                  <EyeIcon className="w-5 h-5" />
                ) : (
                  <EyeClosedIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            {state?.errors?.userPassword && (
              <p className="mt-1 text-red-500">
                {state.errors.userPassword.join(", ")}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pb-6 mt-10">
            <button
              type="submit"
              className="w-full py-2 bg-[#ad4ef1] text-white font-bold rounded-lg hover:bg-pink-600 transition"
              disabled={pending}
            >
              {pending ? "Submitting..." : "Sign Up"}
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

          {/* Link to Login */}
          <p className="text-center text-sm text-white">
            Already have an account?{" "}
            <a href="/login" className="text-pink-400 hover:underline">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
