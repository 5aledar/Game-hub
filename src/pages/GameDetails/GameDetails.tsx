import { useParams } from "react-router-dom"
import './GameDetails.css'
const GameDetails = () => {
  const { id } = useParams<{ id: string }>()
  return (
    <div className="gamedetails">
      <div className="gamedetails-txt-info">
        <h1></h1>
      </div>
    </div>
  )
}

export default GameDetails