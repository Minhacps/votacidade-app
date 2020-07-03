import React, { useState } from 'react';
import firebase from 'firebase/app';
import SignUpForm from './SignUpForm';

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const fields = event.target.elements;

    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(fields.email.value, fields.password.value);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    googleProvider.addScope('profile');
    googleProvider.addScope('email');

    firebase.auth().signInWithPopup(googleProvider);
  };

  if (loading) {
    return <span data-testid="signup-loader">Carregando...</span>;
  }

  if (showSignUpForm) {
    return <SignUpForm />;
  }

  return (
    <div>
      <h1>Entrar</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input name="email" id="email" data-testid="email-input" />

        <label htmlFor="password">Senha</label>
        <input
          name="password"
          id="password"
          type="password"
          data-testid="password-input"
        />

        <button data-testid="submit-button">Entrar</button>
      </form>

      <div>
        <button onClick={signInWithGoogle}>Entrar com Google</button>
        <button
          onClick={() => setShowSignUpForm(true)}
          data-testid="signup-button"
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
};

export default SignInForm;
