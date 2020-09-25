import React, { useState, useEffect } from 'react';
// import firebaseAuth from 'firebase/app';
import CandidateCard from 'components/CandidateCard/CandidateCard';

const ListCandidates = ({ firebase }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase
      .database()
      .ref()
      .once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          let candidate = childSnapshot.val();
          const answers = candidate.answers;
          const answersKeys = Object.keys(answers);
          candidate.answersCompleted = answersKeys.length;
          setCandidates((candidates) => [...candidates, candidate]);
          setCandidates((candidates) => [...candidates, candidate]);
          setLoading(false);
        });
      });
  }, [loading, firebase]);

  console.log('[ListCandidates]', candidates);

  return (
    <>
      <h2>Listagem de Candidatos(as)</h2>
      {loading ? (
        <p>Loading</p>
      ) : (
        candidates.map((candidate) => {
          return <CandidateCard key={candidate.uid} candidate={candidate} />;
        })
      )}
    </>
  );
};

export default ListCandidates;
