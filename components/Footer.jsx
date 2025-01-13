import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-navBackground text-gray-400 text-sm py-6">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between px-4">
        {/* Left Section */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold text-gray-200">BoardVerse</h2>
          <p className="text-xs">
            © {new Date().getFullYear()} BoardVerse. All rights reserved.
          </p>
          <p className="text-xs">
            This is a group project for COMP3006 - System Project 2 - Georgian College (Ontario, Canada)
          </p>
        </div>

        {/* Center Section */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="/about" className="hover:text-gray-200 transition">
            About
          </a>
          <a href="/terms" className="hover:text-gray-200 transition">
            Terms of Service
          </a>
          <a href="/privacy" className="hover:text-gray-200 transition">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
