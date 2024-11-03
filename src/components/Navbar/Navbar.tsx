import React, { useState, useEffect } from 'react';
import { Box, Flex, Input, Text, Image } from '@chakra-ui/react';
import { Switch } from '../ui/switch';
import { useThemeContext } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

interface Props {
    setSearchQuery?: React.Dispatch<React.SetStateAction<string | undefined>>;
    searchQuery?: string | undefined;
}

const Navbar = ({ setSearchQuery, searchQuery }: Props) => {
    const { themeContext, setThemeContext } = useThemeContext();
    const navigate = useNavigate();

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setThemeContext(savedTheme);
            document.body.style.backgroundColor = savedTheme === 'dark' ? '#1A202C' : '#ffffff';
        }
    }, [setThemeContext]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTheme = event.target.checked ? 'dark' : 'light';
        setThemeContext(newTheme);
        localStorage.setItem('theme', newTheme);
        document.body.style.backgroundColor = newTheme === 'dark' ? '#1A202C' : '#ffffff';
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery?.(event.target.value);
    };

    return (
        <Flex
            className="navbar"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            height="50px"
            width="100%"
            paddingInline="20px"
            gap="10px"
            position="fixed"
            zIndex="10"
            bg={themeContext === 'dark' ? '#1A202C' : '#ffffff'} // Set bg based on theme
            color={themeContext === 'dark' ? 'white' : 'black'} // Set text color based on theme
        >
            <Image
                onClick={() => navigate('/')}
                className="navbar-logo"
                src={`/fav-icon.svg`}
                alt="Logo"
                width="30px"
                cursor="pointer"
            />

            <Box className="navbar-search" position="relative" width="85%">
                <Input
                    type="text"
                    placeholder="Search Games .."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    height="30px"
                    paddingLeft="40px"
                    borderRadius="30px"
                    border={'none'}
                    bg={themeContext === 'dark' ? '#313845' : '#d4d9e3'}
                    color={themeContext === 'dark' ? 'white' : 'black'}
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
            </Box>

            <Flex className="navbar-darkmode" gap="5px" alignItems="center" justifyContent="center">
                <Switch
                    isChecked={themeContext === 'dark'}
                    onChange={handleCheckboxChange}
                    size="sm"
                    colorScheme="blue"
                />
                <Text fontSize="12px" fontWeight="500">
                    Dark mode
                </Text>
            </Flex>
        </Flex>
    );
};

export default Navbar;
