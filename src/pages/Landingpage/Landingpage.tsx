import React from 'react'
import { useThemeContext } from '../../context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import './Landingpage.css'
const Landingpage = () => {
  const navigate = useNavigate()
  const { themeContext } = useThemeContext()
  return (
    <div className={`landingpage  ${themeContext == 'dark' ? 'dark-mode text-dark' : 'light-mode text-light'}`}>
      <div className='landingpage-header'>
      </div>
      <div className='landingpage-text'>
        <h1 className='fluorite-gradient'>Welcome to Game Hub test test test</h1>
        <p>Explore and experience a new world of gaming</p>
        <button className='' onClick={()=>navigate('/4')}>Start your journey</button>
      </div>
    </div>
  )
}

export default Landingpage