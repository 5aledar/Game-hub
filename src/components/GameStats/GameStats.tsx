import { GameDetails } from '@/types/game.model'
import { Genre } from '@/types/genre.model'
import React from 'react'
import { SimpleGrid, Flex, Text, Box, VStack } from '@chakra-ui/react'

const GameStats = ({ details }: { details: GameDetails }) => {
    return (
        <Flex
            className="gamedetails-details"
            flexDirection="column"
            paddingTop="40px"
            width="70%"
        >
            <SimpleGrid columns={2} width="100%">

                <Box
                    className="grid-item"
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    padding={4}
                >
                    <Text className="title" fontWeight="bold">
                        Genre
                    </Text>
                    <VStack className="data" alignItems="flex-start" mt={2}>
                        {details?.genres?.map((genre: Genre, index: number) => (
                            <Text key={index}>{genre.name}</Text>
                        ))}
                    </VStack>
                </Box>

                <Box
                    className="grid-item"
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    padding={4}
                >
                    <Text className="title" fontWeight="bold">
                        Platforms
                    </Text>
                    <VStack className="data" alignItems="flex-start" mt={2}>
                        {details?.parent_platforms?.map((parent, index) => (
                            <Text key={index}>{parent.platform.name}</Text>
                        ))}
                    </VStack>
                </Box>

                <Box
                    className="grid-item"
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    padding={4}
                >
                    <Text className="title" fontWeight="bold">
                        Metascore
                    </Text>
                    <Text
                        className="score good"
                        bg="green.300"
                        w="fit-content"
                        px={2}
                        borderRadius={5}
                        color="green.700"
                        fontWeight="bold"
                        mt={2}
                    >
                        {details?.metacritic}
                    </Text>
                </Box>
                <Box
                    className="grid-item"
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    padding={4}
                >
                    <Text className="title" fontWeight="bold">
                        Publisher
                    </Text>
                    <VStack className="data" alignItems="flex-start" mt={2}>
                        {details?.publishers?.map((publisher, index) => (
                            <Text key={index}>{publisher.name}</Text>
                        ))}
                    </VStack>
                </Box>
            </SimpleGrid>
        </Flex>
    )
}

export default GameStats