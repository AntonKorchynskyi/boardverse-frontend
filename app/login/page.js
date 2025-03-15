"use client";

import React, { useActionState, useState } from "react";
import { login } from "@/app/login/actions";
import { EyeClosedIcon, EyeIcon } from "lucide-react";

const LoginPage = () => {
  const [state, action, pending] = useActionState(login);
  const [userEmail, setUserEmail] = useState("");

  // track if the password is visible
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="flex items-center justify-center pt-8 overflow-hidden">
      <div className="w-full max-w-md bg-opacity-50 bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Login
        </h1>

        <form action={action}>
          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-[#ad4ef1] font-semibold mb-2"
              htmlFor="userEmail"
            >
              Your email:
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
          <div className="pb-6 mt-6">
            <button
              type="submit"
              disabled={pending}
              className="w-full py-2 bg-[#ad4ef1] text-white font-bold rounded-lg hover:bg-pink-600 transition"
            >
              {pending ? "Submitting..." : "Sign In"}
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

          {/* Link to Register */}
          <p className="text-center text-sm text-white">
            Don’t have an account?{" "}
            <a href="/registration" className="text-pink-400 hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
