"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { getMarvelComics } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface Comic {
  id: number;
  title: string;
  description?: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const LIMIT = 10;

const comicVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ComicsPage() {
  const [comics, setComics] = useState<Comic[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const fetchComics = async () => {
      setIsNavigating(true);
      try {
        const data = await getMarvelComics("avengers", offset, LIMIT);
        setComics(data.data.results);
      } finally {
        setLoading(false);
        setIsNavigating(false);
      }
    };

    fetchComics();
  }, [offset]);

  const handlePagination = (direction: 'next' | 'prev') => {
    setOffset(prev => direction === 'next' ? prev + LIMIT : Math.max(prev - LIMIT, 0));
  };

  return (
      <div className="container mx-auto px-4 py-8">
        <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent"
        >
          Coleção de Quadrinhos
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
                {comics.map((comic) => (
                    <motion.div
                        key={comic.id}
                        variants={comicVariants}
                        transition={{ duration: 0.3 }}
                    >
                      <Card className="group relative overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
                        <div className="relative aspect-[2/3] overflow-hidden">
                          <Image
                              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                              alt={comic.title}
                              priority={true}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>

                        <div className="p-4 flex flex-col flex-grow">
                          <h2 className="text-xl font-bold text-center mb-3">
                            {comic.title}
                          </h2>
                          <p className="text-muted-foreground line-clamp-3 mb-4 flex-grow">
                            {comic.description || "Explore esta incrível história do universo Marvel."}
                          </p>
                          <Button
                              asChild
                              variant="secondary"
                              className="rounded-full px-8 py-4 hover:bg-red-600 hover:text-white transition-colors"
                          >
                            <Link href={`/comics/${comic.id}`}>
                              Detalhes Completo
                              <ChevronRight className="h-4 w-4 ml-2" />
                            </Link>
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                ))}
              </motion.div>

              <div className="flex justify-center gap-4 mt-8">
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
                    disabled={comics.length < LIMIT || isNavigating}
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
            </>
        )}
      </div>
  );
}