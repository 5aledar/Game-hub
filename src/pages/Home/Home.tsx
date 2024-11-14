import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import GameFilter from '../../components/GameFilter/GameFilter';
import { useFetchGenres } from '../../hooks/useFetchGenres';
import GamesContainer from '../../components/GamesContainer/GamesContainer';
import { Box } from '@chakra-ui/react';
const Home = () => {

    return (
        <Box >
            <Navbar />
            <Sidebar />
            <Box>
                <GameFilter />
                <GamesContainer />
            </Box>
        </Box>
    );
};

export default Home;
