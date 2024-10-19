"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // Importando o Link
import { getMarvelComics } from "../../services/api";

const LIMIT = 10; // Número de quadrinhos por página

export default function ComicsPage() {
  const [comics, setComics] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [offset, setOffset] = useState(0); // Estado para a página atual
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    const fetchComics = async (term: string) => {
      setLoading(true); // Inicia o carregamento
      try {
        const data = await getMarvelComics(term, offset, LIMIT);
        setComics(data.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchComics(searchTerm || "avengers"); // Usando 'avengers' como valor padrão
  }, [searchTerm, offset]); // Adiciona offset na dependência

  // Função para lidar com a busca
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setOffset(0); // Reseta o offset ao buscar
  };

  // Funções de paginação
  const handleNextPage = () => {
    setOffset((prev) => prev + LIMIT);
  };

  const handlePreviousPage = () => {
    setOffset((prev) => Math.max(prev - LIMIT, 0));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Quadrinhos da Marvel</h1>
      {loading ? (
        <p className="text-center">Carregando...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comics.map((comic) => (
            <Link key={comic.id} href={`/comics/${comic.id}`} passHref>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-shadow duration-200 hover:shadow-xl">
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                  className="w-full h-48 object-cover rounded-t-lg" // Tamanho fixo e bordas arredondadas
                />
                <div className="p-4">
                  <h2 className="font-bold text-center">{comic.title}</h2>
                  <p className="h-16 overflow-hidden text-ellipsis"> {/* Tamanho fixo para a descrição */}
                    {comic.description || "Descrição não disponível."}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={offset === 0}
          className={`px-6 py-2 ${offset === 0 ? 'bg-gray-300' : 'bg-red-600 text-white'} rounded-full shadow transition-opacity duration-200 ${offset === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-500'}`}
        >
          Anterior
        </button>
        <button
          onClick={handleNextPage}
          disabled={comics.length < LIMIT}
          className={`px-6 py-2 ${comics.length < LIMIT ? 'bg-gray-300' : 'bg-red-600 text-white'} rounded-full shadow transition-opacity duration-200 ${comics.length < LIMIT ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-500'}`}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
