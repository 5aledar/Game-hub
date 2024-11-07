import { Badge, Text } from '@chakra-ui/react'
const Rating = ({ rating }: { rating: number }) => {
    return (
        <Badge bg={(rating > 3) ? 'green.300' : 'orange.300'} w={6} fontSize={12}>
            <Text m={'auto'} color={rating > 3 ? 'green' : 'orange.700'} fontWeight={'bold'}>{Math.trunc((rating * 2) * 10)}</Text>
        </Badge>
    )
}

export default Rating