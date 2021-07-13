import React, { useState } from 'react';
import Search from 'components/Search';
import { useApiFetch } from 'hooks/useApiFetch';
import ListItems from 'components/List';

const Movies = (): JSX.Element => {
  const [{ isError, isLoading, payload }, doFetch] = useApiFetch();
  const [query, setQuery] = useState('');
  console.log(payload);
  console.log(isError);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setQuery(e.target.value);
  };
  return (
    <div>
      <Search onSearch={(e) => handleSearch(e)} value={query} />
      <button type="button" onClick={() => doFetch(query)}>Search</button>
      <ListItems data={payload?.results || []} loading={isLoading} />
    </div>
  );
};

export default Movies;
