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

import { Tabs, TabButton } from 'components/Tabs/Tabs';
import errorMessages from 'constants/errorMessages';
import SocialSignin from './SocialSignin';
import { Box, Divider, StyledSpan } from './User.styled';

const SignInForm = ({
  updateErrorMessage,
  setShowForgotPasswordForm,
  onSignupClick,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  return (
    <Box>
      <Tabs>
        <TabButton active disabled>
          ✓ Entrar
        </TabButton>
        <TabButton onClick={onSignupClick} data-testid="signup-button">
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
  );
};

export default SignInForm;
