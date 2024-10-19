// src/services/api.ts

import CryptoJS from 'crypto-js';

const publicKey = 'b6292eb9ef43f2eca040ebb1a464a08d'; // Substitua pela sua chave pública
const privateKey = 'aea1cd381649acf90945cba5689f08c21b73ed39'; // Substitua pela sua chave privada

// Função para gerar o timestamp e o hash
const generateAuthParams = () => {
    const timestamp = Date.now().toString();
    const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();
    return { timestamp, hash };
};

// Função para buscar quadrinhos da Marvel com base em um termo de pesquisa
export const getMarvelComics = async (searchTerm: string = 'avengers', offset: number = 0, limit: number = 10) => {
    const { timestamp, hash } = generateAuthParams();
    const baseUrl = 'https://gateway.marvel.com/v1/public/comics';
    const url = `${baseUrl}?format=comic&title=${searchTerm}&orderBy=onsaleDate&ts=${timestamp}&apikey=${publicKey}&hash=${hash}&offset=${offset}&limit=${limit}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados da Marvel:', error);
        throw error; // Lança o erro para que possa ser tratado onde a função é chamada
    }
};

// Função para buscar detalhes de um quadrinho específico
export const getComicDetails = async (id: string) => {
    const { timestamp, hash } = generateAuthParams();
    const baseUrl = `https://gateway.marvel.com/v1/public/comics/${id}`;
    const url = `${baseUrl}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar detalhes do quadrinho:', error);
        throw error; // Lança o erro para que possa ser tratado onde a função é chamada
    }
};

export const getMarvelCharacters = async (page: number) => {
    const { timestamp, hash } = generateAuthParams();
    const baseUrl = 'https://gateway.marvel.com/v1/public/characters';
    const ITEMS_PER_PAGE = 20;
    const url = `${baseUrl}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=${ITEMS_PER_PAGE}&offset=${(page - 1) * ITEMS_PER_PAGE}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados dos personagens:', error);
        throw error; // Lança o erro para que possa ser tratado onde a função é chamada
    }
};

export const getCharacterDetails = async (id: string) => {
    const { timestamp, hash } = generateAuthParams();
    const baseUrl = `https://gateway.marvel.com/v1/public/characters/${id}`;
    const url = `${baseUrl}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

    console.log("URL da API:", url); // Logando a URL para verificar se está correta

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Dados recebidos da API:", data); // Logando os dados recebidos
        return data;
    } catch (error) {
        console.error('Erro ao buscar detalhes do personagem:', error);
        throw error; // Lança o erro para que possa ser tratado onde a função é chamada
    }
};

export const getMarvelEvents = async (offset: number = 0, limit: number = 10) => {
    const { timestamp, hash } = generateAuthParams();
    const baseUrl = 'https://gateway.marvel.com/v1/public/events';
    const url = `${baseUrl}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&offset=${offset}&limit=${limit}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar eventos da Marvel:', error);
        throw error;
    }
};

export const getEventDetails = async (id: string) => {
    const { timestamp, hash } = generateAuthParams();
    const baseUrl = `https://gateway.marvel.com/v1/public/events/${id}`;
    const url = `${baseUrl}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar detalhes do evento:', error);
        throw error; // Lança o erro para que possa ser tratado onde a função é chamada
    }
};
