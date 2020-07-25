import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import styled from 'styled-components';
import background from 'assets/img/splashscreen.png';

import Background from 'components/Background/Background';

function ForgotPassword({ hideForgotPassword }) {
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
        <Button color="primary" block>
          ENTRAR
        </Button>
        <StyledSpan>
          Já é cadastrado?{' '}
          <button onClick={hideForgotPassword}>CLIQUE AQUI</button>
        </StyledSpan>
      </Box>
    </Container>
  );
}

export default ForgotPassword;
