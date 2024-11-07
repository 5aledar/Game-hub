import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { GameDetails } from "@/types/game.model";

export const useFetchGameDetails = (id: number) => {
  const { data, error, isLoading } = useQuery<GameDetails, Error>({
    queryKey: ['gameDetails', id],
    queryFn: () => fetchDetails(id),
  });
  return {
    details: data! || {},
    error,
    isLoading
  }
};


const fetchDetails = async (id: number) => {
  const { data } = await axiosInstance.get(`/games/${id}?key=${process.env.VITE_API_KEY}`);
  return data;
}
