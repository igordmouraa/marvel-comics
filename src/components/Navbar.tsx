"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getMarvelComics } from "@/services/api"; // Importa a função
import Link from 'next/link';

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o envio do formulário
    try {
      const comicsData = await getMarvelComics(searchTerm);
      console.log(comicsData); // Aqui você pode fazer algo com os dados retornados
    } catch (error) {
      console.error("Erro ao buscar quadrinhos:", error);
    }
  };

  return (
    <nav className="bg-red-600 py-4 px-6 flex items-center justify-between  shadow-md">
      <Link href="/" className="text-2xl font-bold text-white hover:text-gray-200 transition">
        Marvel Comics
      </Link>
      <form onSubmit={handleSearchSubmit} className="relative w-1/2">
        <Input
          type="text"
          placeholder="Buscar quadrinhos..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="bg-white border border-gray-300 rounded-full pr-10 shadow-sm focus:outline-none focus:ring focus:ring-red-300"
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <Search className="text-gray-600" />
        </button>
      </form>
      <div className="flex items-center">
        <Link href="/comics">
          <button className="ml-4 bg-white text-red-600 px-4 py-2 rounded-full shadow hover:bg-gray-100 transition">
            Comics
          </button>
        </Link>
        <Link href="/characters">
          <button className="ml-4 bg-white text-red-600 px-4 py-2 rounded-full shadow hover:bg-gray-100 transition">
            Personagens
          </button>
        </Link>
      </div>
    </nav>
  );
}
