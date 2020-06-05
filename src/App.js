import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import SignInForm from 'components/Authentication/SignInForm';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  if (!user) {
    return <SignInForm />;
  }

  return <div>Vota Cidade</div>;
};

export default App;
