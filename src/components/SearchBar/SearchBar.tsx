import React, { useCallback, useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { InputGroup } from "@/components/ui/input-group";
import { IoMdSearch } from "react-icons/io";
import { Box, Input } from '@chakra-ui/react';
import useQueryStore from '@/store/useQuery';

const SearchBar = () => {
    const { query, setSearch } = useQueryStore();
    const [searchTerm, setSearchTerm] = useState(query.search || '');
    const debouncedSearch = useCallback(
        debounce((value: string) => {
            setSearch(value);
        }, 700),
        [setSearch]
    );
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        debouncedSearch(value); 
    };
    
    useEffect(() => {
        setSearchTerm(query.search || '');
    }, [query.search]);

    return (
        <Box w="full" borderRadius="2xl">
            <InputGroup
                startElement={<IoMdSearch size={22} />}
                w="full"
                bg={{ base: "#d4d9e3", _dark: '#313845' }}
                color={{ base: 'black', _dark: 'white' }}
                border="none"
                outline="none"
                rounded="full"
                h={8}
                paddingInline={4}
            >
                <Input
                    placeholder="Search Games ..."
                    border="none"
                    outline="none"
                    value={searchTerm}  
                    onChange={handleInputChange}
                />
            </InputGroup>
        </Box>
    );
};

export default SearchBar;
