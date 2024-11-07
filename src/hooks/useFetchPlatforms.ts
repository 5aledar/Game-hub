import axiosInstance from '../utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';

 export const useFetchPlatforms = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['platforms'],
        queryFn: fetchPlatforms
    })
    return {
        platforms: data?.results || []
    }
}
const fetchPlatforms = async () => {
    const { data } = await axiosInstance.get('/platforms/lists/parents',{
        params:{
            key: process.env.VITE_API_KEY
        }
    });
    return data
}