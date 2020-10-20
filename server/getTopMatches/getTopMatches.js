const matcher = require('./matcher.js');

const getTopMatches = (firebase, voterAnswers) =>
  getCandidateAnswers(firebase).then((allCandidatesData) =>
    getMatchScores(voterAnswers, allCandidatesData),
  );

const getCandidateAnswers = async (firebase) => {
  const result = await firebase.database().ref().once('value');

  return result.val();
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
