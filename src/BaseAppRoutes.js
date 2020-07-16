import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Question from 'components/Question/Question';
import Questions from 'components/Questions/Questions';

const BaseAppRoutes = ({ cityPath }) => {
  return (
    <Switch>
      <Route path={`${cityPath}/questionario`} exact>
        <Questions />
      </Route>
    </Switch>
  );
};

export default BaseAppRoutes;
