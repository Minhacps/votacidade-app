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

const firebaseMockGenerator = (databaseResponse) => ({
  database: () => ({
    ref: () => ({
      once: () =>
        Promise.resolve({
          val: () => databaseResponse,
        }),
    }),
  }),
});

describe('getTopMatches', () => {
  const voterAnswers = {
    0: 'DT',
    1: 'DT',
  };

  it('returns empty list when candidates list is empty', async () => {
    const fakeDatabaseData = null;

    const firebaseMock = firebaseMockGenerator(fakeDatabaseData);

    const result = await getTopMatches(firebaseMock, voterAnswers);

    expect(result.length).toBe(0);
  });

  it('returns matches sorted by match score', async () => {
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

    const firebaseMock = firebaseMockGenerator(fakeDatabaseData);

    const result = await getTopMatches(firebaseMock, voterAnswers);

    expect(result.length).toBe(2);
    expect(result[0].id).toEqual('candidate-2');
    expect(result[1].id).toEqual('candidate-1');
  });

  it('ignores candidates without answers', async () => {
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
      },
    };

    const firebaseMock = firebaseMockGenerator(fakeDatabaseData);

    const result = await getTopMatches(firebaseMock, voterAnswers);

    expect(result.length).toBe(2);
    expect(result[0].id).toEqual('candidate-2');
    expect(result[1].id).toEqual('candidate-1');
  });
});
