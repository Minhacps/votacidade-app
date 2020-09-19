import React, { useState } from 'react';
import { Container, Button, Spinner } from 'reactstrap';
import StarRatings from 'react-star-ratings';
import colors from 'styles/colors';
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
  RatingBox,
  RatingHeader,
  RatingTitle,
  Chevron,
  Description,
  RatingWrapper,
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
import candidates from './rankingMock';

export default function Ranking() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(3);
  const [listLimiter, setListlimiter] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const hasMoreCandidates = candidates.length > listLimiter;
  const candidatesCount =
    listLimiter < candidates.length ? listLimiter : candidates.length;
  const limitList = (_, index) => index < listLimiter;

  const toggle = () => setIsOpen(!isOpen);

  const loadMoreCandidates = async () => {
    setIsLoading(true);
    return setTimeout(() => {
      setListlimiter(listLimiter + 10);
      setIsLoading(false);
    }, 300);
  };

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
      <RatingBox>
        <RatingHeader onClick={toggle}>
          <RatingTitle>Avalie como foi sua experiência</RatingTitle>
          <Chevron isOpen={isOpen} />
        </RatingHeader>
        {isOpen && (
          <RatingWrapper>
            <Description>Como você avalia sua experiência?</Description>
            <StarRatings
              rating={rating}
              starRatedColor={colors.orangeLight}
              changeRating={setRating}
              numberOfStars={5}
              name="rating"
              starHoverColor={colors.orangeLight}
              starDimension="40px"
            />
          </RatingWrapper>
        )}
      </RatingBox>
      <Divider />
      <Description>
        <strong>Candidatos(as):</strong> mostrando {candidatesCount} cadastrados
        no Vota de um total de {candidates.length}
      </Description>
      {candidates.filter(limitList).map((candidate, index) => (
        <div key={index} data-testid="candidate-item">
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
                Afinidade: <AffinityTag>{candidate.match}%</AffinityTag>
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
