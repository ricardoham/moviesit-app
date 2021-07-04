import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'pages/Home';
import Movies from 'pages/Movies';

const Routes = (): JSX.Element => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/filmes" component={Movies} />
  </Switch>
);

export default Routes;
