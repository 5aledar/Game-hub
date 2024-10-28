import './GameCard.css';
import { useState } from 'react';
import { GameCardProps } from '../../utils/interfaces';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../../context/ThemeContext';

const GameCard = ({ game }: GameCardProps) => {
  const { themeContext } = useThemeContext();
  const { id, name, background_image, parent_platforms, rating } = game;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
  };

  const getImgkitUrl = (url:string, width = 200, height = 200) => {
    const path = url.replace("https://media.rawg.io", ""); 
    return `https://ik.imagekit.io/angwisa${path}?tr=w-${width},h-${height}`;
  };


  const croppedImageUrl = background_image
    ? getImgkitUrl(background_image)
    : "/images/logo.png";

  return (
    <div className={`gamecard-container ${themeContext === 'dark' ? 'text-dark' : 'text-light'}`} onClick={() => navigate(`/games/${id}`)}>
      <div key={id} className='gamecard'>
        {isLoading && <div className="image-loader"></div>}

        <img
          className='poster'
          src={croppedImageUrl}
          alt={`${name} bg`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ display: isLoading ? 'none' : 'block' }}
        />

        <div className={`gamecard-info ${themeContext === 'dark' ? 'dark' : 'light'}`}>
          <div className='platform-rating'>
            <div className='gamecard-platform'>
              {parent_platforms?.map((item) => (
                <div key={item.platform.id} className='platform-container'>
                  <img
                    className='platformicon'
                    src={`/icons/${item.platform.slug}.svg`}
                    alt=""
                  />
                </div>
              ))}
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
