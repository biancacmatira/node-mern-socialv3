import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Users from './user-feature/container/Users';
import NewPlace from './places-feature/container/NewPlace';
import MainHeader from './shared/components/MainHeader';

const App = () => {
  return (
    <Router>
      <MainHeader />
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/places/new" exact component={NewPlace} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
