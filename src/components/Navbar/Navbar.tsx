import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { useThemeContext } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

interface Props {
    setSearchQuery?: React.Dispatch<React.SetStateAction<string | undefined>>;
    searchQuery?: string | undefined
}

const Navbar = ({ setSearchQuery , searchQuery }: Props) => {
    const { themeContext, setThemeContext } = useThemeContext();
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
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTheme = event.target.checked ? 'dark' : 'light';
        setThemeContext(newTheme);
        localStorage.setItem('theme', newTheme);
        document.body.style.backgroundColor = newTheme === 'dark' ? '#1A202C' : '#ffffff';
    };
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery?.(event.target.value);
    };
    return (
        <div className={`navbar ${themeContext === 'dark' ? 'text-dark dark-mode' : 'light-mode text-light'}`}>
            <img onClick={() => navigate('/')} className="navbar-logo" src={`/fav-icon.svg`} alt="Logo" />
            <div className={`navbar-search ${themeContext === 'dark' ? 'search-dark' : 'search-light'}`}>
                <input
                    type="text"
                    placeholder="Search Games .."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <img src={`/icons/search.svg`} alt="Search Icon" />
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
