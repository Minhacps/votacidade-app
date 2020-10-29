import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation, Route, Switch } from 'react-router-dom';
import { AuthenticationContext } from './AuthenticationProvider';

import Routes from './Routes';
import Login from './pages/Login';
import PublicProfile from 'pages/Profile/PublicProfile';

import './fontawesome';

const App = () => {
  const history = useHistory();
  const location = useLocation();
  const { authUser, userData } = useContext(AuthenticationContext);

  useEffect(() => {
    const redirectUserByCity = (userData) => {
      if (!userData) {
        return;
      }

      const userFromDifferentCity = !location.pathname.includes(userData.city);

      if (userFromDifferentCity) {
        history.push(`/${userData.city}`);
      }
    };

    redirectUserByCity(userData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  if (!authUser) {
    return (
      <Switch>
        <Route path="/:cityPath/perfil/:candidateId">
          <PublicProfile />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    );
  }

  if (authUser && !userData) {
    return <Login shouldComplete user={authUser} />;
  }

  return <Routes user={userData} />;
};

export default App;
