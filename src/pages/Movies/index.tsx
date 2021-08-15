import React, { useState } from 'react';
import Search from 'components/Search';
import { useApiFetch } from 'hooks/useApiFetch';
import ListItems from 'components/List';
import { Link, useHistory } from 'react-router-dom';
import Card from 'components/Card';
import { TMDB, TMDBMovieDetail } from 'model/tmbd';
import MoviesSearchList from './MoviesList';

const Movies = (): JSX.Element => {
  const [{ isError, isLoading, result }, doFetch] = useApiFetch();
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
    doFetch(`/tmdb?name=${query}&page=1`);
  };

  return (
    <div>
      <Search onSearch={(e) => handleSearch(e)} value={query} />
      <button type="button" onClick={handleSearchMovie}>Search</button>
      {
        showMoviesList ? (
          <MoviesSearchList
            result={result}
            isLoading={isLoading}
            onMovieDetails={handleMovieDetail}
            onShow={() => setShowMoviesList(!showMoviesList)}
          />
        ) : (
          <>
            <Card
              image="/images/recommendations.jpg"
              header="Buscar recomendações"
              text="Busque recomendações da comunidade"
              btnText="Ver mais..."
            />
            <Card
              image="/images/watched.jpg"
              header="Meus filmes"
              text="Aqui você encontra a lista de seus filmes escolhidos na busca."
              btnText="Ver mais..."
              invert
              onAction={() => history.push('/movies/mymovies')}
            />
            {/* <Card
              image="/images/favmovies.jpg"
              header="Filmes favoritos"
              text="Filmes que você ama!"
              btnText="Ver mais..."
            /> */}
            <Card
              image="/images/towatch.jpg"
              header="Filmes para assistir"
              text="Crie listas de filmes para assistir depois"
              btnText="Ver mais..."
              invert
            />
          </>
        )
      }

    </div>
  );
};

export default Movies;
