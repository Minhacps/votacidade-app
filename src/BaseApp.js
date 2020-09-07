import React, { useState, useEffect, useContext } from 'react';
import firebase from 'firebase/app';
import { CityContext } from 'components/CityProvider/CityProvider';
import BaseAppRoutes from './BaseAppRoutes';
import Authenticated from 'templates/Authenticated';

const BaseApp = () => {
  const { currentUser, cityPath } = useContext(CityContext);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(currentUser.uid)
      .onSnapshot((snapshot) => {
        const userData = snapshot.data();
        setUser(userData);
        setIsLoading(false);
      });
  }, [currentUser]);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <Authenticated user={user}>
      <BaseAppRoutes cityPath={cityPath} user={user} />
    </Authenticated>
  );
};

export default BaseApp;
