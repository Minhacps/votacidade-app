import React, { useEffect, useContext, useState } from 'react';
import Question from 'components/Question/Question';
import { CityContext } from 'components/CityProvider/CityProvider';

const Questions = () => {
  const { firebase, currentUser } = useContext(CityContext);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    firebase
      .firestore()
      .collection('answers')
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const loadedAnswers = doc.data();
          setAnswers(loadedAnswers);
          setCurrentQuestion(Number(Object.keys(loadedAnswers).pop() + 1) || 0);
        }
        setIsLoading(false);
      });
  }, []);

  const handleSave = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  if (isLoading) {
    return null;
  }

  return <Question id={currentQuestion} onSave={handleSave} />;
};

export default Questions;
