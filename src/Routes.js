import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CityProvider from 'components/CityProvider/CityProvider';
import Privacidade from 'pages/privacidade';
import cities from './cities';
import BaseApp from './BaseApp';
import FinalPage from 'pages/FinalPage/FinalPage';

const Routes = ({ user }) => (
  <Switch>
    <Route path="/privacidade" exact>
      <Privacidade />
    </Route>

    {cities.map((city) => (
      <Route path={`${city.cityPath}/ranking`} key={`${city.cityPath}-route`}>
        <CityProvider city={city}>
          <FinalPage user={user} />
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
