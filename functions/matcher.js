const voterToCandidateScoringTable = {
  DT: { DT: 4, D: 2, C: -3, CT: -4 },
  D: { DT: 2, D: 4, C: -2, CT: -3 },
  C: { DT: -3, D: -2, C: 4, CT: 2 },
  CT: { DT: -4, D: -3, C: 2, CT: 4 },
};

exports.getMatchScore = (voterAnswers, candidateAnswers) => {
  const voterAnsweredQuestionsIds = Object.keys(voterAnswers);
  const score = voterAnsweredQuestionsIds.reduce((score, questionId) => {
    const voterAnswer = voterAnswers[questionId].answer;
    const candidateAnswer = candidateAnswers[questionId].answer;

    return score + voterToCandidateScoringTable[voterAnswer][candidateAnswer];
  }, 0);
  return {
    absolute: score,
    normalized: normalize(score, voterAnsweredQuestionsIds.length),
  };
};

const normalize = (score, questionsAnsweredByVoter) => {
  const max = voterToCandidateScoringTable.CT.CT * questionsAnsweredByVoter;
  const min = voterToCandidateScoringTable.CT.DT * questionsAnsweredByVoter;

  return Math.round(((score - min) / (max - min)) * 10000);
};
