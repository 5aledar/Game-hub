import React, { useEffect, useState } from 'react';
import './GameFilter.css';
import { useParams } from 'react-router-dom';
import GamesContainer from '../GamesContainer/GamesContainer';
import useFetchGames from '../../hooks/useFetchGames';
import { Platform } from '../../utils/interfaces';
import { useThemeContext } from '../../context/ThemeContext';
import axiosInstance from '../../utils/axiosInstance';

interface Props {
    platforms: Platform[];
}

const GameFilter = ({ platforms }: Props) => {
    const { themeContext } = useThemeContext();
    const [platformHeader, setPlatformHeader] = useState('PC');
    const [genre, setGenre] = useState('Action');
    const { id } = useParams<{ id: string }>();
    const [page, setPage] = useState(1);
    const [sortOption, setSortOption] = useState<string>('relevance');
    const [parentPlatform, setParentPlatform] = useState<number>(1);

    // Fetch games using the new hook
    const { games, nextPage, prevPage, error, isLoading } = useFetchGames(id!, parentPlatform, sortOption, page);

    // Fetch genre details based on the genre ID
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

    // Loading and error states
    if (isLoading) return <div>Loading games...</div>;
    if (error) return <div>Error fetching games: {error.message}</div>;

    return (
        <>
            <div className={`gamefilter ${themeContext === 'dark' ? 'text-dark dark-mode' : 'text-light light-mode'}`}>
                <h1>{platformHeader} {genre} Games</h1>
                <div className='gamefilter-container'>
                    <select 
                        name="platform" 
                        value={platformHeader} // Bind the value of the select to platformHeader
                        className={`${themeContext === 'dark' ? 'select-dark text-dark' : 'select-light text-light'}`} 
                        onChange={handlePlatformOnChange}
                    >
                        {platforms.map(item => (
                            <option key={item.id} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                    <select 
                        value={sortOption} 
                        className={`${themeContext === 'dark' ? 'select-dark text-dark' : 'select-light text-light'} sortingfilter`} 
                        onChange={handleSortChange}
                    >
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
            <div className={`pagination text-dark ${themeContext === 'dark' ? 'dark-mode text-dark' : 'light-mode text-light'}`}>
                <button className={`${themeContext === 'dark' ? 'page-dark text-dark' : 'page-light text-light'}`} onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={!prevPage}>-</button>
                <span>Page {page}</span>
                <button className={`${themeContext === 'dark' ? 'page-dark text-dark' : 'page-light text-light'}`} onClick={() => setPage(prev => prev + 1)} disabled={!nextPage}>+</button>
            </div>
        </>
    );
};

export default GameFilter;
