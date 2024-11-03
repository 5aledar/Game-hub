import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import './GameDetails.css'; // Ensure the CSS file is imported
import { useFetchGameDetails } from "../../hooks/useFetchGameDetails";
import { useFetchTrailer } from "../../hooks/useFetchTrailer";
import { useThemeContext } from "../../context/ThemeContext";

const GameDetails = () => {
  const { themeContext } = useThemeContext();
  const { id } = useParams<{ id: string }>();
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLSpanElement | null>(null);
  const maxLength = 200;
  const { details, loading, error } = useFetchGameDetails(id!); 
  const trailers = useFetchTrailer(id!);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isExpanded ? `${contentRef.current.scrollHeight}px` : '0px';
      contentRef.current.style.opacity = isExpanded ? '1' : '0';
    }
  }, [isExpanded]);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <Navbar />
      <div className={`gamedetails ${themeContext === 'dark' ? 'dark-mode text-dark' : 'light-mode text-light'}`}>
        {loading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        )}
        
        {error && <div className="error-message">{error}</div>}

        {!loading && !error && (
          <>
            <div className="gamedetails-text">
              <h1>{details?.name}</h1>
              <div className="gamedetails-description">
                <p>
                  {details?.description_raw.slice(0, maxLength)}
                  <span
                    ref={contentRef}
                    className={`description-content ${isExpanded ? 'expanded' : ''}`}
                  >
                    {details?.description_raw.slice(maxLength)}
                  </span>
                </p>
                <button onClick={toggleReadMore} className={`${themeContext === 'dark' ? 'dark-button' : 'light-button'}`}>
                  {isExpanded ? 'Show Less' : 'Show More'}
                </button>
              </div>
              <div className="gamedetails-details">
                <div className="details-genre">
                  <p className="title">Genre</p>
                  <div className="data">
                    {details?.genres?.map((genre, index) => (
                      <p key={index}>{genre.name}</p>
                    ))}
                  </div>
                </div>
                <div className="details-platform">
                  <p className="title">Platforms</p>
                  <div className="data">
                    {details?.parent_platforms?.map((parent, index) => (
                      <p key={index}>{parent.platform.name}</p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="gamedetails-details">
                <div className="details-rating">
                  <p className="title">Metascore</p>
                  <p className="score good">{details?.metacritic}</p>
                </div>
                <div className="details-publisher">
                  <p className="title">Publisher</p>
                  {details?.publishers?.map((publisher, index) => (
                    <p key={index}>{publisher.name}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="gamedetails-media">
              {trailers.length > 0 ?
                <video width="100%" controls poster={trailers[0].preview}>
                  <source src={trailers[0].data[480]} type="video/mp4" />
                  <source src={trailers[0].data.max} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                : <img width='100%' src={details?.background_image} alt="" />
              }
              <div className="gamedetails-media-images">
                <img src={details?.background_image} alt="" onLoad={() => {}} onError={() => {}} />
                <img src={details?.background_image_additional} alt="" onLoad={() => {}} onError={() => {}} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default GameDetails;
