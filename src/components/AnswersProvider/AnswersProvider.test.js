import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AnswersProvider, { AnswersContext } from './AnswersProvider';
import questionsService from './answersService';

const defaultProps = {
  firebase: {},
  currentUser: { uid: '1' },
  user: { role: 'voter' },
  questionnaire: [
    { question: 'q1' },
    { question: 'q2' },
    { question: 'q3' },
    { question: 'q4' },
    { question: 'q5' },
    { question: 'q6' },
    { question: 'q7' },
    { question: 'q8' },
    { question: 'q9' },
    { question: 'q10' },
    { question: 'q11' },
    { question: 'q12' },
    { question: 'q13' },
  ],
};

const DataBroadcast = ({ onClick, newAnswer }) => (
  <AnswersProvider {...defaultProps}>
    <AnswersContext.Consumer>
      {({ answers, updateAnswers }) => (
        <>
          <button onClick={() => onClick(answers)}>Get answers</button>
          <button onClick={() => updateAnswers(newAnswer)}>
            Update answers
          </button>
        </>
      )}
    </AnswersContext.Consumer>
  </AnswersProvider>
);

const storedAnswers = { 0: { answer: 'DT' }, 1: { answer: 'CT' } };

describe('QuestionsProvider', () => {
  beforeEach(() => {
    jest
      .spyOn(questionsService, 'getAnsweredQuestions')
      .mockResolvedValue(storedAnswers);

    jest.spyOn(questionsService, 'syncAnswers').mockResolvedValue();

    jest.clearAllMocks();
  });

  it('should return all stored questions', async () => {
    const mockedOnClick = jest.fn();
    render(<DataBroadcast onClick={mockedOnClick} />);

    userEvent.click(await screen.findByRole('button', { name: 'Get answers' }));

    expect(mockedOnClick).toHaveBeenCalledWith(storedAnswers);
  });

  it('updates the list of answers', async () => {
    const newAnswer = { 2: { answer: 'D' } };
    const mockedOnClick = jest.fn();
    render(<DataBroadcast onClick={mockedOnClick} newAnswer={newAnswer} />);

    userEvent.click(
      await screen.findByRole('button', { name: 'Update answers' }),
    );
    userEvent.click(await screen.findByRole('button', { name: 'Get answers' }));

    const expectedState = {
      ...storedAnswers,
      ...newAnswer,
    };

    expect(mockedOnClick).toHaveBeenCalledWith(expectedState);
  });

  describe('Batch updates', () => {
    const customRender = (customProps) =>
      render(
        <AnswersProvider {...defaultProps} {...customProps}>
          <AnswersContext.Consumer>
            {({ answers, updateAnswers }) => (
              <>
                <button
                  onClick={() =>
                    updateAnswers({
                      [Object.keys(answers).length]: { answer: 'DT' },
                    })
                  }
                >
                  Add answer
                </button>
              </>
            )}
          </AnswersContext.Consumer>
        </AnswersProvider>,
      );

    it('should synchronize answers once the user reaches the limit of 5 new answers', async () => {
      customRender();

      const addAnswerButton = await screen.findByRole('button', {
        name: 'Add answer',
      });

      for (let i = 0; i < 10; i++) {
        userEvent.click(addAnswerButton);
      }

      const expectedParams = {
        firebase: defaultProps.firebase,
        user: defaultProps.user,
        currentUser: defaultProps.currentUser,
        answers: {
          ...storedAnswers,
          2: { answer: 'DT' },
          3: { answer: 'DT' },
          4: { answer: 'DT' },
          5: { answer: 'DT' },
          6: { answer: 'DT' },
        },
      };

      expect(questionsService.syncAnswers).toBeCalledTimes(2);
      expect(questionsService.syncAnswers).toHaveBeenNthCalledWith(
        1,
        expectedParams,
      );
      expect(questionsService.syncAnswers).toHaveBeenNthCalledWith(2, {
        ...expectedParams,
        answers: {
          ...expectedParams.answers,
          7: { answer: 'DT' },
          8: { answer: 'DT' },
          9: { answer: 'DT' },
          10: { answer: 'DT' },
          11: { answer: 'DT' },
        },
      });
    });

    it('should synchronize answers once the user finishes the questionnaire', async () => {
      customRender({ questionnaire: defaultProps.questionnaire.slice(0, 4) });

      const addAnswerButton = await screen.findByRole('button', {
        name: 'Add answer',
      });

      userEvent.click(addAnswerButton);
      expect(questionsService.syncAnswers).not.toBeCalled();

      userEvent.click(addAnswerButton);
      expect(questionsService.syncAnswers).toBeCalledTimes(1);
      expect(questionsService.syncAnswers).toBeCalledWith({
        firebase: defaultProps.firebase,
        user: defaultProps.user,
        currentUser: defaultProps.currentUser,
        answers: {
          ...storedAnswers,
          2: { answer: 'DT' },
          3: { answer: 'DT' },
        },
      });
    });
  });
});
