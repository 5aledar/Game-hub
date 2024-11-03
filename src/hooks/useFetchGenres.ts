import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Genre } from '../utils/interfaces';
import { useQuery } from '@tanstack/react-query';

// const useFetchGenres = () => {
//     const [genres, setGenres] = useState<Genre[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     const fetchGenres = async () => {
//         try {
//             const response = await axiosInstance.get('/genres', {
//                 params: {
//                     key: process.env.VITE_API_KEY,
//                 }
//             });
//             setGenres(response.data.results);
//         } catch (error) {
//             console.error('Error fetching genres:', error);
//             setError('Error fetching genres');
//         } finally {
//             setLoading(false);
//         }
//     };
//     useEffect(() => {

//         fetchGenres();
//     }, []);

//     return { genres, loading, error };
// };

// export default useFetchGenres;



// import { useQuery } from "@tanstack/react-query";
// import axiosInstance from "../utils/axiosInstance";
// import { GameDetails } from "../utils/interfaces";

// export const useFetchGameDetails = (id: string) => {
//   const { data, error, isLoading } = useQuery<GameDetails, Error>({
//     queryKey: ['gameDetails', id],
//     queryFn: () => fetchDetails(id),
//   });
//   return {
//     details: data! || {},
//     error,
//     isLoading
//   }
// };


// const fetchDetails = async (id: string) => {
//   const { data } = await axiosInstance.get(`/games/${id}?key=${process.env.VITE_API_KEY}`);
//   return data;
// }
export const useFetchGenres = () => {
    const { data , error, isLoading } = useQuery({
        queryKey: ['genres'],
        queryFn: fetchGenres
    });
    return {
        genres: data?.results || [],
    }
}

const fetchGenres = async () => {
    const { data } = await axiosInstance.get('/genres', {
        params: {
            key: process.env.VITE_API_KEY,
        }
    });
    return data
}