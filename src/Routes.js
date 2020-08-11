import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CityProvider from 'components/CityProvider/CityProvider';
import LandingPage from 'components/LadingPage';
import Privacidade from '../src/pages/privacidade';
import cities from './cities';
import BaseApp from './BaseApp';
import HomePage from 'pages/Home';
import FinalPage from 'pages/FinalPage/FinalPage';

const Routes = () => (
  <Switch>
    <Route path="/" exact>
      <LandingPage />
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

export default Routes;
