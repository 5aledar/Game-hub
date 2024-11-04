import React, { useState } from 'react';
import { Box, Heading, Flex, Text, Image, chakra } from '@chakra-ui/react';
import { Genre } from '../../utils/interfaces';
import { Icon } from '@chakra-ui/react';
import { IoMdMenu } from "react-icons/io";
import { motion , AnimatePresence } from 'framer-motion';
import './Sidebar.css'
interface Props {
    categories: Genre[];
    setGenre: React.Dispatch<React.SetStateAction<Genre | undefined>>;
}

const Sidebar = ({ categories, setGenre }: Props) => {
    const [selectedGenreId, setSelectedGenreId] = useState<number | undefined>(undefined);
    const [visible, setVisible] = useState<boolean>(false)
    const handleGenreClick = (item: Genre) => {
        setGenre(item);
        setSelectedGenreId(item.id);
        setVisible(false)
    };
    const MotionFlex = motion.create(Flex)
    return (
        <>
            <Icon className='burger' onClick={() => setVisible(prev => !prev)}>
                <IoMdMenu />
            </Icon>
            {
                visible && <MotionFlex className='overlay' 
                flexDirection={'column'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                >
                    {
                        categories.map(item => (
                            <Flex padding={'5px'} cursor={'pointer'} onClick={() => handleGenreClick(item)} bg={{ base: { base: '#e0e0e0', _hover: 'white' }, _dark: { base: '#3f4b6c', _hover: '#55607d' } }} color={{ base: 'black', _dark: 'white' }}>
                                <Text>
                                    {item.name}
                                </Text>
                            </Flex>
                        ))
                    }
                </MotionFlex>
            }
            <Box
                css={{
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    scrollbarWidth: 'none',
                }}
                className={`sidebar`}
                bg={{ base: 'white', _dark: '#1A202C' }}
                color={{ base: 'black', _dark: 'white' }}
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
