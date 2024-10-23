import { useState, useEffect } from 'react';
import { Platform } from '../utils/interfaces';
import axiosInstance from '../utils/axiosInstance';

const useFetchPlatforms = () => {
    const [platforms, setPlatforms] = useState<Platform[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlatforms = async () => {
            try {
                const response = await axiosInstance.get('/platforms/lists/parents', {
                    params: {
                        key: process.env.VITE_API_KEY,
                    }
                });
                setPlatforms(response.data.results);
            } catch (error) {
                console.error('Error fetching platforms:', error);
                setError('Error fetching platforms');
            } finally {
                setLoading(false);
            }
        };

        fetchPlatforms();
    }, []);

    return { platforms, loading, error };
};

export default useFetchPlatforms;
