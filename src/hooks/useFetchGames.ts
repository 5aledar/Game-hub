// src/hooks/useFetchGames.ts
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../utils/axiosInstance';
import useQueryStore from '@/store/useQuery';

const fetchGames = async (page: number) => {
    const { query } = useQueryStore.getState(); 

    const params: Record<string, any> = {
        page,
        key: process.env.VITE_API_KEY,
    };

    if (query.genre) params.genres = query.genre;
    if (query.platform) params.parent_platforms = query.platform;
    if (query.sort) params.ordering = query.sort;
    if (query.search && query.search.trim() !== '') {
        params.search = query.search;
    }

    const response = await axiosInstance.get('/games', { params });
    return response.data;
};

const useFetchGames = (page: number = 1) => {
    const { query } = useQueryStore();  

    const { data, error, isLoading } = useQuery({
        queryKey: ['games', query.genre, query.platform, query.sort, page, query.search],
        queryFn: () => fetchGames(page), 
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
