const { firebaseInstances } = require('../firebaseKeys');
const sentry = require('../sentry');

const getCandidateAnswers = async (request, response) => {
  const { transaction } = sentry('getCandidateAnswers');

  const firebase = firebaseInstances[request.query.instance]();
  const result = await firebase.database().ref().once('value');

  response.setHeader('Cache-Control', 's-maxage=300');
  response.json(result.val());

  transaction.finish();
};

export default getCandidateAnswers;
