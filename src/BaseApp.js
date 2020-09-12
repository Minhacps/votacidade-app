import React, { useState, useEffect, useContext } from 'react';
import firebaseAuth from 'firebase/app';
import { CityContext } from 'components/CityProvider/CityProvider';
import BaseAppRoutes from './BaseAppRoutes';
import Authenticated from 'templates/Authenticated';
import { getCustomToken } from './customTokenService';

import PageLoading from 'components/molecules/PageLoading';

const BaseApp = () => {
  const { firebase, currentUser, cityPath } = useContext(CityContext);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (process.env.REACT_APP_FIREBASE_ENV === 'prod') {
      getCustomToken({ uid: currentUser.uid, cityPath })
        .then((token) => {
          firebase
            .auth()
            .signInWithCustomToken(token)
            .then(() => {
              firebaseAuth
                .firestore()
                .collection('users')
                .doc(currentUser.uid)
                .onSnapshot((snapshot) => {
                  const userData = snapshot.data();
                  setUser(userData);
                  setIsLoading(false);
                });
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(console.log);
      return;
    }

    firebaseAuth
      .firestore()
      .collection('users')
      .doc(currentUser.uid)
      .onSnapshot((snapshot) => {
        const userData = snapshot.data();
        setUser(userData);
        setIsLoading(false);
      });
  }, [cityPath, currentUser.uid, firebase]);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <Authenticated user={user}>
      <BaseAppRoutes cityPath={cityPath} user={user} />
    </Authenticated>
  );
};

export default BaseApp;
