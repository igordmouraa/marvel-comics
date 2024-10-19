import { getCharacterDetails } from "../../../services/api";
import Image from "next/image";
import Head from 'next/head';
import { notFound } from "next/navigation";

// Definições de interfaces
interface ComicItem {
  name: string;
  resourceURI: string;
}

interface StoryItem {
  name: string;
  resourceURI: string;
}

interface EventItem {
  name: string;
  resourceURI: string;
}

interface SeriesItem {
  name: string;
  resourceURI: string;
}

interface CharacterData {
  name: string;
  description?: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    items: ComicItem[];
  };
  stories: {
    items: StoryItem[];
  };
  events: {
    items: EventItem[];
  };
  series: {
    items: SeriesItem[];
  };
  urls: { url: string }[];
}

interface CharacterPageProps {
  params: { id: string };
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  console.log("Componente CharacterPage foi renderizado");
  console.log("Parâmetros recebidos:", params);

  let characterData: CharacterData | undefined;

  try {
    const character = await getCharacterDetails(params.id);
    console.log("ID do personagem:", params.id);
    console.log("Dados do personagem:", character);

    if (!character.data || !character.data.results.length) {
      notFound();
      return;
    }

    characterData = character.data.results[0];
  } catch (error) {
    console.error("Erro ao buscar detalhes do personagem:", error);
    notFound();
    return;
  }

  if (!characterData) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Head>
        <title>{characterData.name} | Marvel Comics</title>
      </Head>
      <h1 className="text-4xl font-bold mb-4 text-center">
        {characterData.name}
      </h1>
      <div className="flex flex-col md:flex-row items-center mb-6">
        <Image
          src={`${characterData.thumbnail.path}.${characterData.thumbnail.extension}`}
          alt={characterData.name}
          width={300}
          height={400}
          className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-lg mb-4 md:mb-0 md:mr-4"
        />
        <div className="md:w-2/3 md:ml-4">
          <p className="mb-4 text-lg text-gray-700">
            {characterData.description || "Descrição não disponível."}
          </p>
          <h2 className="text-xl font-semibold">Informações:</h2>
          <p className="text-gray-600">
            <strong>Comics:</strong>{" "}
            {characterData.comics.items.length > 0
              ? characterData.comics.items
                  .map((comic: ComicItem) => comic.name)
                  .join(", ")
              : "Não disponível."}
          </p>
          <p className="text-gray-600">
            <strong>Histórias:</strong>{" "}
            {characterData.stories.items.length > 0
              ? characterData.stories.items
                  .map((story: StoryItem) => story.name)
                  .join(", ")
              : "Não disponível."}
          </p>
          <p className="text-gray-600">
            <strong>Eventos:</strong>{" "}
            {characterData.events.items.length > 0
              ? characterData.events.items
                  .map((event: EventItem) => event.name)
                  .join(", ")
              : "Não disponível."}
          </p>
          <p className="text-gray-600">
            <strong>Séries:</strong>{" "}
            {characterData.series.items.length > 0
              ? characterData.series.items
                  .map((series: SeriesItem) => series.name)
                  .join(", ")
              : "Não disponível."}
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <a
          href={characterData.urls[0]?.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 text-white px-6 py-2 rounded-full shadow hover:bg-red-500 transition"
        >
          Ver mais detalhes
        </a>
      </div>
    </div>
  );
}
