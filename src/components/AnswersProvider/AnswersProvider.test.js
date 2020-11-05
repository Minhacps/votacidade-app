import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AnswersProvider, { AnswersContext } from './AnswersProvider';
import questionsService from './answersService';

const props = {
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
  <AnswersProvider {...props}>
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

    jest
      .spyOn(questionsService, 'syncAnswers')
      .mockResolvedValue();

    jest.clearAllMocks();
  });

  it('should return all stored questions', async () => {
    const mockedOnClick = jest.fn();
    render(<DataBroadcast onClick={mockedOnClick} />);

    fireEvent.click(await screen.findByRole('button', { name: 'Get answers' }));

    expect(mockedOnClick).toHaveBeenCalledWith(storedAnswers);
  });

  it('updates the list of answers', async () => {
    const newAnswer = { 2: { answer: 'D' } };
    const mockedOnClick = jest.fn();
    render(<DataBroadcast onClick={mockedOnClick} newAnswer={newAnswer} />);

    fireEvent.click(
      await screen.findByRole('button', { name: 'Update answers' }),
    );
    fireEvent.click(await screen.findByRole('button', { name: 'Get answers' }));

    const expectedState = {
      ...storedAnswers,
      ...newAnswer,
    };

    expect(mockedOnClick).toHaveBeenCalledWith(expectedState);
  });

  it('synchronize the list of answers in batch', async () => {
    render(
      <AnswersProvider {...props}>
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

    const addAnswerButton = await screen.findByRole('button', {
      name: 'Add answer',
    });

    fireEvent.click(addAnswerButton);
    expect(questionsService.syncAnswers).not.toBeCalled();

    fireEvent.click(addAnswerButton);
    expect(questionsService.syncAnswers).not.toBeCalled();

    fireEvent.click(addAnswerButton);
    expect(questionsService.syncAnswers).not.toBeCalled();

    fireEvent.click(addAnswerButton);
    expect(questionsService.syncAnswers).not.toBeCalled();

    fireEvent.click(addAnswerButton);
    expect(questionsService.syncAnswers).toBeCalledWith({
      firebase: props.firebase,
      user: props.user,
      currentUser: props.currentUser,
      answers: {
        ...storedAnswers,
        2: { answer: 'DT' },
        3: { answer: 'DT' },
        4: { answer: 'DT' },
        5: { answer: 'DT' },
        6: { answer: 'DT' },
      },
    });

    questionsService.syncAnswers.mockClear();

    fireEvent.click(addAnswerButton);
    expect(questionsService.syncAnswers).not.toBeCalled();

    fireEvent.click(addAnswerButton);
    expect(questionsService.syncAnswers).not.toBeCalled();

    fireEvent.click(addAnswerButton);
    expect(questionsService.syncAnswers).not.toBeCalled();

    fireEvent.click(addAnswerButton);
    expect(questionsService.syncAnswers).not.toBeCalled();

    fireEvent.click(addAnswerButton);
    expect(questionsService.syncAnswers).toBeCalledWith({
      firebase: props.firebase,
      user: props.user,
      currentUser: props.currentUser,
      answers: {
        ...storedAnswers,
        2: { answer: 'DT' },
        3: { answer: 'DT' },
        4: { answer: 'DT' },
        5: { answer: 'DT' },
        6: { answer: 'DT' },
        7: { answer: 'DT' },
        8: { answer: 'DT' },
        9: { answer: 'DT' },
        10: { answer: 'DT' },
        11: { answer: 'DT' },
      },
    });
  });

  it('synchronize answers when it is the last one', async () => {
    render(
      <AnswersProvider
        {...props}
        questionnaire={props.questionnaire.slice(0, 4)}
      >
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

    const addAnswerButton = await screen.findByRole('button', {
      name: 'Add answer',
    });

    fireEvent.click(addAnswerButton);
    expect(questionsService.syncAnswers).not.toBeCalled();

    fireEvent.click(addAnswerButton);
    expect(questionsService.syncAnswers).toBeCalledWith({
      firebase: props.firebase,
      user: props.user,
      currentUser: props.currentUser,
      answers: {
        ...storedAnswers,
        2: { answer: 'DT' },
        3: { answer: 'DT' },
      },
    });
  });
});
