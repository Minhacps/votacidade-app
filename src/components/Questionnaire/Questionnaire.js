import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Alert, Col, Container, Row } from 'reactstrap';

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
  const [alertVisible, setAlertVisible] = useState(true);

  const minAnswers =
    user.role === ROLE_CANDIDATE
      ? questionnaire.length
      : questionnaire.length * 0.7;

  const onDismiss = () => setAlertVisible(false);

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

  const handleSkip = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleBack = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs="12" md="9">
          {user.role === ROLE_CANDIDATE && (
            <Alert color="primary" isOpen={alertVisible} toggle={onDismiss}>
              <strong>Candidato(a)</strong>, você precisa responder 100% das
              questões para aparecer no ranking.
            </Alert>
          )}

          <Question
            id={currentQuestion}
            onSkip={handleSkip}
            onBack={handleBack}
            value={answers && answers[currentQuestion]}
            user={user}
            minAnswers={minAnswers}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Questionnaire;
