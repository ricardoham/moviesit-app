import React from 'react';
import {
  Box, Skeleton, SkeletonText,
} from '@chakra-ui/react';

const LoadingSkeleton = (): JSX.Element => (
  <Box
    padding="6"
    boxShadow="lg"
    bg="white"
    display="flex"
    flexFlow="column"
  >
    <Skeleton h={[200, 250, 300]} w={[200, 250, 300]} alignSelf="center" />
    <SkeletonText mt="4" noOfLines={4} spacing="4" />
  </Box>
);

export default LoadingSkeleton;
