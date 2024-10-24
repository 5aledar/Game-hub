import { useParams } from "react-router-dom"
import { useState, useRef, useEffect } from "react"

import './GameDetails.css'
import { useFetchGameDetails } from "../../hooks/useFetchGameDetails"
import { useFetchTrailer } from "../../hooks/useFetchTrailer"
import { useThemeContext } from "../../context/ThemeContext"
const GameDetails = () => {
  const { themeContext } = useThemeContext()
  const { id } = useParams<{ id: string }>()
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState('0px');
  const contentRef = useRef<HTMLSpanElement | null>(null)

  const maxLength = 200;
  const { details } = useFetchGameDetails(id!)
  const trailers = useFetchTrailer(id!)

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isExpanded ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isExpanded]);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`gamedetails ${themeContext == 'dark' ? 'dark-mode text-dark' : 'light-mode text-light'}`}>
      <div className="gamedetails-text">
        <h1>{details?.name}</h1>
        <div className="gamedetails-description">
          <p>
            {details?.description_raw.slice(0, maxLength)}...
            <span
              ref={contentRef}
              className={`description-content ${isExpanded ? 'expanded' : ''}`}
            >
              {details?.description_raw.slice(maxLength)}
            </span>
          </p>
          <button onClick={toggleReadMore} className={`${themeContext == 'dark'? 'dark-button': 'light-button'}`}>
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        </div>
        <div className="gamedetails-details">
          <div className="details-genre">
            <p className="title">Genre</p>
            <div className="data">
              {
                details?.genres?.map((genre, index) => (
                  <p key={index}>{genre.name}</p>
                ))
              }
            </div>
          </div>
          <div className="details-platform">
            <p className="title">Platforms</p>
            <div className="data">
              {
                details?.parent_platforms?.map((parent, index) => (
                  <p key={index}>{parent.platform.name}</p>
                ))
              }
            </div>
          </div>
        </div>
        <div className="gamedetails-details">
          <div className="details-rating">
            <p className="title">metascore</p>
            <p className="score good">{details?.metacritic}</p>
          </div>
          <div className="details-publisher">
            <p className="title">publisher</p>
            {
              details?.publishers?.map((publisher, index) => (
                <p key={index}>{publisher.name}</p>
              ))
            }
          </div>
        </div>
      </div>
      <div className="gamedetails-media">
        {trailers.length > 0 ?

          <video
            width="100%"
            controls
            poster={trailers[0].preview}
          >
            <source
              src={trailers[0].data[480]}
              type="video/mp4"
            />
            <source
              src={trailers[0].data.max}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          : <img width='100%' src={details?.background_image} alt="" />
        }        <div className="gamedetails-media-images">
          <img src={details?.background_image} alt="" />
          <img src={details?.background_image_additional} alt="" />
        </div>
      </div>

    </div>
  );
}

export default GameDetails