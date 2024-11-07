import axiosInstance from '../utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import genres from '@/data/genres';
export const useFetchGenres = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['genres'],
        queryFn: fetchGenres,
        initialData: genres
    });
    return {
        genres: data?.results || [],
    }
}
const fetchGenres = async () => {
    const { data } = await axiosInstance.get('/genres',{
        params:{
            key: process.env.VITE_API_KEY
        }
    });
    return data
}