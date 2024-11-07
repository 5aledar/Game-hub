import { Box } from "@chakra-ui/react"

import { SkeletonText, Skeleton } from "../ui/skeleton"
const CardSkeleton = ({ isLoading }: { isLoading: boolean }) => {
    return (
        <Box width={'225px'}
            height={'260px'}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'start'}
            borderRadius={'8px'}
            marginBottom={6}
            overflow={'hidden'}
            bg={{ base: '#25252518', _dark: '#2C3548' }}
        >
            <Skeleton
                width={'100%'}
                height={'160px'}
                loading={isLoading}
                marginBottom={2}
            />
            <SkeletonText noOfLines={3} gap={2} h={2} w={'90%'} m={'auto'} loading={isLoading}
            />
        </Box>
    )
}

export default CardSkeleton