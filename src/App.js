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

  return (
    <section data-testid="app">
      <button
        onClick={() => firebase.auth().signOut()}
        data-testid="logout-button"
      >
        Logout
      </button>
      <div>Vota Cidade</div>
    </section>
  );
};

export default App;
