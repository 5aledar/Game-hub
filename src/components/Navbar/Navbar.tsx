import './Navbar.css'
import { useThemeContext } from '../../context/ThemeContext'
const Navbar = () => {
    const { themeContext, setThemeContext } = useThemeContext()
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setThemeContext('dark');
        } else {
            setThemeContext('light'); // Set value when unchecked
    
        }
    };
    return (
        <div className={`navbar ${themeContext == 'dark'? 'text-dark dark-mode' : 'light-mode text-light' } `}>
            <img className='navbar-logo' src='/images/logo.png' />
            <div className={`navbar-search ${themeContext=='dark' ? 'search-dark' : 'search-light'}`}>
                <input type='text' placeholder='Search Games ..' />
                <img src='/icons/search.svg' />
            </div>
            <div className='navbar-darkmode'>
                <label className="switch">
                    <input type="checkbox" onChange={handleCheckboxChange} />
                    <span className="slider round"></span>
                </label>
                <p className={themeContext == 'dark' ?'text-dark' : 'text-light'}>Dark mode</p>
            </div>
        </div>
    )
}

export default Navbar