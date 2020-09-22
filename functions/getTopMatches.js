const functions = require('firebase-functions');
const matcher = require('./matcher.js');
const admin = require('firebase-admin');
admin.initializeApp();

const cacheTimeoutMs = 1000;
const validAnswers = ['CT', 'C', 'D', 'DT'];

let lastFetch = -1;

let candidateData = {
  candidate: {},
  isUpToDate: () => {
    return lastFetch === -1 ? false : new Date() - lastFetch < cacheTimeoutMs;
  },
};

const getCandidateAnswers = async () => {
  if (candidateData.isUpToDate()) {
    return new Promise((resolve, reject) => resolve(candidateData.candidate));
  }

  const result = await fetchCandidateAnswers();

  candidateData.candidate = result.val();
  lastFetch = new Date();
  return candidateData.candidate;
};

const fetchCandidateAnswers = () => admin.database().ref().once('value');

const getMatchScores = (voterAnswers, allCandidatesData) => {
  return (
    Object.keys(allCandidatesData)
      // .filter((candidateData) => {
      //   amountOfAnswers = Object.keys(candidateData.data()).length;
      //   return amountOfAnswers === 40;
      // })
      .map((candidateId) => {
        const { answers, ...candidateProfile } = allCandidatesData[candidateId];

        const score = matcher.getMatchScore(
          voterAnswers,
          allCandidatesData[candidateId].answers,
        ).normalized;

        return {
          ...candidateProfile,
          match: score,
        };
      })
      .sort((a, b) => b.match - a.match)
  );
};

const getTopMatches = (voterAnswers, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'You must be logged in to call this function.',
    );
  }

  const answeredQuestionsCount = Object.keys(voterAnswers).reduce(
    (count, idx) => {
      // if (!(idx >= 1 && idx <= 40)) {
      //   throw new functions.https.HttpsError(
      //     'invalid-argument',
      //     'The answers must be indexed from 1 to 40.',
      //   );
      // }

      const answer = voterAnswers[idx].answer;

      if (!validAnswers.includes(answer)) {
        throw new functions.https.HttpsError(
          'invalid-argument',
          'The answers must be one of: ' + validAnswers.join(' ') + '.',
        );
      }

      return count + 1;
    },
    0,
  );

  return getCandidateAnswers().then((allCandidatesData) => {
    return getMatchScores(voterAnswers, allCandidatesData);
  });
};

module.exports = getTopMatches;
