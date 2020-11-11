const atob = require('atob');
const calculateTopMatches = require('../getTopMatches/getTopMatches');
const sentry = require('../sentry');

const getTopMatches = async (request, response) => {
  const { Sentry, transaction } = sentry('getTopMatches');

  try {
    const query = JSON.parse(atob(request.query.query));

    const result = await calculateTopMatches(query.instance, query.answers);

    response.setHeader('Cache-Control', 's-maxage=60');
    response.json(result);
  } catch (error) {
    Sentry.captureException(error, {
      extra: request,
    });

    response.status(500);
    response.send(error);
    console.error(error);
  } finally {
    transaction.finish();
  }
};

export default getTopMatches;
