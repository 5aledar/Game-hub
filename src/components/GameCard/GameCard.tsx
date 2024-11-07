import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Image, Spinner, Text, Flex } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import Rating from '../Rating/Rating';
import { getImgkitUrl } from '@/utils/cropImage';
import { Game } from '@/types/game.model';
const GameCard = ({ game }: { game: Game }) => {
  const { id, name, background_image, parent_platforms, rating } = game;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
  };

  const croppedImageUrl = background_image
    ? getImgkitUrl(background_image)
    : "/images/logo.png";

  const MotionImage = motion.create(Image)
  const MotionFlex = motion.create(Flex)
  return (
    <MotionFlex
      width="225px"
      height="260px"
      mb="1.5rem"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.1 }}
      onClick={() => navigate(`/games/${id}`)}
      className={`gamecard-container`}
      bg={{ base: 'rgb(237, 245, 253)', _dark: '#2C3548' }}
      borderRadius="8px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
    >
      {isLoading && (
        <Box className="image-loader" display="flex" justifyContent="center" alignItems="center" width="100%" height="160px" bg="rgba(0, 0, 0, 0.1)">
          <Spinner size="lg" color="blue.500" />
        </Box>
      )}

      <MotionImage
        className="poster"
        src={croppedImageUrl}
        alt={`${name} bg`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        display={isLoading ? 'none' : 'block'}
        width="100%"
        height="160px"
        objectFit="cover"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.1 }}
      />

      <Box
        className="gamecard-info"
        width="100%"
        height="100px"
        borderRadius="0 0 8px 8px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        py="3"
        px="2"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" gap="3px" alignItems="center">
            {parent_platforms?.map((item) => (
              <Box key={item.platform.id} className="platform-container">
                <Image
                  src={`/icons/${item.platform.slug}.svg`}
                  alt=""
                  width="12px"
                  height="12px"
                  filter="brightness(0) saturate(80%) invert(60%) sepia(40%) saturate(0%) hue-rotate(100deg) brightness(90%) contrast(92%)"
                />
              </Box>
            ))}
          </Box>
          <Rating rating={rating} />
        </Box>
        <Text className="gamecard-title" fontSize="md" fontWeight="medium" pl="1" mb={6} color={{ base: 'black', _dark: 'white' }}>
          {name}
        </Text>
      </Box>
    </MotionFlex>
  );
};

export default GameCard;
