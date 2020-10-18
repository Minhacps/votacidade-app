import '@testing-library/jest-dom/extend-expect';

const { location } = window;

beforeAll(() => {
  delete window.location;
});

beforeEach(() => {
  window.localStorage.clear();
  window.location = new URL('http://localhost');
});

afterAll(() => {
  window.location = location;
});
