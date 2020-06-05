import firebase from 'firebase/app';

jest.mock('firebase/app', () => {
  return {
    auth: jest.fn().mockReturnThis(),
    onAuthStateChanged: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(() => ({
      user: {
        sendEmailVerification: jest.fn(),
      },
    })),
  };
});

const mockAuth = (user) =>
  firebase.onAuthStateChanged.mockImplementationOnce((callback) =>
    callback(user),
  );

export const mockUnauthenticatedUser = () => mockAuth(null);

export const mockAuthenticatedUser = (user = {}) => mockAuth(user);
