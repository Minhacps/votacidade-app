import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Questions from 'components/Questions/Questions';
import HomePage from 'pages/Home';
// import FinalPage from 'pages/FinalPage/FinalPage';
import Ranking from 'pages/Ranking/Ranking';

const BaseAppRoutes = ({ cityPath, user }) => {
  return (
    <Switch>
      <Route path={cityPath} exact>
        <HomePage />
      </Route>
      <Route path={`${cityPath}/questionario`} exact>
        <Questions user={user} />
      </Route>
      <Route path={`${cityPath}/ranking`} exact>
        <Ranking user={user} />
        {/* <FinalPage /> */}
      </Route>
    </Switch>
  );
};

export default BaseAppRoutes;
