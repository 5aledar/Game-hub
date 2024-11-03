import { useParams } from "react-router-dom";
import { useState, useRef } from "react";
import { Box, Heading, Text, Button, Flex, Image, Spinner, HStack, VStack } from "@chakra-ui/react";
import Navbar from "../../components/Navbar/Navbar";
import { useFetchGameDetails } from "../../hooks/useFetchGameDetails";
import { useFetchTrailer } from "../../hooks/useFetchTrailer";
import './GameDetails.css'
const GameDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLSpanElement | null>(null);
  const maxLength = 200;
  const { details, isLoading, error } = useFetchGameDetails(id!);
  const trailers = useFetchTrailer(id!);

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      <Navbar />
      <Flex
        className="gamedetails"
        padding="40px"
        paddingTop="60px"
        height="100vh"
        justifyContent="space-between"
        alignItems="flex-start"
        flexDirection={{ base: "column", md: "row" }}
        margin={{ base: "20px", md: "0" }}
      >
        {isLoading && (
          <Spinner color="blue.500" size="xl" margin="auto" />
        )}

        {error && <Text color="red.500">{error.message}</Text>}

        {!isLoading && !error && (
          <>
            <Box
              className="gamedetails-text"
              width={{ base: "100%", md: "45%" }}
              paddingBottom={{ base: "20px", md: "0" }}
            >
              <Heading
                as="h1"
                fontSize={{ base: "24px", md: "36px" }}
                marginBottom="10px"
              >
                {details?.name}
              </Heading>
              <Box
                className="gamedetails-description"
                width="100%"
                overflowY="auto"
                css={{
                  '&::-webkit-scrollbar': { display: 'none' },
                  '-ms-overflow-style': 'none',  // for IE and Edge
                  'scrollbarWidth': 'none'       // for Firefox
                }}
              >
                <Text>
                  {details?.description_raw.slice(0, maxLength)}
                  <span
                    ref={contentRef}
                    className={`description-content ${isExpanded ? 'expanded' : ''}`}
                    style={{
                      display: isExpanded ? 'inline' : 'none',
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    {details?.description_raw.slice(maxLength)}
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
              <Flex
                className="gamedetails-details"
                flexDirection="column"
                paddingTop="40px"
                width="70%"
              >
                <HStack justifyContent="space-between" width="100%" alignItems="start" marginBottom={4}>
                  <Box>
                    <Text className="title" fontWeight="bold">Genre</Text>
                    <VStack className="data" alignItems="flex-start" marginBottom={4}>
                      {details?.genres?.map((genre, index) => (
                        <Text key={index}>{genre.name}</Text>
                      ))}
                    </VStack>
                  </Box>
                  <Box>
                    <Text className="title" fontWeight="bold">Platforms</Text>
                    <VStack className="data" alignItems="flex-start">
                      {details?.parent_platforms?.map((parent, index) => (
                        <Text key={index}>{parent.platform.name}</Text>
                      ))}
                    </VStack>
                  </Box>
                </HStack>
                <HStack justifyContent="space-between" width="100%">
                  <Box>
                    <Text className="title" fontWeight="bold">Metascore</Text>
                    <Text className="score good">{details?.metacritic}</Text>
                  </Box>
                  <VStack alignItems="flex-start">
                    <Text className="title" fontWeight="bold">Publisher</Text>
                    {details?.publishers?.map((publisher, index) => (
                      <Text key={index}>{publisher.name}</Text>
                    ))}
                  </VStack>
                </HStack>
              </Flex>
            </Box>
            <Box className="gamedetails-media" width={{ base: "100%", md: "48%" }}>
              {trailers.length > 0 ? (
                <video width="100%" controls poster={trailers[0].preview}>
                  <source src={trailers[0].data[480]} type="video/mp4" />
                  <source src={trailers[0].data.max} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image width="100%" src={details?.background_image} alt="" />
              )}
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
            </Box>
          </>
        )}
      </Flex>
    </>
  );
};

export default GameDetails;
