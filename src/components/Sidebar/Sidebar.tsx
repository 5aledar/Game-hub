import React, { useState } from 'react';
import { Box, Heading, Flex, Text, Image } from '@chakra-ui/react';
import { Genre } from '../../utils/interfaces';
import { useThemeContext } from '../../context/ThemeContext';
import { Icon } from '@chakra-ui/react';
import { IoMdMenu } from "react-icons/io";
import './Sidebar.css'
interface Props {
    categories: Genre[];
    setGenre: React.Dispatch<React.SetStateAction<Genre | undefined>>;
}

const Sidebar = ({ categories, setGenre }: Props) => {
    const { themeContext } = useThemeContext();
    const [selectedGenreId, setSelectedGenreId] = useState<number | undefined>(undefined);
    const [visible, setVisible] = useState<boolean>(false)
    const handleGenreClick = (item: Genre) => {
        setGenre(item);
        setSelectedGenreId(item.id); 
        setVisible(false)
    };

    return (
        <>
            <Icon className='burger' onClick={() => setVisible(prev => !prev)}>
                <IoMdMenu />
            </Icon>
            {
                visible && <Box className='overlay'>
                        {
                            categories.map(item=> (
                             <Flex className='gerne-item' onClick={() => handleGenreClick(item)}>
                                <Text>
                                    {item.name}
                                </Text>
                             </Flex>
                            ))
                        }
                </Box>
            }
            <Box
                css={{
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    scrollbarWidth: 'none',

                }}
                className={`${themeContext === 'dark' ? 'dark-mode' : 'light-mode'} sidebar`}
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
        </>
    );
};

export default Sidebar;
