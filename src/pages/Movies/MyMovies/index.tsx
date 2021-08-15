import React, { useEffect } from 'react';
import ListItems from 'components/List';
import { useFetch } from 'hooks/useFetch';
import { FavMovies } from 'model/favmovies';
import { useHistory } from 'react-router-dom';

const MyMovies = (): JSX.Element => {
  const [{ data, isLoading, isError }, doFetch] = useFetch<FavMovies[]>();
  const history = useHistory();

  useEffect(() => {
    doFetch('/favmovies');
  }, []);

  const handleMovieDetail = (item?: number | string) => {
    history.push(`/movies/details/${item}`, { isMyMovies: true });
  };

  return (
    <>
      <div>Works</div>
      <ListItems
        data={data || []}
        listType="movies"
        loading={isLoading}
        onShowDetails={handleMovieDetail}
      />
    </>
  );
};

export default MyMovies;
