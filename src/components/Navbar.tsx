"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-red-600 py-4 px-6 flex items-center justify-between shadow-md">
      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-bold text-white hover:text-gray-200 transition"
      >
        Marvel Comics
      </Link>

      {/* Menu */}
      <div className="flex items-center">
      <Link
          href="/"
          className="relative ml-4 text-white font-semibold px-4 py-2 transition-all duration-300 hover:text-white after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
        >
          Início
        </Link>
        <Link
          href="/comics"
          className="relative ml-4 text-white font-semibold px-4 py-2 transition-all duration-300 hover:text-white after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
        >
          Quadrinhos
        </Link>
        <Link
          href="/characters"
          className="relative ml-4 text-white font-semibold px-4 py-2 transition-all duration-300 hover:text-white after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
        >
          Personagens
        </Link>
        <Link
          href="/events"
          className="relative ml-4 text-white font-semibold px-4 py-2 transition-all duration-300 hover:text-white after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
        >
          Eventos
        </Link>
      </div>
    </nav>
  );
}
