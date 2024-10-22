import './GameCard.css';
import { Game } from '../GameFilter/GameFilter';

interface GameCardProps {
  game: Game; // Accept the entire game object
}

const GameCard = ({ game }: GameCardProps) => {
  // Destructure the properties you need from the game object
  const { id, name, background_image, parent_platforms } = game;

  return (
    <div className='gamecard-container'>
      <div key={id} className='gamecard'>
        <img src={background_image || "/images/logo.png"} loading='lazy' alt={`${name} bg`} />
        <div className='gamecard-info'>
          <div className='gamecard-platform'>
            {
              parent_platforms.map((item) => {
                return (
                  <div className='platform-container'>
                    <img className='platformicon' src={`/icons/${item.platform.name}.svg`} alt="" />
                  </div>
                )
              })
            }
          </div>
          <p>{name}</p>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
