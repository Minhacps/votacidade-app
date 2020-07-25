import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import styled from 'styled-components';
import background from 'assets/img/splashscreen.png';

import { PrimaryButton } from 'components/Button/Button.styled';
import Background from 'components/Background/Background';
import { Container, Box, StyledSpan } from './User.styled';

function ForgotPassword({ hideForgotPassword }) {
  const Title = styled.h2`
    font-size: 20px;
    color: #662d91;
  `;

  const Subtitle = styled.p`
    font-size: 14px;
    margin-bottom: 15px;
  `;

  return (
    <Container>
      <Background src={background} />
      <Box>
        <Title>Ajuda para recuperar a senha</Title>
        <Subtitle>
          Digite seu e-mail para recuperar sua senha. Você receberá um e-mail
          com instruções.
        </Subtitle>
        <FormGroup>
          <Label htmlFor="email">E-mail</Label>
          <Input
            name="email"
            id="email"
            data-testid="email-input"
            placeholder="Digite seu e-mail"
          />
        </FormGroup>
        <PrimaryButton block>ENTRAR</PrimaryButton>
        <StyledSpan>
          Já é cadastrado?{' '}
          <button onClick={hideForgotPassword}>CLIQUE AQUI</button>
        </StyledSpan>
      </Box>
    </Container>
  );
}

export default ForgotPassword;
