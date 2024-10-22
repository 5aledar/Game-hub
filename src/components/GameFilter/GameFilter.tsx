import React, { useEffect, useState } from 'react';
import './GameFilter.css';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import GamesContainer from '../GamesContainer/GamesContainer';

interface Props {
    platforms: Platform[];
}

interface Platform {
    id: number;
    name: string;
    slug: string;
  }
  
  interface ParentPlatform {
    platform: Platform;
  }


export interface Game {
    id: number;
    name: string;
    background_image: string
    parent_platforms: ParentPlatform[]
    released: string;
    rating: number;
}
const GameFilter = ({ platforms }: Props) => {
    const [platformHeader, setPlatformHeader] = useState('PC');
    const [genre, setGenre] = useState('Action');
    const { id } = useParams<{ id: string }>();
    const [originalGames, setOriginalGames] = useState<Game[]>([]);
    const [games, setGames] = useState<Game[]>([]);
    const [sortOption, setSortOption] = useState<string>('relevance');

    const fetchGames = async () => {
        try {
            const response = await axiosInstance.get(`/games?genres=${id}&&key=${process.env.VITE_API_KEY}`);
            setOriginalGames(response.data.results);
            setGames(response.data.results);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };
    const handleGenreChange = async () => {
        try {
            const response = await axiosInstance.get(`/genres/${id}?key=${process.env.VITE_API_KEY}`);
            if (response.status === 200) {
                setGenre(response.data.name);
            } else {
                console.error('Failed to fetch genre. Status code:', response.status);
            }
        } catch (error) {
            console.error('Error fetching genre:', error);
        }
    };

    useEffect(() => {
        handleGenreChange();
        fetchGames();
    }, [id]);

    const handlePlatformOnChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setPlatformHeader(event.target.value);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = e.target.value;
        setSortOption(selectedOption);
    };

    useEffect(() => {
        let sortedGames = [...originalGames];
        switch (sortOption) {
            case 'name':
                sortedGames = games.sort((a, b) => {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return -1;
                    }
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                });
                break;
            case 'rating':
                sortedGames = sortedGames.sort((a, b) => b.rating - a.rating);
                break;
            case 'release-date':
                sortedGames = sortedGames.sort((a, b) => new Date(b.released).getDate() - new Date(a.released).getDate());
                break;
            case 'relevance':
                sortedGames = [...originalGames]
                break;
            default:
                break;
        }
        setGames(sortedGames);
        console.log(games);
    }, [sortOption, originalGames]);

    return (
        <>
            <div className='gamefilter color-mode'>
                <h1>{platformHeader} {genre} Games</h1>
                <div className='gamefilter-container'>
                    <select name="platform" onChange={handlePlatformOnChange}>
                        {platforms.map((item) => (
                            <option key={item.id} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    <select value={sortOption} onChange={handleSortChange}>
                        <option value="relevance">Relevance</option>
                        <option value="name">Name</option>
                        <option value="rating">Rating</option>
                        <option value="release-date">Release Date</option>
                    </select>
                </div>
            </div>
            <div className='container'>
                <GamesContainer games={games} />
            </div>
        </>
    );
};

export default GameFilter;
