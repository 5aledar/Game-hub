import React from 'react'
import { Flex, Image } from '@chakra-ui/react'
import { GameDetails } from '@/types/game.model'
import { useFetchScreenshots } from '@/hooks/useFetchScreenshots'
import { getImgkitUrl } from '../../utils/cropImage'
const GameScreenshots = ({ details }: { details: GameDetails }) => {

    const { screenshots } = useFetchScreenshots(details.id)
    return (
        <Flex
            className="gamedetails-media-images"
            flexWrap={'wrap'}
            justifyContent="space-between"
            alignItems="flex-start"
            gap="3"
            width="100%"
            marginTop={2}
            sm={{ flexDirection: 'row' }}
            flexDirection={'column'}
        >
            {
                screenshots?.map((img: any) => {
                    const cropped = getImgkitUrl(img.image, 960, 540)
                    return <Image src={cropped} alt="" objectFit="cover" width={{ lg: '48%', md: '48%', sm: '100%' }} />
                })
            }

        </Flex>
    )
}

export default GameScreenshots