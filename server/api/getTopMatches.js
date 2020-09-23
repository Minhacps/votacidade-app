const atob = require('atob');
const { firebaseInstances } = require('../firebaseKeys');
const getTopMatches = require('../getTopMatches/getTopMatches');

const getMatches = async (request, response) => {
  const query = JSON.parse(atob(request.query.query));
  const firebase = firebaseInstances[query.instance]();

  const result = await getTopMatches(firebase, query.answers);

  response.setHeader('Cache-Control', 's-maxage=60');
  response.json(result);
};

export default getMatches;
