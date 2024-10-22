import React, { useEffect, useState } from 'react';
import './GameFilter.css';
import { useParams } from 'react-router-dom';
import GamesContainer from '../GamesContainer/GamesContainer';
import useFetchGames from '../../hooks/useFetchGames'; 
import axiosInstance from '../../utils/axiosInstance';

interface Props {
    platforms: Platform[];
}
export interface Platform {
    id: number;
    name: string;
    slug: string;
}

const GameFilter = ({ platforms }: Props) => {
    const [platformHeader, setPlatformHeader] = useState('PC');
    const [genre, setGenre] = useState('Action');
    const { id } = useParams<{ id: string }>();
    const [page, setPage] = useState(1);
    const [sortOption, setSortOption] = useState<string>('relevance');
    const [parentPlatform, setParentPlatform] = useState<number>(1);

    const { games, nextPage, prevPage } = useFetchGames(id!, parentPlatform, sortOption, page);

    useEffect(() => {
        const fetchGenre = async () => {
            try {
                const response = await axiosInstance.get(`/genres/${id}?key=${process.env.VITE_API_KEY}`);
                if (response.status === 200) {
                    setGenre(response.data.name);
                }
            } catch (error) {
                console.error('Error fetching genre:', error);
            }
        };

        fetchGenre();
    }, [id]);

    const handlePlatformOnChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        const selectedPlatform = platforms.find(platform => platform.name === event.target.value);
        if (selectedPlatform) {
            setPlatformHeader(event.target.value);
            setParentPlatform(selectedPlatform.id);
            setPage(1); 
        }
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
        setPage(1);
    };

    return (
        <>
            <div className='gamefilter color-mode'>
                <h1>{platformHeader} {genre} Games</h1>
                <div className='gamefilter-container'>
                    <select name="platform" onChange={handlePlatformOnChange}>
                        {platforms.map(item => (
                            <option key={item.id} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                    <select value={sortOption} onChange={handleSortChange}>
                        <option value="relevance">Relevance</option>
                        <option value="name">Name</option>
                        <option value="-rating">Rating</option>
                        <option value="release-date">Release Date</option>
                    </select>
                </div>
            </div>
            <div className='container'>
                <GamesContainer games={games} />
            </div>
            <div className="pagination">
                <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={!prevPage}>-</button>
                <span>Page {page}</span>
                <button onClick={() => setPage(prev => prev + 1)} disabled={!nextPage}>+</button>
            </div>
        </>
    );
};

export default GameFilter;
