"use client";

import { getCharacterDetails } from "@/services/api";
import Image from "next/image";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen, BookText, CalendarDays, Tv } from "lucide-react";
import React, {useState, useEffect} from "react";

interface CharacterData {
  name: string;
  description?: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    items: { name: string; resourceURI: string }[];
  };
  stories: {
    items: { name: string; resourceURI: string }[];
  };
  events: {
    items: { name: string; resourceURI: string }[];
  };
  series: {
    items: { name: string; resourceURI: string }[];
  };
  urls: { url: string }[];
}

interface CharacterPageProps {
  params: { id: string };
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function CharacterPage({ params }: CharacterPageProps) {
  const [characterData, setCharacterData] = useState<CharacterData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCharacterDetails(params.id);
        if (!response.data?.results.length) {
          notFound();
        }
        setCharacterData(response.data.results[0]);
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) {
    return <div className="text-center py-20">Carregando...</div>;
  }

  if (!characterData) {
    notFound();
  }

  const renderSection = (items: { name: string }[], title: string, icon: JSX.Element) => {
    if (items.length === 0) return null;

    return (
        <motion.div variants={sectionVariants}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                {icon}
                {title}
              </h2>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {items.map((item, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 text-sm bg-muted rounded-full"
                    >
                  {item.name}
                </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
    );
  };

  return (
      <div className="container mx-auto px-4 py-8">
        {/* Seção Principal */}
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="flex flex-col md:flex-row gap-8 mb-12"
        >
          {/* Imagem */}
          <div className="w-full md:w-1/3 relative group">
            <Image
                src={`${characterData.thumbnail.path}.${characterData.thumbnail.extension}`}
                alt={characterData.name}
                width={400}
                height={600}
                className="rounded-xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                priority
            />
          </div>

          {/* Informações */}
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              {characterData.name}
            </h1>

            {characterData.description && (
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {characterData.description}
                </p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                <BookOpen className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Quadrinhos</p>
                  <p className="font-semibold">{characterData.comics.items.length}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                <BookText className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Histórias</p>
                  <p className="font-semibold">{characterData.stories.items.length}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                <CalendarDays className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Eventos</p>
                  <p className="font-semibold">{characterData.events.items.length}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                <Tv className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Séries</p>
                  <p className="font-semibold">{characterData.series.items.length}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Seções Detalhadas */}
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {renderSection(characterData.comics.items, "Quadrinhos", <BookOpen className="h-5 w-5" />)}
          {renderSection(characterData.stories.items, "Histórias", <BookText className="h-5 w-5" />)}
          {renderSection(characterData.events.items, "Eventos", <CalendarDays className="h-5 w-5" />)}
          {renderSection(characterData.series.items, "Séries", <Tv className="h-5 w-5" />)}
        </motion.section>

        {/* Link Externo */}
        {characterData.urls[0]?.url && (
            <div className="text-center">
              <Button
                  asChild
                  size="lg"
                  className="rounded-full px-8 py-6 text-lg gap-2 hover:gap-3 transition-all"
              >
                <a
                    href={characterData.urls[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  Ver Detalhes Completos
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" x2="21" y1="14" y2="3"/>
                  </svg>
                </a>
              </Button>
            </div>
        )}
      </div>
  );
}