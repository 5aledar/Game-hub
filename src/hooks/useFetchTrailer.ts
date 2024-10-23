import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Trailer } from "../utils/interfaces";
export const useFetchTrailer = (id: string) => {
    const [trailers, setTrailers] = useState<Trailer[]>([])
    useEffect(() => {
        const fetchTrailers = async () => {
            try {
                const response = await axiosInstance.get(`/games/${id}/movies?key=${process.env.VITE_API_KEY}`)
                setTrailers(response.data.results)
            } catch (error) {
                console.error(error);

            }
        }
        fetchTrailers()
    }, [id])
    return trailers
}