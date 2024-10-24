import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Genre } from '../utils/interfaces';


const useFetchGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchGenres = async () => {
        try {
            const response = await axiosInstance.get('/genres', {
                params: {
                    key: process.env.VITE_API_KEY,
                }
            });
            setGenres(response.data.results);
        } catch (error) {
            console.error('Error fetching genres:', error);
            setError('Error fetching genres');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        fetchGenres();
    }, []);

    return { genres, loading, error };
};

export default useFetchGenres;
