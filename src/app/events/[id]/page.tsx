import { getEventDetails } from "../../../services/api"; 
import Image from "next/image";
import { notFound } from "next/navigation";

interface EventPageProps {
  params: { id: string };
}

export default async function EventPage({ params }: EventPageProps) {
  console.log("Componente EventPage foi renderizado");
  console.log("Parâmetros recebidos:", params);

  let eventData;

  try {
    const event = await getEventDetails(params.id); // Busca os detalhes do evento
    console.log("ID do evento:", params.id);
    console.log("Dados do evento:", event);

    if (!event.data || !event.data.results.length) {
      notFound();
      return;
    }

    eventData = event.data.results[0]; // Obtém os dados do primeiro resultado
  } catch (error) {
    console.error("Erro ao buscar detalhes do evento:", error);
    notFound();
    return;
  }

  if (!eventData) {
    return <div>Carregando...</div>; // Exibe carregando se os dados não estiverem disponíveis
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-4 text-center">{eventData.title}</h1>
      <div className="flex flex-col md:flex-row items-center mb-6">
        <Image
          src={`${eventData.thumbnail.path}.${eventData.thumbnail.extension}`}
          alt={eventData.title}
          width={300}
          height={400}
          className="w-full md:w-1/3 h-auto object-cover rounded-t-lg shadow-lg mb-4 md:mb-0 md:mr-4"
        />
        <div className="md:w-2/3 md:ml-4">
          <p className="mb-4 text-lg text-gray-700">
            {eventData.description || "Descrição não disponível."}
          </p>
          <h2 className="text-xl font-semibold">Informações:</h2>
          <p className="text-gray-600">
            <strong>Comics:</strong>{" "}
            {eventData.comics.items.length > 0
              ? eventData.comics.items.map((comic) => comic.name).join(", ")
              : "Não disponível."}
          </p>
          <p className="text-gray-600">
            <strong>Personagens:</strong>{" "}
            {eventData.characters.items.length > 0
              ? eventData.characters.items
                  .map((character) => character.name)
                  .join(", ")
              : "Não disponível."}
          </p>
          <p className="text-gray-600">
            <strong>Histórias:</strong>{" "}
            {eventData.stories.items.length > 0
              ? eventData.stories.items.map((story) => story.name).join(", ")
              : "Não disponível."}
          </p>
          <p className="text-gray-600">
            <strong>Séries:</strong>{" "}
            {eventData.series.items.length > 0
              ? eventData.series.items.map((series) => series.name).join(", ")
              : "Não disponível."}
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <a
          href={eventData.urls[0]?.url || "#"}
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
