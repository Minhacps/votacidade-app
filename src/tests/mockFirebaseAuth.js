import firebase from 'firebase/app';

export { default as firebase } from 'firebase/app';

jest.mock('firebase/app', () => {
  return {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          get: jest.fn(() =>
            Promise.resolve({
              data: jest.fn(() => ({
                city: 'campinas',
                email: 'takahashihideki408@gmail.com',
                name: 'Luis Takahashi',
                role: 'voter',
              })),
            }),
          ),
        })),
      })),
    })),
    auth: jest.fn().mockReturnThis(),
    onAuthStateChanged: jest.fn(),
    signOut: jest.fn().mockResolvedValue(),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn().mockResolvedValue({
      user: {
        sendEmailVerification: jest.fn(),
      },
    }),
  };
});

const mockAuth = (user) =>
  firebase.onAuthStateChanged.mockImplementationOnce((callback) =>
    callback(user),
  );

export const mockUnauthenticatedUser = () => mockAuth(null);

export const mockAuthenticatedUser = (user = {}) => mockAuth(user);
