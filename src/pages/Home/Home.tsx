import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import GameFilter from '../../components/GameFilter/GameFilter';
import { useFetchGenres } from '../../hooks/useFetchGenres';
import useFetchPlatforms from '../../hooks/useFetchPlatforms';
import GamesContainer from '../../components/GamesContainer/GamesContainer';
import { Genre } from '../../utils/interfaces';
import { Box } from '@chakra-ui/react';
const Home = () => {
    const { genres, } = useFetchGenres();
    const { platforms } = useFetchPlatforms();
    const [genre, setGenre] = useState<Genre>()
    const [platform, setPlatform] = useState<number | undefined>(undefined)
    const [sortOption, setSortOption] = useState<string | undefined>(undefined)
    const [searchQuery, setSearchQuery] = useState<string | undefined>('');
    return (
        <Box >
            <Navbar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
            <Sidebar categories={genres} setGenre={setGenre} />
            <Box>
                <GameFilter platforms={platforms} genre={genre} setPlatform={setPlatform} setSortOption={setSortOption} />
                <GamesContainer genreId={genre ? `${genre.id}` : undefined} parentPlatform={platform ? platform : undefined} sortOption={sortOption} searchQuery={searchQuery} />
            </Box>
        </Box>
    );
};

export default Home;
