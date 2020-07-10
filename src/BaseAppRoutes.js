import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Question from 'components/Question/Question';

const BaseAppRoutes = ({ cityPath }) => {
  return (
    <Switch>
      <Route path={`${cityPath}/questionario`} exact>
        <Question />
      </Route>
    </Switch>
  );
};

export default BaseAppRoutes;
