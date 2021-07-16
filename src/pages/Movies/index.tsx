import React, { useState } from 'react';
import Search from 'components/Search';
import { useApiFetch } from 'hooks/useApiFetch';
import ListItems from 'components/List';
import { Link, useHistory } from 'react-router-dom';

const Movies = (): JSX.Element => {
  const [{ isError, isLoading, payload }, doFetch] = useApiFetch();
  const [query, setQuery] = useState('');
  const history = useHistory();
  console.log(payload);
  console.log(isError);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setQuery(e.target.value);
  };

  const handleMovieDetail = (id: string) => {
    history.push(`/movie/details/${id}`);
  };
  return (
    <div>
      <Search onSearch={(e) => handleSearch(e)} value={query} />
      <button type="button" onClick={() => doFetch(query)}>Search</button>
      <ListItems
        data={payload?.results || []}
        loading={isLoading}
        onClick={handleMovieDetail}
      />
    </div>
  );
};

export default Movies;
