import React, { useState } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import {
    NativeSelectField,
    NativeSelectRoot,
} from '@/components/ui/native-select';
import { Genre, Platform } from '../../utils/interfaces';
import './GameFilter.css'
import PlatformFilter from '../PlatformFilter/PlatformFilter';
import useQueryStore from '@/store/useQuery';
import SortFilter from '../SortFilter/SortFilter';
interface Props {
    platforms: Platform[];
    genre?: Genre;
    setPlatform?: React.Dispatch<React.SetStateAction<number | undefined>>;
    setSortOption: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const GameFilter = ({ platforms, genre, setPlatform, setSortOption }: Props) => {
    const [sort, setSort] = useState<string>('relevance');
    const { query } = useQueryStore()

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
        setSort(e.target.value);
    };

    return (
        <Box className="gamefilter" w={'fit-content'}>
            <Heading mb="20px" color={{ base: 'black', _dark: 'white' }}>
                {query.platform ? query.platform : ''}  {genre?.name} Games
            </Heading>
            <Flex className="gamefilter-container">
                <PlatformFilter />
                {/* <NativeSelectRoot>
                    <NativeSelectField
                        value={sort}
                        onChange={handleSortChange}
                        bg={{ base: 'rgb(237, 245, 253)', _dark: '#2E3440' }}
                        color={{ base: 'black', _dark: 'white' }}
                    >
                        <option value="relevance">Relevance</option>
                        <option value="name">Name</option>
                        <option value="-rating">Rating</option>
                        <option value="release-date">Release Date</option>
                    </NativeSelectField>
                </NativeSelectRoot> */}
                <SortFilter />
            </Flex>
        </Box>
    );
};

export default GameFilter;
