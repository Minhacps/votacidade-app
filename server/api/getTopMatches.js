const atob = require('atob');
const { firebaseInstances } = require('../firebaseKeys');
const calculateTopMatches = require('../getTopMatches/getTopMatches');
const sentry = require('../sentry');

const getTopMatches = async (request, response) => {
  const { Sentry, transaction } = sentry('getTopMatches');

  try {
    const query = JSON.parse(atob(request.query.query));
    const firebase = firebaseInstances[query.instance]();

    const result = await calculateTopMatches(firebase, query.answers);

    response.setHeader('Cache-Control', 's-maxage=60');
    response.json(result);
  } catch (error) {
    Sentry.captureException(error, {
      extra: request,
    });

    response.status(500);
    response.send(error);
  } finally {
    transaction.finish();
  }
};

export default getTopMatches;
