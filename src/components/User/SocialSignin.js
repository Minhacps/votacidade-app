import React from 'react';
import firebase from 'firebase/app';
import {
  GoogleLoginButton,
  FacebookLoginButton,
  TwitterLoginButton,
} from 'react-social-login-buttons';
import styled from 'styled-components';
import colors from 'styles/colors';
import { ReactComponent as AnonymousIcon } from 'assets/icons/anonymous.svg';

const buttonStyle = {
  fontSize: '12pt',
  boxShadow: 'none',
  paddingRight: 36,
  width: '100%',
};

const AnonymousButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 12pt;
  height: 50px;
  width: 100%;
  border: none;
  background-color: ${colors.grey500};
  color: white;
  margin: 5px;
  border-radius: 3px;
  padding: 0 10px;
`;

const AnonymousLabel = styled.span`
  display: flex;
  justify-content: center;
  width: 84%;
`;

function SocialSignIn({ updateErrorMessage }) {
  const signInWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');

    signInWithPopup(provider);
  };

  const signInWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    googleProvider.addScope('profile');
    googleProvider.addScope('email');
    signInWithPopup(googleProvider);
  };

  const signInWithTwitter = () => {
    const provider = new firebase.auth.TwitterAuthProvider();

    signInWithPopup(provider);
  };

  const signInWithPopup = (provider) => {
    firebase.auth().signInWithPopup(provider).catch(handleSocialLoginError);
  };

  const handleSocialLoginError = (error) => {
    switch (error.code) {
      case 'auth/account-exists-with-different-credential':
        return updateErrorMessage(
          'Esta conta já foi conectada usando outra rede social. Tente novamente usando outro método de login.',
        );

      case 'auth/popup-blocked':
      case 'auth/popup-closed-by-user':
        return updateErrorMessage(
          'O popup de autorização foi bloqueado ou fechado, tente novamente.',
        );

      case 'auth/cancelled-popup-request':
        return;

      case 'auth/unauthorized-domain':
      case 'auth/operation-not-supported-in-this-environment':
      case 'auth/operation-not-allowed':
      case 'auth/auth-domain-config-required':
      default: {
        console.error(error);
        return updateErrorMessage('Ocorreu um erro inesperado');
      }
    }
  };

  return (
    <div>
      <FacebookLoginButton
        onClick={signInWithFacebook}
        text="Entrar com Facebook"
        style={buttonStyle}
        align="center"
      />
      <GoogleLoginButton
        onClick={signInWithGoogle}
        text="Entrar com Google"
        style={buttonStyle}
        align="center"
      />
      <TwitterLoginButton
        onClick={signInWithTwitter}
        text="Entrar com Twitter"
        style={{ ...buttonStyle }}
        align="center"
      />
      <AnonymousButton onClick={firebase.auth().signInAnonymously}>
        <AnonymousIcon />
        <AnonymousLabel>Entrar anônimo</AnonymousLabel>
      </AnonymousButton>
    </div>
  );
}

export default SocialSignIn;
