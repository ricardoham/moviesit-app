import React from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import { useFetch } from 'hooks/useFetch';
import { Recommendations } from 'model/recommendations';
import ListCard from 'components/ListCard';
import { useHistory } from 'react-router-dom';
import { useApiOperation } from 'hooks/useApiOperation';

const MyRecommendations = (): JSX.Element => {
  const userId = 'test01010';
  const [{ data, isLoading }, doFetch, fetchData] = useFetch<Recommendations[]>(`/recommendations/user/${userId}`);
  const [loadingDelete, deleteData] = useApiOperation({ operation: 'delete' });
  const history = useHistory();

  const handleEditRecommendation = (recommendation: Recommendations) => {
    history.push('/myrecommendations/form/edit', { recommendation });
  };

  const handleRemoveRecommendation = async (id?: string) => {
    try {
      await deleteData({ url: `/recommendations/${id}` });
    } catch (error) {
      console.error(error);
    } finally {
      fetchData();
    }
  };

  return (
    <Box>
      <Button onClick={() => history.push('/myrecommendations/form')}>Nova recomendação</Button>
      <Heading as="h1" size="lg">Minhas recomendações</Heading>
      {
        !isLoading && (
          <ListCard
            isLoading={loadingDelete}
            data={data || []}
            ownRecommendation
            onEditRecommendation={
              (recommendation: Recommendations) => handleEditRecommendation(recommendation)
            }
            onRemoveRecommendation={
              (id?: string) => handleRemoveRecommendation(id)
            }
          />
        )
      }
    </Box>
  );
};

export default MyRecommendations;
