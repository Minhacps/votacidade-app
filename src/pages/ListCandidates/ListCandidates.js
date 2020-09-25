import React, { useState, useEffect } from 'react';
// import firebaseAuth from 'firebase/app';
import CandidateCard from 'components/CandidateCard/CandidateCard';
import { get } from 'react-hook-form';

const ListCandidates = ({ firebase }) => {
  const [candidates, setCandidates] = useState({});
  const [loading, setLoading] = useState(true);
  const [candidates1, setCandidates1] = useState([]);

  useEffect(() => {
    getCandidates();

    Object.keys(candidates).forEach((candidate) => {
      // console.log(candidates[candidate]);
      setCandidates1([...candidates1, candidates[candidate]]);
    });
  }, [loading]);

  const getCandidates = async () => {
    await firebase
      .database()
      .ref()
      .once('value')
      .then((result) => {
        setCandidates(result.val());
        setLoading(false);
      });
  };

  console.log(candidates1);

  return (
    <>
      <h2>Listagem de Candidatos(as)</h2>
      {loading ? <p>Loading</p> : null}l
    </>
  );
};

export default ListCandidates;
