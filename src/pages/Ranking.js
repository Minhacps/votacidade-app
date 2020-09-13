import React, { useState } from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';

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

const RatingBox = styled.div`
  margin-top: 12px;
  width: 100%;
  border: 1px solid ${colors.grey100};
  border-radius: 5px;
  box-shadow: 0 0 3px ${colors.grey200};
  padding: 16px 20px;
`;

const RatingHeader = styled.button`
  display: inline-flex;
  width: 100%;
  justify-content: space-between;
  border: none;
  background: transparent;
`;

const RatingTitle = styled.p`
  color: ${colors.purple};
  font-size: 10pt;
  font-weight: 500;
  margin: 0;
`;

const Chevron = styled.div`
  display: inline-block;
  border-right: 3px solid ${colors.grey400};
  border-bottom: 3px solid ${colors.grey400};
  width: 10px;
  height: 10px;
  transform: ${({ isOpen }) =>
    isOpen
      ? 'rotate(-135deg) translateX(-6px)'
      : 'rotate(45deg) translateX(3px)'};
`;

const RatingDescription = styled.p`
  font-size: 10pt;
`;

const RatingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
`;

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
            <RatingDescription>
              Como você avalia sua experiência?
            </RatingDescription>
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
    </Container>
  );
}
