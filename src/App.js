import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import firebase from 'firebase/app';

import Routes from './Routes';
import Login from './pages/Login';

import './fontawesome';

import PageLoading from 'components/molecules/PageLoading';

const App = () => {
  const history = useHistory();
  const location = useLocation();
  const [lookingForUser, setLookingForUser] = useState(true);
  const [user, setUser] = useState(null);
  const [userIncompleted, setUserIncompleted] = useState(true);

  useEffect(() => {
    async function checkUserCollection() {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user && user.uid) {
          await firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .onSnapshot((snapshot) => {
              const userData = snapshot.data();
              setUserIncompleted(userData);
              redirectUserByCity(userData);
            });
        }
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
  }, []);

  if (lookingForUser) {
    return <PageLoading />;
  }

  if (!user) {
    return <Login />;
  }

  if (user && userIncompleted === undefined) {
    return <Login shouldComplete user={user} />;
  }

  return <Routes user={user} />;
};

export default App;
