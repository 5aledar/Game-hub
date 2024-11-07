import { useParams } from "react-router-dom";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import Navbar from "../../components/Navbar/Navbar";
import { useFetchGameDetails } from "../../hooks/useFetchGameDetails";
import { useFetchTrailer } from "../../hooks/useFetchTrailer";
import './GameDetails.css'
import GameDescription from "@/components/GameDescription/GameDescription";
import GameTrailer from "@/components/GameTrailer/GameTrailer";
import GameStats from "@/components/GameStats/GameStats";
import GameScreenshots from "@/components/GameScreenshots/GameScreenshots";
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
              <GameDescription description={details.description_raw} title={details.name} />
              <GameStats details={details} />
            </Box>
            <Box className="gamedetails-media" width={{ base: "100%", md: "48%" }}>
              {trailers.length > 0 && (
                <GameTrailer trailer={trailers[0]} />
              )}
              <GameScreenshots details={details} />
            </Box>
          </>
        )}
      </Flex>
    </>
  );
};

export default GameDetails;
