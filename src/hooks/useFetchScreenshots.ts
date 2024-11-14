import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useFetchScreenshots = (id: number) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['screenshots', id],
        queryFn: () => fetchScreenshots(id)
    })
    console.log(data);

    return {
        screenshots: data?.results || []
    }

}

const fetchScreenshots = async (id: number) => {
    const { data } = await axiosInstance(`/games/${id}/screenshots`)
    return data
}