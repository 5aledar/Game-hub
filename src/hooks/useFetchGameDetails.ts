
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { GameDetails } from "../types/interfaces";

export const useFetchGameDetails = (id: string) => {
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


const fetchDetails = async (id: string) => {
  const { data } = await axiosInstance.get(`/games/${id}?key=${process.env.VITE_API_KEY}`);
  return data;
}
