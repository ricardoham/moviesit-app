import Card from 'components/Card';
import ResultList from 'components/ResultList';
import Search from 'components/Search';
import { useApiFetch } from 'hooks/useApiFetch';
import { useFetch } from 'hooks/useFetch';
import { ListModel } from 'model/list';
import { TMDBPeopleResults } from 'model/tmdbpeople';
import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

const People = (): JSX.Element => {
  const [{ data, isLoading }, doFetch] = useFetch<TMDBPeopleResults>();
  const [query, setQuery] = useState('');
  const [showMoviesList, setShowMoviesList] = useState(false);
  const history = useHistory();

  console.log(data);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setQuery(e.target.value);
  };

  const handleMovieDetail = (item?: number | string) => {
    history.push(`/movies/details/${item}`);
  };

  const handleSearchMovie = () => {
    setShowMoviesList(true);
    doFetch(`/tmdbpeople?name=${query}&page=1`);
  };

  const listData: ListModel[] | undefined = useMemo(() => data?.results?.map((item) => ({
    id: item.id,
    header: item.name,
    popularity: item.popularity,
    poster: item.profilePatch,
  })), [data]);

  return (
    <div>
      <Search onSearch={(e) => handleSearch(e)} value={query} />
      <button type="button" onClick={handleSearchMovie}>Search</button>
      {
    showMoviesList ? (
      <ResultList
        showList={showMoviesList}
        listType="tmdb"
        isLoading={isLoading}
        result={listData}
        onShowDetails={handleMovieDetail}
        onShow={() => setShowMoviesList(!showMoviesList)}
      />
    ) : (
      <>
        <Card
          image="/images/recommendations.jpg"
          header="Visualizar estrelas e diretores"
          text="Busque recomendações da comunidade"
          btnText="Ver mais..."
        />
      </>
    )
  }

    </div>
  );
};

export default People;
