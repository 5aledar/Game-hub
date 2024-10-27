import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import GameFilter from '../../components/GameFilter/GameFilter';
import useFetchGenres from '../../hooks/useFetchGenres';
import useFetchPlatforms from '../../hooks/useFetchPlatforms';
import GamesContainer from '../../components/GamesContainer/GamesContainer';
import { Genre } from '../../utils/interfaces';
const Home = () => {
    const { genres, } = useFetchGenres();
    const { platforms } = useFetchPlatforms();
    const [genre, setGenre] = useState<Genre>()
    const [platform, setPlatform] = useState(undefined)
    return (
        <div>
            <Navbar />
            <Sidebar categories={genres} setGenre={setGenre} />
            <div>
                <GameFilter platforms={platforms} genre={genre} />
                <GamesContainer genreId={`${genre?.id}`} />
            </div>
        </div>
    );
};

export default Home;
