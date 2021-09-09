import { useDisclosure, Box, Text } from '@chakra-ui/react';
import Card from 'components/Card';
import ResultList from 'components/ResultList';
import Search from 'components/Search';
import { useApiFetch } from 'hooks/useApiFetch';
import { useFetch } from 'hooks/useFetch';
import { ListModel } from 'model/list';
import { TMDBPeopleResults } from 'model/tmdbpeople';
import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PersonDetails from './PersonDetails';

const People = (): JSX.Element => {
  const [{ data, loadingFetch }, doFetch] = useFetch<TMDBPeopleResults>();
  const [query, setQuery] = useState('');
  const [showPeopleList, setShowPeopleList] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [idItem, setIdItem] = useState<number | string | undefined>();
  const history = useHistory();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setQuery(e.target.value);
  };

  const handlePeopleDetail = (item?: number | string) => {
    setIdItem(item);
    onOpen();
  };

  const handleSearchMovie = () => {
    setShowPeopleList(true);
    doFetch(`/client/tmdbpeople?name=${query}&page=1`);
  };

  const handleNext = () => {
    const nextPage = data?.page && data?.page + 1;
    if (nextPage === data?.totalPages) {
      return;
    }
    doFetch(`/client/tmdbpeople?name=${query}&page=${nextPage}`);
  };

  const handlePrevious = () => {
    const previousPage = data?.page && data?.page - 1;
    if (previousPage === 0) {
      return;
    }
    doFetch(`/client/tmdbpeople?name=${query}&page=${previousPage}`);
  };

  const listData: ListModel[] | undefined = useMemo(() => data?.results?.map((item) => ({
    id: item.id,
    header: item.name,
    popularity: item.popularity,
    poster: item.profilePatch,
  })), [data]);

  return (
    <Box bg="white" m={2} h="100vh" display="flex" flexFlow="column">
      <Text alignSelf="center" as="u">Utilize a barra de pesquisa para procurar um ator ou diretor no Movies Data Base</Text>

      <Search
        value={query}
        placeholder="Pesquisar estrelas e/ou diretores"
        onSearch={handleSearchMovie}
        onChangeSearch={(e) => handleSearch(e)}
      />
      <PersonDetails
        personId={idItem}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
      {
    showPeopleList ? (
      <ResultList
        listType="tmdb"
        isLoading={loadingFetch}
        result={listData}
        onShowDetails={handlePeopleDetail}
        onShow={() => {
          setShowPeopleList(!showPeopleList);
          setQuery('');
        }}
        onNextPage={handleNext}
        onPreviousPage={handlePrevious}
      />
    ) : (
      <>
        <Card
          image="/images/actor.jpg"
          header="Meus atores e diretores"
          text="Aqui você encontra suas estrelas e diretores favoritos"
          btnText="Ver mais..."
          onAction={() => history.push('/people/mypeople')}

        />
      </>
    )
  }
    </Box>
  );
};

export default People;
