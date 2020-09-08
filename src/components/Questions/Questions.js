import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { CANDIDATE } from 'constants/userRoles';
import Question from 'components/Question/Question';
import { CityContext } from 'components/CityProvider/CityProvider';
import { answersCollection } from 'constants/firestoreCollections';

const Questions = ({ user }) => {
  const location = useLocation();
  const { firebase, currentUser, questionnaire } = useContext(CityContext);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const questionQuery = location.search?.substring(1);
    const getFirstUnansweredQuestion = (loadedAnswers) => {
      const answersKeys = Object.keys(loadedAnswers);
      const questionsKeys = Object.keys(questionnaire);
      return Number(
        questionsKeys.filter(
          (questionIndex) => !answersKeys.includes(questionIndex),
        )[0] || questionnaire.length - 1,
      );
    };

    firebase
      .firestore()
      .collection(answersCollection(user.role))
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const loadedAnswers = doc.data();
          setAnswers(loadedAnswers);

          if (location.search) {
            setCurrentQuestion(Number(questionQuery - 1));
          } else {
            setCurrentQuestion(getFirstUnansweredQuestion(loadedAnswers));
          }
        }
        if (location.search) {
          setCurrentQuestion(Number(questionQuery - 1));
        }
        setIsLoading(false);
      });
  }, [user, firebase, currentUser.uid, questionnaire, location]);

  const handleNext = (answer) => {
    const updatedAnswers = {
      ...answers,
      ...answer,
    };

    setAnswers(updatedAnswers);

    if (currentQuestion !== questionnaire.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      {user.role === CANDIDATE && showAlert ? (
        <div
          style={{ maxWidth: '818px', margin: '20px auto 0' }}
          className="alert alert-primary alert-dismissible fade show"
          role="alert"
        >
          <strong>Candidato(a),</strong> Você precisa responder 100% das
          questões para aparecer no ranking.
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => setShowAlert(false)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) : null}
      <Question
        id={currentQuestion}
        onSave={handleNext}
        onSkip={handleNext}
        onBack={handleBack}
        value={answers && answers[currentQuestion]}
        user={user}
      />
    </>
  );
};

export default Questions;
