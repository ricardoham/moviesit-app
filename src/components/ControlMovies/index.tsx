import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, useToast } from '@chakra-ui/react';
import { useFetch } from 'hooks/useFetch';
import { TMDBMovieDetail } from 'model/tmbd';
import { FavMovies, FavPeople } from 'model/favmovies';
import { useApiOperation } from 'hooks/useApiOperation';
import { useAuth0 } from '@auth0/auth0-react';
import { TMDBPeopleDetail } from 'model/tmdbpeople';

interface Props {
  movie?: TMDBMovieDetail;
  person?: TMDBPeopleDetail;
}

const ControlDetails = ({ movie, person }: Props): JSX.Element => {
  const { user } = useAuth0();
  const [{ data }, doFetch] = useFetch<FavMovies | FavPeople>();
  const [loadingPost, insertData] = useApiOperation({ operation: 'insert' });
  const history = useHistory();
  const toast = useToast();

  useEffect(() => {
    if (movie) {
      doFetch(`/favmovies/${movie?.id}?userId=${user?.sub}`);
    } else if (person) {
      doFetch(`/favpeople/${person.id}?userId=${user?.sub}`);
    }
  }, [movie]);

  const handleFavItem = async () => {
    try {
      if (movie) {
        const body = { ...movie, isFavorite: true, userId: user?.sub };
        await insertData({ url: '/favmovies', body });
        history.push('/movies/mymovies');
      } else if (person) {
        const body = { ...person, isFavorite: true, userId: user?.sub };
        await insertData({ url: '/favpeople', body });
        history.push('/people/mypeople');
      }
    } catch (error) {
      toast({
        title: 'Error inesperado',
        status: 'error',
        isClosable: true,
        position: 'top',
      });
    }
  };

  const btnText = useMemo(() => {
    if (person && data?.isFavorite) {
      return 'Já é um artista favorito';
    } if (movie && data?.isFavorite) {
      return 'Já é um filme favorito';
    }
    return 'Adicionar aos favoritos';
  }, [person, movie, data]);

  return (
    <Box display="flex" flexFlow="column" justifyContent="center" p={2}>
      <Box alignSelf="center">
        <Button
          disabled={data?.isFavorite}
          colorScheme="blue"
          onClick={handleFavItem}
          isLoading={loadingPost}
          loadingText="Adicionando a lista..."
        >
          {btnText}
        </Button>
      </Box>
    </Box>
  );
};

export default ControlDetails;
