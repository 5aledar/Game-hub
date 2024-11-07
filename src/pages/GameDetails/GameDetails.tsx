import { useParams } from "react-router-dom";
import { Box, Heading, Text, Flex, Image, Spinner, VStack, SimpleGrid } from "@chakra-ui/react";
import Navbar from "../../components/Navbar/Navbar";
import { useFetchGameDetails } from "../../hooks/useFetchGameDetails";
import { useFetchTrailer } from "../../hooks/useFetchTrailer";
import './GameDetails.css'
import GameDescription from "@/components/GameDescription/GameDescription";
import { Genre } from "@/types/genre.model";
const GameDetails = () => {
  const { id } = useParams();
  const { details, isLoading, error } = useFetchGameDetails(parseInt(id!));
  const { trailers } = useFetchTrailer(parseInt(id!));
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
              <GameDescription description={details.description_raw} />
              <Flex
                className="gamedetails-details"
                flexDirection="column"
                paddingTop="40px"
                width="70%"
              >
                <SimpleGrid columns={2} width="100%">
                  {/* Genre */}
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

                  {/* Platforms */}
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

                  {/* Metascore */}
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

                  {/* Publisher */}
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
