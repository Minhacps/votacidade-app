import React, { useState } from 'react';
import { Container, Button } from 'reactstrap';
import StarRatings from 'react-star-ratings';
import colors from 'styles/colors';
import { ReactComponent as CandidateSvg } from 'assets/icons/candidate.svg';
import { ReactComponent as DonationSvg } from 'assets/icons/donation.svg';
import { ReactComponent as ShareSvg } from 'assets/icons/share.svg';
import { ReactComponent as FindSvg } from 'assets/icons/find.svg';

import {
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

const candidatesMock = [
  {
    name: 'John Doe',
    party: 'PARTIDO',
    number: '99',
    affinity: '95',
  },
  {
    name: 'Jane Doe',
    party: 'PARTIDO',
    number: '99',
    affinity: '92',
  },
];

export default function Ranking() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(3);

  const toggle = () => setIsOpen(!isOpen);

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
        <strong>Candidatos(as):</strong> mostrando 9999 cadastrados no Vota de
        um total de 9999
      </Description>
      <Description>
        <strong>Partidos:</strong> mostrando 99 cadastrados no Vota de um total
        de 99
      </Description>
      {candidatesMock.map((candidate, index) => (
        <div key={index}>
          <CandidateCard>
            <ImgPlaceholder>Foto</ImgPlaceholder>
            <InfoWrapper>
              <CardName>{candidate.name}</CardName>
              <CardInfo>
                {candidate.number} | {candidate.party}
              </CardInfo>
              <CardInfo>
                Afinidade: <AffinityTag>{candidate.affinity}%</AffinityTag>
              </CardInfo>
            </InfoWrapper>
            <ProfileLink>
              <FindSvg />
            </ProfileLink>
          </CandidateCard>
          <Divider />
        </div>
      ))}
      <ButtonWrapper>
        <Button color="primary">CARREGAR MAIS</Button>
      </ButtonWrapper>
    </Container>
  );
}
