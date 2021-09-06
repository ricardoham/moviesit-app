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
import WaitList from 'pages/Movies/WaitList';
import FormWaitList from 'pages/Movies/WaitList/Form';
import RecommendationDetails from 'pages/Recommendations/Details';
import Profile from 'pages/Profile';
import ProfileEdit from 'pages/Profile/Edit';
import MyPeople from 'pages/People/MyPeople';
import PersonDetails from 'pages/People/PersonDetails';
import AdminDashboard from 'pages/AdminDashboard';

const Routes = (): JSX.Element => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/movies" component={Movies} />
    <Route path="/movies/details/:id" component={MoviesDetails} />
    <Route path="/movies/mymovies" component={MyMovies} />
    <Route path="/movies/waitlist" component={WaitList} />
    <Route path="/waitlist/form" component={FormWaitList} />
    <Route exact path="/people" component={People} />
    <Route path="/people/mypeople" component={MyPeople} />
    <Route path="/people/details/:id" component={PersonDetails} />
    <Route exact path="/recommendations" component={Recommendations} />
    <Route path="/recommendations/community" component={CommunityRecommendations} />
    <Route path="/recommendations/myrecommendations" component={MyRecommendations} />
    <Route path="/recommendations/details" component={RecommendationDetails} />
    <Route path="/myrecommendations/form" component={FormRecommendation} />
    <Route path="/myrecommendations/form/edit" component={FormRecommendation} />
    <Route exact path="/profile" component={Profile} />
    <Route path="/profile/details/:id" component={Profile} />
    <Route exact path="/profile/edit" component={ProfileEdit} />
    <Route exact path="/admin" component={AdminDashboard} />
  </Switch>
);

export default Routes;
