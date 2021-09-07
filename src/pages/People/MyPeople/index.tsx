import React, { useEffect, useMemo, useState } from 'react';
import ListItems from 'components/List';
import { useFetch } from 'hooks/useFetch';
import { FavMovies, FavPeople } from 'model/favmovies';
import { useHistory } from 'react-router-dom';
import { useApiOperation } from 'hooks/useApiOperation';
import { TMDBResults } from 'model/tmbd';
import { useAuth0 } from '@auth0/auth0-react';
import { ListModel } from 'model/list';
import { TMDBPeopleDetail } from 'model/tmdbpeople';
import { useDisclosure } from '@chakra-ui/react';
import PersonDetails from '../PersonDetails';

const MyPeople = (): JSX.Element => {
  const { user } = useAuth0();
  const [{ data, loadingFetch, errorFetch }, doFetch, fetchData] = useFetch<FavPeople[]>(`/favpeople/user/${user?.sub}`);
  const [loadingDelete, deleteData] = useApiOperation({ operation: 'delete' });
  const [loading, setLoading] = useState(loadingFetch);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [idItem, setIdItem] = useState<number | string | undefined>();
  const history = useHistory();

  const handlePersonDetail = (item?: number | string) => {
    setIdItem(item);
    onOpen();
  };

  const handleRemoveFavPerson = async (id?: string) => {
    setLoading(true);
    try {
      await deleteData({ url: `/favpeople/${id}` });
    } catch (e) {
      throw e;
    } finally {
      fetchData();
    }
    setLoading(false);
  };

  const listData: ListModel[] | undefined = useMemo(() => data?.map((item) => ({
    _id: item._id,
    id: item.id,
    itemId: item.personId,
    header: item.name,
    overview: item.biography,
    poster: item.profilePatch,
  })), [data]);

  return (
    <>
      {
        loadingFetch ? <div>Loading...</div> : (
          <>
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
