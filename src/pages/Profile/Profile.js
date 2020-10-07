import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { useParams } from 'react-router-dom';

import { CityContext } from 'components/CityProvider/CityProvider';
import { AnswersContext } from 'components/AnswersProvider/AnswersProvider';
import { MatchesContext } from 'components/MatchesProvider/MatchesProvider';

import { answerOptionsMap } from 'constants/questionnaire';
import Answer from './Answer';

import {
  CandidatePhoto,
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
  const { firebase, questionnaire } = useContext(CityContext);
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
      <CandidatePhoto src={candidate.picture} alt="Foto da pessoa candidata" />
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
          {candidateAnswers && (
            <Answer
              isCandidate
              answer={answerOptionsMap[candidateAnswers[index]?.answer]}
              justification={
                answerOptionsMap[candidateAnswers[index]?.justification]
              }
            />
          )}

          <Answer answer={answerOptionsMap[userAnswers[index]?.answer]} />
        </Question>
      ))}
    </Container>
  );
};

export default Profile;
