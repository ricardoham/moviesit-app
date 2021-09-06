import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  Box, Divider, Heading, Text,
} from '@chakra-ui/react';
import { Recommendations } from 'model/recommendations';
import { useFetch } from 'hooks/useFetch';
import RecommendationComments from '../Comments';

interface Props {
  ownRecommendation?: boolean;
}

const RecommendationDetails = ({ ownRecommendation }: Props): JSX.Element => {
  const { state } = useLocation<{ recommendation: Recommendations } | undefined>();
  const [{ data, loadingFetch }, doFetch, fetchData] = useFetch<Recommendations>();

  return (
    <Box
      bg="white"
      p={3}
      borderRadius="4px"
    >
      <Box mb={4}>
        <Box
          display="flex"
          alignItems="center"
          mb="8px"
        >
          <Heading flex={1}>{state?.recommendation.title}</Heading>
          {
        !ownRecommendation
        && (
        <Box>
          <Text>Feito por</Text>
          {' '}
          <Text fontWeight="bold">{state?.recommendation.createdBy}</Text>
        </Box>
        )
      }
        </Box>
        <Box>
          <Text fontWeight="bold">Filmes 🎭</Text>
          {
        state?.recommendation.movies?.map((m) => (
          <Text pl={2} key={m.movieId}>{m.title}</Text>
        ))
      }
        </Box>
        <Text>
          {state?.recommendation.description}
        </Text>
      </Box>
      <Divider />
      <RecommendationComments
        recommendationId={state?.recommendation.id}
      />
    </Box>
  );
};

export default RecommendationDetails;
