import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import Questionnaire from 'components/Questionnaire/Questionnaire';
import HomePage from 'pages/Home';
import FinalPage from 'pages/FinalPage/FinalPage';
import ListCandidates from 'pages/ListCandidates/ListCandidates';
import Ranking from 'pages/Ranking/Ranking';
import Profile from 'pages/Profile/Profile';
import MatchesProvider from 'components/MatchesProvider/MatchesProvider';
import { CityContext } from './components/CityProvider/CityProvider';

const BaseAppRoutes = ({ user }) => {
  const { firebase, cityPath, enableRanking } = useContext(CityContext);

  return (
    <Switch>
      <Route path={cityPath} exact>
        <HomePage />
      </Route>
      <Route path={`${cityPath}/questionario`} exact>
        <Questionnaire user={user} />
      </Route>
      <MatchesProvider firebase={firebase}>
        <Route path={`${cityPath}/ranking`} exact>
          {enableRanking ? <Ranking user={user} /> : <FinalPage user={user} />}
        </Route>
        <Route path={`${cityPath}/perfil/:candidateId`}>
          <Profile />
        </Route>
      </MatchesProvider>
      <Route path={`${cityPath}/candidaturas`} exact>
        <ListCandidates firebase={firebase} />
      </Route>
    </Switch>
  );
};

export default BaseAppRoutes;
