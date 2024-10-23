import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { GameDetails } from '../utils/interfaces';

export const useFetchGameDetails = (id: string) => {
  const [details, setDetails] = useState<GameDetails>(); // Set initial state to null

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axiosInstance.get(`/games/${id}?key=${process.env.VITE_API_KEY}`);
        setDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGameDetails();
  }, [id]);

  return { details };
};
