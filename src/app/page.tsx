"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getMarvelComics } from "../services/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"; // Certifique-se de importar o Separator

// Definindo uma interface para os quadrinhos
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

  useEffect(() => {
    const fetchComics = async () => {
      setLoading(true);
      try {
        const data = await getMarvelComics("avengers", 0, LIMIT);
        setComics(data.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchComics();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-red-500 to-red-700 rounded-b-2xl">
        <h1 className="text-5xl font-bold text-white mb-4">Bem-vindo ao Marvel Comics</h1>
        <p className="text-lg text-gray-200 mb-6">
          Descubra quadrinhos e muito mais sobre o universo Marvel.
        </p>
        <Link
          href="/comics"
          className="bg-white text-red-500 py-3 px-6 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          Ver Quadrinhos
        </Link>
      </div>

      <Separator className="my-10" /> {/* Separator adicionado */}

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Por que escolher a Marvel?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Histórias Incríveis</h3>
            <p className="text-gray-600">Mergulhe em narrativas épicas e emocionantes que vão te prender.</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Personagens Memoráveis</h3>
            <p className="text-gray-600">Conheça heróis e vilões que se tornaram ícones da cultura pop.</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Arte Impressionante</h3>
            <p className="text-gray-600">Aprecie ilustrações que trazem as histórias à vida de forma vibrante.</p>
          </div>
        </div>
      </div>

      <Separator className="my-10" /> {/* Separator adicionado */}

      {/* Comics Section */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Quadrinhos em Destaque</h2>
        {loading ? (
          <p className="text-center">Carregando quadrinhos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {comics.map((comic) => (
              <Card key={comic.id} className="rounded-lg shadow-md">
                <Image
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                  className="rounded-t-lg"
                  width={300}
                  height={450}
                  objectFit="cover" 
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold">{comic.title}</h3>
                  <p className="text-gray-600 mb-2">{comic.description || "Descrição não disponível."}</p>
                  <Link href={`/comics/${comic.id}`}>
                    <Button variant="outline" className="rounded-full">
                      Saiba Mais
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Separator className="my-10" /> {/* Separator adicionado */}

      {/* Testimonials Section */}
      <div className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">O que nossos fãs dizem</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="font-semibold">Cliente Satisfeito</h3>
            <p className="text-gray-600 mb-4">&quot;A Marvel sempre traz histórias que me emocionam e me fazem sonhar!&quot;</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="font-semibold">Outro Fã Feliz</h3>
            <p className="text-gray-600 mb-4">&quot;Os quadrinhos da Marvel são a minha forma favorita de entretenimento!&quot;</p>
          </div>
        </div>
      </div>

      <Separator className="my-10" /> {/* Separator adicionado */}

      {/* Footer Section */}
      <footer className="mt-10 text-center">
        <p className="text-gray-500">© 2024 Marvel Comics. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
