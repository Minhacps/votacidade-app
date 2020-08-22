import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase/app';

import Routes from './Routes';
import Login from './pages/Login';

const App = () => {
  const [lookingForUser, setLookingForUser] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setLookingForUser(false);
      setUser(user);
    });
  }, []);

  if (lookingForUser) {
    return <p>Carregando...</p>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
