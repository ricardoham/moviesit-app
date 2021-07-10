import React, { useState } from 'react';
import Search from 'components/Search';
import { useApiFetch } from 'hooks/useApiFetch';

const Movies = (): JSX.Element => {
  const [state, doFetch] = useApiFetch();
  const [query, setQuery] = useState('');
  console.log(state);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setQuery(e.target.value);
  };
  return (
    <div>
      <Search onSearch={(e) => handleSearch(e)} value={query} />
      <button type="button" onClick={() => doFetch(query)}>Search</button>
    </div>
  );
};

export default Movies;
