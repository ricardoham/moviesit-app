import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button } from '@chakra-ui/react';
import { useFetch } from 'hooks/useFetch';
import { TMDBMovieDetail } from 'model/tmbd';
import { FavMovies } from 'model/favmovies';
import { useApiOperation } from 'hooks/useApiOperation';
import { useAuth0 } from '@auth0/auth0-react';

interface Props {
  movie?: TMDBMovieDetail;
}

const ControlMovies = ({ movie }: Props): JSX.Element => {
  const { user } = useAuth0();
  const [{ data }, doFetch] = useFetch<FavMovies>();
  const [loadingPost, insertData] = useApiOperation({ operation: 'insert' });
  const [favMovie, setFavMovie] = useState(data?.isFavorite || false);
  const history = useHistory();

  useEffect(() => {
    doFetch(`/favmovies/${movie?.id}`);
  }, [movie]);

  const handleFavMovie = async () => {
    const body = { ...movie, isFavorite: true, userId: user?.sub };
    try {
      await insertData({ url: '/favmovies', body });
      history.push('/movies/mymovies');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box display="flex" flexFlow="column" justifyContent="center" p={2}>
      <Button
        disabled={data?.isFavorite || favMovie}
        colorScheme="blue"
        onClick={handleFavMovie}
        isLoading={loadingPost}
        loadingText="Adicionando a lista..."
      >
        {`${(data?.isFavorite || favMovie) ? 'Já é um filme favorito' : 'Adicionar aos meus filmes'}`}
      </Button>
    </Box>
  );
};

export default ControlMovies;
