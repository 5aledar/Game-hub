import './GameCard.css';
import { Game } from '../../hooks/useFetchGames';
import { useNavigate } from 'react-router-dom';
interface GameCardProps {
  game: Game; // Accept the entire game object
}

const GameCard = ({ game }: GameCardProps) => {
  // Destructure the properties you need from the game object
  const { id, name, background_image, parent_platforms, rating } = game;
  const navigate = useNavigate()
  return (
    <div className='gamecard-container' onClick={() => navigate(`/games/${id}`)} >
      <div key={id} className='gamecard'>
        <img className='poster' src={background_image || "/images/logo.png"} loading='lazy' alt={`${name} bg`} />
        <div className='gamecard-info'>
          <div className='platform-rating'>
            <div className='gamecard-platform'>
              {
                parent_platforms?.map((item) => {
                  return (
                    <div key={item.platform.id} className='platform-container'>
                      <img className='platformicon' src={`/icons/${item.platform.slug}.svg`} alt="" />
                    </div>
                  )
                })
              }
            </div>

            <p className={`${rating > 3 ? 'good' : 'avg'}`}>{Math.trunc((rating * 2) * 10)}</p>
          </div>
          <p className='gamecard-title'>{name}</p>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
