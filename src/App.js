import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import SignUpForm from 'components/Authentication/SignUpForm';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  if (!user) {
    return <SignUpForm />;
  }

  return <div>Vota Cidade</div>;
};

export default App;
