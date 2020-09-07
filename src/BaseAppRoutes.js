import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Questions from 'components/Questions/Questions';
import HomePage from 'pages/Home';

const BaseAppRoutes = ({ cityPath, user }) => {
  return (
    <Switch>
      <Route path={cityPath} exact>
        <HomePage />
      </Route>
      <Route path={`${cityPath}/questionario`} exact>
        <Questions user={user} />
      </Route>
    </Switch>
  );
};

export default BaseAppRoutes;
