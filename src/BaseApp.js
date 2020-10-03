import React, { useContext, useEffect, useState } from 'react';

import AnswersProvider from 'components/AnswersProvider/AnswersProvider';
import { CityContext } from 'components/CityProvider/CityProvider';
import PageLoading from 'components/molecules/PageLoading';
import Authenticated from 'templates/Authenticated';

import BaseAppRoutes from './BaseAppRoutes';
import { getCustomToken } from './customTokenService';

const BaseApp = ({ user }) => {
  const { firebase, currentUser } = useContext(CityContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    signInWithCustomToken();

    // this useEffect should be executed only once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signInWithCustomToken = async () => {
    const token = await getCustomToken({
      uid: currentUser.uid,
      projectId: firebase.options.projectId,
    });

    firebase
      .auth()
      .signInWithCustomToken(token)
      .then(() => setIsLoading(false));
  };

  if (isLoading) {
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
