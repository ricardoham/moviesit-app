import React, { useMemo, useState } from 'react';
import ListItems from 'components/List';
import { useFetch } from 'hooks/useFetch';
import { FavMovies } from 'model/favmovies';
import { useHistory } from 'react-router-dom';
import { useApiOperation } from 'hooks/useApiOperation';
import { TMDBMovieDetail, TMDBResults } from 'model/tmbd';
import { useAuth0 } from '@auth0/auth0-react';
import { ListModel } from 'model/list';
import { useDisclosure } from '@chakra-ui/react';
import MoviesDetails from '../MoviesDetails';

const MyMovies = (): JSX.Element => {
  const { user } = useAuth0();
  const [{ data, loadingFetch, errorFetch }, doFetch, fetchData] = useFetch<FavMovies[]>(`/favmovies/user/${user?.sub}`);
  const [loadingDelete, deleteData] = useApiOperation({ operation: 'delete' });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const [idItem, setIdItem] = useState<number | string | undefined>();

  const handleMovieDetail = (item?: number | string) => {
    setIdItem(item);
    onOpen();
  };

  const handleRemoveFavMovie = async (id?: string) => {
    try {
      await deleteData({ url: `/favmovies/${id}` });
    } catch (error) {
      console.error(error);
    } finally {
      fetchData();
    }
  };

  const listData: ListModel[] | undefined = useMemo(() => data?.map((item) => ({
    _id: item._id,
    id: item.id,
    itemId: item.movieId,
    header: item.title,
    overview: item.overview,
    poster: item.posterPath,
  })), [data]);

  return (
    <>
      {
        loadingFetch ? <div>Loading...</div> : (
          <>
            <ListItems
              data={listData}
              listType="movies"
              loading={loadingDelete}
              onShowDetails={handleMovieDetail}
              onRemoveItem={handleRemoveFavMovie}
            />
            <MoviesDetails
              movieId={idItem}
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
              hideControls
            />
          </>
        )
      }
    </>
  );
};

export default MyMovies;
