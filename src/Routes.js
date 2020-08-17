import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import firebase from 'firebase/app';

import CityProvider from 'components/CityProvider/CityProvider';
import Privacidade from 'pages/privacidade';
import cities from './cities';
import BaseApp from './BaseApp';
import HomePage from 'pages/Home';
import FinalPage from 'pages/FinalPage/FinalPage';
import Login from 'pages/Login';
import Signup from 'pages/Signup';

const Routes = () => {
  const [lookingForUser, setLookingForUser] = useState(true);
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setLookingForUser(false);
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (!lookingForUser && user) {
      history.push('/home');
    }
  }, [lookingForUser, user, history]);

  if (lookingForUser) {
    return <p>Carregando...</p>;
  }

  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => {
          return !user ? <Redirect to="/entrar" /> : <Redirect to="/home" />;
        }}
      />

      <Route path="/entrar" exact>
        <Login />
      </Route>

      <Route path="/cadastro" exact>
        <Signup />
      </Route>

      <Route path="/home" exact>
        <CityProvider city={cities[0]}>
          <HomePage />
        </CityProvider>
      </Route>

      <Route path="/privacidade" exact>
        <Privacidade />
      </Route>

      {cities.map((city) => (
        <Route path={`${city.cityPath}/ranking`} key={`${city.cityPath}-route`}>
          <CityProvider city={city}>
            <FinalPage />
          </CityProvider>
        </Route>
      ))}

      {cities.map((city) => (
        <Route path={city.cityPath} key={`${city.cityPath}-route`}>
          <CityProvider city={city}>
            <BaseApp />
          </CityProvider>
        </Route>
      ))}
    </Switch>
  );
};

export default Routes;
