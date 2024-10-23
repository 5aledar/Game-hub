// src/hooks/useFetchGames.ts
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../utils/axiosInstance'; 
import { Game } from '../utils/interfaces';

const fetchGames = async (genreId: string, platformId: number, sortOption: string, page: number) => {
    const response = await axiosInstance.get(
        `/games?genres=${genreId || 1}&ordering=${sortOption}&page=${page}&parent_platforms=${platformId}&key=${process.env.VITE_API_KEY}`
    );
    return response.data; 
};

const useFetchGames = (genreId: string, platformId: number, sortOption: string, page: number) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['games', genreId, platformId, sortOption, page], 
        queryFn: () => fetchGames(genreId, platformId, sortOption, page),
        staleTime: 1000 * 60 * 5, 
    });


    return {
        games: data?.results || [],
        nextPage: data?.next || null,
        prevPage: data?.previous || null,
        error,
        isLoading,
    };
};

export default useFetchGames;
