import GameCard from '../GameCard/GameCard';
import './GamesContainer.css';
import { Game } from '../../types/game.model';
import useFetchGames from '../../hooks/useFetchGames';
import { Box } from '@chakra-ui/react';
import CardSkeleton from '../CardSkeleton/CardSkeleton';
import InfiniteScroll from 'react-infinite-scroll-component';

const GamesContainer = () => {
    const {
        data,
        error,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useFetchGames();
    const games = data?.pages.flatMap(page => page.results) || [];
    const renderSkeletons = () => (
        <Box display={'flex'} columnGap={'1.5rem'} flexDirection='row' justifyContent='start' flexWrap='wrap' alignItems='center' pl={'100px'}>
            {Array.from({ length: 10 }).map((_, index) => (
                <CardSkeleton isLoading={isLoading} key={index} />
            ))}
        </Box>
    );

    return (
        <Box className="gamecontainer">
            <InfiniteScroll
                dataLength={games.length}
                next={fetchNextPage}
                hasMore={hasNextPage || false}
                loader={null}
                className='gamecontainer'
            >
                {games.map((game: Game) => (
                    <Box key={game.id}>
                        <GameCard game={game} />
                    </Box>
                ))}
            </InfiniteScroll>
            {isLoading && renderSkeletons()}
            {isFetchingNextPage && !isLoading && renderSkeletons()}
            {error && <p className="error-message">Error loading games: {error.message}</p>}
        </Box>
    );
};

export default GamesContainer;
