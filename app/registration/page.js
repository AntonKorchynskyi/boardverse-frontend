'use client';

import React, { useActionState } from "react";
import { register } from "@/app/registration/actions";

const RegistrationPage = () => {

  const [state, action, pending] = useActionState(register);

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
              htmlFor="username"
            >
              Your username:
            </label>
            <input
              id="username"
              type="text"
              name="username"
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your username"
              required
            />
            {state?.errors?.username && <p className="mt-1 text-red-500">{state.errors.username}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-[#ad4ef1] font-semibold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your email"
              required
            />
            {state?.errors?.email && <p className="mt-1 text-red-500">{state.errors.email}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              className="block text-[#ad4ef1] font-semibold mb-2"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your password"
              required
            />
            {state?.errors?.password && <p className="mt-1 text-red-500">{state.errors.password}</p>}
          </div>

          {/* Submit Button */}
          <div className="pb-6 mt-14">
            <button
              type="submit"
              className="w-full py-2 bg-[#4a007f] text-white font-bold rounded-lg hover:bg-pink-600 transition"
              disabled={pending}
            >
              {pending ? 'Submitting...' : 'Sign Up'}
            </button>
          </div>

          {/* Link to Login */}
          <p className="text-center text-sm text-white">
            Already have an account?{" "}
            <a href="/login" className="text-pink-400 hover:underline">
              Log in
            </a>
          </p>

          {/* Response Message
          {message && (
            <p className="text-center text-sm text-white mt-4">{message}</p>
          )} */}
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
