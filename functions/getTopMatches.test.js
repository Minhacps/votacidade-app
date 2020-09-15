const getTopMatches = require('./getTopMatches.js');

describe('getTopMatches', () => {
  it('should throw error for unauthenticated requests', () => {
    expect(() => getTopMatches({}, { auth: false })).toThrow(
      'You must be logged in to call this function.',
    );
  });

  // it('should throw error for invalid indexes', () => {
  //   expect(() => getTopMatches({ 50: 'C' }, { auth: true })).toThrow(
  //     'The answers must be indexed from 1 to 40.',
  //   );
  // });

  it('should throw error for invalid answers', () => {
    expect(() =>
      getTopMatches({ 1: { answer: 'BLA' } }, { auth: true }),
    ).toThrow('The answers must be one of: CT C D DT.');
  });
});
