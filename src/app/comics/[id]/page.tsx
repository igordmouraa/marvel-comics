import { getComicDetails } from "../../../services/api";
import { notFound } from "next/navigation";

interface ComicPageProps {
  params: { id: string };
}

export default async function ComicPage({ params }: ComicPageProps) {
  console.log("Componente ComicPage foi renderizado");
  console.log("Parâmetros recebidos:", params);

  let comicData; // Definido fora do try-catch

  try {
    const comic = await getComicDetails(params.id);
    
    if (!comic.data || !comic.data.results.length) {
      notFound();
      return; // Adicionei return para evitar execução adicional
    }

    comicData = comic.data.results[0]; // Extraindo os dados do quadrinho
  } catch (error) {
    console.error("Erro ao buscar detalhes do quadrinho:", error);
    notFound(); // Chame notFound se houver erro
    return; // Adicionei return para evitar execução adicional
  }

  // Verifique se comicData está definido antes de renderizar
  if (!comicData) {
    return <div>Carregando...</div>; // Ou qualquer outro indicador de carregamento
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-4 text-center">{comicData.title}</h1>
      <div className="flex flex-col md:flex-row mb-6">
        <img
          src={`${comicData.thumbnail.path}.${comicData.thumbnail.extension}`}
          alt={comicData.title}
          className="w-full md:w-1/3 h-auto mb-4 md:mb-0 md:mr-4 rounded-lg shadow-lg" // Bordas arredondadas e sombra
        />
        <div className="md:w-2/3 md:ml-4">
          <p className="mb-4 text-gray-700">
            {comicData.description || "Descrição não disponível."}
          </p>
          <h2 className="text-xl font-semibold">Informações:</h2>
          <p className="text-gray-600">
            <strong>Número da Edição:</strong> {comicData.issueNumber || "Não disponível."}
          </p>
          <p className="text-gray-600">
            <strong>Data de Publicação:</strong> {comicData.dates.find(date => date.type === 'onsaleDate')?.date || "Data não disponível."}
          </p>
          <p className="text-gray-600">
            <strong>Formato:</strong> {comicData.format || "Formato não disponível."}
          </p>
          <p className="text-gray-600">
            <strong>Escritores:</strong>{" "}
            {comicData.creators.items
              .filter(creator => creator.role === 'writer')
              .map(creator => creator.name)
              .join(", ") || "Não disponível."}
          </p>
          <p className="text-gray-600">
            <strong>Personagens:</strong>{" "}
            {comicData.characters.items.length
              ? comicData.characters.items.map((character) => character.name).join(", ")
              : "Personagens não disponíveis."}
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <a
          href={comicData.urls[0]?.url || "#"}
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
