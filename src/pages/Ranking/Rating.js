import React, { useState } from 'react';
import firebase from 'firebase/app';
import styled from 'styled-components';
import { Alert, Button, Input, Label } from 'reactstrap';

import {
  RatingHeader,
  RatingBox,
  RatingTitle,
  RatingWrapper,
  Chevron,
  Description,
} from './Ranking.styled';
import { ReactComponent as RatingIcon } from 'assets/icons/rating.svg';

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
  const [ratingResponse, setRatingResponse] = useState(false);
  const hasSelectRating = stars.some(({ active }) => active === true);
  const hasRatingAlready = localStorage.getItem('hasRatingAlready');

  const toggle = () => setIsOpen(!isOpen);

  const handleRatingChange = (starIndex) => {
    const starsArray = stars.map((_, index) => ({
      active: starIndex + 1 > index ? true : false,
    }));

    setStars(starsArray);
  };

  const submitRating = async (event) => {
    event.preventDefault();
    const rating = stars.filter(({ active }) => active === true).length;
    const ratingData = { rating, comment: event.target.elements.comment.value };

    await firebase
      .firestore()
      .collection('rating')
      .add({
        ...ratingData,
      })
      .then(() => {
        localStorage.setItem('hasRatingAlready', true);
        setRatingResponse('success');
      })
      .catch(() => setRatingResponse('error'));
  };

  if (hasRatingAlready) {
    return null;
  }

  return (
    <RatingBox>
      <RatingHeader onClick={toggle}>
        <RatingTitle>Avalie como foi sua experiência</RatingTitle>
        <Chevron isOpen={isOpen} />
      </RatingHeader>
      {isOpen && (
        <RatingWrapper>
          {ratingResponse === 'success' && (
            <Alert color="success">
              Obrigado sua avaliação é muito importante.
            </Alert>
          )}
          {ratingResponse === 'error' && (
            <Alert color="danger">
              Ocorreu um erro, por favor tente novamente mais tarde.
            </Alert>
          )}
          {!ratingResponse && (
            <>
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
              <form onSubmit={submitRating} style={{ display: 'contents' }}>
                <Label size="sm">Deixar comentário</Label>
                <Input
                  bsSize="sm"
                  type="textarea"
                  name="comment"
                  placeholder="Como poderiamos melhorar?"
                  style={{ maxWidth: '300px' }}
                />
                <Button
                  type="submit"
                  color="primary"
                  outline
                  size="sm"
                  style={{ marginTop: '15px' }}
                  disabled={!hasSelectRating}
                >
                  Avaliar
                </Button>
              </form>
            </>
          )}
        </RatingWrapper>
      )}
    </RatingBox>
  );
}
