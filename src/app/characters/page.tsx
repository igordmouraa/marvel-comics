"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getMarvelCharacters } from "../../services/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Definindo uma interface para o personagem
interface Character {
  id: number;
  name: string;
  description?: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const LIMIT = 10;

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async (term: string) => {
      setLoading(true);
      try {
        const data = await getMarvelCharacters(term, offset, LIMIT);
        setCharacters(data.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters("avengers");
  }, [offset]);

  // Funções de paginação
  const handleNextPage = () => {
    setOffset((prev) => prev + LIMIT);
  };

  const handlePreviousPage = () => {
    setOffset((prev) => Math.max(prev - LIMIT, 0));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Personagens da Marvel</h1>
      {loading ? (
        <p className="text-center">Carregando...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((character) => (
            <Card key={character.id} className="rounded-lg shadow-md overflow-hidden transition-shadow duration-200 hover:shadow-xl">
              <Image
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                width={300}
                height={400}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-center">{character.name}</h2>
                <p className="text-gray-600 h-16 overflow-hidden text-ellipsis">
                  {character.description || "Descrição não disponível."}
                </p>
                <Link href={`/characters/${character.id}`} passHref>
                  <Button variant="outline" className="w-full mt-4 rounded-full">
                    Saiba Mais
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={offset === 0}
          className={`px-6 py-2 ${offset === 0 ? 'bg-gray-300' : 'bg-red-600 text-white'} rounded-full shadow transition-opacity duration-200 ${offset === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-500'}`}
        >
          Anterior
        </button>
        <button
          onClick={handleNextPage}
          disabled={characters.length < LIMIT}
          className={`px-6 py-2 ${characters.length < LIMIT ? 'bg-gray-300' : 'bg-red-600 text-white'} rounded-full shadow transition-opacity duration-200 ${characters.length < LIMIT ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-500'}`}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
