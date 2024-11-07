import {
    NativeSelectField,
    NativeSelectRoot,
} from '@/components/ui/native-select';
import useQueryStore from '@/store/useQuery';
import { useFetchPlatforms } from '@/hooks/useFetchPlatforms';
import { Platform } from '@/types/interfaces';
const PlatformFilter = () => {
    const { platforms } = useFetchPlatforms()
    const handlePlatformOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPlatform = event.target.value;
        console.log(selectedPlatform);
        setPlatform(selectedPlatform ? parseInt(selectedPlatform) : undefined);

    };
    const { setPlatform, query } = useQueryStore();
    const platformHeader = query.platform || '';
    return (
        <NativeSelectRoot >
            <NativeSelectField
                name="platform"
                value={platformHeader}
                onChange={handlePlatformOnChange}
                bg={{ base: 'rgb(237, 245, 253)', _dark: '#2E3440' }}
                color={{ base: 'black', _dark: 'white' }}
            >
                <option value="">Platform</option>
                {platforms.map((item: Platform) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </NativeSelectField>
        </NativeSelectRoot>
    )
}

export default PlatformFilter