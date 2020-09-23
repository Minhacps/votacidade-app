const { firebaseInstances } = require('../firebaseKeys');
const allowCors = require('../allowCors');

const handler = (request, response) => {
  const firebaseInstance = firebaseInstances[request.query.instance]();

  firebaseInstance
    .auth()
    .createCustomToken(request.query.uid)
    .then((customToken) => {
      response.setHeader('Cache-Control', 's-maxage=60');
      response.json({ token: customToken });
    })
    .catch((error) => {
      console.log('Error creating custom token:', error);
    });
};

export default allowCors(handler);
