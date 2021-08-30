import React, { useEffect, useState } from 'react';
import ListItems from 'components/List';
import { useFetch } from 'hooks/useFetch';
import { FavMovies } from 'model/favmovies';
import { useHistory } from 'react-router-dom';
import { useApiOperation } from 'hooks/useApiOperation';
import { TMDBResults } from 'model/tmbd';

const MyMovies = (): JSX.Element => {
  const [{ data, loadingFetch, errorFetch }, doFetch] = useFetch<TMDBResults>();
  const [loadingDelete, deleteData] = useApiOperation({ operation: 'delete' });
  const [loading, setLoading] = useState(loadingFetch);

  const history = useHistory();

  useEffect(() => {
    doFetch('/favmovies');
  }, []);

  const handleMovieDetail = (item?: number | string) => {
    history.push(`/movies/details/${item}`, { isMyMovies: true });
  };

  const handleRemoveFavMovie = async (item?: number | string) => {
    setLoading(true);
    try {
      await deleteData({ url: '/favmovies', body: { id: item } });
    } catch (e) {
      throw e;
    }
    setLoading(false);
  };

  return (
    <>
      {
        loadingFetch ? <div>Loading...</div> : (
          <ListItems
            data={data?.results || []}
            listType="movies"
            loading={loadingDelete}
            onShowDetails={handleMovieDetail}
            onRemoveItem={handleRemoveFavMovie}
          />
        )
      }

    </>
  );
};

export default MyMovies;
