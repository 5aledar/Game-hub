import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import GameFilter from '../../components/GameFilter/GameFilter';
import { useFetchGenres } from '../../hooks/useFetchGenres';
import GamesContainer from '../../components/GamesContainer/GamesContainer';
import { Box } from '@chakra-ui/react';
const Home = () => {
    const { genres, } = useFetchGenres();
    return (
        <Box >
            <Navbar />
            <Sidebar categories={genres} />
            <Box>
                <GameFilter />
                <GamesContainer />
            </Box>
        </Box>
    );
};

export default Home;
