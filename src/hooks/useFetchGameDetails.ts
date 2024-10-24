import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { GameDetails } from '../utils/interfaces';

export const useFetchGameDetails = (id: string) => {
  const [details, setDetails] = useState<GameDetails | null>(null); // Set initial state to null
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchGameDetails = async () => {
      setLoading(true); // Set loading to true when fetching starts
      setError(null); // Reset error state

      try {
        const response = await axiosInstance.get(`/games/${id}?key=${process.env.VITE_API_KEY}`);
        setDetails(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch game details."); // Set error message
      } finally {
        setLoading(false); // Set loading to false after the fetch is complete
      }
    };

    fetchGameDetails();
  }, [id]);

  return { details, loading, error }; // Return loading and error states
};
