"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMarvelComics } from "../services/api"; // Certifique-se de que o caminho está correto
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const LIMIT = 3; // Definindo o limite para 3 quadrinhos

export default function HomePage() {
  const [comics, setComics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    const fetchComics = async () => {
      setLoading(true); // Inicia o carregamento
      try {
        const data = await getMarvelComics("avengers", 0, LIMIT); // Usando 'avengers' como valor padrão
        setComics(data.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchComics(); // Chama a função para buscar os quadrinhos
  }, []); // A dependência vazia garante que a busca seja feita apenas uma vez ao montar o componente

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

      {/* Comics Section */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Quadrinhos em Destaque</h2>
        {loading ? (
          <p className="text-center">Carregando quadrinhos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {comics.map((comic) => (
              <Card key={comic.id} className="rounded-lg shadow-md">
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                  className="rounded-t-lg h-48 w-full object-cover"
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

      {/* Testimonials Section */}
      <div className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">O que nossos fãs dizem</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="font-semibold">Cliente Satisfeito</h3>
            <p className="text-gray-600 mb-4">"A Marvel sempre traz histórias que me emocionam e me fazem sonhar!"</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="font-semibold">Outro Fã Feliz</h3>
            <p className="text-gray-600 mb-4">"Os quadrinhos da Marvel são a minha forma favorita de entretenimento!"</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-10 text-center">
        <p className="text-gray-500">© 2024 Marvel Comics. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
