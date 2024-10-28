import React, { useEffect, useState } from 'react';
import './GameFilter.css';
import { useParams } from 'react-router-dom';
import GamesContainer from '../GamesContainer/GamesContainer';
import useFetchGames from '../../hooks/useFetchGames';
import { Genre, Platform } from '../../utils/interfaces';
import { useThemeContext } from '../../context/ThemeContext';
import axiosInstance from '../../utils/axiosInstance';

interface Props {
    platforms: Platform[];
    genre?: Genre;
    setPlatform?: React.Dispatch<React.SetStateAction<number | undefined>>;
    setSortOption: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const GameFilter = ({ platforms, genre, setPlatform ,setSortOption}: Props) => {
    const { themeContext } = useThemeContext();
    const [platformHeader, setPlatformHeader] = useState('PC');
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState<string>('relevance');
  




    const handlePlatformOnChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        const selectedPlatform = platforms.find(platform => platform.name === event.target.value);
        if (selectedPlatform) {
            setPlatformHeader(event.target.value);
            setPlatform!(selectedPlatform.id)
            setPage(1);
        }
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
        setSort(e.target.value)
        setPage(1);
    };

    return (
        <>
            <div className={`gamefilter ${themeContext === 'dark' ? 'text-dark dark-mode' : 'text-light light-mode'}`}>
                <h1>{platformHeader} {genre?.name} Games</h1>
                <div className='gamefilter-container'>
                    <select
                        name="platform"
                        value={platformHeader}
                        className={`${themeContext === 'dark' ? 'select-dark text-dark' : 'select-light text-light'}`}
                        onChange={handlePlatformOnChange}
                    >
                        {platforms.map(item => (
                            <option key={item.id} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                    <select
                        value={sort}
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

        </>
    );
};

export default GameFilter;
