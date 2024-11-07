import React from 'react';
import { NativeSelectField, NativeSelectRoot } from '@/components/ui/native-select';
import useQueryStore from '@/store/useQuery';

const SortFilter = () => {
    const { setSort, query } = useQueryStore(); 
    const sort = query.sort || 'relevance'; 

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(event.target.value);
    };

    return (
        <NativeSelectRoot>
            <NativeSelectField
                value={sort}
                onChange={handleSortChange}
                bg={{ base: 'rgb(237, 245, 253)', _dark: '#2E3440' }}
                color={{ base: 'black', _dark: 'white' }}
            >
                <option value="relevance">Relevance</option>
                <option value="name">Name</option>
                <option value="-rating">Rating</option>
                <option value="release-date">Release Date</option>
            </NativeSelectField>
        </NativeSelectRoot>
    );
};

export default SortFilter;
