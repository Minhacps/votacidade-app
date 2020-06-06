import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import SignInForm from 'components/Authentication/SignInForm';

import { Container } from 'reactstrap';

import Routes from './Routes';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  if (!user) {
    return <SignInForm />;
  }

  return (
    <Container data-testid="app">
      <Routes />
    </Container>
  );
};

export default App;
