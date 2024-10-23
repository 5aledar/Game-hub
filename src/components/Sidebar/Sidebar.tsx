import { useState } from 'react'
import { Genre } from '../../utils/interfaces'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

interface Props {
    categories: Genre[]
}

const Sidebar = ({ categories }: Props) => {

    return (
        <div className='sidebar color-mode text-dark'>
            <h1>Genres</h1>
            {
                categories.map((item) => {
                    return (
                        <NavLink to={`/${item.id}`} className={({ isActive }) => (isActive ? 'sidebar-game color-mode text-dark active-link' : 'sidebar-game text-dark color-mode')} key={item.id} >
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