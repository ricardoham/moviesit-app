import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton } from '@chakra-ui/react';
import { IoBookmarkOutline, IoCheckboxOutline, IoStarOutline } from 'react-icons/io5';
import { useFetch } from 'hooks/useFetch';
import { TMDBMovieDetail } from 'model/tmbd';
import { FavMovies } from 'model/favmovies';
import { useInsertOrDelete } from 'hooks/useInsertOrDelete';

interface Props {
  movie?: TMDBMovieDetail;
}

const ControlMovies = ({ movie }: Props): JSX.Element => {
  const [{ data, isError }, doFetch] = useFetch<FavMovies>();
  const [deleteData] = useInsertOrDelete({});
  const [insertData] = useInsertOrDelete({ isInsert: true });
  const [favMovie, setFavMovie] = useState(data?.isFavorite || false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    doFetch(`/favmovies/${movie?.id}`);
  }, [movie]);

  const handleFavMovie = async () => {
    setLoading(true);
    const body = { ...movie, isFavorite: true };
    try {
      insertData({ url: '/favmovies', body });
      setFavMovie(true);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleRemoveFavMovie = async () => {
    setLoading(true);
    try {
      await deleteData({ url: '/favmovies', body: { id: movie?.id } });
      setFavMovie(false);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <Box display="flex" flexFlow="column" justifyContent="center" p={2}>
      <Button
        disabled={data?.isFavorite || favMovie}
        colorScheme="blue"
        onClick={handleFavMovie}
        isLoading={isLoading}
        loadingText="Adicionando a lista..."
      >
        {`${(data?.isFavorite || favMovie) ? 'Já é um filme favorito' : 'Adicionar aos meus filmes'}`}
      </Button>
      <Button colorScheme="blue">Quero assistir mais tarde</Button>
      <Button colorScheme="blue">Criar recomendações</Button>
    </Box>
  );
};

export default ControlMovies;
