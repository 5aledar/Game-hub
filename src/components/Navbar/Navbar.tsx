import { Flex, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ColorModeButton } from "@/components/ui/color-mode"
import SearchBar from '../SearchBar/SearchBar';

const Navbar = () => {
    const navigate = useNavigate(); 
    return (
        <Flex
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            height="50px"
            width="100%"
            paddingLeft={'20px'}
            paddingRight={'20px'}
            gap={3}
            position="fixed"
            zIndex="1100"
            bg={{ base: "#fff", _dark: '#1A202C' }}
            color={{ base: 'white', _dark: 'black' }}
        >
            <Image
                onClick={() => navigate('/')}
                src={`/fav-icon.svg`}
                alt="Logo"
                width="30px"
                cursor="pointer"
            />
            <SearchBar />
            <ColorModeButton />
        </Flex>
    );
};

export default Navbar;
