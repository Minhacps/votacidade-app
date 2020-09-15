const matcher = require('./matcher.js');

describe('matcher', () => {
  it('should give 100% match when all the answers match', () => {
    const voterAnswers = {
      1: { answer: 'CT' },
      2: { answer: 'C' },
      3: { answer: 'D' },
      4: { answer: 'DT' },
    };
    const candidateAnswers = {
      1: { answer: 'CT' },
      2: { answer: 'C' },
      3: { answer: 'D' },
      4: { answer: 'DT' },
    };

    const matchScore = matcher.getMatchScore(voterAnswers, candidateAnswers);

    expect(matchScore.normalized).toBe(10000);
  });

  it('should give 100% match when all the answers match and the voter did not answer all questions', () => {
    const voterAnswers = { 1: { answer: 'CT' }, 2: { answer: 'C' } };
    const candidateAnswers = {
      1: { answer: 'CT' },
      2: { answer: 'C' },
      3: { answer: 'D' },
      4: { answer: 'DT' },
    };

    const matchScore = matcher.getMatchScore(voterAnswers, candidateAnswers);

    expect(matchScore.normalized).toBe(10000);
  });

  it('should give 0% match if all the answers are extreme oposites', () => {
    const voterAnswers = {
      1: { answer: 'CT' },
      2: { answer: 'DT' },
      3: { answer: 'CT' },
      4: { answer: 'DT' },
    };
    const candidateAnswers = {
      1: { answer: 'DT' },
      2: { answer: 'CT' },
      3: { answer: 'DT' },
      4: { answer: 'CT' },
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
    expect(
      matcher.getMatchScore({ 1: { answer: a } }, { 1: { answer: b } })
        .absolute,
    ).toBe(expectedScore);
    expect(
      matcher.getMatchScore({ 1: { answer: b } }, { 1: { answer: a } })
        .absolute,
    ).toBe(expectedScore);
  });
});
