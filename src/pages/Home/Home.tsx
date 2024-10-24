import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import GameFilter from '../../components/GameFilter/GameFilter';
import useFetchGenres from '../../hooks/useFetchGenres'; 
import useFetchPlatforms from '../../hooks/useFetchPlatforms'; 

const Home = () => {
    const { genres, loading: loadingGenres, error: errorGenres } = useFetchGenres();
    const { platforms, loading: loadingPlatforms, error: errorPlatforms } = useFetchPlatforms();


    return (
        <div>
            <Navbar />
            <Sidebar categories={genres} />
            <div>
                <GameFilter platforms={platforms} />
            </div>
        </div>
    );
};

export default Home;
