import { useEffect, useState } from 'react'
import axios from 'axios'
import axiosInstance from '../../utils/axiosInstance'
import './Sidebar.css'
interface Genre {
    id: number;
    name: string;
    image_background: string;
}
const Sidebar = () => {
    const [genres, setGenres] = useState<Genre[]>([])
    const [loading, setLoading] = useState(false)
    const getGenres = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.get('/genres', {
                params: {
                    key: process.env.VITE_API_KEY,
                }
            });
            setGenres(response.data.results);
            console.log(genres);

            setLoading(false)
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    useEffect(() => {
        getGenres();
    }, [])
    return (
        <div className='sidebar'>
            <h1>Genres</h1>
            {
                genres.map((item) => {
                    return (
                        <div className='sidebar-game'  key={item.id} >
                            <img src={item.image_background} loading='lazy' />
                            <p>{item.name}</p>
                        </div>
                    )

                })
            }

        </div>
    )
}

export default Sidebar