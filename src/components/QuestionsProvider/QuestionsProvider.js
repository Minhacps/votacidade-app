import React, { useEffect, useState } from 'react';
import questionsService from './questionsService';

export const QuestionsContext = React.createContext();

const QuestionsProvider = ({ firebase, currentUser, user, children }) => {
  const [answers, setAnswers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    questionsService
      .getAnsweredQuestions({ firebase, currentUser, user })
      .then((answers) => {
        setAnswers(answers);
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

  if (isLoading) {
    return null;
  }

  return (
    <QuestionsContext.Provider
      value={{
        answers,
        updateAnswers,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsProvider;
