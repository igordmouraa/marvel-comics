"use client";

import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="bg-red-600 py-4 px-6 flex items-center shadow-md">
      {/* Logo */}
      <Link
        href="/"
        className="text-3xl font-bold text-white hover:text-gray-200 transition"
      >
        Marvel Comics
      </Link>

      {/* Menu Hamburger (Mobile) */}
      <div className="md:hidden ml-auto">
        <button onClick={toggleMenu} className="focus:outline-none">
          {isOpen ? (
            <XMarkIcon className="h-6 w-6 text-white transition-transform transform hover:scale-110" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-white transition-transform transform hover:scale-110" />
          )}
        </button>
      </div>

      {/* Menu Links (Mobile) */}
      <div
        className={`${
          isOpen ? 'absolute top-16 left-0 w-full bg-white bg-opacity-90 flex flex-col' : 'hidden'
        } md:flex md:items-center md:justify-between md:static md:bg-transparent`}
      >
        <Link
          href="/"
          className="relative ml-4 text-red-600 font-semibold px-4 py-2 "
        >
          Início
        </Link>
        <Link
          href="/comics"
          className="relative ml-4 text-red-600 font-semibold px-4 py-2 "
        >
          Quadrinhos
        </Link>
        <Link
          href="/characters"
          className="relative ml-4 text-red-600 font-semibold px-4 py-2"
        >
          Personagens
        </Link>
        <Link
          href="/events"
          className="relative ml-4 text-red-600 font-semibold px-4 py-2"
        >
          Eventos
        </Link>
      </div>

            {/* Menu Links (Desktop) */}
            <div className="hidden md:flex ml-auto items-center justify-end flex-grow">
        <Link
          href="/"
          className="relative ml-4 text-white font-semibold text-xl px-4 py-2 transition-all duration-300 hover:text-white after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[3.25px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
        >
          Início
        </Link>
        <Link
          href="/comics"
          className="relative ml-4 text-white font-semibold text-xl px-4 py-2 transition-all duration-300 hover:text-white after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[3.25px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
        >
          Quadrinhos
        </Link>
        <Link
          href="/characters"
          className="relative ml-4 text-white font-semibold text-xl px-4 py-2 transition-all duration-300 hover:text-white after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[3.25px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
        >
          Personagens
        </Link>
        <Link
          href="/events"
          className="relative ml-4 text-white font-semibold text-xl px-4 py-2 transition-all duration-300 hover:text-white after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[3.25px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
        >
          Eventos
        </Link>
      </div>
    </nav>
  );
}
