import React, { useState } from 'react';
import {
  RatingHeader,
  RatingBox,
  RatingTitle,
  RatingWrapper,
  Chevron,
  Description,
} from './Ranking.styled';
import { ReactComponent as RatingIcon } from 'assets/icons/rating.svg';
import styled from 'styled-components';
import { Button, Input, Label } from 'reactstrap';

const StyledRatingIcon = styled(RatingIcon)`
  margin: 0 5px 15px;
  cursor: pointer;

  rect {
    fill: ${({ active }) => (active ? '#fbb040' : '#C9C9C9')};
  }
`;

export default function Rating() {
  const [isOpen, setIsOpen] = useState(false);
  const [stars, setStars] = useState([
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
  ]);
  const hasRating = stars.some(({ active }) => active === true);

  const toggle = () => setIsOpen(!isOpen);

  const handleRatingChange = (starIndex) => {
    const starsArray = stars.map((_, index) => ({
      active: starIndex + 1 > index ? true : false,
    }));

    setStars(starsArray);
  };

  const submitRating = () => {
    const rating = stars.filter(({ active }) => active === true).length;
  };
  return (
    <RatingBox>
      <RatingHeader onClick={toggle}>
        <RatingTitle>Avalie como foi sua experiência</RatingTitle>
        <Chevron isOpen={isOpen} />
      </RatingHeader>
      {isOpen && (
        <RatingWrapper>
          <Description>Como você avalia sua experiência?</Description>
          <div style={{ display: 'inline-flex' }}>
            {stars.map(({ active }, index) => (
              <StyledRatingIcon
                aria-label={`Avaliar com nota ${index + 1}`}
                key={index}
                active={active ? 1 : 0}
                onClick={() => handleRatingChange(index)}
              />
            ))}
          </div>
          <Label size="sm">Deixar comentário</Label>
          <Input
            size="sm"
            type="textarea"
            name="comment"
            placeholder="Como poderiamos melhorar?"
          />
          <Button
            color="primary"
            outline
            size="sm"
            style={{ marginTop: '15px' }}
            disabled={!hasRating}
            onClick={submitRating}
          >
            Avaliar
          </Button>
        </RatingWrapper>
      )}
    </RatingBox>
  );
}
