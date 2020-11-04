const fetch = require('node-fetch');
const matcher = require('./matcher.js');
const { API_URL } = require('../constants');

const getTopMatches = (instance, voterAnswers) =>
  getCandidateAnswers(instance).then((allCandidatesData) =>
    getMatchScores(voterAnswers, allCandidatesData),
  );

const getCandidateAnswers = async (instance) => {
  const result = await fetch(
    `${API_URL}/getCandidateAnswers?instance=${instance}`,
  );
  return result.json();
};

const getMatchScores = (voterAnswers, allCandidatesData) => {
  if (!allCandidatesData) {
    return [];
  }

  return Object.keys(allCandidatesData)
    .reduce((matches, candidateId) => {
      const { answers, ...candidateProfile } = allCandidatesData[candidateId];

      if (!answers || answers.length !== 30) {
        return matches;
      }

      const score = matcher.getMatchScore(
        voterAnswers,
        allCandidatesData[candidateId].answers,
      );

      const currentMatch = {
        id: candidateId,
        ...candidateProfile,
        match: score.normalized,
      };

      return [...matches, currentMatch];
    }, [])
    .sort((a, b) => b.match - a.match);
};

module.exports = getTopMatches;
