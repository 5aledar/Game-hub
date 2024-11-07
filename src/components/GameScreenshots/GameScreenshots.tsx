import React from 'react'
import { Flex, Image } from '@chakra-ui/react'
import { GameDetails } from '@/types/game.model'
const GameScreenshots = ({ details }: { details: GameDetails }) => {
    return (
        <Flex
            className="gamedetails-media-images"
            justifyContent="space-between"
            alignItems="flex-start"
            gap="3"
            width="100%"
            marginTop={2}
            flexDirection={{ base: "column", md: "row" }}
        >
            <Image src={details?.background_image} alt="" objectFit="cover" width={{ lg: '49%', md: '49%', sm: '100%' }} />
            <Image src={details?.background_image_additional} alt="" objectFit="cover" width={{ lg: '49%', md: '49%', sm: '100%' }} />
        </Flex>
    )
}

export default GameScreenshots