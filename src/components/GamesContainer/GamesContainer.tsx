import GameCard from '../GameCard/GameCard';
import './GamesContainer.css';
import { Game } from '../../utils/interfaces';
import { useThemeContext } from '../../context/ThemeContext';
import useFetchGames from '../../hooks/useFetchGames';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { useEffect, useState } from 'react';

interface Prop {
    id?: string;
    parentPlatform?: number;
    sortOption?: string;
    genreId: string | undefined;
}

const GamesContainer = ({ id, parentPlatform, genreId, sortOption }: Prop) => {
    const [page, setPage] = useState(1);
    const [allGames, setAllGames] = useState<Game[]>([]);
    const { games, nextPage, error, isLoading } = useFetchGames(genreId, parentPlatform, sortOption, page);
    const { themeContext } = useThemeContext();

    const lastGameRef = useInfiniteScroll(nextPage, () => setPage((prev) => prev + 1), isLoading);

    useEffect(() => {

        setPage(1);
        setAllGames([]);
    }, [genreId , parentPlatform , sortOption]);

    useEffect(() => {
        if (!isLoading && games.length > 0) {
            setAllGames((prevGames) => [...prevGames, ...games]);
        }
    }, [games, isLoading]);

    const renderSkeletons = () => (
        <div className='skeleton-contaier'>
            {
                Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className="skeleton-card">
                        <div className="skeleton-image"></div>
                        <div className="skeleton-info">
                            <div className="skeleton-title"></div>
                            <div className="skeleton-rating"></div>
                        </div>
                    </div>
                ))}
        </div>
    );

    return (
        <div className={`gamecontainer ${themeContext === 'dark' ? 'dark-mode text-dark' : 'light-mode text-light'}`}>
            {allGames.map((game: Game, index: number) => {
                const isLastGame = index === allGames.length - 1;
                return (
                    <div ref={isLastGame ? lastGameRef : null} key={game.id}>
                        <GameCard game={game} />
                    </div>
                );
            })}

            {isLoading &&

                renderSkeletons()

            }

            {error && <p className="error-message">Error loading games: {error.message}</p>}
        </div>
    );
};

export default GamesContainer;
