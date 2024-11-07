import { Box, Flex, Input, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ColorModeButton } from "@/components/ui/color-mode"
import SearchBar from '../SearchBar/SearchBar';
interface Props {
    setSearchQuery?: React.Dispatch<React.SetStateAction<string | undefined>>;
    searchQuery?: string | undefined;
}

const Navbar = ({ setSearchQuery, searchQuery }: Props) => {
    const navigate = useNavigate();
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery?.(event.target.value);
    };

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
            {/* <Box className="navbar-search" position="relative" width="85%">
                <Input
                    type="text"
                    placeholder="Search Games .."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    height="30px"
                    paddingLeft="30px"
                    border={'none'}
                    borderRadius="30px"
                    bg={{ base: "#d4d9e3", _dark: '#313845' }}

                    color={{ base: 'black', _dark: 'white' }}
                    _focus={{ outline: '1px solid #4c5462' }}
                />
                <Image
                    src={`/icons/search.svg`}
                    alt="Search Icon"
                    position="absolute"
                    top="5px"
                    left="10px"
                    width="18px"
                />
            </Box> */}
            <SearchBar />
            <ColorModeButton />
        </Flex>
    );
};

export default Navbar;
