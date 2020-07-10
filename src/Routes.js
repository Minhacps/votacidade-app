import React from 'react';
import { Switch, Route } from 'react-router-dom';
import cities from './cities';
import CityProvider, {
  CityContext,
} from 'components/CityProvider/CityProvider';

import BaseApp from './BaseApp';
import LandingPage from 'components/LadingPage';

const Routes = () => (
  <Switch>
    <Route path="/" exact>
      <LandingPage />
    </Route>

    {cities.map((city) => (
      <Route path={city.cityPath} key={`${city.cityPath}-route`}>
        <CityProvider city={city}>
          <CityContext.Consumer>
            {(props) => <BaseApp {...props} />}
          </CityContext.Consumer>
        </CityProvider>
      </Route>
    ))}
  </Switch>
);

export default Routes;
