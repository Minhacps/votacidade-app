const matcher = require('./matcher.js');

describe('matcher', () => {
  it('should give 100% match when all the answers match', () => {
    const voterAnswers = {
      1: 'CT',
      2: 'C',
      3: 'D',
      4: 'DT',
    };
    const candidateAnswers = {
      1: 'CT',
      2: 'C',
      3: 'D',
      4: 'DT',
    };

    const matchScore = matcher.getMatchScore(voterAnswers, candidateAnswers);

    expect(matchScore.normalized).toBe(10000);
  });

  it('should give 100% match when all the answers match and the voter did not answer all questions', () => {
    const voterAnswers = { 1: 'CT', 2: 'C' };
    const candidateAnswers = {
      1: 'CT',
      2: 'C',
      3: 'D',
      4: 'DT',
    };

    const matchScore = matcher.getMatchScore(voterAnswers, candidateAnswers);

    expect(matchScore.normalized).toBe(10000);
  });

  it('should give 0% match if all the answers are extreme oposites', () => {
    const voterAnswers = {
      1: 'CT',
      2: 'DT',
      3: 'CT',
      4: 'DT',
    };
    const candidateAnswers = {
      1: 'DT',
      2: 'CT',
      3: 'DT',
      4: 'CT',
    };

    const matchScore = matcher.getMatchScore(voterAnswers, candidateAnswers);

    expect(matchScore.normalized).toBe(0);
  });

  test.each`
    a       | b       | expectedScore
    ${'DT'} | ${'DT'} | ${4}
    ${'DT'} | ${'D'}  | ${2}
    ${'DT'} | ${'C'}  | ${-3}
    ${'DT'} | ${'CT'} | ${-4}
    ${'D'}  | ${'D'}  | ${4}
    ${'D'}  | ${'C'}  | ${-2}
    ${'D'}  | ${'CT'} | ${-3}
    ${'C'}  | ${'C'}  | ${4}
    ${'C'}  | ${'CT'} | ${2}
    ${'CT'} | ${'CT'} | ${4}
  `('$a and $b give a score of $expectedScore', ({ a, b, expectedScore }) => {
    expect(matcher.getMatchScore({ 1: a }, { 1: b }).absolute).toBe(
      expectedScore,
    );
    expect(matcher.getMatchScore({ 1: b }, { 1: a }).absolute).toBe(
      expectedScore,
    );
  });
});
