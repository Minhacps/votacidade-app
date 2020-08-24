import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase/app';

import Routes from './Routes';
import Login from './pages/Login';

const App = () => {
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
            });
        }
        setLookingForUser(false);
        setUser(user);
      });
    }

    checkUserCollection();
  }, []);

  if (lookingForUser) {
    return <p>Carregando...</p>;
  }

  if (!user) {
    return <Login />;
  }

  if (user && userIncompleted === undefined) {
    return <Login shouldComplete user={user} />;
  }

  return (
    <Router>
      <Routes user={user} />
    </Router>
  );
};

export default App;
