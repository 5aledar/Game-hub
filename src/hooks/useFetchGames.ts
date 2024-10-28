// src/hooks/useFetchGames.ts
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../utils/axiosInstance';

const fetchGames = async (genreId?: string, platformId?: number, sortOption?: string, page: number = 1, searchQuery?: string | undefined) => {
    const params: Record<string, any> = {
        page,
        key: process.env.VITE_API_KEY
    };
    if (genreId) params.genres = genreId;
    if (platformId) params.parent_platforms = platformId;
    if (sortOption) params.ordering = sortOption;
    if (searchQuery && searchQuery.trim() !== '') {
        params.search = searchQuery;
    }
    const response = await axiosInstance.get('/games', { params });
    return response.data;
};
const useFetchGames = (
    genreId?: string,
    platformId?: number,
    sortOption?: string,
    page: number = 1,
    searchQuery?: string
) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['games', genreId, platformId, sortOption, page, searchQuery],
        queryFn: () => fetchGames(genreId, platformId, sortOption, page, searchQuery),
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
