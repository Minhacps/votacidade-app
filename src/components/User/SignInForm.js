import React, { useState } from 'react';
import firebase from 'firebase/app';
import SignUpForm from './SignUpForm';
import {
  GoogleLoginButton,
  FacebookLoginButton,
} from 'react-social-login-buttons';
import { TwitterLoginButton } from 'react-social-login-buttons';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import styled from 'styled-components';
import background from 'assets/img/splashscreen.png';

const buttonStyle = {
  fontSize: '12px',
  marginRight: 0,
  marginLeft: 0,
  boxShadow: 'none',
  width: '100%',
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: 350px;
  margin: auto;
  justify-content: center;
`;

const Background = styled.img`
  min-height: 100%;
  min-width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Box = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
`;

const Divider = styled.hr`
  border-top: 1px solid #6e6e6e;
`;

const SignInForm = (props) => {
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
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (userCredential) => {
        const { uid, displayName, email } = userCredential.user;
      })
      .catch(handleSocialLoginError);
  };

  const handleSocialLoginError = (error) => {
    switch (error.code) {
      case 'auth/account-exists-with-different-credential':
        return props.updateErrorMessage(
          'Esta conta já foi conectada usando outra rede social. Tente novamente usando outro método de login.',
        );

      case 'auth/popup-blocked':
      case 'auth/popup-closed-by-user':
        return props.updateErrorMessage(
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
        return props.updateErrorMessage('Ocorreu um erro inesperado');
      }
    }
  };

  if (loading) {
    return <span data-testid="signup-loader">Carregando...</span>;
  }

  if (showSignUpForm) {
    return <SignUpForm />;
  }

  return (
    <Container>
      <Background src={background} />
      <Box>
        <h1>Entrar</h1>
        <button
          onClick={() => setShowSignUpForm(true)}
          data-testid="signup-button"
        >
          Cadastrar
        </button>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              id="email"
              data-testid="email-input"
              placeholder="Digite seu e-mail"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Senha</Label>
            <Input
              name="password"
              id="password"
              type="password"
              data-testid="password-input"
              placeholder="Digite sua senha"
            />
          </FormGroup>
          <Button data-testid="submit-button" color="primary" block>
            ENTRAR
          </Button>
        </Form>
        Esqueceu sua senha? <a href="#">Clique aqui</a>
        <Divider />
        <div>
          <FacebookLoginButton
            onClick={signInWithFacebook}
            text="Entrar com Facebook"
            style={buttonStyle}
          />
          <GoogleLoginButton
            onClick={signInWithGoogle}
            text="Entrar com Google"
            style={buttonStyle}
          />
          <TwitterLoginButton
            onClick={signInWithTwitter}
            text="Entrar com Twitter"
            style={buttonStyle}
          />
        </div>
      </Box>
    </Container>
  );
};

export default SignInForm;
