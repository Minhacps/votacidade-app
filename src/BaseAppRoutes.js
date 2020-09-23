import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Questions from 'components/Questions/Questions';
import HomePage from 'pages/Home';
import FinalPage from 'pages/FinalPage/FinalPage';
import ListCandidates from 'pages/ListCandidates/ListCandidates';

const BaseAppRoutes = ({ cityPath, user, firebase }) => (
  <Switch>
    <Route path={cityPath} exact>
      <HomePage />
    </Route>
    <Route path={`${cityPath}/questionario`} exact>
      <Questions user={user} />
    </Route>
    <Route path={`${cityPath}/ranking`} exact>
      <FinalPage user={user} />
    </Route>
    <Route path={`${cityPath}/candidatos`} exact>
      <ListCandidates firebase={firebase} />
    </Route>
  </Switch>
);

export default BaseAppRoutes;
