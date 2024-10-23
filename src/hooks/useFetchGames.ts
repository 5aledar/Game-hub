// src/hooks/useFetchGames.ts
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance'; // Adjust the path if needed
import { Platform } from '../utils/interfaces';
import { ParentPlatform } from '../utils/interfaces';
import { Game } from '../utils/interfaces';


const useFetchGames = (genreId: string , platformId: number, sortOption: string, page: number) => {
    const [games, setGames] = useState<Game[]>([]);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [prevPage, setPrevPage] = useState<string | null>(null);

    const fetchGames = async () => {
        try {
            const response = await axiosInstance.get(
                `/games?genres=${genreId || 1}&ordering=${sortOption}&page=${page}&parent_platforms=${platformId}&key=${process.env.VITE_API_KEY}`
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
