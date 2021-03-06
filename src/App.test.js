import React from 'react';
import {
  screen,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import user from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { axe } from 'jest-axe';

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
    <BrowserRouter>
      <AuthenticationProvider>
        <App />
      </AuthenticationProvider>
    </BrowserRouter>,
  );

describe('<App />', () => {
  describe('unauthenticated user', () => {
    const fillUserData = () => {
      user.click(screen.getByTestId('signup-button'));

      const nameInput = screen.getByLabelText('Nome completo');
      user.type(nameInput, 'Kleber da silva');

      const emailInput = screen.getByLabelText('E-mail');
      user.type(emailInput, 'any@email.com');

      const passwordInput = screen.getByLabelText('Senha');
      user.type(passwordInput, 'anyPassword');

      const cityInput = screen.getByLabelText('Cidade');
      user.selectOptions(cityInput, 'campinas');
    };

    it('should render sign in form and call firebase correctly', async () => {
      mockUnauthenticatedUser();

      customRender();

      const emailInput = screen.getByLabelText('E-mail');
      user.type(emailInput, 'any@email.com');

      const passwordInput = screen.getByTestId('password-input');
      user.type(passwordInput, 'anyPassword');

      const submitButton = screen.getByRole('button', { name: 'Entrar' });
      user.click(submitButton);

      await waitForElementToBeRemoved(() =>
        screen.getByTestId('submit-loader'),
      );

      expect(firebase.auth().signInWithEmailAndPassword).toBeCalledWith(
        'any@email.com',
        'anyPassword',
      );
    });

    it('should render sign up form and call firebase correctly for voter', async () => {
      mockUnauthenticatedUser();
      customRender();

      fillUserData();

      const signUpButton = screen.getByRole('button', { name: /cadastrar/i });
      expect(signUpButton).toBeInTheDocument();
      user.click(signUpButton);

      await waitFor(() =>
        expect(firebase.auth().createUserWithEmailAndPassword).toBeCalledWith(
          'any@email.com',
          'anyPassword',
        ),
      );

      expect(firebase.database().ref().set).not.toBeCalled();
    });

    it('should render sign up form and call firebase correctly for candidate', async () => {
      mockUnauthenticatedUser();
      customRender();

      fillUserData();

      const isCandidateCheckbox = screen.getByLabelText('Sou candidata(o)');
      user.click(isCandidateCheckbox);

      const ageSelect = screen.getByLabelText('Idade');
      user.selectOptions(ageSelect, '18-24');

      const ethnicGroupSelect = screen.getByLabelText(
        'Identificação étnico-racial',
      );
      user.selectOptions(ethnicGroupSelect, 'Indígena');

      const genderSelect = screen.getByLabelText('Gênero');
      user.selectOptions(genderSelect, 'Não binário');

      const candidateNumberInput = screen.getByLabelText(
        'Número de candidatura',
      );
      user.type(candidateNumberInput, '00000');

      const politicalPartySelect = screen.getByLabelText('Partido');
      user.selectOptions(politicalPartySelect, 'AVANTE');

      const signUpButton = screen.getByTestId('submit-button');
      user.click(signUpButton);

      await waitFor(() =>
        expect(firebase.auth().createUserWithEmailAndPassword).toBeCalledWith(
          'any@email.com',
          'anyPassword',
        ),
      );

      await waitFor(() => expect(firebase.database().ref().set).toBeCalled());
    });
  });

  describe('authenticated user', () => {
    it('should render app when user is authenticated', async () => {
      const mockedUser = {
        city: 'americana',
        email: 'some.user@domain.com',
        displayName: 'Complete user name 1',
        role: 'voter',
      };

      mockAuthenticatedUser(mockedUser);
      customRender();

      await waitForElementToBeRemoved(() => screen.getByTestId('page-loading'));

      const cityLink = screen.getByRole('link', {
        name: new RegExp(mockedUser.city, 'i'),
      });
      expect(cityLink).toBeInTheDocument();
    });

    it('should renders sign in form after user signs out', async () => {
      const mockedUser = {
        city: 'recife',
        email: 'some.user@domain.com',
        displayName: 'Complete user name 2',
        role: 'voter',
      };
      mockAuthenticatedUser(mockedUser);
      customRender();

      await waitForElementToBeRemoved(() => screen.getByTestId('page-loading'));

      const sidebarButton = screen.getByRole('button', { name: /abrir menu/i });
      user.click(sidebarButton);

      const usernameText = screen.getAllByText(
        new RegExp(mockedUser.displayName, 'i'),
      );
      expect(usernameText.length).toBe(2);

      const logoutButton = screen.getByRole('button', { name: /sair/i });
      user.click(logoutButton);

      expect(firebase.auth().signOut).toBeCalledWith();
    });
  });
  describe('A11y', () => {
    it('should not have violations', async () => {
      const { container } = customRender();
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
