import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import GameFilter from '../../components/GameFilter/GameFilter';
import { useFetchGenres } from '../../hooks/useFetchGenres';
import { useFetchPlatforms } from '../../hooks/useFetchPlatforms';
import GamesContainer from '../../components/GamesContainer/GamesContainer';
import { Genre } from '../../utils/interfaces';
import { Box } from '@chakra-ui/react';
const Home = () => {
    const { genres, } = useFetchGenres();
    const { platforms } = useFetchPlatforms();
    const [genre, setGenre] = useState<Genre>()
    const [platform, setPlatform] = useState<number | undefined>(undefined)
    const [sortOption, setSortOption] = useState<string | undefined>(undefined)
    return (
        <Box >
            <Navbar />
            <Sidebar categories={genres} />
            <Box>
                <GameFilter platforms={platforms} genre={genre} setPlatform={setPlatform} setSortOption={setSortOption} />
                <GamesContainer />
            </Box>
        </Box>
    );
};

export default Home;
