import React, { useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import firebase from 'firebase/app';

import CityProvider from 'components/CityProvider/CityProvider';
import Privacidade from 'pages/privacidade';
import cities from './cities';
import BaseApp from './BaseApp';

const Routes = ({ user }) => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot((snapshot) => {
        const userData = snapshot.data();
        if (userData && userData.city && location.pathname === '/') {
          history.push(`/${userData.city}`);
        }
      });
  }, [history, location.pathname, user]);

  return (
    <Switch>
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
};

export default Routes;
