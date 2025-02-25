"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";


export default function NotFoundPage() {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative flex flex-col items-center justify-center text-center py-32 bg-gradient-to-r from-red-600 to-red-800 rounded-b-[3rem] overflow-hidden"
            >
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute animate-marvelFloat w-full h-full bg-[url('/marvel-logo-pattern.svg')] bg-repeat" />
                </div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="relative z-10"
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                        404 - Página Não Encontrada
                    </h1>
                    <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                        Oops! Parece que você se perdeu no multiverso. A página que você está procurando não existe.
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="/">
                            <Button className="bg-white text-red-600 py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all font-semibold text-lg">
                                Voltar para o Início →
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* Illustration Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto px-4 py-24 text-center"
            >
                <p className="text-lg text-gray-600 mt-8">
                    Não se preocupe, até os maiores heróis se perdem às vezes. Use o botão acima para retornar ao caminho certo!
                </p>
            </motion.section>
        </div>
    );
}