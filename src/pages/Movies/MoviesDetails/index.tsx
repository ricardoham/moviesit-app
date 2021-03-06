import React, { useEffect } from 'react';
import {
  Box,
  Heading,
  Image,
  Text,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalBody,
} from '@chakra-ui/react';
import { CloseBar } from 'components/CloseBar';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useFetch } from 'hooks/useFetch';
import { TMDBMovieDetail } from 'model/tmbd';
import { currencyFormat } from 'utils/currency';
import LoadingSkeleton from 'components/Skeleton';
import ControlDetails from 'components/ControlMovies';

interface Props {
  movieId?: number | string;
  isOpen: boolean;
  hideControls?: boolean;
  onOpen?: () => void;
  onClose: () => void;
}

// TODO implement a modal instead to persist search data

const MoviesDetails = ({
  movieId, isOpen, onClose, onOpen, hideControls,
}: Props): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [{ data, loadingFetch }, doFetch] = useFetch<TMDBMovieDetail>();
  const history = useHistory();
  const { state } = useLocation<boolean>();

  useEffect(() => {
    if (isOpen) {
      doFetch(`/client/tmdb/${movieId}`);
    }
  }, [movieId, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton onClick={() => doFetch('')} />
        <ModalBody>
          {
          loadingFetch
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
                          <Box display="flex">
                            <Box mr="auto">
                              <Text fontWeight="bold">Gêneros 🎭</Text>
                              {
                            data?.genres.map((g) => (
                              <Text pl={2} key={g.id.toString()}>{g.name}</Text>
                            ))
                          }
                              <Text fontWeight="bold">Duração ⏱</Text>
                              <Text pl={2}>
                                {data?.runtime}
                                {' '}
                                minutos
                              </Text>
                              <Text fontWeight="bold">Lançamento 📅</Text>
                              <Text pl={2}>{data?.releaseDate}</Text>
                            </Box>
                            <Box mr="auto">
                              <Text fontWeight="bold">Bilheteria 💵</Text>
                              <Text pl={2}>{currencyFormat(data?.revenue || 0)}</Text>
                              <Text fontWeight="bold">Produção 💸</Text>
                              <Text pl={2}>{currencyFormat(data?.budget || 0)}</Text>
                              <Text fontWeight="bold">Popularidade 🍿</Text>
                              <Text pl={2}>{data?.popularity}</Text>
                              <Text fontWeight="bold">IMDB 🏅</Text>
                              <Text pl={2}>{data?.voteAverage}</Text>
                            </Box>
                          </Box>
                        </Box>

                      </Box>
                    </Box>
                  </Box>
                </Box>
                {
                  !hideControls && (
                  <ControlDetails
                    movie={data}
                  />
                  )
                }
              </Box>
            )
        }
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MoviesDetails;
