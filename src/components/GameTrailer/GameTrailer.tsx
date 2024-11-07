import { Trailer } from "@/types/trailer.model"

const GameTrailer = ({ trailer }: { trailer: Trailer }) => {
  return (
    <video width="100%" controls poster={trailer.preview}>
      <source src={trailer.data[480]} type="video/mp4" />
      <source src={trailer.data.max} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export default GameTrailer