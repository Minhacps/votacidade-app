import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase/app';
import { Container } from 'reactstrap';

import SignInForm from './components/User/SignInForm';
import Routes from './Routes';

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
    return <SignInForm />;
  }

  return (
    <Container data-testid="app">
      <Router>
        <Routes />
      </Router>
    </Container>
  );
};

export default App;
