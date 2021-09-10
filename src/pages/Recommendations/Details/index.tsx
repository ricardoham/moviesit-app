import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Box, Divider, Heading, Text, Button,
} from '@chakra-ui/react';
import { Recommendations } from 'model/recommendations';
import { useFetch } from 'hooks/useFetch';
import RecommendationComments from '../Comments';

interface Props {
  ownRecommendation?: boolean;
}

const RecommendationDetails = ({ ownRecommendation }: Props): JSX.Element => {
  const { state } = useLocation<{ recommendation: Recommendations, isMine: boolean } | undefined>();
  const [{ data, loadingFetch }, doFetch, fetchData] = useFetch<Recommendations>();
  const history = useHistory();

  return (
    <Box
      display="flex"
      flexFlow="column"
      bg="white"
      p={4}
      m={2}
    >
      <Box
        alignSelf="flex-end"
        m={2}
      >
        <Button
          variant="outline"
          colorScheme="teal"
          onClick={() => history.push(`${state?.isMine ? '/recommendations/myrecommendations' : '/recommendations/community'}`)}
        >
          Voltar
        </Button>
      </Box>
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
        <Text fontWeight="bold">Descrição 📝</Text>
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
