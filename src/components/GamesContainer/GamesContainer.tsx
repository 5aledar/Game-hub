import GameCard from '../GameCard/GameCard'
import './GamesContainer.css'
import { Game } from '../../utils/interfaces'
interface Prop {
    games: Game[]
}
const GamesContainer = ({ games }: Prop) => {
    return (
        <div className='gamecontainer'>
            {
                games.map((game) => {
                    return(
                        <GameCard key={game.id} game={game} />
                    )
                })
            }
        </div>
    )
}

export default GamesContainer