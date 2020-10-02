const { firebaseInstances } = require('../firebaseKeys');
const sentry = require('../sentry');

const generateToken = async (request, response) => {
  const { Sentry, transaction } = sentry('generateToken');

  try {
    const firebaseInstance = firebaseInstances[request.query.instance]();

    const customToken = await firebaseInstance
      .auth()
      .createCustomToken(request.query.uid);

    response.setHeader('Cache-Control', 's-maxage=60');
    response.json({ token: customToken });
  } catch (error) {
    Sentry.captureException(error, {
      extra: request,
    });

    response.status(500);
    response.json({ error: 'Failed to generateToken' });
  } finally {
    transaction.finish();
  }
};

export default generateToken;
