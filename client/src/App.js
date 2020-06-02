import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';

import Users from './user-feature/container/Users';
import NewPlace from './places-feature/container/NewPlace';
import MainHeader from './shared/components/MainHeader';
import UserPlaces from './places-feature/container/UserPlaces'

const App = () => {
  return (
    <Router>
      <MainHeader />
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/:uid/places" exact component={UserPlaces} />
        <Route path="/places/new" exact component={NewPlace} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
