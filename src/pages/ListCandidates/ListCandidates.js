import React, { useState, useEffect } from 'react';
// import firebaseAuth from 'firebase/app';
import CandidateCard from 'components/CandidateCard/CandidateCard';

const ListCandidates = ({ firebase }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [partiesCount, setPartiesCount] = useState(0);
  // const [candidatesCount, setCandidatesCount] = useState(0);
  // const [parties, setParties] = useState([])

  useEffect(() => {
    firebase
      .database()
      .ref()
      .once('value', (data) => {
        data.forEach(function (childSnapshot) {
          let candidate = childSnapshot.val();
          const answers = candidate.answers;
          const answersKeys = Object.keys(answers);
          candidate.answersCompleted = answersKeys.length;
          setCandidates((candidates) => [...candidates, candidate]);
          // console.log(parties.indexOf(candidate.politicalParty));
          // if (parties.indexOf(candidate.politicalParty) === -1){
          //   console.log("incluindo ", candidate.politicalParty);
          //   setParties( (parties) => [...parties, candidate.politicalParty]);
          // }
          setLoading(false);
        });
      });
  }, [firebase]);

  // console.log('[ListCandidates]', candidates);
  // console.log('Political Parties:', parties);

  return (
    <>
      <h2>Listagem de Candidatos(as)</h2>
      {loading ? (
        <p>Loading</p>
      ) : (
        candidates.map((candidate) => {
          return <CandidateCard key={candidate.name} candidate={candidate} />;
        })
      )}
    </>
  );
};

export default ListCandidates;
