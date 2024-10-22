// src/hooks/useFetchGames.ts
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance'; // Adjust the path if needed

export interface Platform {
    id: number;
    name: string;
    slug: string;
}

interface ParentPlatform {
    platform: Platform;
}

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: ParentPlatform[];
    released: string;
    rating: number;
}
const useFetchGames = (genreId: string, platformId: number, sortOption: string, page: number) => {
    const [games, setGames] = useState<Game[]>([]);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [prevPage, setPrevPage] = useState<string | null>(null);

    const fetchGames = async () => {
        try {
            const response = await axiosInstance.get(
                `/games?genres=${genreId}&ordering=${sortOption}&page=${page}&parent_platforms=${platformId}&key=${process.env.VITE_API_KEY}`
            );
            setGames(response.data.results);
            setNextPage(response.data.next);
            setPrevPage(response.data.previous);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };

    useEffect(() => {
        fetchGames();
    }, [genreId, platformId, sortOption, page]);

    return { games, nextPage, prevPage };
};

export default useFetchGames;
