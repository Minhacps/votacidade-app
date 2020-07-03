import React, { useState, useEffect } from 'react';

import CompleteSignup from './components/User/CompleteSignup';

const BaseApp = ({ name, firebase, currentUser }) => {
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

  return <span>{name}</span>;
};

export default BaseApp;
