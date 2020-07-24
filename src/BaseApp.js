import React, { useState, useEffect, useContext } from 'react';
import { CityContext } from 'components/CityProvider/CityProvider';
import CompleteSignup from 'components/User/CompleteSignup';
import Navigation from 'components/Navigation';
import BaseAppRoutes from './BaseAppRoutes';

const BaseApp = () => {
  const { firebase, currentUser, cityPath } = useContext(CityContext);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(currentUser.uid)
      .onSnapshot((snapshot) => {
        setIsLoading(false);
        const userData = snapshot.data();
        setUser(userData);
      });
  }, [firebase, currentUser]);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (!user) {
    return <CompleteSignup firebase={firebase} currentUser={currentUser} />;
  }

  return (
    <>
      <Navigation />

      <BaseAppRoutes cityPath={cityPath} />
    </>
  );
};

export default BaseApp;
