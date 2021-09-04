import React from 'react';
import {
  Box, Button, Heading, Image, Text,
} from '@chakra-ui/react';
import { CloseBar } from 'components/CloseBar';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useFetch } from 'hooks/useFetch';
import { TMDBMovieDetail } from 'model/tmbd';
import { currencyFormat } from 'utils/currency';
import LoadingSkeleton from 'components/Skeleton';
import ControlDetails from 'components/ControlMovies';
import { TMDBPeopleDetail } from 'model/tmdbpeople';

const PersonDetails = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [{ data, loadingFetch, errorFetch }] = useFetch<TMDBPeopleDetail>(`/client/tmdbperson/${id}`);
  const history = useHistory();
  // const { state } = useLocation<boolean>();

  return (
    <>
      {
          loadingFetch
            ? <LoadingSkeleton />
            : (
              <Box display="flex" flexFlow="column" p={2} bg="white">
                <Image
                  src={`https://image.tmdb.org/t/p/original/${data?.profilePatch}`}
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
                    {data?.name}

                  </Heading>
                  <Box display="flex" justifyContent="space-between">
                    <Box display="flex" flexFlow="column">
                      <Text fontWeight="bold">
                        🎬 Departamento
                      </Text>
                      <Text pl={2}>
                        {data?.department}
                      </Text>
                      <Text fontWeight="bold">
                        📝 Biografia
                      </Text>
                      <Text pl={2}>
                        {data?.biography}
                      </Text>
                      <Box display="flex" mt={2} mb={2}>
                        <Box flex="1">
                          <Box display="flex">
                            <Box mr="auto">
                              <Text fontWeight="bold">📅 Data de nascimento</Text>
                              <Text pl={2}>
                                {data?.birthDay}
                              </Text>
                              {
                                data?.deathDay && (
                                  <>
                                    <Text fontWeight="bold">⚰️ Data de falecimento</Text>
                                    <Text pl={2}>{data?.deathDay}</Text>
                                  </>
                                )
                              }
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <ControlDetails person={data} />
              </Box>
            )
        }
    </>
  );
};

export default PersonDetails;
