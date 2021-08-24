import React from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import { useFetch } from 'hooks/useFetch';
import { Recommendations } from 'model/recommendations';
import ListCard from 'components/ListCard';
import { useHistory } from 'react-router-dom';

const MyRecommendations = (): JSX.Element => {
  const userId = 'test01010';
  const [{ data, isLoading }, doFetch, fetchData] = useFetch<Recommendations[]>(`/recommendations/user/${userId}`);
  const history = useHistory();
  return (
    <Box>
      <Button onClick={() => history.push('/myrecommendations/form')}>Nova recomendação</Button>
      <Heading as="h1" size="lg">Minhas recomendações</Heading>
      {
        !isLoading && (
          <ListCard data={data || []} />
        )
      }
    </Box>
  );
};

export default MyRecommendations;
