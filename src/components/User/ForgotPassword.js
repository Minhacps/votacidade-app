import React, { useState } from 'react';
import { Button, FormGroup, Label, Input, Form, Alert } from 'reactstrap';
import styled from 'styled-components';
import background from 'assets/img/splashscreen.png';
import firebase from 'firebase/app';

import errorMessages from 'constants/errorMessages';
import colors from 'styles/colors';
import Background from 'components/Background/Background';
import { Container, Box, StyledSpan } from './User.styled';

const Title = styled.h2`
  font-size: 20px;
  color: ${colors.purple};
`;

const Subtitle = styled.p`
  font-size: 14px;
  margin-bottom: 15px;
`;

function ForgotPassword({ hideForgotPassword }) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().sendPasswordResetEmail(event.target.email.value);
      setError('');
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      setError(errorMessages[error.code]);
    }
  };

  return (
    <Container>
      <Background
        src={background}
        alt="fundo com a visão de cima de uma cidade com predios altos"
      />
      <Box>
        <Title>Ajuda para recuperar a senha</Title>
        <Subtitle>
          Digite seu e-mail para recuperar sua senha. Você receberá um e-mail
          com instruções.
        </Subtitle>
        <Form onSubmit={handleSubmit}>
          {error && <Alert color="danger">{error}</Alert>}
          {success && (
            <Alert color="success">
              Uma solicitação foi enviada ao seu e-mail para alterar sua senha.
            </Alert>
          )}
          <FormGroup>
            <Label htmlFor="email">E-mail</Label>
            <Input
              name="email"
              id="email"
              data-testid="email-input"
              placeholder="Digite seu e-mail"
            />
          </FormGroup>

          <Button color="primary" block type="submit">
            Enviar
          </Button>
        </Form>

        <StyledSpan>
          <button onClick={hideForgotPassword}>Já é cadastrado?</button>
        </StyledSpan>
      </Box>
    </Container>
  );
}

export default ForgotPassword;
