import React, { useState } from 'react';
import { Box, Heading, Flex, Text, Image } from '@chakra-ui/react';
import { Genre } from '../../utils/interfaces';
import { useThemeContext } from '../../context/ThemeContext';

interface Props {
    categories: Genre[];
    setGenre: React.Dispatch<React.SetStateAction<Genre | undefined>>;
}

const Sidebar = ({ categories, setGenre }: Props) => {
    const { themeContext } = useThemeContext();
    const [selectedGenreId, setSelectedGenreId] = useState<number | undefined>(undefined);

    const handleGenreClick = (item: Genre) => {
        setGenre(item);
        setSelectedGenreId(item.id); // Update the selected genre
    };

    return (
        <Box 
            position="fixed"
            pt="60px"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            width="200px"
            height="100vh"
            pl="35px"
            overflowY="auto"
            css={{
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
                scrollbarWidth: 'none',
            }}
            className={themeContext === 'dark' ? 'dark-mode' : 'light-mode'}
        >
            <Heading fontSize="22px" mb="10px">Genres</Heading>
            {categories.map((item) => (
                <Flex 
                    key={item.id}
                    className="sidebar-game"
                    width="90%"
                    alignItems="center"
                    gap="8px"
                    mb="7px"
                    onClick={() => handleGenreClick(item)}
                    _hover={{
                        textDecoration: 'underline',
                        cursor: 'pointer',
                    }}
                >
                    <Image
                        src={item.image_background}
                        alt={`${item.name} background`}
                        boxSize="20px"
                        objectFit="cover"
                        borderRadius="10%"
                        transition="0.5s"
                        _hover={{
                            transform: 'scale(1.1)',
                        }}
                    />
                    <Text fontWeight={selectedGenreId === item.id ? 'bold' : 'normal'}>
                        {item.name}
                    </Text>
                </Flex>
            ))}
        </Box>
    );
};

export default Sidebar;
