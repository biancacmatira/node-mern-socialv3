import React, { useState, useCallback } from 'react';
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
// import UpdatePlace from './places-feature/container/UpdatePlace';
import UpdatePlaceFormik from './places-feature/container/UpdatePlaceFormik'
import Auth from './user-feature/container/Auth';
import { AuthContext } from './shared/context/auth-context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  });

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  });

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/:uid/places" exact component={UserPlaces} />
        <Route path="/places/new" exact component={NewPlace} />
        <Route path="/places/:pid" component={UpdatePlaceFormik} />
        <Redirect to="/" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/:uid/places" exact component={UserPlaces} />
        <Route path="/auth" component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    )
  }


  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
      <Router>
        <MainHeader />
          {routes}
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
