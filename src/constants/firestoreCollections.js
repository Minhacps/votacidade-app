import userRoles from 'constants/userRoles';

const collections = {
  candidateAnswers: 'candidateAnswers',
  voterAnswers: 'voterAnswers',
};

export const answersCollection = (role) =>
  role === userRoles.CANDIDATE
    ? collections.candidateAnswers
    : collections.voterAnswers;

export default collections;
