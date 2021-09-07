import React, { useMemo, useState } from 'react';
import ReactPDF, { PDFDownloadLink } from '@react-pdf/renderer';
import ListItems from 'components/List';
import { useFetch } from 'hooks/useFetch';
import { FavMovies } from 'model/favmovies';
import { useHistory } from 'react-router-dom';
import { useApiOperation } from 'hooks/useApiOperation';
import { TMDBMovieDetail, TMDBResults } from 'model/tmbd';
import { useAuth0 } from '@auth0/auth0-react';
import { ListModel } from 'model/list';
import { useDisclosure, Button } from '@chakra-ui/react';
import { GenPdf } from 'model/genPdf';
import GeneratorPdf from 'components/GeneratorPdf';
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

  const dataPdf: GenPdf[] | undefined = useMemo(() => data?.map((item) => ({
    id: item.id as string,
    itemTitle: item.title,
    overview: item.overview,
    createdAt: item.createdAt,
  })), [data]);

  return (
    <>
      {
        loadingFetch ? <div>Loading...</div> : (
          <>
            <PDFDownloadLink
              document={(
                <GeneratorPdf
                  section="Meus filmes favoritos"
                  data={dataPdf}
                />
              )}
              fileName="somename.pdf"
            >
              {({
                blob, url, loading, error,
              }) => (loading ? 'Loading document...' : 'Download now!')}
            </PDFDownloadLink>
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
