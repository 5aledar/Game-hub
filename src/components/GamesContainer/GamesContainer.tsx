import GameCard from '../GameCard/GameCard'
import './GamesContainer.css'
import { Game } from '../../utils/interfaces'
import { useThemeContext } from '../../context/ThemeContext'
interface Prop {
    games: Game[]
}
const GamesContainer = ({ games }: Prop) => {
    const {themeContext} = useThemeContext()
    return (
        <div className={`gamecontainer ${themeContext == 'dark' ? 'dark-mode text-dark' : 'light-mode text-light'}`}>
            {
                games.map((game) => {
                    return (
                        <GameCard key={game.id} game={game} />
                    )
                })
            }
        </div>
    )
}

export default GamesContainer