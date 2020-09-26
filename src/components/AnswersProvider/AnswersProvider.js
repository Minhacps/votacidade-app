import React, { useEffect, useState } from 'react';
import questionsService from './answersService';

export const AnswersContext = React.createContext();

const AnswersProvider = ({ firebase, currentUser, user, children }) => {
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
    setAnswers({
      ...answers,
      ...newAnswer,
    });
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
