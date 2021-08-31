import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box, Button,
} from '@chakra-ui/react';
import { WaitList as ITWaitList } from 'model/waitList';
import { useFetch } from 'hooks/useFetch';
import ListCard from 'components/ListCard';
import { useApiOperation } from 'hooks/useApiOperation';

const WaitList = (): JSX.Element => {
  const userId = 'test0101';
  const [{ data, loadingFetch }, doFetch, fetchData] = useFetch<ITWaitList[]>(`/waitlist/user/${userId}`);
  const [loadingDelete, deleteData] = useApiOperation({ operation: 'delete' });

  const history = useHistory();

  const handleEditWaitList = (waitList: ITWaitList) => {
    history.push('/waitList/form/edit', { waitList });
  };

  const handleRemoveWaitList = async (id?: string) => {
    try {
      await deleteData({ url: `/waitlist/${id}` });
    } catch (error) {
      console.error(error);
    } finally {
      fetchData();
    }
  };

  return (
    <Box>
      <Button onClick={() => history.push('/waitlist/form')}>Criar uma nova list</Button>
      <Box>
        <h3>Minha lista para assistir depois: </h3>
        {
        !loadingFetch && (
          <ListCard
            isLoading={loadingDelete}
            data={data || []}
            ownRecommendation
            onEditRecommendation={
              (waitList: ITWaitList) => handleEditWaitList(waitList)
            }
            onRemoveRecommendation={
              (id?: string) => handleRemoveWaitList(id)
            }
          />
        )
      }
      </Box>
    </Box>
  );
};
export default WaitList;
