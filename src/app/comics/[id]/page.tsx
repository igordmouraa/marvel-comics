"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getComicDetails } from "@/services/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, BookOpen, PenLine, Users } from "lucide-react";
import { notFound } from "next/navigation";

interface CreatorItem {
  name: string;
  role: string;
}

interface CharacterItem {
  name: string;
  resourceURI: string;
}

interface DateItem {
  type: string;
  date: string;
}

interface ComicData {
  title: string;
  description?: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  issueNumber?: number;
  dates: DateItem[];
  format?: string;
  creators: {
    items: CreatorItem[];
  };
  characters: {
    items: CharacterItem[];
  };
  urls: { url: string }[];
}

interface ComicPageProps {
  params: { id: string };
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ComicPage({ params }: ComicPageProps) {
  const [comicData, setComicData] = useState<ComicData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getComicDetails(params.id);
        if (!response.data?.results.length) {
          notFound();
        }
        setComicData(response.data.results[0]);
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

  if (!comicData) {
    notFound();
  }

  // Helper functions
  const getFormattedDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const groupCreatorsByRole = (creators: CreatorItem[]) => {
    return creators.reduce((acc: { [key: string]: string[] }, creator) => {
      const role = creator.role.toLowerCase();
      if (!acc[role]) acc[role] = [];
      acc[role].push(creator.name);
      return acc;
    }, {});
  };

  const creatorsByRole = groupCreatorsByRole(comicData.creators.items);

  return (
      <div className="container mx-auto px-4 py-8">
        {/* Capa e Informações Básicas */}
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="flex flex-col lg:flex-row gap-8 mb-12"
        >
          <div className="w-full lg:w-1/3 relative group">
            <Image
                src={`${comicData.thumbnail.path}.${comicData.thumbnail.extension}`}
                alt={comicData.title}
                width={400}
                height={600}
                className="rounded-xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                priority
            />
            <Badge className="absolute top-4 right-4 bg-red-600/90 hover:bg-red-600 text-white">
              Edição #{comicData.issueNumber}
            </Badge>
          </div>

          <div className="flex-1 space-y-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              {comicData.title}
            </h1>

            {comicData.description && (
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {comicData.description}
                </p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                <CalendarDays className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Publicação</p>
                  <p className="font-semibold">
                    {getFormattedDate(comicData.dates.find(d => d.type === 'onsaleDate')?.date || 'N/A')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                <BookOpen className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Formato</p>
                  <p className="font-semibold capitalize">{comicData.format || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                <Users className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Personagens</p>
                  <p className="font-semibold">{comicData.characters.items.length}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Detalhes Expandidos */}
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {/* Criadores */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <PenLine className="h-5 w-5 text-red-600" />
                Equipe Criativa
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(creatorsByRole).map(([role, names]) => (
                  <div key={role}>
                    <h3 className="text-sm font-semibold text-muted-foreground capitalize">{role}</h3>
                    <p className="font-medium">{names.join(', ')}</p>
                  </div>
              ))}
            </CardContent>
          </Card>

          {/* Personagens */}
          {comicData.characters.items.length > 0 && (
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <h2 className="text-xl font-bold">Personagens</h2>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {comicData.characters.items.map((character) => (
                        <Badge
                            key={character.resourceURI}
                            variant="outline"
                            className="px-3 py-1 text-sm hover:bg-red-50"
                        >
                          {character.name}
                        </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
          )}
        </motion.section>

        {/* Link Externo */}
        {comicData.urls[0]?.url && (
            <div className="text-center">
              <Button
                  asChild
                  size="lg"
                  className="rounded-full px-8 py-6 text-lg gap-2 hover:gap-3 transition-all"
              >
                <a
                    href={comicData.urls[0].url}
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