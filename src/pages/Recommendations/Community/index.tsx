import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import Search from 'components/Search';
import { useApiFetch } from 'hooks/useApiFetch';

const CommunityRecommendations = (): JSX.Element => {
  const [{ isError, isLoading, result }, doFetch] = useApiFetch();
  const [query, setQuery] = useState('');
  const [showMoviesList, setShowMoviesList] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setQuery(e.target.value);
  };

  const handleSearchRecommendations = () => {
    setShowMoviesList(true);
    doFetch('/recommendations');
  };

  return (
    <Box>
      <Search
        value={query}
        placeholder="Pesquisar recomendações da comunidade"
        onSearch={handleSearchRecommendations}
        onChangeSearch={(e) => handleSearch(e)}
      />
    </Box>
  );
};

export default CommunityRecommendations;
