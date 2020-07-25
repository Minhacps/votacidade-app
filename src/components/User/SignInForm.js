import React, { useState } from 'react';
import firebase from 'firebase/app';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import styled from 'styled-components';
import background from 'assets/img/splashscreen.png';
import { ReactComponent as Logo } from 'assets/img/vota-cidade.svg';

import Background from 'components/Background/Background';
import { Tabs, TabButton } from 'components/Tabs/Tabs';
import SignUpForm from './SignUpForm';
import SocialSignin from './SocialSignin';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: 350px;
  margin: auto;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
`;

const Box = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
`;

const Divider = styled.hr`
  border-top: 1px solid #6e6e6e;
`;

const StyledSpan = styled.span`
  font-size: 10pt;
  color: #707070;
  display: block;
  text-align: center;
  margin: 15px 0px 25px;

  button {
    color: #662d91;
    font-weight: 500;
    border: none;
    background: transparent;
    padding: 0;
  }
`;

const StyledSplashScreen = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignInForm = ({ updateErrorMessage }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const fields = event.target.elements;

    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(fields.email.value, fields.password.value);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <StyledSplashScreen>
        <Logo />
        <Background src={background} data-testid="signup-loader" />
      </StyledSplashScreen>
    );
  }

  if (showSignUpForm) {
    return <SignUpForm />;
  }

  if (showForgotPasswordForm) {
    return (
      <Container>
        <Background src={background} />
        <Box>
          <h2>Ajuda para recuperar a senha</h2>
          <h3>
            Digite seu e-mail para recuperar sua senha. Você receberá um e-mail
            com instruções.
          </h3>
          <FormGroup>
            <Label htmlFor="email">E-mail</Label>
            <Input
              name="email"
              id="email"
              data-testid="email-input"
              placeholder="Digite seu e-mail"
            />
          </FormGroup>
          <Button color="primary" block>
            ENTRAR
          </Button>
          <StyledSpan>
            Esqueceu sua senha?{' '}
            <button onClick={() => setShowForgotPasswordForm(true)}>
              CLIQUE AQUI
            </button>
          </StyledSpan>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Background src={background} />
      <Box>
        <Tabs>
          <TabButton active disabled>
            ✓ Entrar
          </TabButton>
          <TabButton
            onClick={() => setShowSignUpForm(true)}
            data-testid="signup-button"
          >
            Cadastrar
          </TabButton>
        </Tabs>
        <Form onSubmit={handleSubmit}>
          {error && <Alert color="danger">{error}</Alert>}
          <FormGroup>
            <Label htmlFor="email">E-mail</Label>
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
        <StyledSpan>
          Esqueceu sua senha?{' '}
          <button onClick={() => setShowForgotPasswordForm(true)}>
            CLIQUE AQUI
          </button>
        </StyledSpan>
        <Divider />
        <SocialSignin updateErrorMessage={updateErrorMessage} />
      </Box>
    </Container>
  );
};

export default SignInForm;
