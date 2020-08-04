import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CityProvider from 'components/CityProvider/CityProvider';
import LandingPage from 'components/LadingPage';
import Privacidade from '../src/pages/privacidade';
import cities from './cities';
import BaseApp from './BaseApp';

const Routes = () => (
  <Switch>
    <Route path="/" exact>
      <LandingPage />
    </Route>

    <Route path="/privacidade" exact>
      <Privacidade />
    </Route>

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
