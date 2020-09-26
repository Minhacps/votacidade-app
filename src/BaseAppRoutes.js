import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Questionnaire from 'components/Questionnaire/Questionnaire';
import HomePage from 'pages/Home';
// import FinalPage from 'pages/FinalPage/FinalPage';
import Ranking from 'pages/Ranking/Ranking';
import MatchesProvider from 'components/MatchesProvider/MatchesProvider';

const BaseAppRoutes = ({ cityPath, user, firebase }) => (
  <Switch>
    <Route path={cityPath} exact>
      <HomePage />
    </Route>
    <Route path={`${cityPath}/questionario`} exact>
      <Questionnaire user={user} />
    </Route>
    <MatchesProvider firebase={firebase}>
      <Route path={`${cityPath}/ranking`} exact>
        <Ranking user={user} />
        {/* <FinalPage user={user} /> */}
      </Route>
    </MatchesProvider>
  </Switch>
);

export default BaseAppRoutes;
