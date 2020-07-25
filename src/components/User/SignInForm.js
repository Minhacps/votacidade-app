import React, { useState } from 'react';
import firebase from 'firebase/app';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Spinner,
} from 'reactstrap';
import styled from 'styled-components';
import background from 'assets/img/splashscreen.png';

import Background from 'components/Background/Background';
import { Tabs, TabButton } from 'components/Tabs/Tabs';
import SignUpForm from './SignUpForm';
import SocialSignin from './SocialSignin';
import ForgotPassword from './ForgotPassword';

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

  if (showSignUpForm) {
    return <SignUpForm />;
  }

  if (showForgotPasswordForm) {
    return (
      <ForgotPassword
        hideForgotPassword={() => setShowForgotPasswordForm(false)}
      />
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
              disabled={loading}
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
              disabled={loading}
            />
          </FormGroup>
          <Button
            data-testid="submit-button"
            color="primary"
            block
            disabled={loading}
          >
            {loading ? <Spinner color="light" size="sm" /> : 'ENTRAR'}
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
