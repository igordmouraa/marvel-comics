"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { getMarvelCharacters } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useScroll, useTransform } from "framer-motion";


interface Character {
  id: number;
  name: string;
  description?: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    available: number;
    items: Array<{
      name: string;
      resourceURI: string;
    }>;
  };
  events: {
    available: number;
    items: Array<{
      name: string;
      resourceURI: string;
    }>;
  };
  series: {
    available: number;
    items: Array<{
      name: string;
      resourceURI: string;
    }>;
  };
  urls: Array<{
    type: string;
    url: string;
  }>;
}

const LIMIT = 20;

const characterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const fetchCharacters = async () => {
      setIsNavigating(true);
      setLoading(true);
      try {
        const response = await getMarvelCharacters("", offset, LIMIT);
        setCharacters(response.data.results);
        setTotalCharacters(response.data.total);
      } catch (error) {
        console.error("Erro ao buscar personagens:", error);
      } finally {
        setLoading(false);
        setIsNavigating(false);
      }
    };

    fetchCharacters();
  }, [offset]);

  const handlePagination = (direction: 'next' | 'prev') => {
    setOffset(prev => direction === 'next' ? prev + LIMIT : Math.max(prev - LIMIT, 0));
  };

  const totalPages = Math.ceil(totalCharacters / LIMIT);
  const currentPage = Math.floor(offset / LIMIT) + 1;

  return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
            className="fixed top-0 left-0 right-0 h-2 bg-red-500 origin-left z-50"
            style={{ scaleX }}
        />

        <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent"
        >
          Heróis e Vilões Marvel
        </motion.h1>

        {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(LIMIT).fill(0).map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <Skeleton className="h-64 w-full" />
                    <div className="p-4 space-y-3">
                      <Skeleton className="h-6 w-3/4 mx-auto" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-10 w-full rounded-full" />
                    </div>
                  </Card>
              ))}
            </div>
        ) : (
            <>
              <motion.div
                  key={offset}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {characters.map((character) => (
                    <motion.div
                        key={character.id}
                        variants={characterVariants}
                        transition={{ duration: 0.3 }}
                    >
                      <Card className="group relative overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
                        <div className="relative aspect-square overflow-hidden">
                          <Image
                              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                              alt={character.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>

                        <div className="p-4 flex flex-col flex-grow">
                          <h2 className="text-xl font-bold text-center mb-3">
                            {character.name}
                          </h2>
                          <p className="text-muted-foreground line-clamp-3 mb-4 flex-grow">
                            {character.description || "Descrição não disponível."}
                          </p>
                          <Button
                              asChild
                              variant="secondary"
                              className="rounded-full px-8 py-4 hover:bg-red-600 hover:text-white transition-colors"
                          >
                            <Link href={`/characters/${character.id}`}>
                              Detalhes do Personagem
                              <ChevronRight className="h-4 w-4 ml-2" />
                            </Link>
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                ))}
              </motion.div>

              <div className="flex flex-col items-center gap-4 mt-8">
                <div className="flex gap-4">
                  <Button
                      onClick={() => handlePagination('prev')}
                      disabled={offset === 0 || isNavigating}
                      variant="outline"
                      className="rounded-full px-8 gap-2"
                  >
                    {isNavigating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <>
                          <ChevronLeft className="h-4 w-4" />
                          Anterior
                        </>
                    )}
                  </Button>

                  <Button
                      onClick={() => handlePagination('next')}
                      disabled={currentPage >= totalPages || isNavigating}
                      variant="outline"
                      className="rounded-full px-8 gap-2"
                  >
                    {isNavigating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <>
                          Próximo
                          <ChevronRight className="h-4 w-4" />
                        </>
                    )}
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  Página {currentPage} de {totalPages} - {totalCharacters} personagens
                </div>
              </div>
            </>
        )}
      </div>
  );
}