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
import ProtectedRoute from './ProtectedRoute';

const Routes = (): JSX.Element => (
  <Switch>
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/movies" component={Movies} />
    <ProtectedRoute path="/movies/details/:id" component={MoviesDetails} />
    <ProtectedRoute path="/movies/mymovies" component={MyMovies} />
    <ProtectedRoute path="/movies/waitlist" component={WaitList} />
    <ProtectedRoute path="/waitlist/form" component={FormWaitList} />
    <ProtectedRoute exact path="/people" component={People} />
    <ProtectedRoute path="/people/mypeople" component={MyPeople} />
    <ProtectedRoute path="/people/details/:id" component={PersonDetails} />
    <ProtectedRoute exact path="/recommendations" component={Recommendations} />
    <ProtectedRoute path="/recommendations/community" component={CommunityRecommendations} />
    <ProtectedRoute path="/recommendations/myrecommendations" component={MyRecommendations} />
    <ProtectedRoute path="/recommendations/details" component={RecommendationDetails} />
    <ProtectedRoute path="/myrecommendations/form" component={FormRecommendation} />
    <ProtectedRoute path="/myrecommendations/form/edit" component={FormRecommendation} />
    <ProtectedRoute exact path="/profile" component={Profile} />
    <ProtectedRoute path="/profile/details/:id" component={Profile} />
    <ProtectedRoute exact path="/profile/edit" component={ProfileEdit} />
    <ProtectedRoute exact path="/admin" component={AdminDashboard} />
  </Switch>
);

export default Routes;
