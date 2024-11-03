import { Outlet } from 'react-router-dom'
import './Index.css'
import { useThemeContext } from '../../context/ThemeContext'
const Index = () => {
  const {themeContext} = useThemeContext()
  return (
    <div className={`${themeContext == 'dark' ? 'dark-mode text-dark' : 'light-mode text-light'} index`}>
        <Outlet />
    </div>
  )
}

export default Index