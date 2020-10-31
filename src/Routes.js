import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CityProvider from 'components/CityProvider/CityProvider';
import Privacidade from 'pages/privacidade';
import cities from './cities';
import BaseApp from './BaseApp';
import SelectCity from 'components/User/SelectCity';

const Routes = ({ user }) => (
  <Switch>
    <Route path="/privacidade" exact>
      <Privacidade />
    </Route>

    <Route path="/selecionar-cidade" exact>
      <SelectCity />
    </Route>

    {cities.map((city) => (
      <Route path={city.cityPath} key={`${city.cityPath}-route`}>
        <CityProvider city={city}>
          <BaseApp user={user} />
        </CityProvider>
      </Route>
    ))}
  </Switch>
);

export default Routes;
