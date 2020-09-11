import React from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import colors from 'styles/colors';
import { ReactComponent as CandidateSvg } from 'assets/icons/candidate.svg';
import { ReactComponent as DonationSvg } from 'assets/icons/donation.svg';
import { ReactComponent as ShareSvg } from 'assets/icons/share.svg';

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

const BoxWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 12px;
`;

const HelpBox = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${colors.grey100};
  border-radius: 5px;
  padding: 13px 15px;
  box-shadow: 0 0 3px ${colors.grey200};
`;

const BoxDescription = styled.p`
  font-size: 9pt;
  font-weight: 500;
  color: ${colors.purple};
  line-height: 1;
  margin-top: 10px;
  margin-bottom: 0;
  text-align: center;
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
      <BoxWrapper>
        <HelpBox href="#">
          <DonationSvg />
          <BoxDescription>Nos ajude a existir, doe!</BoxDescription>
        </HelpBox>
        <HelpBox href="#">
          <ShareSvg />
          <BoxDescription>Compartilhe com amigos</BoxDescription>
        </HelpBox>
        <HelpBox href="#">
          <CandidateSvg />
          <BoxDescription>Pressione um candidato</BoxDescription>
        </HelpBox>
      </BoxWrapper>
    </Container>
  );
}
