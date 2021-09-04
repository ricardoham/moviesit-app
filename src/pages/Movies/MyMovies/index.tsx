import React, { useMemo, useState } from 'react';
import ListItems from 'components/List';
import { useFetch } from 'hooks/useFetch';
import { FavMovies } from 'model/favmovies';
import { useHistory } from 'react-router-dom';
import { useApiOperation } from 'hooks/useApiOperation';
import { TMDBMovieDetail, TMDBResults } from 'model/tmbd';
import { useAuth0 } from '@auth0/auth0-react';
import { ListModel } from 'model/list';

const MyMovies = (): JSX.Element => {
  const { user } = useAuth0();
  const [{ data, loadingFetch, errorFetch }, doFetch, fetchData] = useFetch<TMDBMovieDetail[]>(`/favmovies/user/${user?.sub}`);
  const [loadingDelete, deleteData] = useApiOperation({ operation: 'delete' });
  const history = useHistory();

  console.log('DAA', data);
  console.log('loadingFetch', loadingFetch);

  const handleMovieDetail = (item?: number | string) => {
    history.push(`/movies/details/${item}`, { isMyMovies: true });
  };

  const handleRemoveFavMovie = async (item?: number | string) => {
    try {
      await deleteData({ url: `/favmovies/${item as string}` });
    } catch (error) {
      console.error(error);
    } finally {
      fetchData();
    }
  };

  const listData: ListModel[] | undefined = useMemo(() => data?.map((item) => ({
    _id: item._id,
    id: item.id,
    movieId: item.movieId,
    header: item.title,
    overview: item.overview,
    poster: item.posterPath,
  })), [data]);

  return (
    <>
      {
        loadingFetch ? <div>Loading...</div> : (
          <ListItems
            data={listData}
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
