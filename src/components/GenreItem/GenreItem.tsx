import React from 'react'
import { Genre } from '@/types/interfaces'
import { Flex, Image, Text } from '@chakra-ui/react'
const GenreItem = ({ genre }: { genre?: Genre }) => {
    return (
        <Flex
            key={genre!.id}
            className="sidebar-game"
            width="90%"
            alignItems="center"
            gap="8px"
            mb="7px"
            _hover={{
                textDecoration: 'underline',
                cursor: 'pointer',
            }}
        >
            <Image
                src={genre!.image_background}
                alt={`${genre!.name} background`}
                boxSize="20px"
                objectFit="cover"
                borderRadius="10%"
                transition="0.5s"
                _hover={{
                    transform: 'scale(1.1)',
                }}
            />
            <Text fontWeight={'normal'}>
                {genre!.name}
            </Text>
        </Flex>
    )
}

export default GenreItem