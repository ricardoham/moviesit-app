import React from 'react';
import PictureCard from 'components/PictureCard';
import {
  Box, Button, Heading, Image, Text,
} from '@chakra-ui/react';
import { CardContainer, CardControl } from './styles';

interface Props {
  image?: string;
  header: string;
  text?: string;
  btnText?: string;
  invert?: boolean
  onAction?: () => void;
}

const Card = ({
  image, header, text, btnText, invert, onAction,
}: Props): JSX.Element => (
  <Box display="flex" m={6} bg="white" p={4} boxShadow="0 4px 8px 0 rgba(0,0,0,0.2)">
    {!invert && (
    <Image
      src={image}
      w={[100, 300, 400]}
      h={[150, 200, 250]}
      mr="auto"
      borderRadius="lg"
      boxShadow="0 4px 8px 0 rgba(0,0,0,0.2)"
    />
    ) }
    <Box
      display={{ md: 'flex' }}
      flexFlow="column"
      p={3}
    >
      <Box flex="1" mt={4}>
        <Heading as="h4" size="md">{header}</Heading>
        <Text mt={4}>{text}</Text>
      </Box>
      <Box>
        <Button
          size="md"
          onClick={onAction}
          colorScheme="blue"
          variant="ghost"
        >
          {btnText}
        </Button>
      </Box>
    </Box>
    {
      invert
    && (

      <Image
        src={image}
        w={[100, 200, 400]}
        h={[150, 200, 250]}
        borderRadius="lg"
        ml="auto"
        justifySelf="flex-end"
        boxShadow="0 4px 8px 0 rgba(0,0,0,0.2)"
      />
    )
    }
  </Box>
);

export default Card;
