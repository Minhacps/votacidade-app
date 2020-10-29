import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { CityContext } from 'components/CityProvider/CityProvider';
import { AnswersContext } from 'components/AnswersProvider/AnswersProvider';
import { MatchesContext } from 'components/MatchesProvider/MatchesProvider';

import { answerOptionsMap } from 'constants/questionnaire';
import ImageThumbnail from 'components/atoms/ImageThumbnail';
import getPicture from 'constants/candidatePicture';
import ShareButtons from 'components/ShareButtons/ShareButtons';
import Answer from './Answer';
import votaBanner from 'assets/img/vota.whatsapp.png';

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

const Profile = ({ unauthenticated }) => {
  const [candidateAnswers, setCandidateAnswers] = useState({});
  const [candidate, setCandidate] = useState();
  const { firebase, questionnaire, cityPath } = useContext(CityContext);
  const { answers: userAnswers } = useContext(AnswersContext) ?? {};
  const { matches } = useContext(MatchesContext) ?? [];
  const { candidateId } = useParams();

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

  useEffect(() => {
    if (unauthenticated) {
      firebase
        .database()
        .ref('/' + candidateId)
        .once('value')
        .then((snapshot) => {
          setCandidate(snapshot.val());
        });
    } else {
      const candidate = matches?.find((match) => match.id === candidateId);
      setCandidate(candidate);
    }
  }, [candidateId, firebase, matches, unauthenticated]);

  if (!candidate) {
    return null;
  }

  const candidateAttributes = {
    Bio: candidate.description,
    Idade: candidate.age,
    Gênero: candidate.gender,
    Etnia: candidate.ethnicGroup,
    'Grupo Social': candidate.socialGroup,
  };

  return (
    <>
      <Helmet>
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={votaBanner}></meta>
      </Helmet>
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
          {Object.keys(candidateAttributes).map((attribute) => {
            const attributeValue = candidateAttributes[attribute];
            if (!attributeValue) return null;
            return (
              <p>
                <strong>{attribute}:</strong> {attributeValue}
              </p>
            );
          })}
        </CandidateBio>

        <ShareButtons />

        <Affinity>
          <AffinityTitle>Comparação das respostas</AffinityTitle>
          {!unauthenticated && (
            <AffinityTag>{candidate.match / 100}%</AffinityTag>
          )}
        </Affinity>

        {questionnaire.map(({ question }, index) => (
          <Question key={index}>
            <Statement>
              <span>{index + 1}.</span> {question}
            </Statement>
            {userAnswers && (
              <Answer answer={answerOptionsMap[userAnswers[index]?.answer]} />
            )}
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
    </>
  );
};

export default Profile;
