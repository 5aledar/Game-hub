import { useState } from 'react';
import { Box, Heading, Icon } from '@chakra-ui/react';
import { IoMdMenu } from 'react-icons/io';

import GenreList from '../GenreList/GenreList';
import './Sidebar.css';


const Sidebar = () => {
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <>
            <Icon className="burger" onClick={() => setVisible((prev) => !prev)}>
                <IoMdMenu />
            </Icon>
            {visible && (
                <Box sm={{display: 'none'}}>
                <GenreList setVisible={setVisible}/>
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
