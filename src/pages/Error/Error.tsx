import { VStack, Image, Text, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"
const Error = () => {
    return (
        <VStack justifyContent={'center'} w={'100vw'} h={'100vh'}>
            <Image src="/images/not-found.png" w={'200px'} />
            <Text fontWeight={'bold'}>Page Not Found</Text>
            <Link to={'/'}>
                <Button px={10} bg={{ base: "red.400", _hover: 'red.300' }} fontWeight={'bold'}>
                    Back
                </Button>
            </Link>
        </VStack>
    )
}

export default Error