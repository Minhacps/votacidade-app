import React from 'react';
import { render, fireEvent, screen, wait } from '@testing-library/react';
import QuestionsProvider, { QuestionsContext } from './QuestionsProvider';
import questionsService from './questionsService';

const DataBroadcast = ({ onClick, newAnswer }) => (
  <QuestionsProvider>
    <QuestionsContext.Consumer>
      {({ answers, updateAnswers }) => (
        <>
          <button onClick={() => onClick(answers)}>Get answers</button>
          <button onClick={() => updateAnswers(newAnswer)}>
            Update answers
          </button>
        </>
      )}
    </QuestionsContext.Consumer>
  </QuestionsProvider>
);

describe('QuestionsProvider', () => {
  const storedAnswers = { 0: { answer: 'DT' }, 1: { answer: 'CT' } };
  beforeEach(() => {
    jest
      .spyOn(questionsService, 'getAnsweredQuestions')
      .mockImplementation(() => Promise.resolve(storedAnswers));
  });

  it('should return all stored questions', async () => {
    const mockedOnClick = jest.fn();
    render(<DataBroadcast onClick={mockedOnClick} />);

    await wait(() => {
      fireEvent.click(screen.getByText('Get answers'));
    });

    expect(mockedOnClick).toHaveBeenCalledWith(storedAnswers);
  });

  it('updates the list of answers', async () => {
    const newAnswer = { 2: { answer: 'D' } };
    const mockedOnClick = jest.fn();
    render(<DataBroadcast onClick={mockedOnClick} newAnswer={newAnswer} />);

    await wait(() => {
      fireEvent.click(screen.getByText('Update answers'));
      fireEvent.click(screen.getByText('Get answers'));
    });

    const expectedState = {
      ...storedAnswers,
      ...newAnswer,
    };

    expect(mockedOnClick).toHaveBeenCalledWith(expectedState);
  });
});
