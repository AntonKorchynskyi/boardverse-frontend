import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const links = [
  { href: "/", label: "home" },
  { href: "/browse", label: "browse" },
  { href: "/settings", label: "settings" },
  { href: "/profile", label: "profile" },
  { href: "/about", label: "about" },
];

const Navbar = () => {
  return (
    <nav>
      <div className="flex items-center justify-between bg-navBackground px-4 text-lg">
        {/* logo and title */}
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

        {/* navigation links */}
        <ul className="flex-grow flex justify-center space-x-6">
          {links.map((link) => (
            <li key={link.href} className="hover:bg-transparent hover:text-gray-300 transition">
              <Link href={link.href} className="capitalize">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* sign in and sign up buttons */}
        <div className="flex items-center gap-4">
          {/* sign in */}
          <Link
            href="/login"
            className="capitalize px-4 py-2 text-white hover:text-gray-300 transition"
          >
            Sign in
          </Link>

          {/* sign up */}
          <Link
            href="/registration"
            className="flex items-center gap-2 px-4  bg-white text-gray-800 rounded-full shadow hover:bg-gray-100 transition"
          >
            Sign up <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
