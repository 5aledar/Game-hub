import { useEffect, useState } from 'react';
import GameCard from '../GameCard/GameCard';
import { Game } from '../../utils/interfaces';
import { useThemeContext } from '../../context/ThemeContext';
import useFetchGames from '../../hooks/useFetchGames';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { Box, Flex, Skeleton, Text } from '@chakra-ui/react';

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
        <Flex wrap="wrap" gap="1.5rem" justify="flex-start">
            {Array.from({ length: 10 }).map((_, index) => (
                <Box
                    key={index}
                    width="225px"
                    height="260px"
                    borderRadius="8px"
                    bg={`${themeContext == 'dark' ? '"gray.700"' :'gray.100'}`}
                    mb="40px"
                    p="8px"
                >
                    <Skeleton height="160px" mb="8px" />
                    <Skeleton height="12px" width="80%" mb="4px"  />
                    <Skeleton height="12px" width="30%" />
                </Box>
            ))}
        </Flex>
    );

    return (
        <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="start"
            alignItems="center"
            p="20px 5px 20px 200px"
            gap="1.5rem"
            className={`gamecontainer ${themeContext === 'dark' ? 'dark-mode text-dark' : 'light-mode text-light'}`}
        >
            {allGames.map((game: Game, index: number) => {
                const isLastGame = index === allGames.length - 1;
                return (
                    <Box ref={isLastGame ? lastGameRef : null} key={`${game.id}-${index}`} mb="40px">
                        <GameCard game={game} />
                    </Box>
                );
            })}

            {isLoading && renderSkeletons()}

            {error && (
                <Text color="red.500" fontWeight="bold" className="error-message">
                    Error loading games: {error.message}
                </Text>
            )}
        </Box>
    );
};

export default GamesContainer;
