import React from 'react';
import {
  screen,
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import {
  firebase,
  mockUnauthenticatedUser,
  mockAuthenticatedUser,
} from 'tests/mockFirebaseAuth';

import questionsService from 'components/AnswersProvider/answersService';

import AuthenticationProvider from './AuthenticationProvider';
import * as tokenService from './customTokenService';
import App from './App';

jest.mock('components/CityProvider/CityProvider');

beforeEach(() => {
  jest.spyOn(tokenService, 'getCustomToken').mockResolvedValue('tokenzinho');
  jest
    .spyOn(questionsService, 'getAnsweredQuestions')
    .mockResolvedValue({ 0: { answer: 'DT' }, 1: { answer: 'CT' } });
});

afterEach(() => {
  jest.clearAllMocks();
});

const customRender = () =>
  render(
    <AuthenticationProvider>
      <App />
    </AuthenticationProvider>,
    { wrapper: BrowserRouter },
  );

describe('App', () => {
  it('renders sign in form when user is unauthenticated', async () => {
    mockUnauthenticatedUser();

    customRender();

    const emailInput = screen.getByLabelText('E-mail');
    userEvent.type(emailInput, 'any@email.com');

    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, 'anyPassword');

    const submitButton = screen.getByRole('button', { name: 'Entrar' });
    fireEvent.click(submitButton);

    await waitForElementToBeRemoved(() => screen.getByTestId('submit-loader'));

    expect(firebase.auth().signInWithEmailAndPassword).toBeCalledWith(
      'any@email.com',
      'anyPassword',
    );
  });

  it('renders sign up form when user is unauthenticated', async () => {
    mockUnauthenticatedUser();
    customRender();

    userEvent.click(screen.getByTestId('signup-button'));

    const emailInput = screen.getByLabelText('E-mail');
    userEvent.type(emailInput, 'any@email.com');

    const passwordInput = screen.getByLabelText('Senha');
    userEvent.type(passwordInput, 'anyPassword');

    const nameInput = screen.getByLabelText('Nome completo');
    userEvent.type(nameInput, 'Kleber da silva');

    const cityInput = screen.getByLabelText('Cidade');
    userEvent.selectOptions(cityInput, 'campinas');

    userEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() =>
      expect(firebase.auth().createUserWithEmailAndPassword).toBeCalledWith(
        'any@email.com',
        'anyPassword',
      ),
    );
  });

  it('renders app when user is authenticated', async () => {
    mockAuthenticatedUser();
    customRender();

    await waitForElementToBeRemoved(() => screen.getByTestId('page-loading'));

    expect(screen.getByTestId('app')).toBeInTheDocument();
  });

  it('renders sign in form when users signs out', async () => {
    mockAuthenticatedUser();
    customRender();

    await waitForElementToBeRemoved(() => screen.getByTestId('page-loading'));
    fireEvent.click(screen.getByTestId('sidebar-burger'));

    fireEvent.click(screen.getByTestId('logout-button'));

    expect(firebase.auth().signOut).toBeCalledWith();
  });
});
