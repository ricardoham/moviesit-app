import React, { useMemo, useState } from 'react';
import Search from 'components/Search';
import { useApiFetch } from 'hooks/useApiFetch';
import { useHistory } from 'react-router-dom';
import Card from 'components/Card';
import ResultList from 'components/ResultList';
import { ListModel } from 'model/list';
import { useDisclosure } from '@chakra-ui/react';
import { TMDBResults } from 'model/tmbd';
import { useFetch } from 'hooks/useFetch';
import MoviesDetails from './MoviesDetails';

const Movies = (): JSX.Element => {
  const [{ data, loadingFetch }, doFetch] = useFetch<TMDBResults>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [query, setQuery] = useState('');
  const [showMoviesList, setShowMoviesList] = useState(false);
  const [idItem, setIdItem] = useState<number | string | undefined>();
  const history = useHistory();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setQuery(e.target.value);
  };

  const handleMovieDetail = (item?: number | string) => {
    setIdItem(item);
    onOpen();
  };

  const handleSearchMovie = () => {
    setShowMoviesList(true);
    doFetch(`/client/tmdb?name=${query}&page=1`);
  };

  const handleNext = () => {
    const nextPage = data?.page && data?.page + 1;
    if (nextPage === data?.totalPages) {
      return;
    }
    doFetch(`/client/tmdb?name=${query}&page=${nextPage}`);
  };

  const handlePrevious = () => {
    const previousPage = data?.page && data?.page - 1;
    if (previousPage === 0) {
      return;
    }
    doFetch(`/client/tmdb?name=${query}&page=${previousPage}`);
  };

  const listData: ListModel[] | undefined = useMemo(() => data?.results.map((item) => ({
    id: item.id as number,
    header: item.title,
    overview: item.overview,
    poster: item.posterPath,
  })), [data]);

  return (
    <div>
      <Search
        value={query}
        placeholder="Pesquisar filmes"
        onSearch={handleSearchMovie}
        onChangeSearch={(e) => handleSearch(e)}
      />
      <MoviesDetails
        movieId={idItem}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
      {
        showMoviesList ? (
          <ResultList
            listType="tmdb"
            result={listData}
            isLoading={loadingFetch}
            onShowDetails={handleMovieDetail}
            onShow={() => setShowMoviesList(!showMoviesList)}
            onNextPage={handleNext}
            onPreviousPage={handlePrevious}
          />
        ) : (
          <>
            <Card
              image="/images/watched.jpg"
              header="Meus filmes"
              text="Aqui você encontra a lista de seus filmes escolhidos na busca."
              btnText="Ver mais..."
              onAction={() => history.push('/movies/mymovies')}
            />
            <Card
              invert
              image="/images/towatch.jpg"
              header="Filmes para assistir"
              text="Crie listas de filmes para assistir depois"
              btnText="Ver mais..."
              onAction={() => history.push('/movies/waitlist')}
            />
          </>
        )
      }
    </div>
  );
};

export default Movies;
