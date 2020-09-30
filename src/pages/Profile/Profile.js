import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { useParams } from 'react-router-dom';

import { CityContext } from 'components/CityProvider/CityProvider';
import { AnswersContext } from 'components/AnswersProvider/AnswersProvider';
import { MatchesContext } from 'components/MatchesProvider/MatchesProvider';

import { answerOptionsMap } from 'constants/questionnaire';

import {
  CandidatePhoto,
  CandidateName,
  CandidateNumber,
  CandidateBio,
  Affinity,
  AffinityTitle,
  Statement,
  Question,
  Answer,
  AnswerCheckbox,
  AsnwerOption,
  Justification,
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
        console.log('foo');
      });
  }, [candidateId, firebase]);

  if (!candidate) {
    return null;
  }

  return (
    <Container className="py-4">
      {/* should render candidate image in the future */}
      <CandidatePhoto
        src={require('assets/img/avatar.png')}
        alt="Foto da pessoa candidata"
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
          <Answer>
            <p>Sua resposta: </p>
            <AsnwerOption>
              <AnswerCheckbox>✓</AnswerCheckbox>
              {answerOptionsMap[userAnswers[index].answer]}
            </AsnwerOption>
          </Answer>

          {candidateAnswers && (
            <>
              <Answer>
                <p>Resposta do candidato(a): </p>
                <AsnwerOption isCandidate>
                  <AnswerCheckbox>✓</AnswerCheckbox>
                  {answerOptionsMap[candidateAnswers[index]?.answer]}
                </AsnwerOption>
              </Answer>
              {answerOptionsMap[candidateAnswers[index]?.justification] && (
                <Justification>
                  <p>Justificativa:</p>
                  <p>
                    {answerOptionsMap[candidateAnswers[index]?.justification]}
                  </p>
                </Justification>
              )}
            </>
          )}
        </Question>
      ))}
    </Container>
  );
};

export default Profile;
