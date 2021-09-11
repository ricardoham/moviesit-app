import React, { useEffect, useMemo, useState } from 'react';
import ListItems from 'components/List';
import { useFetch } from 'hooks/useFetch';
import { FavMovies } from 'model/favmovies';
import { useApiOperation } from 'hooks/useApiOperation';
import { useAuth0 } from '@auth0/auth0-react';
import { ListModel } from 'model/list';
import {
  useDisclosure, Box, Heading, useToast, Spinner,
} from '@chakra-ui/react';
import { GenPdf } from 'model/genPdf';
import GeneratorPdf from 'components/GeneratorPdf';
import useIsMounted from 'hooks/useMount';
import PDFLink from 'components/PDFLink';
import EmptyState from 'components/EmptyState';
import MoviesDetails from '../MoviesDetails';

const MyMovies = (): JSX.Element => {
  const { user } = useAuth0();
  const [{ data, loadingFetch, errorFetch }, doFetch, fetchData] = useFetch<FavMovies[]>();
  const [loadingDelete, deleteData] = useApiOperation({ operation: 'delete' });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [idItem, setIdItem] = useState<number | string | undefined>();
  const isMounted = useIsMounted();
  const toast = useToast();

  const handleMovieDetail = (item?: number | string) => {
    setIdItem(item);
    onOpen();
  };

  const handleRemoveFavMovie = async (id?: string) => {
    try {
      await deleteData({ url: `/favmovies/${id}` });
    } catch (error) {
      toast({
        title: 'Error inesperado',
        status: 'error',
        isClosable: true,
        position: 'top',
      });
    } finally {
      fetchData();
    }
  };

  useEffect(() => {
    if (isMounted()) doFetch(`/favmovies/user/${user?.sub}`);
  }, [isMounted]);

  const listData: ListModel[] | undefined = useMemo(() => data?.map((item) => ({
    _id: item._id,
    id: item.id,
    itemId: item.movieId,
    header: item.title,
    overview: item.overview,
    poster: item.posterPath,
  })), [data]);

  const dataPdf: GenPdf[] | undefined = useMemo(() => data?.map((item) => ({
    id: item.id as string,
    itemTitle: item.title,
    overview: item.overview,
    createdAt: item.createdAt,
  })), [data]);

  return (
    <Box
      bg="white"
      display="flex"
      flexFlow="column"
      p={4}
      m={2}
      h="140vh"
    >
      <Heading as="h3" size="lg">Minha lista de filmes</Heading>
      {
        loadingFetch ? <Spinner alignSelf="center" /> : (
          <>
            {
            !data?.length ? <EmptyState type="movie" noItem="Filme" />
              : (
                <>
                  <Box alignSelf="flex-end">
                    <PDFLink
                      section="Meus filmes favoritos"
                      data={dataPdf}
                      fileName="favmovies.pdf"
                    />
                  </Box>
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
        )
      }
    </Box>
  );
};

export default MyMovies;
