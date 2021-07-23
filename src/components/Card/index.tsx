import React from 'react';
import PictureCard from 'components/PictureCard';
import {
  Box, Button, Heading, Image, Text,
} from '@chakra-ui/react';
import { CardContainer, CardControl } from './styles';

interface Props {
  image?: string;
  header: string;
  text: string;
  btnText?: string;
  invert?: boolean
}

const Card = ({
  image, header, text, btnText, invert,
}: Props): JSX.Element => (
  <Box display="flex" m={6} bg="white" p={4}>
    {!invert && <Image src={image} boxSize="300px" borderRadius="lg" /> }
    <Box
      display="flex"
      flexFlow="column"
      ml={!invert ? 12 : 'auto'}
    >
      <Box flex="1" mt={4}>
        <Heading as="h4" size="md">{header}</Heading>
        <Text mt={4}>{text}</Text>
      </Box>
      <Button size="md">{btnText}</Button>
    </Box>
    {
      invert
    && <Image src={image} boxSize="300px" borderRadius="lg" ml={12} />
    }
  </Box>
);

export default Card;
