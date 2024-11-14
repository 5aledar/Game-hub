import { useState } from 'react';
import { Box, Heading, Flex, Text, Image, Icon } from '@chakra-ui/react';
import { IoMdMenu } from 'react-icons/io';
import { motion } from 'framer-motion';
import GenreList from '../GenreList/GenreList';
import './Sidebar.css';


const Sidebar = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const MotionFlex = motion.create(Flex);

    return (
        <>
            <Icon className="burger" onClick={() => setVisible((prev) => !prev)}>
                <IoMdMenu />
            </Icon>
            {visible && (
                <Box sm={{display: 'none'}}>
                <GenreList />
                </Box>
            )}
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
                <Heading fontSize="22px" mb="10px" display={'none'} sm={{ display: 'block' }}>
                    Genres
                </Heading>
                <GenreList />
            </Box>
        </>
    );
};

export default Sidebar;
