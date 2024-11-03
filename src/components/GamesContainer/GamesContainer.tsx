import GameCard from '../GameCard/GameCard';
import './GamesContainer.css';
import { Game } from '../../utils/interfaces';
import useFetchGames from '../../hooks/useFetchGames';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { useEffect, useState } from 'react';
import { Box, HStack, Stack } from '@chakra-ui/react';
import { Skeleton, SkeletonText } from '../ui/skeleton';
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
                    <Stack key={index}
                        width={'225px'}
                        height={'260px'}
                        border-radius={'8px'}
                        marginBottom={4}
                        gap={2}
                        bg={{ base: '#25252518', _dark: '#2C3548' }}
                    >
                        <Skeleton
                            width={'100%'}
                            height={'160px'}
                            loading={isLoading}
                            marginBottom={2}
                        />
                        <SkeletonText noOfLines={2} gap={2}
                        />
                    </Stack>
                ))}
        </Box>
    );

    return (
        <Box className={`gamecontainer `}
        >
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
