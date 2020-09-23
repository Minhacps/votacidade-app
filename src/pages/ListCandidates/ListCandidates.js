import React, { useState, useEffect } from 'react';
import firebaseAuth from 'firebase/app';
import CandidateCard from 'components/CandidateCard/CandidateCard';

const ListCandidates = ({ firebase }) => {
  // let [candidate, setCandidate] = useState({});
  let [candidates, setCandidates] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref()
      .on('value', function (snapshot) {
        console.log(snapshot.val());
      });

    console.log(candidates);
    // if (doc.exists) {
    //   const answers = doc.data();
    //   const answersKeys = Object.keys(answers);
    //   candidate.answersCompleted = answersKeys.length;
    //   setCandidates((candidates) => [...candidates, candidate]);
    // } else {
    //   console.log('Documento ', candidate.uid, 'não encontrado');
    // }
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
