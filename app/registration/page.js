'use client';

import React, { useState } from "react";

const RegistrationPage = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [message, setMessage] = useState("");

  const register = async (event) => {
    event.preventDefault();

    const body = {
      userName,
      userEmail,
      userPassword,
    };

    try {
      const response = await fetch("https://boardverse-backend.onrender.com/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Success: ${data.message}, User ID: ${data.userId}`);
      } else {
        setMessage(`Error: ${data.message || "Registration failed!"}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md bg-opacity-50 bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Registration</h1>

        <form onSubmit={register}>
          {/* Username */}
          <div className="mb-4">
            <label className="block text-pink-300 font-semibold mb-2" htmlFor="username">
              Your username:
            </label>
            <input
              id="username"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-pink-300 font-semibold mb-2" htmlFor="email">
              Email:
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

          {/* Submit Button */}
          <div className="mb-6">
            <button
              type="submit"
              className="w-full py-2 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 transition"
            >
              Sign Up
            </button>
          </div>

          {/* Link to Login */}
          <p className="text-center text-sm text-white">
            Already have an account?{" "}
            <a href="/login" className="text-pink-400 hover:underline">
              Log in
            </a>
          </p>

          {/* Response Message */}
          {message && <p className="text-center text-sm text-white mt-4">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
