import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { useThemeContext } from '../../context/ThemeContext';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { Game } from '../../utils/interfaces';

const Navbar = () => {
    const { themeContext, setThemeContext } = useThemeContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [games, setGames] = useState<Game[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate();

   
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setThemeContext(savedTheme);
            if (savedTheme === 'dark') {
                document.body.style.backgroundColor = '#1A202C';
            } else {
                document.body.style.backgroundColor = '#ffffff';
            }
        }
    }, [setThemeContext]);

    useEffect(() => {
        if (searchQuery.trim()) {
            const fetchGames = async () => {
                try {
                    const response = await axiosInstance.get(`https://api.rawg.io/api/games?key=${process.env.VITE_API_KEY}`, {
                        params: {
                            search: searchQuery,
                            page_size: 8,
                        },
                    });
                    setGames(response.data.results);
                    setShowSuggestions(true);
                } catch (error) {
                    console.error('Error fetching games:', error);
                }
            };
            fetchGames();
        } else {
            setGames([]);
            setShowSuggestions(false);
        }
    }, [searchQuery]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTheme = event.target.checked ? 'dark' : 'light';
        setThemeContext(newTheme);
        localStorage.setItem('theme', newTheme); 
        document.body.style.backgroundColor = newTheme === 'dark' ? '#1A202C' : '#ffffff';
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleGameClick = (id: number) => {
        navigate(`/games/${id}`);
        setShowSuggestions(false);
    };

    return (
        <div className={`navbar ${themeContext === 'dark' ? 'text-dark dark-mode' : 'light-mode text-light'}`}>
            <img onClick={() => navigate('/')} className="navbar-logo" src={`${import.meta.env.BASE_URL}/fav-icon.svg`} alt="Logo" />
            <div className={`navbar-search ${themeContext === 'dark' ? 'search-dark' : 'search-light'}`}>
                <input
                    type="text"
                    placeholder="Search Games .."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <img src={`${import.meta.env.BASE_URL}/icons/search.svg`} alt="Search Icon" />
                {showSuggestions && games.length > 0 && (
                    <ul className="suggestions-dropdown">
                        {games.map((game) => (
                            <li className={`${themeContext === 'dark' ? 'dark-mode text-dark' : 'light-mode text-light'}`} key={game.id} onClick={() => handleGameClick(game.id)}>
                                <span className={`${themeContext === 'dark' ? 'text-dark' : 'text-light'}`}>{game.name}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="navbar-darkmode">
                <label className="switch">
                    <input
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={themeContext === 'dark'} 
                    />
                    <span className="slider round"></span>
                </label>
                <p className={themeContext === 'dark' ? 'text-dark' : 'text-light'}>Dark mode</p>
            </div>
        </div>
    );
};

export default Navbar;
