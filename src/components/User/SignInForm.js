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
import background from 'assets/img/splashscreen.png';

import Background from 'components/Background/Background';
import { Tabs, TabButton } from 'components/Tabs/Tabs';
import errorMessages from 'constants/errorMessages';
import SignUpForm from './SignUpForm';
import SocialSignin from './SocialSignin';
import ForgotPassword from './ForgotPassword';
import { Container, Box, Divider, StyledSpan } from './User.styled';

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
      setError(errorMessages[error.code]);
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
      <Background
        src={background}
        alt="fundo com a visão de cima de uma cidade com predios altos"
      />
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
            color="primary"
            block
            disabled={loading}
            data-testid="submit-button"
          >
            {loading ? <Spinner color="light" size="sm" /> : 'Entrar'}
          </Button>
        </Form>
        <StyledSpan>
          <button onClick={() => setShowForgotPasswordForm(true)}>
            Esqueceu sua senha?
          </button>
        </StyledSpan>
        <Divider />
        <SocialSignin updateErrorMessage={updateErrorMessage} />
      </Box>
    </Container>
  );
};

export default SignInForm;
