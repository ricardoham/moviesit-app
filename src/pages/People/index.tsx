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
  const [{ data, loadingFetch }, doFetch] = useFetch<TMDBPeopleResults>();
  const [query, setQuery] = useState('');
  const [showMoviesList, setShowMoviesList] = useState(false);
  const history = useHistory();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setQuery(e.target.value);
  };

  const handleMovieDetail = (item?: number | string) => {
    history.push(`/movies/details/${item}`);
  };

  const handleSearchMovie = () => {
    setShowMoviesList(true);
    doFetch(`/client/tmdbpeople?name=${query}&page=1`);
  };

  const listData: ListModel[] | undefined = useMemo(() => data?.results?.map((item) => ({
    id: item.id,
    header: item.name,
    popularity: item.popularity,
    poster: item.profilePatch,
  })), [data]);

  return (
    <div>
      <Search
        value={query}
        placeholder="Pesquisar estrelas e/ou diretores"
        onSearch={handleSearchMovie}
        onChangeSearch={(e) => handleSearch(e)}
      />
      {
    showMoviesList ? (
      <ResultList
        showList={showMoviesList}
        listType="tmdb"
        isLoading={loadingFetch}
        result={listData}
        onShowDetails={handleMovieDetail}
        onShow={() => setShowMoviesList(!showMoviesList)}
      />
    ) : (
      <>
        <Card
          image="/images/recommendations.jpg"
          header="Meus atores e diretores"
          text="Aqui você encontra suas estrelas e diretores favoritos"
          btnText="Ver mais..."
        />
      </>
    )
  }

    </div>
  );
};

export default People;
