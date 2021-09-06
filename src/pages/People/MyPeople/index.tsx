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

const MyPeople = (): JSX.Element => {
  const { user } = useAuth0();
  const [{ data, loadingFetch, errorFetch }, doFetch, fetchData] = useFetch<FavPeople[]>(`/favpeople/user/${user?.sub}`);
  const [loadingDelete, deleteData] = useApiOperation({ operation: 'delete' });
  const [loading, setLoading] = useState(loadingFetch);

  const history = useHistory();

  const handleMovieDetail = (item?: number | string) => {
    history.push(`/people/details/${item}`, { isMyMovies: true });
  };

  const handleRemoveFavMovie = async (id?: string) => {
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
          <ListItems
            data={listData}
            listType="persons"
            loading={loadingDelete}
            onShowDetails={handleMovieDetail}
            onRemoveItem={handleRemoveFavMovie}
          />
        )
      }

    </>
  );
};

export default MyPeople;
