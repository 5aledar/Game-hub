import { Genre } from "@/types/genre.model";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

const GenreItem = ({ genre, isSelected, onClick }: { genre: Genre; isSelected: boolean; onClick: () => void }) => {
    return (
        <>
            <Box
                onClick={onClick}
                display={'flex'}
                sm={{ display: 'none' }}
                cursor={'pointer'}
                w='full'
                p={'10px'}
                bg={{
                    base: { base: '#e0e0e0', _hover: 'white' },
                    _dark: { base: '#3f4b6c', _hover: '#55607d' }
                }}
            >
                <Text>{genre.name}</Text>
            </Box>

            <Flex
                onClick={onClick}
                alignItems="center"
                gap="8px"
                _hover={{
                    textDecoration: "underline",
                    cursor: "pointer",
                }}
                display={'none'}
                sm={{ display: 'flex', width: "98%" }}
            >
                <Image
                    src={genre.image_background}
                    alt={`${genre.name} background`}
                    boxSize="20px"
                    objectFit="cover"
                    borderRadius="10%"
                    transition="transform 0.3s ease"  // Smooth transition for scaling
                    _hover={{
                        transform: "scale(1.1)",  // Scale the image on hover
                    }}
                />
                <Text fontWeight={isSelected ? "bold" : "normal"}>
                    {genre.name}
                </Text>
            </Flex>
        </>
    );
};

export default GenreItem;
