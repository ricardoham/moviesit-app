import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'pages/Home';
import Movies from 'pages/Movies';
import MoviesDetails from 'pages/Movies/MoviesDetails';
import MyMovies from 'pages/Movies/MyMovies';
import People from 'pages/People';
import Recommendations from 'pages/Recommendations';
import CommunityRecommendations from 'pages/Recommendations/Community';
import MyRecommendations from 'pages/Recommendations/MyRecommendations';
import FormRecommendation from 'pages/Recommendations/MyRecommendations/Form';

const Routes = (): JSX.Element => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/movies" component={Movies} />
    <Route path="/movies/details/:id" component={MoviesDetails} />
    <Route path="/movies/mymovies" component={MyMovies} />
    <Route path="/people" component={People} />
    <Route exact path="/recommendations" component={Recommendations} />
    <Route path="/recommendations/community" component={CommunityRecommendations} />
    <Route path="/recommendations/myrecommendations" component={MyRecommendations} />
    <Route path="/myrecommendations/form" component={FormRecommendation} />
    <Route path="/myrecommendations/form/edit" component={FormRecommendation} />

  </Switch>
);

export default Routes;
