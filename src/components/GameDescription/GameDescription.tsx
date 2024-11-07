import { useFetchGameDetails } from "@/hooks/useFetchGameDetails"
import { Box, Text, Button } from "@chakra-ui/react";
import { useState, useRef } from "react";
const GameDescription = ({ description }: { description: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const maxLength = 200;
    const contentRef = useRef<HTMLSpanElement | null>(null);
    const toggleReadMore = () => {
        setIsExpanded((prev) => !prev);
    };
    return (
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
            <Text>
                {description.slice(0, maxLength)}
                <span
                    ref={contentRef}
                    className={`description-content ${isExpanded ? 'expanded' : ''}`}
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
                bg={isExpanded ? "gray.600" : "blue.300"}
                color="white"
                _hover={{ bg: isExpanded ? "gray.700" : "blue.400" }}
                transition="margin-top 0.3s ease"
            >
                {isExpanded ? 'Show Less' : 'Show More'}
            </Button>
        </Box>
    )
}

export default GameDescription