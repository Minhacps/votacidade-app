import React, { useContext, useEffect, useState } from 'react';

import AnswersProvider from 'components/AnswersProvider/AnswersProvider';
import { CityContext } from 'components/CityProvider/CityProvider';
import PageLoading from 'components/molecules/PageLoading';
import Authenticated from 'templates/Authenticated';

import BaseAppRoutes from './BaseAppRoutes';
import { getCustomToken } from './customTokenService';

const BaseApp = ({ user }) => {
  const { firebase, currentUser } = useContext(CityContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signInWithCustomToken = async () => {
    const token = await getCustomToken({
      uid: currentUser.uid,
      projectId: firebase.options.projectId,
    });

    await firebase.auth().signInWithCustomToken(token);

    setIsAuthenticated(true);
  };

  useEffect(() => {
    signInWithCustomToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isAuthenticated) {
    return <PageLoading />;
  }

  return (
    <AnswersProvider user={user} currentUser={currentUser} firebase={firebase}>
      <Authenticated user={user}>
        <BaseAppRoutes user={user} />
      </Authenticated>
    </AnswersProvider>
  );
};

export default BaseApp;
