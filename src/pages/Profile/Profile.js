import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { useParams } from 'react-router-dom';

import { CityContext } from 'components/CityProvider/CityProvider';
import { AnswersContext } from 'components/AnswersProvider/AnswersProvider';
import { MatchesContext } from 'components/MatchesProvider/MatchesProvider';

import { answerOptionsMap } from 'constants/questionnaire';
import ImageThumbnail from 'components/atoms/ImageThumbnail';
import getPicture from 'constants/candidatePicture';

import Answer from './Answer';

import {
  CandidateName,
  CandidateNumber,
  CandidateBio,
  Affinity,
  AffinityTitle,
  Statement,
  Question,
} from './Profile.styled.js';

import { AffinityTag } from '../Ranking/Ranking.styled.js';

const Profile = () => {
  const { firebase, questionnaire, cityPath } = useContext(CityContext);
  const { answers: userAnswers } = useContext(AnswersContext);
  const [candidateAnswers, setCandidateAnswers] = useState({});
  const { matches } = useContext(MatchesContext);
  const { candidateId } = useParams();

  const candidate = matches.find((match) => match.id === candidateId);

  useEffect(() => {
    firebase
      .firestore()
      .collection('candidateAnswers')
      .doc(candidateId)
      .get()
      .then((snapshot) => {
        setCandidateAnswers(snapshot.data());
      });
  }, [candidateId, firebase]);

  if (!candidate) {
    return null;
  }

  return (
    <Container className="py-4">
      <ImageThumbnail
        src={getPicture(cityPath, candidate.candidateNumber)}
        alt={`Foto de ${candidate.name}`}
        placeholderText="Foto"
        width="143px"
        height="143px"
        className="border mx-auto"
      />
      <CandidateName>{candidate.name}</CandidateName>
      <CandidateNumber>
        {candidate.candidateNumber} | {candidate.politicalParty}
      </CandidateNumber>

      <CandidateBio>
        <strong>Bio:</strong> {candidate.description}
      </CandidateBio>
      <Affinity>
        <AffinityTitle>Comparação das respostas</AffinityTitle>
        <AffinityTag>{candidate.match / 100}%</AffinityTag>
      </Affinity>

      {questionnaire.map(({ question }, index) => (
        <Question key={index}>
          <Statement>
            <span>{index + 1}.</span> {question}
          </Statement>
          <Answer answer={answerOptionsMap[userAnswers[index]?.answer]} />
          {candidateAnswers && (
            <Answer
              isCandidate
              answer={answerOptionsMap[candidateAnswers[index]?.answer]}
              justification={candidateAnswers[index]?.justification}
            />
          )}
        </Question>
      ))}
    </Container>
  );
};

export default Profile;
