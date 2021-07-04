import React from 'react';
import { Box, Image } from '@chakra-ui/react';

interface Props {
  image: string;
  altName: string;
}

const PictureCard = ({ image, altName }: Props): JSX.Element => (
  <Box>
    <Image src={image} alt={altName} />
  </Box>
);

export default PictureCard;
