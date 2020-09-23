const matcher = require('./matcher.js');

const getTopMatches = (firebase, voterAnswers) =>
  getCandidateAnswers(firebase).then((allCandidatesData) =>
    getMatchScores(voterAnswers, allCandidatesData),
  );

const getCandidateAnswers = async (firebase) => {
  const result = await firebase.database().ref().once('value');

  return result.val();
};

const getMatchScores = (voterAnswers, allCandidatesData) =>
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
      );

      return {
        id: candidateId,
        ...candidateProfile,
        match: score.normalized,
      };
    })
    .sort((a, b) => b.match - a.match);

module.exports = getTopMatches;
