import { Box, Flex } from '@chakra-ui/react';
import FilterHeader from '../FilterHeader/FilterHeader';
import './GameFilter.css'
import PlatformFilter from '../PlatformFilter/PlatformFilter';
import SortFilter from '../SortFilter/SortFilter';

const GameFilter = () => {
    return (
        <Box className="gamefilter" w={'fit-content'}>
            <FilterHeader />
            <Flex className="gamefilter-container">
                <PlatformFilter />
                <SortFilter />
            </Flex>
        </Box>
    );
};
export default GameFilter;
