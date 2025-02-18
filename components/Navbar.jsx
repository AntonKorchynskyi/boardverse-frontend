import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { ArrowRight } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";

// Force the component to be dynamic (no caching)
export const dynamic = "force-dynamic";

export default async function Navbar() {
  // Read cookies server-side
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  // If token exists, user is logged in
  const isLoggedIn = !!token;

  return (
    <nav className="flex items-center justify-between bg-navBackground px-4 text-lg">
      {/* Logo and Title */}
      <Link href="/">
        <div className="flex items-center text-lg font-semibold">
          <Image
            src="/logo.png"
            alt="BoardVerse logo"
            width={65}
            height={65}
            priority
          />
          <p className="text-2xl">BoardVerse</p>
        </div>
      </Link>

      {/* Navigation Links */}
      <ul className="flex-grow flex justify-center space-x-6">
        <li className="hover:text-gray-300 transition">
          <Link href="/" className="capitalize">
            Home
          </Link>
        </li>
        <li className="hover:text-gray-300 transition">
          <Link href="/browse" className="capitalize">
            Browse
          </Link>
        </li>
        <li className="hover:text-gray-300 transition">
          <Link href="/settings" className="capitalize">
            Settings
          </Link>
        </li>
        <li className="hover:text-gray-300 transition">
          <Link href="/about" className="capitalize">
            About
          </Link>
        </li>
        {/* Protected Link: Only show Profile if logged in */}
        {isLoggedIn && (
          <li className="hover:text-gray-300 transition">
            <Link href="/profile" className="capitalize mr-28">
              Profile
            </Link>
          </li>
        )}
      </ul>

      {/* Right Side Buttons */}
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <LogoutButton />
        ) : (
          <>
            <Link
              href="/login"
              className="capitalize px-4 py-2 text-white hover:text-gray-300 transition"
            >
              Sign in
            </Link>
            <Link
              href="/registration"
              className="flex items-center gap-2 px-4 bg-white text-gray-800 rounded-full shadow hover:bg-gray-100 transition"
            >
              Sign up <ArrowRight className="h-5 w-5" />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
