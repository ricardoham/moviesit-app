import React, { useEffect, useMemo, useState } from 'react';
import ListItems from 'components/List';
import { useFetch } from 'hooks/useFetch';
import { FavMovies, FavPeople } from 'model/favmovies';
import { useApiOperation } from 'hooks/useApiOperation';
import { TMDBResults } from 'model/tmbd';
import { useAuth0 } from '@auth0/auth0-react';
import { ListModel } from 'model/list';
import { TMDBPeopleDetail } from 'model/tmdbpeople';
import { useDisclosure, Box, Heading } from '@chakra-ui/react';
import { GenPdf } from 'model/genPdf';
import useIsMounted from 'hooks/useMount';
import PDFLink from 'components/PDFLink';
import PersonDetails from '../PersonDetails';

const MyPeople = (): JSX.Element => {
  const { user } = useAuth0();
  const [{ data, loadingFetch, errorFetch }, doFetch, fetchData] = useFetch<FavPeople[]>();
  const [loadingDelete, deleteData] = useApiOperation({ operation: 'delete' });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [idItem, setIdItem] = useState<number | string | undefined>();
  const isMounted = useIsMounted();

  const handlePersonDetail = (item?: number | string) => {
    setIdItem(item);
    onOpen();
  };

  const handleRemoveFavPerson = async (id?: string) => {
    try {
      await deleteData({ url: `/favpeople/${id}` });
    } catch (e) {
      throw e;
    } finally {
      fetchData();
    }
  };

  useEffect(() => {
    if (isMounted()) doFetch(`/favpeople/user/${user?.sub}`);
  }, [isMounted]);

  const listData: ListModel[] | undefined = useMemo(() => data?.map((item) => ({
    _id: item._id,
    id: item.id,
    itemId: item.personId,
    header: item.name,
    overview: item.biography,
    poster: item.profilePatch,
  })), [data]);

  const dataPdf: GenPdf[] | undefined = useMemo(() => data?.map((item) => ({
    id: item.id as string,
    itemTitle: item.name,
    overview: item.biography,
    createdAt: item.createdAt,
  })), [data]);

  return (
    <Box bg="white" display="flex" flexFlow="column" p={4} m={2}>
      <Heading as="h3" size="lg">Minha lista de atores e diretores</Heading>

      {
        loadingFetch ? <div>Loading...</div> : (
          <>
            <Box alignSelf="flex-end">
              <PDFLink
                section="Meus atores e diretores favoritos"
                data={dataPdf}
                fileName="favpeople.pdf"
              />
            </Box>
            <ListItems
              data={listData}
              listType="persons"
              loading={loadingDelete}
              onShowDetails={handlePersonDetail}
              onRemoveItem={handleRemoveFavPerson}
            />
            <PersonDetails
              personId={idItem}
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
            />
          </>
        )
      }

    </Box>
  );
};

export default MyPeople;
