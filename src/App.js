import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import firebase from 'firebase/app';

import PageLoading from 'components/molecules/PageLoading';
import Routes from './Routes';
import Login from './pages/Login';

import './fontawesome';

const App = () => {
  const history = useHistory();
  const location = useLocation();
  const [lookingForUser, setLookingForUser] = useState(true);
  const [user, setUser] = useState(null);
  const [userIncomplete, setUserIncomplete] = useState(true);

  useEffect(() => {
    async function checkUserCollection() {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (!(user && user.uid)) {
          setUser(null);
          return;
        }

        await firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            const userData = snapshot.data();
            setUserIncomplete(userData);
            redirectUserByCity(userData);
          });

        setLookingForUser(false);
        setUser(user);
      });
    }

    // Removido userData.city no teste para eliminar erro.
    const redirectUserByCity = (userData) => {
      if (!userData) {
        return;
      }

      const userFromDifferentCity = !location.pathname.includes(userData.city);

      if (userFromDifferentCity) {
        history.push(`/${userData.city}`);
      }
    };

    checkUserCollection();

    // this useEffect should be executed only once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (lookingForUser) {
    return <PageLoading />;
  }

  if (!user) {
    return <Login />;
  }

  if (user && userIncomplete === undefined) {
    return <Login shouldComplete user={user} />;
  }

  return <Routes user={user} />;
};

export default App;
