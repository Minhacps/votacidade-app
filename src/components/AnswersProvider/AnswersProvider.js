import React, { useEffect, useState } from 'react';
import questionsService from './answersService';

export const AnswersContext = React.createContext();

const answersToCollectBeforeSync = 5;

const AnswersProvider = ({
  firebase,
  currentUser,
  user,
  children,
  questionnaire,
}) => {
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [answersOutOfSync, setAnswersOutOfSync] = useState(0);

  useEffect(() => {
    questionsService
      .getAnsweredQuestions({ firebase, currentUser, user })
      .then((answers) => {
        setAnswers(answers || {});
        setIsLoading(false);
      });

    // this useEffect should be executed only once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateAnswers = (newAnswer) => {
    const answersCounter = answersOutOfSync + 1;
    const updatedAnswers = {
      ...answers,
      ...newAnswer,
    };
    const isLastQuestion =
      Object.keys(updatedAnswers).length === questionnaire.length;

    setAnswers(updatedAnswers);
    setAnswersOutOfSync(answersCounter);

    if (isLastQuestion || answersCounter === answersToCollectBeforeSync) {
      questionsService.syncAnswers({
        firebase,
        currentUser,
        user,
        answers: updatedAnswers,
      });
      setAnswersOutOfSync(0);
    }
  };

  const getAnswersMap = () =>
    Object.keys(answers).reduce((accumulator, item) => {
      return {
        ...accumulator,
        [item]: answers[item].answer,
      };
    }, {});

  if (isLoading) {
    return null;
  }

  return (
    <AnswersContext.Provider
      value={{
        answers,
        updateAnswers,
        getAnswersMap,
      }}
    >
      {children}
    </AnswersContext.Provider>
  );
};

export default AnswersProvider;
