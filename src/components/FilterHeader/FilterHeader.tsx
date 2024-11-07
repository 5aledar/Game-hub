import useQueryStore from "@/store/useQuery"
import { useFetchPlatforms } from "@/hooks/useFetchPlatforms"
import { Genre } from "@/types/genre.model"
import { Platform } from "@/types/platform.model"
import { Heading } from "@chakra-ui/react"
import { useFetchGenres } from "@/hooks/useFetchGenres"
const FilterHeader = () => {
    const { query } = useQueryStore()
    const { platforms } = useFetchPlatforms()
    const { genres } = useFetchGenres()
    const selectedPlatform = query.platform ? platforms.filter((platform: Platform) => platform.id == query.platform)[0].name : '';
    const selectedGenre = query.genre ? genres.filter((genre: Genre) => genre.id == query.genre)[0].name : '';
    return (
        <Heading mb="20px" color={{ base: 'black', _dark: 'white' }}>
            {selectedPlatform} {selectedGenre} Games
        </Heading>
    )
}

export default FilterHeader