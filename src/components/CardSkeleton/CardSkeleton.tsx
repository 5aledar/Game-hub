import { Box } from "@chakra-ui/react"

import { Skeleton } from "../ui/skeleton"
import { SkeletonText } from "../ui/skeleton"
const CardSkeleton = ({ isLoading }: { isLoading: boolean }) => {
    return (
        <Box width={'225px'}
            height={'260px'}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'start'}
            border-radius='8px'
            marginBottom={4}
            bg={{ base: '#25252518', _dark: '#2C3548' }}
        >
            <Skeleton
                width={'100%'}
                height={'160px'}
                loading={isLoading}
                marginBottom={2}
                
                bg={{ base: '#25252518', _dark: '#2C3548' }}
            />
            <SkeletonText noOfLines={2} gap={2} h={2} w={'90%'} m={'auto'} loading={isLoading}
            />
        </Box>
    )
}

export default CardSkeleton