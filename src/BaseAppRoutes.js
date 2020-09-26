import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Questionnaire from 'components/Questionnaire/Questionnaire';
import HomePage from 'pages/Home';
// import FinalPage from 'pages/FinalPage/FinalPage';
import Ranking from 'pages/Ranking/Ranking';

const BaseAppRoutes = ({ cityPath, user }) => (
  <Switch>
    <Route path={cityPath} exact>
      <HomePage />
    </Route>
    <Route path={`${cityPath}/questionario`} exact>
      <Questionnaire user={user} />
    </Route>
    <Route path={`${cityPath}/ranking`} exact>
      <Ranking user={user} />
      {/* <FinalPage user={user} /> */}
    </Route>
  </Switch>
);

export default BaseAppRoutes;
