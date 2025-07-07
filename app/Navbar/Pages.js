"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";

const Pages = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

return (
  <>
    <nav className="bg-gray-800 p-4 relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl sm:text-3xl font-bold">🐾 PetConnect</h1>

        {/* Hamburger Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-white focus:outline-none"
        >
          <FiMenu size={24} />
        </button>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-12 text-white font-bold">
          <li>
            <Link href="/" className="hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-gray-400">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-gray-400">
              Contact
            </Link>
          </li>
        </ul>
      </div>
  

      {/* Mobile Dropdown Menu */}
      <div
        className={`absolute top-full ml-75  bg-gray-800 transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        } sm:hidden`}
      >
        <ul className="flex flex-col items-center gap-1 py-0.5 text-white font-bold">
          <li>
            <Link href="/" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  </>
);
}

export default Pages;
