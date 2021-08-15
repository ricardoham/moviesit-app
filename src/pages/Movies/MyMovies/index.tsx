import React, { useEffect, useState } from 'react';
import ListItems from 'components/List';
import { useFetch } from 'hooks/useFetch';
import { FavMovies } from 'model/favmovies';
import { useHistory } from 'react-router-dom';
import { useInsertOrDelete } from 'hooks/useInsertOrDelete';

const MyMovies = (): JSX.Element => {
  const [{ data, isLoading, isError }, doFetch] = useFetch<FavMovies[]>();
  const [deleteData] = useInsertOrDelete({});
  const [loading, setLoading] = useState(isLoading);

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
        isLoading ? <div>Loading...</div> : (
          <ListItems
            data={data || []}
            listType="movies"
            loading={isLoading}
            onShowDetails={handleMovieDetail}
            onRemoveItem={handleRemoveFavMovie}
          />
        )
      }

    </>
  );
};

export default MyMovies;
