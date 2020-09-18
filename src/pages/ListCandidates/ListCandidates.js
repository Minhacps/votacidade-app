import React, { useState, useEffect } from 'react';
import firebaseAuth from 'firebase/app';
import CandidateCard from 'components/CandidateCard/CandidateCard';

const ListCandidates = ({ firebase }) => {
  // let [candidate, setCandidate] = useState({});
  let [candidates, setCandidates] = useState([]);

  useEffect(() => {
    console.log('List candidates');
    firebaseAuth
      .firestore()
      .collection('users')
      .where('role', '==', 'candidate')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          let candidate = doc.data();
          candidate.uid = doc.id;
          firebase
            .firestore()
            .collection('candidateAnswers')
            .doc(candidate.uid)
            .get()
            .then((doc) => {
              console.log('Dentro do firestore da cidade');
              if (doc.exists) {
                const answers = doc.data();
                const answersKeys = Object.keys(answers);
                candidate.answersCompleted = answersKeys.length;
                setCandidates((candidates) => [...candidates, candidate]);
              } else {
                console.log('Documento ', candidate.uid, 'não encontrado');
              }
            })
            .catch(() => {
              console.log('Problemas ao ler o firestore da cidade');
            });
        });
      })
      .catch(() => {
        console.log('Ocorreu um erro ao ler os dados');
      });
  }, []);

  return (
    <>
      <h2>Listagem de Candidatos(as)</h2>
      {candidates
        ? candidates.map((candidate) => {
            return <CandidateCard key={candidate.uid} candidate={candidate} />;
          })
        : null}
    </>
  );
};

export default ListCandidates;
