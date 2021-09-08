import React, { useEffect, useMemo, useState } from 'react';
import ListItems from 'components/List';
import { useFetch } from 'hooks/useFetch';
import { FavMovies, FavPeople } from 'model/favmovies';
import { useApiOperation } from 'hooks/useApiOperation';
import { TMDBResults } from 'model/tmbd';
import { useAuth0 } from '@auth0/auth0-react';
import { ListModel } from 'model/list';
import { TMDBPeopleDetail } from 'model/tmdbpeople';
import { useDisclosure } from '@chakra-ui/react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import GeneratorPdf from 'components/GeneratorPdf';
import { GenPdf } from 'model/genPdf';
import useIsMounted from 'hooks/useMount';
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
    <>
      {
        loadingFetch ? <div>Loading...</div> : (
          <>
            <PDFDownloadLink
              document={(
                <GeneratorPdf
                  section="Meus atores e diretores favoritos"
                  data={dataPdf}
                />
              )}
              fileName="somename.pdf"
            >
              {({
                blob, url, loading, error,
              }) => (loading ? 'Loading document...' : 'Download now!')}
            </PDFDownloadLink>
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

    </>
  );
};

export default MyPeople;
