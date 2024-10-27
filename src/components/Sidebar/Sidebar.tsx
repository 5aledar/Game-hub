import { Genre } from '../../utils/interfaces';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { useThemeContext } from '../../context/ThemeContext';

interface Props {
    categories: Genre[];
    setGenre: React.Dispatch<React.SetStateAction<Genre | undefined>>;
}

const Sidebar = ({ categories, setGenre }: Props) => {
    const { themeContext } = useThemeContext();

    return (
        <div className={`sidebar ${themeContext === 'dark' ? 'text-dark dark-mode' : 'text-light light-mode'}`}>
            <h1>Genres</h1>
            <ul>
                {categories.map((item) => (
                    <li
                        key={item.id}
                        className={`sidebar-game ${themeContext === 'dark' ? 'dark-mode text-dark' : 'light-mode text-light'}`}
                        onClick={() => setGenre(item)}
                    >
                        <img src={item.image_background} loading="lazy" alt={`${item.name} background`} />
                        <p>{item.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
