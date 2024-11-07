import axiosInstance from '../utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { platform } from 'os';
export const useFetchGenres = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['genres'],
        queryFn: fetchGenres
    });
    return {
        genres: data?.results || [],
    }
}
const fetchGenres = async () => {
    const { data } = await axiosInstance.get('/genres');
    return data
}