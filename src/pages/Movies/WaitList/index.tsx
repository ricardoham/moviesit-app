import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box, Button, Heading,
} from '@chakra-ui/react';
import { WaitList as ITWaitList } from 'model/waitList';
import { useFetch } from 'hooks/useFetch';
import ListCard from 'components/ListCard';
import { useApiOperation } from 'hooks/useApiOperation';
import { IListCard } from 'model/listCard';
import { useAuth0 } from '@auth0/auth0-react';
import { GenPdf } from 'model/genPdf';
import useIsMounted from 'hooks/useMount';
import PDFLink from 'components/PDFLink';

const WaitList = (): JSX.Element => {
  const { user } = useAuth0();
  const [{ data, loadingFetch }, doFetch, fetchData] = useFetch<ITWaitList[]>();
  const [loadingDelete, deleteData] = useApiOperation({ operation: 'delete' });
  const history = useHistory();
  const isMounted = useIsMounted();

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

  useEffect(() => {
    if (isMounted()) doFetch(`/waitlist/user/${user?.sub}`);
  }, [isMounted]);

  const listData: IListCard[] | undefined = useMemo(() => data?.map((item) => ({
    _id: item._id as string,
    id: item.id as string,
    title: item.title,
    movie: item.movie,
    description: item.comment,
    dueDate: item.dueDate,
  })), [data]);

  const dataPdf: GenPdf[] | undefined = useMemo(() => data?.map((item) => ({
    id: item.id as string,
    itemTitle: item.title,
    overview: item.comment,
    dueDate: item.dueDate,
    createdAt: item.createdAt,
  })), [data]);

  return (

    <Box
      bg="white"
      display="flex"
      flexFlow="column"
      p={4}
      m={2}
    >
      <Heading as="h3" size="lg">Minha lista para assistir depois</Heading>
      <Box alignSelf="flex-end" mb={4}>
        <Button
          variant="outline"
          colorScheme="teal"
          onClick={() => history.push('/waitlist/form')}
        >
          Criar nova lista
        </Button>
      </Box>
      {
        loadingFetch ? <div>Loading...</div> : (
          <>
            <Box alignSelf="flex-end">
              <PDFLink
                type="waitlist"
                section="Meus filmes para assistir depois"
                data={dataPdf}
                fileName="waitlist.pdf"
              />
            </Box>
            <ListCard
              isLoading={loadingDelete}
              data={listData || []}
              ownRecommendation
              onEditCardItem={
              (waitList: ITWaitList) => handleEditWaitList(waitList)
            }
              onRemoveCardItem={
              (id?: string) => handleRemoveWaitList(id)
            }
            />
          </>
        )
      }
    </Box>
  );
};
export default WaitList;
