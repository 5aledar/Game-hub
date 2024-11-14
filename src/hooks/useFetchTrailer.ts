import axiosInstance from "../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
export const useFetchTrailer = (id: number) => {
    const { data} = useQuery({
        queryKey: ['trailer', id],
        queryFn: () => fetchTrailer(id)
    })
    return {
        trailers: data?.results || [],
    }
}
const fetchTrailer = async (id: number) => {
    const { data } = await axiosInstance.get(`/games/${id}/movies`)
    return data;
}
