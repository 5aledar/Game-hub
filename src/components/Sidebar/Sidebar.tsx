import { useState } from 'react'

import { NavLink } from 'react-router-dom'
import './Sidebar.css'

interface Genre {
    id: number;
    name: string;
    image_background: string;
}
interface Props {
    categories: Genre[]

}
const Sidebar = ({ categories }: Props) => {

    return (
        <div className='sidebar color-mode'>
            <h1>Genres</h1>
            {
                categories.map((item) => {
                    return (
                        <NavLink to={`/${item.id }`} className={({ isActive }) => (isActive ? 'sidebar-game color-mode active-link' : 'sidebar-game color-mode')} key={item.id} >
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