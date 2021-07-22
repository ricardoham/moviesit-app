import React from 'react';
import {
  Box, Button, Heading, IconButton, Image, Text,
} from '@chakra-ui/react';
import { CloseBar } from 'components/CloseBar';
import { useHistory, useParams } from 'react-router-dom';
import { useFetch } from 'hooks/useFetch';
import { TMDB, TMDBMovieDetail } from 'model/tmbd';
import { currencyFormat } from 'utils/currency';
import { IoBookmarkOutline, IoCheckboxOutline, IoStarOutline } from 'react-icons/io5';
import LoadingSkeleton from 'components/Skeleton';

interface Props {
  onClose: () => void;
}

// TODO implement a modal instead to persist search data

const MoviesDetails = ({ onClose }: Props): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [{ data, isLoading, isError }] = useFetch<TMDBMovieDetail>(`/tmdb/${id}`);

  const history = useHistory();
  return (
    <>
      <CloseBar onClose={() => history.push('/movies')} />
      {
          isLoading
            ? <LoadingSkeleton />
            : (
              <Box display="flex" flexFlow="column" p={2} bg="white">
                <Image
                  src={`https://image.tmdb.org/t/p/original/${data?.posterPath}`}
                  borderRadius="lg"
                  w={[200, 250, 300]}
                  alignSelf="center"
                />
                <Box
                  display="flex"
                  flexFlow="column"
                  m={3}
                >
                  <Heading as="h3" fontWeight="bold" mb={2}>
                    {data?.title}
                    {' '}
                    🎥
                  </Heading>
                  <Box display="flex" justifyContent="space-between">
                    <Box display="flex" flexFlow="column">
                      <Text fontWeight="bold">
                        Sinopse 📝
                      </Text>
                      <Text pl={2}>
                        {data?.overview}
                      </Text>
                      <Box display="flex" mt={2} mb={2}>
                        <Box flex="1">
                          <Text fontWeight="bold">Gêneros 🎭</Text>
                          {
                            data?.genres.map((g) => (
                              <Text pl={2} key={g.id.toString()}>{g.name}</Text>
                            ))
                          }
                          <Text fontWeight="bold">Lançamento 📅</Text>
                          <Text pl={2}>{data?.releaseDate}</Text>
                          <Text fontWeight="bold">Bilheteria 💵</Text>
                          <Text pl={2}>{currencyFormat(data?.revenue || 0)}</Text>
                        </Box>
                        <Box display="flex" flexFlow="column" justifyContent="center" p={2}>
                          <IconButton
                            size="md"
                            icon={<IoStarOutline />}
                            aria-label="Favoritar"
                            variant="ghost"
                            fontSize="20"
                          />
                          <IconButton
                            size="md"
                            icon={<IoBookmarkOutline />}
                            aria-label="Agendar pra depois"
                            variant="ghost"
                            fontSize="20"
                          />
                          <IconButton
                            size="md"
                            icon={<IoCheckboxOutline />}
                            aria-label="Agendar pra depois"
                            variant="ghost"
                            fontSize="20"
                          />
                        </Box>

                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Button colorScheme="blue">Criar Lista de Recomendações</Button>
              </Box>
            )

        }
    </>
  );
};

export default MoviesDetails;
