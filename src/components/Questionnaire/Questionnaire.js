import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { ROLE_CANDIDATE } from 'constants/userRoles';
import Question from 'components/Question/Question';
import { CityContext } from 'components/CityProvider/CityProvider';
import { AnswersContext } from '../AnswersProvider/AnswersProvider';

const Questionnaire = ({ user }) => {
  const location = useLocation();
  const history = useHistory();
  const { answers } = useContext(AnswersContext);
  const { questionnaire } = useContext(CityContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const getFirstUnansweredQuestion = (loadedAnswers) => {
      const answersKeys = Object.keys(loadedAnswers);
      const questionsKeys = Object.keys(questionnaire);
      return Number(
        questionsKeys.filter(
          (questionIndex) => !answersKeys.includes(questionIndex),
        )[0] || questionnaire.length - 1,
      );
    };

    setCurrentQuestion(getFirstUnansweredQuestion(answers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, questionnaire]);

  useEffect(() => {
    const questionQuery = location.search?.substring(1);

    if (location.search) {
      setCurrentQuestion(Number(questionQuery - 1));
      history.push(location.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleSkip = (answer) => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleBack = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  return (
    <>
      {user.role === ROLE_CANDIDATE && showAlert ? (
        <div
          style={{ maxWidth: '818px', margin: '20px auto 0' }}
          className="alert alert-primary alert-dismissible fade show"
          role="alert"
        >
          <strong>Candidato(a),</strong> você precisa responder 100% das
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
        onSkip={handleSkip}
        onBack={handleBack}
        value={answers && answers[currentQuestion]}
        user={user}
      />
    </>
  );
};

export default Questionnaire;
