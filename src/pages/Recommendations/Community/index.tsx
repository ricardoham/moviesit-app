import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import Search from 'components/Search';
import { useApiFetch } from 'hooks/useApiFetch';
import { Recommendations } from 'model/recommendations';
import { useFetch } from 'hooks/useFetch';
import ListCard from 'components/ListCard';
import useIsMounted from 'hooks/useMount';

const CommunityRecommendations = (): JSX.Element => {
  const [{ data, loadingFetch }, doFetch, fetchData] = useFetch<Recommendations[]>();
  const [query, setQuery] = useState('');
  const [showMoviesList, setShowMoviesList] = useState(false);
  const isMounted = useIsMounted();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setQuery(e.target.value);
  };

  const handleSearchRecommendations = () => {
    setShowMoviesList(true);
    doFetch('/recommendations');
  };

  useEffect(() => {
    if (isMounted()) doFetch('/recommendations');
  }, [isMounted]);

  return (
    <Box
      bg="white"
      display="flex"
      flexFlow="column"
      p={4}
    >
      <Search
        value={query}
        placeholder="Pesquisar recomendações da comunidade"
        onSearch={handleSearchRecommendations}
        onChangeSearch={(e) => handleSearch(e)}
      />
      {
        !loadingFetch && (
          <ListCard data={data || []} />
        )
      }
    </Box>
  );
};

export default CommunityRecommendations;
