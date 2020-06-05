import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  if (!user) {
    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      const fields = event.target.elements;

      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(
            fields.email.value,
            fields.password.value,
          );
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <div>
        {loading && <span>Carregando...</span>}
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input name="email" id="email" data-testid="email-input" />

          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            data-testid="password-input"
          />

          <button data-testid="submit-button">Submit</button>
        </form>
      </div>
    );
  }

  return <div className="App">Vota Cidade</div>;
};

export default App;
