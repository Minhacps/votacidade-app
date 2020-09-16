import React, { useState, useEffect } from 'react';
import firebaseAuth from 'firebase/app';
import CandidateCard from 'components/CandidateCard/CandidateCard';
import GetAnsweredQuestions from 'components/AnswersProvider/AnswersProvider';

import { CANDIDATE } from 'constants/userRoles';
import { CityContext } from 'components/CityProvider/CityProvider';
import { cityName } from 'cities/campinaGrande';

const ListCandidates = ({ firebase }) => {
  // let [candidate, setCandidate] = useState({});
  let [candidates, setCandidates] = useState([]);

  useEffect(() => {
    firebaseAuth
      .firestore()
      .collection('users')
      .where('role', '==', 'candidate')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          let candidate = doc.data();
          candidate.uid = doc.id;
          // console.log(candidate.uid);
          //Consultar as questões do candidato
          firebase
            .firestore()
            .collection('candidateAnswers')
            .doc(candidate.uid)
            .get()
            .then((doc) => {
              if (doc.exists) {
                const answers = doc.data();
                const answersKeys = Object.keys(answers);
                candidate.answersCompleted = answersKeys.length;
                setCandidates((candidates) => [...candidates, candidate]);
              }
            });
        });
      })
      .catch(() => {
        console.log('Ocorreu um erro ao ler os dados');
      });
  }, []);

  return (
    <>
      <div>List Candidatos</div>
      {candidates
        ? candidates.map((candidate) => {
            return <CandidateCard candidate={candidate} />;
          })
        : null}
    </>
  );
};

export default ListCandidates;
