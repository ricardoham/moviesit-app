import React, { useMemo, useState, useEffect } from 'react';
import {
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay,
} from '@chakra-ui/react';
import ListSearch from 'components/ListSearch';
import Search from 'components/Search';
import { useFetch } from 'hooks/useFetch';
import { ListModel } from 'model/list';
import { Movies } from 'model/recommendations';
import { TMDBResults } from 'model/tmbd';

interface Props {
  ownList?: boolean;
  listType: 'tmdb' | 'movies' | 'persons';
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
  onSelectMovie: (movie: Movies) => void;
}

const MoviesModal = ({
  ownList,
  isOpen,
  listType,
  onSelectMovie,
  onOpen,
  onClose,
}: Props): JSX.Element => {
  const [query, setQuery] = useState('');
  const [{ data, loadingFetch, errorFetch }, setURL] = useFetch<TMDBResults>();
  const [showMoviesList, setShowMoviesList] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setQuery(e.target.value);
  };

  const handleSearchMovie = () => {
    setShowMoviesList(true);
    setURL(`/client/tmdb?name=${query}&page=1`);
  };

  useEffect(() => {
    if (isOpen && ownList) {
      setURL('/favmovies');
    }
  }, [ownList, isOpen]);

  const listData: ListModel[] | undefined = useMemo(() => data?.results?.map((item) => ({
    id: item.id,
    header: item.title,
    overview: item.overview,
    poster: item.posterPath,
  })), [data]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader mt="32px">
          {
            ownList ? (
              <h3>Meus filmes</h3>
            )
              : (
                <Search
                  value={query}
                  placeholder="Pesquisar filmes"
                  onSearch={handleSearchMovie}
                  onChangeSearch={(e) => handleSearch(e)}
                />
              )
          }
        </ModalHeader>
        <ModalCloseButton onClick={() => setURL('')} />
        <ModalBody>
          {
            (loadingFetch) ? <div>Loading...</div>
              : (
                <ListSearch
                  listType={listType}
                  data={listData}
                  loading={loadingFetch}
                  onSelectMovies={(movie: Movies) => onSelectMovie(movie)}
                />
              )
          }
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MoviesModal;
