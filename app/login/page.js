'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter(); // Use Next.js router

  const login = async (event) => {
    event.preventDefault();

    const body = {
      userEmail,
      userPassword,
    };

    try {
      const response = await fetch("https://boardverse-backend.onrender.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Success: ${data.message}, Welcome ${data.userName}!`);

        // Redirect to the home page after a short delay
        setTimeout(() => {
            router.push("/"); // Redirects to the home page
          }, 2000);

      } else {
        setMessage(`Error: ${data.message || "Login failed!"}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div
      className="flex items-center justify-center bg-cover bg-center"
    >
      <div className="w-full max-w-md bg-opacity-50 bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Login</h1>

        <form onSubmit={login}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-pink-300 font-semibold mb-2" htmlFor="email">
              Your email:
            </label>
            <input
              id="email"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-pink-300 font-semibold mb-2" htmlFor="password">
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Remember Me */}
          <div className="mb-4 flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="mr-2"
            />
            <label htmlFor="remember" className="text-pink-300">
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <div className="mb-6">
            <button
              type="submit"
              className="w-full py-2 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 transition"
            >
              Sign In
            </button>
          </div>

          {/* Response Message */}
          {message && <p className="text-center text-sm text-white mt-4">{message}</p>}

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

export default Login;
