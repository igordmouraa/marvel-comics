"use client";

import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const MotionLink = motion(Link);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300 }
    },
    closed: {
      x: -20,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const links = [
    { path: "/", label: "Início" },
    { path: "/comics", label: "Quadrinhos" },
    { path: "/characters", label: "Personagens" },
    { path: "/events", label: "Eventos" }
  ];

  return (
      <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-red-600 py-4 px-6 flex items-center shadow-md relative z-50"
      >
        <MotionLink
            href="/"
            className="text-3xl font-bold text-white"
            whileHover={{
              scale: 1.05,
              textShadow: "0px 0px 10px rgba(255,255,255,0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
          Marvel Comics
        </MotionLink>

        {/* Botão Hamburger Animado (Mobile) */}
        <motion.button
            onClick={toggleMenu}
            className="md:hidden ml-auto focus:outline-none"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
          {isOpen ? (
              <XMarkIcon className="h-8 w-8 text-white p-1" />
          ) : (
              <Bars3Icon className="h-8 w-8 text-white p-1" />
          )}
        </motion.button>

        {/* Menu Mobile com Animações */}
        <AnimatePresence>
          {isOpen && (
              <motion.div
                  variants={menuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="absolute top-full left-0 w-full bg-white bg-opacity-95 backdrop-blur-sm md:hidden shadow-xl"
              >
                <div className="flex flex-col p-4 space-y-2">
                  {links.map((link) => (
                      <motion.div
                          key={link.path}
                          variants={itemVariants}
                      >
                        <Link
                            href={link.path}
                            className="relative text-red-600 font-semibold px-4 py-3 rounded-lg hover:bg-red-50 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                  ))}
                </div>
              </motion.div>
          )}
        </AnimatePresence>

        {/* Menu Desktop Aprimorado */}
        <motion.div
            className="hidden md:flex ml-auto items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
          {links.map((link) => (
              <motion.div
                  key={link.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
              >
                <MotionLink
                    href={link.path}
                    className="relative text-white font-semibold text-lg"
                >
                  {link.label}
                  <motion.div
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-white origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </MotionLink>
              </motion.div>
          ))}
        </motion.div>
      </motion.nav>
  );
}