import CryptoJS from 'crypto-js';

const publicKey = 'b6292eb9ef43f2eca040ebb1a464a08d';
const privateKey = 'aea1cd381649acf90945cba5689f08c21b73ed39';
const API_BASE = 'https://gateway.marvel.com/v1/public';

interface MarvelApiResponse<T> {
    code: number;
    status: string;
    data: {
        offset: number;
        limit: number;
        total: number;
        count: number;
        results: T[];
    };
}

interface Thumbnail {
    path: string;
    extension: string;
}

interface Comic {
    id: number;
    title: string;
    description?: string;
    thumbnail: Thumbnail;
    issueNumber?: number;
    dates: { type: string; date: string }[];
    creators: { items: { name: string; role: string }[] };
    characters: { items: { name: string; resourceURI: string }[] };
    urls: { type: string; url: string }[];
}

interface Character {
    id: number;
    name: string;
    description?: string;
    thumbnail: Thumbnail;
    comics: { available: number; items: { name: string; resourceURI: string }[] };
    events: { available: number; items: { name: string; resourceURI: string }[] };
    series: { available: number; items: { name: string; resourceURI: string }[] };
    stories: { available: number; items: { name: string; resourceURI: string }[] };
    urls: { type: string; url: string }[];
}

interface Event {
    id: number;
    title: string;
    description?: string;
    thumbnail: Thumbnail;
    start: string;
    end: string;
    comics: { available: number; items: { name: string; resourceURI: string }[] };
    characters: { available: number; items: { name: string; resourceURI: string }[] };
    stories: { available: number; items: { name: string; resourceURI: string }[] };
    series: { available: number; items: { name: string; resourceURI: string }[] };
    urls: { type: string; url: string }[];
}

class MarvelApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'MarvelApiError';
    }
}

// Helpers
const generateAuthParams = () => {
    const timestamp = Date.now().toString();
    const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();
    return { timestamp, hash };
};

const fetchMarvelData = async <T>(endpoint: string, params: Record<string, string> = {}) => {
    const { timestamp, hash } = generateAuthParams();
    const url = new URL(`${API_BASE}/${endpoint}`);

    const searchParams = new URLSearchParams({
        ts: timestamp,
        apikey: publicKey,
        hash,
        ...params
    });

    url.search = searchParams.toString();

    try {
        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new MarvelApiError(response.status, `HTTP error! status: ${response.status}`);
        }

        const data: MarvelApiResponse<T> = await response.json();
        return data;

    } catch (error) {
        console.error(`Marvel API request failed: ${url.toString()}`, error);
        throw error;
    }
};

// Funções da API
export const getMarvelComics = async (
    searchTerm: string = '',
    offset: number = 0,
    limit: number = 10
) => {
    const params: Record<string, string> = {
        format: 'comic',
        orderBy: 'onsaleDate',
        offset: offset.toString(),
        limit: limit.toString()
    };

    if (searchTerm) params.titleStartsWith = searchTerm;

    return fetchMarvelData<Comic>('comics', params);
};

export const getComicDetails = async (id: string) => {
    return fetchMarvelData<Comic>(`comics/${id}`);
};

export const getMarvelCharacters = async (
    searchTerm: string = '',
    offset: number = 0,
    limit: number = 20
) => {
    const params: Record<string, string> = {
        offset: offset.toString(),
        limit: limit.toString()
    };

    if (searchTerm) params.nameStartsWith = searchTerm;

    return fetchMarvelData<Character>('characters', params);
};

export const getCharacterDetails = async (id: string) => {
    return fetchMarvelData<Character>(`characters/${id}`);
};

export const getMarvelEvents = async (
    offset: number = 0,
    limit: number = 10
) => {
    const params: Record<string, string> = {
        offset: offset.toString(),
        limit: limit.toString()
    };


    return fetchMarvelData<Event>('events', params);
};

export const getEventDetails = async (id: string) => {
    return fetchMarvelData<Event>(`events/${id}`);
};