"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getMarvelComics } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";


interface Comic {
  id: number;
  title: string;
  description?: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const LIMIT = 3;

export default function HomePage() {
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const data = await getMarvelComics("avengers", 0, LIMIT);
        setComics(data.data.results);
      } finally {
        setLoading(false);
      }
    };
    fetchComics();
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        {/* Progress Bar */}
        <motion.div
            className="fixed top-0 left-0 right-0 h-2 bg-red-500 origin-left z-50"
            style={{ scaleX }}
        />

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
              Explore o Universo Marvel
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Descubra heróis épicos, histórias cativantes e arte espetacular que definiram uma geração.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                  href="/comics"
                  className="inline-block bg-white text-red-600 py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all font-semibold text-lg"
              >
                Explorar Quadrinhos →
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ staggerChildren: 0.2 }}
            className="max-w-7xl mx-auto px-4 py-24"
        >
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
            Por que a Marvel?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Histórias Épicas', 'Personagens Icônicos', 'Arte Revolucionária'].map((feature, index) => (
                <motion.div
                    key={feature}
                    variants={sectionVariants}
                    className="group relative bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-red-100"
                >
                  <div className="absolute inset-0 rounded-xl border-2 border-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <span className="text-red-600">{index + 1}.</span>
                    {feature}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {[
                      "Narrativas complexas que redefiniram os quadrinhos modernos.",
                      "De Homem-Aranha a Thanos, personagens que se tornaram lendas.",
                      "Ilustrações premiadas que dão vida às páginas."
                    ][index]}
                  </p>
                </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Comics Section */}
        <section className="max-w-7xl mx-auto px-4 py-24">
          <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-16"
          >
            Destaques da Coleção
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
                Array(LIMIT).fill(0).map((_, i) => (
                    <Card key={i} className="rounded-xl overflow-hidden">
                      <Skeleton className="h-64 w-full rounded-t-xl" />
                      <div className="p-6">
                        <Skeleton className="h-6 w-3/4 mb-4" />
                        <Skeleton className="h-4 w-full mb-4" />
                        <Skeleton className="h-4 w-2/3 mb-6" />
                        <Skeleton className="h-10 w-32 rounded-full" />
                      </div>
                    </Card>
                ))
            ) : (
                comics.map((comic) => (
                    <motion.div
                        key={comic.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                      <Card className="group relative rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="relative aspect-[2/3] overflow-hidden">
                          <Image
                              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                              alt={comic.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              quality={100}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>

                        <div className="p-6 relative">
                          <h3 className="text-xl font-bold mb-3 text-gray-800">{comic.title}</h3>
                          <p className="text-gray-600 line-clamp-3 mb-6">
                            {comic.description || "Uma jornada épica através do universo Marvel."}
                          </p>
                          <Button
                              asChild
                              variant="secondary"
                              className="rounded-full px-8 py-4 hover:bg-red-600 hover:text-white transition-colors"
                          >
                            <Link href={`/comics/${comic.id}`}>
                              Detalhes do Quadrinho
                            </Link>
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                ))
            )}
          </div>
        </section>

        {/* Testimonials Section */}
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="py-24 bg-red-50"
        >
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Voz da Comunidade</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  text: "A Marvel reinventou minha paixão por quadrinhos. Cada edição é uma nova aventura!",
                  author: "Carlos Silva"
                },
                {
                  text: "Os personagens são tão complexos e bem desenvolvidos que parecem reais!",
                  author: "Ana Souza"
                }
              ].map((testimonial, index) => (
                  <motion.div
                      key={index}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="text-3xl text-red-600 mb-4">“</div>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      {testimonial.text}
                    </p>
                    <div className="text-red-600 font-semibold">~ {testimonial.author}</div>
                  </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

      </div>
  );
}