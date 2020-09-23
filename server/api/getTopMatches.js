const { firebaseInstances } = require('../firebaseKeys');
const allowCors = require('../allowCors');
const getTopMatches = require('../getTopMatches/getTopMatches');

const getMatches = async (request, response) => {
  const firebase = firebaseInstances[request.body.instance]();

  const result = await getTopMatches(firebase, request.body.answers);

  response.setHeader('Cache-Control', 's-maxage=60');
  response.json(result);
};

export default allowCors(getMatches);
