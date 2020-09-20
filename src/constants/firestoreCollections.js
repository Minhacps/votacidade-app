import { ROLE_CANDIDATE } from 'constants/userRoles';

const collections = {
  candidateAnswers: 'candidateAnswers',
  voterAnswers: 'voterAnswers',
};

export const answersCollection = (role) =>
  role === ROLE_CANDIDATE
    ? collections.candidateAnswers
    : collections.voterAnswers;

export default collections;
