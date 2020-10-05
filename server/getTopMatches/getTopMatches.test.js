const getTopMatches = require('./getTopMatches.js');

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
    answers: Array(30).fill('CT'),
  },
  'candidate-2': {
    ...candidateData,
    answers: Array(30).fill('DT'),
  },
  'candidate-3': {
    ...candidateData,
    answers: Array(15).fill('DT'),
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
    const voterAnswers = {
      0: 'DT',
      1: 'DT',
    };

    const result = await getTopMatches(firebaseMock, voterAnswers);

    expect(result.length).toBe(2);
    expect(result[0].id).toEqual('candidate-2');
    expect(result[1].id).toEqual('candidate-1');
  });
});
