import React from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import colors from 'styles/colors';

const PageTitle = styled.h2`
  color: ${colors.purple};
  font-size: 16pt;
  margin-bottom: 10px;
`;

const PageDescription = styled.p`
  font-size: 12pt;
  line-height: 1.2;
`;

const HelpDescription = styled.p`
  font-size: 12pt;
  font-weight: 500;
`;

export default function Ranking() {
  return (
    <Container className="py-4">
      <PageTitle>Ranking</PageTitle>
      <PageDescription>
        Quanto mais perguntas você responder, mais assertiva vai ser a
        porcentagem de afinidade! Ah, você pode filtrar os candidatos, ver o
        perfil e as respostas de cada um.
      </PageDescription>
      <HelpDescription>Gostou e quer ajudar o projeto?</HelpDescription>
    </Container>
  );
}
