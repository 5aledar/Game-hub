import GameCard from '../GameCard/GameCard';
import './GamesContainer.css';
import { Game } from '../../types/game.model';
import useFetchGames from '../../hooks/useFetchGames';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import useQueryStore from '@/store/useQuery';
import CardSkeleton from '../CardSkeleton/CardSkeleton';

const GamesContainer = () => {
    const { query } = useQueryStore()
    const [page, setPage] = useState(1);
    const [allGames, setAllGames] = useState<Game[]>([]);
    const { games, nextPage, error, isLoading } = useFetchGames(page);
    const lastGameRef = useInfiniteScroll(nextPage, () => setPage((prev) => prev + 1), isLoading);
    useEffect(() => {
        setPage(1);
        setAllGames([]);
    }, [query]);
    useEffect(() => {
        if (!isLoading && games.length > 0) {
            setAllGames((prevGames) => [...prevGames, ...games]);
        }
    }, [games, isLoading]);
    const renderSkeletons = () => (
        <Box display={'flex'} columnGap={'1.5rem'}
            flexDirection='row'
            justifyContent='start'
            flexWrap='wrap'
            alignItems='center'
            
        > 
            {Array.from({ length: 10 }).map((_, index) => (
                <CardSkeleton isLoading={isLoading} key={index} />
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
