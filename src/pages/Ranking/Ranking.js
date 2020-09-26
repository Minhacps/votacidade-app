import React, { useContext, useState } from 'react';
import { Container, Button, Spinner } from 'reactstrap';
import { ReactComponent as CandidateSvg } from 'assets/icons/candidate.svg';
import { ReactComponent as DonationSvg } from 'assets/icons/donation.svg';
import { ReactComponent as ShareSvg } from 'assets/icons/share.svg';
import { ReactComponent as FindSvg } from 'assets/icons/find.svg';

import {
  Img,
  PageTitle,
  PageDescription,
  HelpDescription,
  BoxWrapper,
  HelpBox,
  BoxDescription,
  Description,
  Divider,
  CandidateCard,
  CardName,
  CardInfo,
  AffinityTag,
  ProfileLink,
  InfoWrapper,
  ImgPlaceholder,
  ButtonWrapper,
} from './Ranking.styled';
import { MatchesContext } from 'components/MatchesProvider/MatchesProvider';
import { AnswersContext } from 'components/AnswersProvider/AnswersProvider';

export default function Ranking() {
  const [listLimiter, setListlimiter] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const { matches } = useContext(MatchesContext);
  const { answers } = useContext(AnswersContext);
  const hasMoreCandidates = matches.length > listLimiter;
  const candidatesCount =
    listLimiter < matches.length ? listLimiter : matches.length;
  const limitList = (_, index) => index < listLimiter;

  const loadMoreCandidates = async () => {
    setIsLoading(true);
    return setTimeout(() => {
      setListlimiter(listLimiter + 10);
      setIsLoading(false);
    }, 300);
  };

  if (Object.keys(answers).length < 21) {
    return (
      <Container className="py-4">
        <PageTitle>Ranking</PageTitle>
        <p>
          <strong>Eleitor(a)</strong>, para que o índice de afinidade seja
          exibido, lembre-se que você precisa responder no mínimo 21 questões.
        </p>
      </Container>
    );
  }

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
      <Divider />
      <Description>
        <strong>Candidatos(as):</strong> mostrando {candidatesCount} cadastrados
        no Vota de um total de {matches.length}
      </Description>
      {matches.filter(limitList).map((candidate) => (
        <div key={candidate.id} data-testid="candidate-item">
          <CandidateCard>
            {candidate.picture ? (
              <Img
                src={candidate.picture}
                alt={`Foto do candidato ${candidate.name}`}
              />
            ) : (
              <ImgPlaceholder />
            )}
            <InfoWrapper>
              <CardName>{candidate.name}</CardName>
              <CardInfo>
                {candidate.candidateNumber} | {candidate.politicalParty}
              </CardInfo>
              <CardInfo>
                Afinidade: <AffinityTag>{candidate.match / 100}%</AffinityTag>
              </CardInfo>
            </InfoWrapper>
            <ProfileLink>
              <FindSvg />
            </ProfileLink>
          </CandidateCard>
          <Divider />
        </div>
      ))}
      {hasMoreCandidates && (
        <ButtonWrapper>
          <Button
            color="primary"
            onClick={loadMoreCandidates}
            style={{ width: '130px' }}
            disabled={isLoading}
          >
            {isLoading ? <Spinner color="light" size="sm" /> : 'Carregar mais'}
          </Button>
        </ButtonWrapper>
      )}
    </Container>
  );
}
