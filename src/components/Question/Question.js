import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Alert, Label, FormText, FormGroup } from 'reactstrap';

import { ROLE_CANDIDATE } from 'constants/userRoles';

import { answersCollection } from 'constants/firestoreCollections';
import { CityContext } from 'components/CityProvider/CityProvider';
import { AnswersContext } from '../AnswersProvider/AnswersProvider';

import { TextArea } from './Question.styled';
import StatementExplanation from 'components/StatementExplanation/StatementExplanation';
import Statement from 'components/Statement/Statement';
import Decision from 'components/organisms/Decision';
import QuestionnaireAction from 'components/molecules/QuestionnaireActions';

const Question = ({ id, onSkip, onBack, value, user }) => {
  const { answers, updateAnswers } = useContext(AnswersContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const { push } = useHistory();
  const { firebase, currentUser, questionnaire, cityPath } = useContext(
    CityContext,
  );
  const { question, explanation } = questionnaire[id];

  const saveAnswer = (answer) => {
    storeAnswer(answer);

    const questionnaireLength = questionnaire.length;

    let minAnswered = questionnaireLength * 0.7;

    if (user.role === ROLE_CANDIDATE) {
      minAnswered = questionnaireLength;
    }

    if (
      id === questionnaireLength - 1 &&
      Object.values(answers).length === minAnswered
    ) {
      push(`${cityPath}/ranking`);
    }
  };

  const storeAnswer = (data) => {
    const answer = {
      [id]: data,
    };

    updateAnswers(answer);

    return firebase
      .firestore()
      .collection(answersCollection(user.role))
      .doc(currentUser.uid)
      .set(answer, { merge: true });
  };

  const handleDecisionChoice = (event) => {
    setErrorMessage(null);

    if (user.role === ROLE_CANDIDATE) {
      return;
    }

    saveAnswer({
      answer: event.target.value,
    });
  };

  const handlePrevious = () => {
    setErrorMessage(null);
    onBack();
  };

  const handleSkip = () => {
    setErrorMessage(null);
    onSkip();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!event.target.answer.value) {
      setErrorMessage('Escolha uma opção.');
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      return;
    }

    saveAnswer({
      answer: event.target.answer.value,
      justification: event.target.justification.value,
    });
  };

  return (
    <>
      <Statement number={id + 1} text={question} />

      {explanation && (
        <div className="mb-3">
          <StatementExplanation explanation={explanation} />
        </div>
      )}

      <Form onSubmit={handleSubmit} key={id + 1}>
        {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
        <Decision
          questionNumber={id + 1}
          answer={value && value.answer}
          handleDecisionChoice={handleDecisionChoice}
        />

        {user.role === ROLE_CANDIDATE && (
          <FormGroup className="my-4">
            <Label for="justification">Justificativa</Label>
            <TextArea
              name="justification"
              id="justification"
              maxLength={500}
              defaultValue={value && value.justification}
              placeholder="Explique o motivo de sua escolha."
            />
            <FormText>A justificativa é opcional.</FormText>
          </FormGroup>
        )}

        <QuestionnaireAction
          userRole={user.role}
          questionnaireLength={questionnaire.length}
          answersLength={Object.values(answers).length}
          questionIndex={id}
          onBack={handlePrevious}
          onSkip={handleSkip}
        />
      </Form>
    </>
  );
};

export default Question;
