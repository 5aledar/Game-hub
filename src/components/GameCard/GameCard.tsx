import './GameCard.css';
import { Game } from '../../utils/interfaces';
import { useNavigate } from 'react-router-dom';
import { GameCardProps } from '../../utils/interfaces';
import { useThemeContext } from '../../context/ThemeContext';
const GameCard = ({ game }: GameCardProps) => {
  const { themeContext } = useThemeContext()
  const { id, name, background_image, parent_platforms, rating } = game;
  const navigate = useNavigate()
  return (
    <div className={`gamecard-container ${themeContext == 'dark'?'text-dark':'text-light'} `} onClick={() => navigate(`/games/${id}`)} >
      <div key={id} className='gamecard'>
        <img className='poster' src={background_image || "/images/logo.png"} loading='lazy' alt={`${name} bg`} />
        <div className={`gamecard-info  ${themeContext == 'dark'?'dark':'light'}`}>
          <div className='platform-rating'>
            <div className='gamecard-platform'>
              {
                parent_platforms?.map((item) => {
                  return (
                    <div key={item.platform.id} className='platform-container'>
                      <img className='platformicon' src={`${import.meta.env.BASE_URL}/icons/${item.platform.slug}.svg`} alt="" />
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
