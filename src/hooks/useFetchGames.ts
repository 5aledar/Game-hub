import { useInfiniteQuery } from '@tanstack/react-query';
import axiosInstance from '../utils/axiosInstance';
import useQueryStore from '@/store/useQuery';

const fetchGames = async ({ pageParam = 1 }: { pageParam: number }) => {
    const { query } = useQueryStore.getState();

    const params: Record<string, any> = {
        page: pageParam,
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

const useFetchGames = () => {
    const { query } = useQueryStore();

    const {
        data,
        error,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ['games', query.genre, query.platform, query.sort, query.search],
        queryFn: fetchGames,
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            return lastPage.next ? pages.length + 1 : undefined;
        },

    });

    return {
        data,
        error,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    };
};

export default useFetchGames;
