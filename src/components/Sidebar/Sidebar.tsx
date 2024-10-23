import { useState } from 'react'
import { Genre } from '../../utils/interfaces'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import { useThemeContext } from '../../context/ThemeContext'

interface Props {
    categories: Genre[]
}

const Sidebar = ({ categories }: Props) => {
    const { themeContext } = useThemeContext()
    return (
        <div className={`sidebar ${themeContext == 'dark' ? 'text-dark dark-mode' : 'text-light light-mode'}`}>
            <h1>Genres</h1>
            {
                categories.map((item) => {
                    return (
                        <NavLink to={`/${item.id}`} className={({ isActive }) => (isActive ? `sidebar-game ${themeContext == 'dark' ? 'dark-mode text-dark' : 'light-mode text-light'} active-link` : `sidebar-game  ${themeContext == 'dark' ? 'dark-mode text-dark' : 'light-mode text-light'}`)} key={item.id} >
                            <img src={item.image_background} loading='lazy' />
                            <p>{item.name}</p>
                        </NavLink>
                    )
                })
            }
        </div>
    )
}

export default Sidebar