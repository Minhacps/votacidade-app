import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from 'styles/colors';

const Container = styled.div`
  background: ${colors.purpleDark};
  padding: 20px;
`;
const Heading = styled.h1`
  color: #fff;
  text-align: center;
  font-size: 20px;
`;
const CtaLink = styled(Link)`
  color: #fff;
  border: 1px solid #fff;
  text-align: center;
  border-radius: 10px;
  padding: 8px;
  width: 200px;
  font-weight: 500;
  margin: 15px auto 0;
  display: block;
`;

const SignupCta = () => (
  <Container>
    <Heading>Cadastre-se no Vota e compare!</Heading>
    <CtaLink to="/">Cadastrar</CtaLink>
  </Container>
);

export default SignupCta;
