import GameCard from '../GameCard/GameCard'
import './GamesContainer.css'
import { Game } from '../GameFilter/GameFilter'
interface Prop {
    games: Game[]
}
const GamesContainer = ({ games }: Prop) => {
    return (
        <div className='gamecontainer'>
            {
                games.map((game) => {
                    return(
                        <GameCard game={game} />
                    )
                })
            }
        </div>
    )
}

export default GamesContainer