import { Box, Text, Button, Heading } from "@chakra-ui/react";
import { useState, useRef } from "react";

const GameDescription = ({ description, title }: { description: string, title: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const maxLength = 200;
    const contentRef = useRef<HTMLSpanElement | null>(null);

    const toggleReadMore = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <>
            <Heading 
                as="h1" 
                marginBottom="10px" 
                fontSize={['xl', '2xl', '3xl', '4xl']} // Responsive font size for header
            >
                {title}
            </Heading>
            <Box
                className="gamedetails-description"
                width="100%"
                overflowY="auto"
                css={{
                    '&::-webkit-scrollbar': { display: 'none' },
                    '-ms-overflow-style': 'none',
                    'scrollbarWidth': 'none'
                }}
            >
                <Text
                    fontSize={['md', 'lg', 'xl', '2xl']}  // Responsive font size for description text
                    lineHeight="1.6"
                >
                    {description.slice(0, maxLength)}
                    <span
                        ref={contentRef}
                        style={{
                            display: isExpanded ? 'inline' : 'none',
                            transition: 'opacity 0.3s ease',
                        }}
                    >
                        {description.slice(maxLength)}
                    </span>
                </Text>
                <Button
                    onClick={toggleReadMore}
                    width="100px"
                    height="30px"
                    borderRadius="20px"
                    mt="10px"
                    bg={isExpanded ? "gray.600" : "blue.400"}
                    color="white"
                    _hover={{ bg: isExpanded ? "gray.700" : "blue.300" }}
                    transition="margin-top 0.3s ease"
                >
                    {isExpanded ? 'Show Less' : 'Show More'}
                </Button>
            </Box>
        </>
    );
}

export default GameDescription;
