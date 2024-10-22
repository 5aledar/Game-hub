import { useParams } from "react-router-dom"

const GameDetails = () => {
  const { id } = useParams<{ id: string }>()
  return (
    <div>
      game details
    </div>
  )
}

export default GameDetails