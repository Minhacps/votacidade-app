import firebase from 'firebase/app';

export { default as firebase } from 'firebase/app';

jest.mock('firebase/app', () => {
  const firebaseMock = {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          set: jest.fn(() => Promise.resolve()),
          get: jest.fn(() =>
            Promise.resolve({
              data: jest.fn(() => ({
                city: 'campinas',
                email: 'some.user@domain.com',
                name: 'Some user',
                displayName: 'Some user',
                role: 'voter',
              })),
            }),
          ),
        })),
      })),
    })),
    database: jest.fn().mockReturnThis(),
    ref: jest.fn().mockReturnThis(),
    set: jest.fn(() => Promise.resolve()),

    auth: jest.fn().mockReturnThis(),
    onAuthStateChanged: jest.fn(),
    signOut: jest.fn().mockResolvedValue(),
    signInWithCustomToken: jest.fn().mockResolvedValue(),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn().mockResolvedValue({
      user: {
        updateProfile: jest.fn(() => Promise.resolve()),
        sendEmailVerification: jest.fn(),
      },
    }),
    options: jest.fn({
      projectId: jest.fn(12345),
    }),
  };

  return {
    app: jest.fn(() => ({
      ...firebaseMock,
    })),
    ...firebaseMock,
  };
});

const mockAuth = (user) => {
  if (user) {
    firebase.firestore.mockImplementationOnce(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          get: jest.fn(() =>
            Promise.resolve({
              data: jest.fn(() => user),
            }),
          ),
        })),
      })),
    }));
  }

  firebase.onAuthStateChanged.mockImplementationOnce((callback) =>
    callback(user !== undefined ? user : {}),
  );
};

export const mockUnauthenticatedUser = () => mockAuth(null);

export const mockAuthenticatedUser = (user) => mockAuth(user);
