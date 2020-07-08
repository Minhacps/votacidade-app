import React, { useState } from 'react';
import firebase from 'firebase/app';
import SignUpForm from './SignUpForm';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { TwitterLoginButton } from 'react-social-login-buttons';

const buttonStyle = {
  fontSize: '12px',
  textTransform: 'uppercase',
  marginRight: 0,
  marginLeft: 0,
  boxShadow: 'none',
  width: 180,
};

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
  var token = '800755557699174400-QK82XihmtAhpiN9PQCAvOJxy8N0T3uP';
  var secret = 'LLxvbkswVKWbkWJYwtucOM4u381aVtneBHxDQXrbJWye9';

  const signInWithTwitter = () => {
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        var token = '800755557699174400-QK82XihmtAhpiN9PQCAvOJxy8N0T3uP';
        var secret = 'LLxvbkswVKWbkWJYwtucOM4u381aVtneBHxDQXrbJWye9';
        // The signed-in user info.
        var user = result.user;
        // ...
      });
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
        <GoogleLoginButton
          onClick={signInWithGoogle}
          text="Entrar com google"
          style={buttonStyle}
        />
        <TwitterLoginButton
          onClick={signInWithTwitter}
          text="Entrar com Twitter"
          style={buttonStyle}
        />
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
