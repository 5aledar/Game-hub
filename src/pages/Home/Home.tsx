import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import axiosInstance from '../../utils/axiosInstance'
import GameFilter from '../../components/GameFilter/GameFilter'

interface Genre {
    name: string;
    id: number;
    image_background: string;
}
interface Platform {
    name: string;
    id: number
}
const Home = () => {
    const [genres, setGenres] = useState<Genre[]>([])
    const [platforms, setPlatforms] = useState<Platform[]>([])
  
    const getGenres = async () => {
        try {
            const response = await axiosInstance.get('/genres', {
                params: {
                    key: process.env.VITE_API_KEY,
                }
            });
            setGenres(response.data.results);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };
    const getPlatforms = async () => {
        try {
            const response = await axiosInstance.get('/platforms/lists/parents', {
                params: {
                    key: process.env.VITE_API_KEY,
                }
            });
            setPlatforms(response.data.results)
          
        } catch (error) {
            console.error('Error fetching platforms', error);
        }
    }

    useEffect(() => {
        getGenres();
        getPlatforms()
    }, [])
    return (
        <div>
            <Navbar />
            <Sidebar categories={genres} />
            <div>
                <GameFilter platforms={platforms} />
                <Outlet />
            </div>
        </div>
    )
}

export default Home