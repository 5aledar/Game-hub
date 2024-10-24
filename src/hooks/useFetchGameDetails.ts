import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { GameDetails } from '../utils/interfaces';

export const useFetchGameDetails = (id: string) => {
  const [details, setDetails] = useState<GameDetails | null>(null); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchGameDetails = async () => {
      setLoading(true); 
      setError(null); 

      try {
        const response = await axiosInstance.get(`/games/${id}?key=${process.env.VITE_API_KEY}`);
        setDetails(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch game details."); 
      } finally {
        setLoading(false); 
      }
    };

    fetchGameDetails();
  }, [id]);

  return { details, loading, error }; 
};
