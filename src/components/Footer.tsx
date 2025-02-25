"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function Footer() {
    return (
        <motion.footer
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={footerVariants}
            className="mt-20 py-12 bg-red-700 text-white"
        >
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Sobre */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-bold mb-4">Sobre a Marvel</h3>
                        <p className="text-gray-300 leading-relaxed">
                            Explore o universo Marvel através de quadrinhos, personagens e eventos épicos. Sua jornada heróica começa aqui!
                        </p>
                    </motion.div>

                    {/* Links Rápidos */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/comics" className="text-gray-300 hover:text-red-200 transition">
                                    Quadrinhos
                                </Link>
                            </li>
                            <li>
                                <Link href="/characters" className="text-gray-300 hover:text-red-200 transition">
                                    Personagens
                                </Link>
                            </li>
                            <li>
                                <Link href="/events" className="text-gray-300 hover:text-red-200 transition">
                                    Eventos
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-300 hover:text-red-200 transition">
                                    Sobre Nós
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Contato */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-bold mb-4">Contato</h3>
                        <ul className="text-gray-300 space-y-2">
                            <li>Email: contato@marvelcomics.com</li>
                            <li>Telefone: (11) 1234-5678</li>
                            <li>Endereço: Rua Marvel, 123 - São Paulo, SP</li>
                        </ul>
                    </motion.div>

                    {/* Redes Sociais */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-bold mb-4">Redes Sociais</h3>
                        <div className="flex gap-4">
                            <motion.a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-gray-300 hover:text-red-200 transition"
                            >
                                <Facebook className="h-6 w-6" />
                            </motion.a>
                            <motion.a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-gray-300 hover:text-red-200 transition"
                            >
                                <Twitter className="h-6 w-6" />
                            </motion.a>
                            <motion.a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-gray-300 hover:text-red-200 transition"
                            >
                                <Instagram className="h-6 w-6" />
                            </motion.a>
                            <motion.a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-gray-300 hover:text-red-200 transition"
                            >
                                <Linkedin className="h-6 w-6" />
                            </motion.a>
                        </div>
                    </motion.div>
                </div>

                {/* Direitos Autorais */}
                <motion.div
                    variants={itemVariants}
                    className="border-t border-red-800 pt-8 text-center"
                >
                    <p className="text-gray-300">
                        © {new Date().getFullYear()} Marvel Universe. Todos os direitos reservados.
                    </p>
                    <div className="flex justify-center gap-6 mt-4">
                        <Link href="/terms" className="text-gray-300 hover:text-red-200 transition">
                            Termos
                        </Link>
                        <Link href="/privacy" className="text-gray-300 hover:text-red-200 transition">
                            Privacidade
                        </Link>
                        <Link href="/contact" className="text-gray-300 hover:text-red-200 transition">
                            Contato
                        </Link>
                    </div>
                </motion.div>
            </div>
        </motion.footer>
    );
}