import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import styled from 'styled-components';
import background from 'assets/img/splashscreen.png';

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
      <Background
        src={background}
        alt="fundo com a visão de cima de uma cidade com predios altos"
      />
      <Box>
        <Title>Esqueceu sua senha?</Title>
        <Subtitle>
          Não se preocupe. Basta confirmar seu e-mail que enviaremos as
          instruções para você redefinir sua senha.
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

        <Button color="primary" block>
          Enviar
        </Button>

        <StyledSpan>
          <button onClick={hideForgotPassword}>Já é cadastrado?</button>
        </StyledSpan>
      </Box>
    </Container>
  );
}

export default ForgotPassword;
