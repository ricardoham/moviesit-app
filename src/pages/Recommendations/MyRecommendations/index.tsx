import React from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import { useFetch } from 'hooks/useFetch';
import { Recommendations } from 'model/recommendations';
import ListCard from 'components/ListCard';
import { useHistory } from 'react-router-dom';
import { useApiOperation } from 'hooks/useApiOperation';
import { useAuth0 } from '@auth0/auth0-react';

const MyRecommendations = (): JSX.Element => {
  const { user } = useAuth0();
  const [{ data, loadingFetch }, doFetch, fetchData] = useFetch<Recommendations[]>(`/recommendations/user/${user?.sub}`);
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
        !loadingFetch && (
          <ListCard
            isLoading={loadingDelete}
            data={data || []}
            ownRecommendation
            onEditCardItem={
              (recommendation: Recommendations) => handleEditRecommendation(recommendation)
            }
            onRemoveCardItem={
              (id?: string) => handleRemoveRecommendation(id)
            }
          />
        )
      }
    </Box>
  );
};

export default MyRecommendations;
