import {
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure,
} from '@chakra-ui/react';
import ListSearch from 'components/ListSearch';
import Search from 'components/Search';
import { useApiFetch } from 'hooks/useApiFetch';
import { ListModel } from 'model/list';
import { Movies } from 'model/recommendations';
import React, { useMemo, useState } from 'react';

interface Props {
  listType: 'tmdb' | 'movies' | 'persons';
  onSelectMovie: (movie: Movies) => void;
}

const MoviesModal = ({
  listType,
  onSelectMovie,
}: Props): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [query, setQuery] = useState('');
  const [{ isError, isLoading, result }, doFetch] = useApiFetch();
  const [showMoviesList, setShowMoviesList] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setQuery(e.target.value);
  };

  const handleSearchMovie = () => {
    setShowMoviesList(true);
    doFetch(`/client/tmdb?name=${query}&page=1`);
  };

  const listData: ListModel[] = useMemo(() => result.map((item) => ({
    id: item.id,
    header: item.title,
    overview: item.overview,
    poster: item.posterPath,
  })), [result]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader mt="32px">
          <Search
            value={query}
            placeholder="Pesquisar filmes"
            onSearch={handleSearchMovie}
            onChangeSearch={(e) => handleSearch(e)}
          />
        </ModalHeader>
        <ModalCloseButton onClick={() => setQuery('')} />
        <ModalBody>
          {
            isLoading ? <div>Loading...</div>
              : (
                <ListSearch
                  listType={listType}
                  data={listData}
                  loading={isLoading}
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
