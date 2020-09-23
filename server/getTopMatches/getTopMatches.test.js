const getTopMatches = require('./getTopMatches.js');

const answers = {
  0: 'DT',
  1: 'CT',
};

const candidateData = {
  candidateNumber: '',
  city: '',
  cnpj: '',
  description: '',
  email: '',
  ethnicGroup: '',
  gender: '',
  name: '',
  politicalParty: '',
  role: '',
  socialGroup: '',
};

const fakeDatabaseData = {
  'candidate-1': {
    ...candidateData,
    answers: ['CT', 'CT'],
  },
  'candidate-2': {
    ...candidateData,
    answers: ['DT', 'CT'],
  },
};

const firebaseMock = {
  database: () => ({
    ref: () => ({
      once: () =>
        Promise.resolve({
          val: () => fakeDatabaseData,
        }),
    }),
  }),
};

describe('getTopMatches', () => {
  it('returns matches sorted by match score', async () => {
    const result = await getTopMatches(firebaseMock, answers);

    expect(result[0].id).toEqual('candidate-2');
    expect(result[1].id).toEqual('candidate-1');
  });
});
