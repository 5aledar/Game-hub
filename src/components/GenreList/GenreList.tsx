import { useState } from "react";
import { useFetchGenres } from "@/hooks/useFetchGenres";
import { VStack, Icon, Text } from "@chakra-ui/react";
import GenreItem from "../GenreItem/GenreItem";
import { Genre } from "@/types/genre.model";
import useQueryStore from "@/store/useQuery";

const GenreList = () => {
    const { setGenre } = useQueryStore();
    const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
    const { genres } = useFetchGenres();

    const handleGenreClick = (genreId: number) => {
        setSelectedGenreId(genreId);
        setGenre(genreId);
    };
    return (
        <VStack
            sm={{
                position: 'static',
                h: 'full',
                bg: { base: 'transparent', _dark: 'transparent' },
                borderRadius: 'none',
                p: '0px'
            }}
            position={'absolute'}
            zIndex={'300'} top={'75px'}
            left={'50px'}
            h={"300px"}
            overflow={'scroll'}
            alignItems={'flex-start'}
            bg={{ base: '#e0e0e0', _dark: '#3f4b6c' }}
            borderRadius={'10px'}
        >
            {genres?.map((genre: Genre) => (
                <GenreItem
                    key={genre.id}
                    genre={genre}
                    isSelected={genre.id === selectedGenreId}
                    onClick={() => handleGenreClick(genre.id)}
                />
            ))}
        </VStack>
    );
};

export default GenreList;
