import ListItems from 'components/List';
import { useFetch } from 'hooks/useFetch';
import { FavMovies } from 'model/favmovies';
import React, { useEffect } from 'react';

const MyMovies = (): JSX.Element => {
  const [{ data, isError }, doFetch] = useFetch<FavMovies>();

  useEffect(() => {
    doFetch('/favmovies');
  }, []);

  return (
    <>
      <div>Works</div>
      {/* <ListItems
        data={data}
      /> */}
    </>
  );
};

export default MyMovies;
