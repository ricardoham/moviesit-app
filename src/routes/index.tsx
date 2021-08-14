import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'pages/Home';
import Movies from 'pages/Movies';
import MoviesDetails from 'pages/Movies/MoviesDetails';
import MyMovies from 'pages/Movies/MyMovies';

const Routes = (): JSX.Element => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/movies" component={Movies} />
    <Route path="/movies/details/:id" component={MoviesDetails} />
    <Route path="/movies/mymovies" component={MyMovies} />
  </Switch>
);

export default Routes;
