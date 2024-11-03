import React, { useState } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import {
    NativeSelectField,
    NativeSelectRoot,
} from '@/components/ui/native-select'; // Ensure this path is correct
import { Genre, Platform } from '../../utils/interfaces';
import { useThemeContext } from '../../context/ThemeContext';
import './GameFilter.css'
interface Props {
    platforms: Platform[];
    genre?: Genre;
    setPlatform?: React.Dispatch<React.SetStateAction<number | undefined>>;
    setSortOption: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const GameFilter = ({ platforms, genre, setPlatform, setSortOption }: Props) => {
    const { themeContext } = useThemeContext();
    const [platformHeader, setPlatformHeader] = useState('PC');
    const [sort, setSort] = useState<string>('relevance');

    const handlePlatformOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPlatform = platforms.find(platform => platform.name === event.target.value);
        if (selectedPlatform) {
            setPlatformHeader(event.target.value);
            setPlatform?.(selectedPlatform.id);
        }
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
        setSort(e.target.value);
    };

    return (
        <Box className="gamefilter">
            <Heading mb="20px" color={themeContext === 'dark' ? 'white' : 'black'}>
                {platformHeader} {genre?.name} Games
            </Heading>
            <Flex className="gamefilter-container">
                <NativeSelectRoot>
                    <NativeSelectField
                        name="platform"
                        value={platformHeader}
                        onChange={handlePlatformOnChange}
                        className={themeContext === 'dark' ? 'select-dark' : 'select-light'}
                    >
                        {platforms.map(item => (
                            <option key={item.id} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </NativeSelectField>
                </NativeSelectRoot>
                <NativeSelectRoot>
                    <NativeSelectField
                        value={sort}
                        onChange={handleSortChange}
                        className={themeContext === 'dark' ? 'select-dark' : 'select-light'}
                    >
                        <option value="relevance">Relevance</option>
                        <option value="name">Name</option>
                        <option value="-rating">Rating</option>
                        <option value="release-date">Release Date</option>
                    </NativeSelectField>
                </NativeSelectRoot>
            </Flex>
        </Box>
    );
};

export default GameFilter;
