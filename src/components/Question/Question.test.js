import React from 'react';
import { render, screen } from '@testing-library/react';

import Question from './Question';

import { ROLE_VOTER } from 'constants/userRoles';

import CityProvider from 'components/CityProvider/CityProvider';
import AnswersProvider from 'components/AnswersProvider/AnswersProvider';
import questionsService from 'components/AnswersProvider/answersService';
import { BrowserRouter } from 'react-router-dom';

const storedAnswers = { 0: { answer: 'DT' }, 1: { answer: 'CT' } };
beforeEach(() => {
  jest
    .spyOn(questionsService, 'getAnsweredQuestions')
    .mockImplementation(() => Promise.resolve(storedAnswers));
});

jest.mock('components/CityProvider/CityProvider');

describe('Question', () => {
  it('renders the provided question', async () => {
    const mockedUser = { role: ROLE_VOTER };

    render(
      <BrowserRouter>
        <CityProvider>
          <Question user={mockedUser} id={1} />
        </CityProvider>
      </BrowserRouter>,
      {
        wrapper: AnswersProvider,
      },
    );

    expect(await screen.findByText('Any question title 2')).toBeInTheDocument();

    expect(screen.getByLabelText('Discordo')).toBeInTheDocument();
  });
});
