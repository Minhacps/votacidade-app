import React from 'react';
import { Switch, Route } from 'react-router-dom';
import cities from './cities';
import CityProvider, {
  CityContext,
} from 'components/CityProvider/CityProvider';
import Navigation from 'components/Navigation';

import BaseApp from './BaseApp';

const LandingPage = () => <Navigation />;

const Routes = () => (
  <Switch>
    <Route path="/" exact>
      <LandingPage />
    </Route>

    {cities.map((city) => (
      <Route path={city.path} key={`${city.path}-route`} exact>
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
