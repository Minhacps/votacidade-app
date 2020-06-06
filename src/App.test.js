import React from 'react';
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import {
  mockUnauthenticatedUser,
  mockAuthenticatedUser,
} from 'tests/mockFirebaseAuth';
import firebase from 'firebase/app';

import App from './App';

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders sign in form when user is unauthenticated', async () => {
    mockUnauthenticatedUser();

    const { getByTestId } = render(<App />);

    fireEvent.change(getByTestId('email-input'), {
      target: { value: 'any@email.com' },
    });
    fireEvent.change(getByTestId('password-input'), {
      target: { value: 'anyPassword' },
    });
    fireEvent.click(getByTestId('submit-button'));

    await waitForElementToBeRemoved(() => getByTestId('signup-loader'));

    expect(firebase.auth().signInWithEmailAndPassword).toBeCalledWith(
      'any@email.com',
      'anyPassword',
    );
  });

  it('renders sign up form when user is unauthenticated', async () => {
    mockUnauthenticatedUser();
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId('signup-button'));
    fireEvent.change(getByTestId('email-input'), {
      target: { value: 'any@email.com' },
    });
    fireEvent.change(getByTestId('password-input'), {
      target: { value: 'anyPassword' },
    });
    fireEvent.click(getByTestId('submit-button'));

    await waitForElementToBeRemoved(() => getByTestId('signup-loader'));

    expect(firebase.auth().createUserWithEmailAndPassword).toBeCalledWith(
      'any@email.com',
      'anyPassword',
    );
  });

  it('renders app when user is authenticated', () => {
    mockAuthenticatedUser();

    const { getByTestId } = render(<App />);
    expect(getByTestId('app')).toBeVisible();
  });

  it('renders sign in form when users signs out', () => {
    mockAuthenticatedUser();

    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId('logout-button'));

    expect(firebase.auth().signOut).toBeCalledWith();
  });
});
