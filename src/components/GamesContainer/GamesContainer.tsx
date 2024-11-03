import GameCard from '../GameCard/GameCard';
import './GamesContainer.css';
import { Game } from '../../utils/interfaces';
import { useThemeContext } from '../../context/ThemeContext';
import useFetchGames from '../../hooks/useFetchGames';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
interface Prop {
    parentPlatform?: number;
    sortOption?: string;
    genreId: string | undefined;
    searchQuery?: string | undefined
}

const GamesContainer = ({ parentPlatform, genreId, sortOption, searchQuery }: Prop) => {
    const [page, setPage] = useState(1);
    const [allGames, setAllGames] = useState<Game[]>([]);
    const { games, nextPage, error, isLoading } = useFetchGames(genreId, parentPlatform, sortOption, page, searchQuery);
    const { themeContext } = useThemeContext();

    const lastGameRef = useInfiniteScroll(nextPage, () => setPage((prev) => prev + 1), isLoading);

    useEffect(() => {
        setPage(1);
        setAllGames([]);
    }, [genreId, parentPlatform, sortOption, searchQuery]);

    useEffect(() => {
        if (!isLoading && games.length > 0) {
            setAllGames((prevGames) => [...prevGames, ...games]);
        }
    }, [games, isLoading]);

    const renderSkeletons = () => (
        <Box className='skeleton-contaier'>
            {
                Array.from({ length: 10 }).map((_, index) => (
                    <Box key={index} className={`${themeContext == 'dark' ? ' skeleton-card-dark' : ' skeleton-card'}`}>
                        <Box className={`${themeContext == 'dark' ? 'skeleton-image-dark' : 'skeleton-image'}`}></Box>
                        <Box className="skeleton-info">
                            <Box className={`${themeContext == 'dark' ? 'skeleton-title-dark' : 'skeleton-title'} `}></Box>
                            <Box className={`${themeContext == 'dark' ? ' skeleton-rating-dark' : ' skeleton-rating'}`}></Box>
                        </Box>
                    </Box>
                ))}
        </Box>
    );

    return (
        <Box className={`gamecontainer ${themeContext === 'dark' ? 'dark-mode text-dark' : 'light-mode text-light'}`}>
            {allGames.map((game: Game, index: number) => {
                const isLastGame = index === allGames.length - 1;
                return (
                    <Box ref={isLastGame ? lastGameRef : null} key={`${game.id}-${index}`}>
                        <GameCard game={game} />
                    </Box>
                );
            })}

            {isLoading &&

                renderSkeletons()

            }

            {error && <p className="error-message">Error loading games: {error.message}</p>}
        </Box>
    );
};

export default GamesContainer;
