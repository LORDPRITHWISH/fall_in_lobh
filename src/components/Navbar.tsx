import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="shadow-md">
      <header className="p-4 flex justify-between items-center w-full md:w-[90%] mx-auto texture mb-4">
        <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
          Bonjure Valentine
        </Link>
        <nav className="space-x-4">
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            Home
          </Link>
          <Link href="/about" className="text-blue-600 hover:text-blue-700">
            About
          </Link>
          <Link href="/contact" className="text-blue-600 hover:text-blue-700">
            Contact
          </Link>
        </nav>
      </header>
      <hr className="border-t border-blue-400" />
    </div>
  );
}
