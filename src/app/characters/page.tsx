"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getMarvelCharacters } from '../../services/api';

const ITEMS_PER_PAGE = 20; // Número de personagens por página

export default function CharactersPage() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const data = await getMarvelCharacters(currentPage);
        setCharacters(data.data.results);
        setTotalCharacters(data.data.total);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [currentPage]);

  const totalPages = Math.ceil(totalCharacters / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Personagens da Marvel</h1>
      {loading ? (
        <p className="text-center">Carregando...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((character) => (
            <Link key={character.id} href={`/characters/${character.id}`} passHref>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-shadow duration-200 hover:shadow-xl">
                <img
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                  className="w-full h-48 object-cover rounded-t-lg" // Tamanho fixo e bordas arredondadas
                />
                <div className="p-4">
                  <h2 className="font-bold text-center">{character.name}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 ${currentPage === 1 ? 'bg-gray-300' : 'bg-red-600 text-white'} rounded-full shadow transition-opacity duration-200 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-500'}`}
        >
          Anterior
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 ${currentPage === totalPages ? 'bg-gray-300' : 'bg-red-600 text-white'} rounded-full shadow transition-opacity duration-200 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-500'}`}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
