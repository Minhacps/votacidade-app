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

const Question = ({ id, onSkip, onBack, value, user, minAnswers }) => {
  const { firebase, currentUser, questionnaire, cityPath } = useContext(
    CityContext,
  );
  const { answers, updateAnswers, getAnswersMap } = useContext(AnswersContext);
  const answersLength = Object.values(answers).length;

  const [errorMessage, setErrorMessage] = useState(null);
  const { push } = useHistory();
  const { question, explanation } = questionnaire[id];

  const saveAnswer = (data) => {
    const answer = {
      [id]: data,
    };

    setTimeout(() => {
      updateAnswers(answer);
    }, 500);

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

    // Last question.
    if (id === questionnaire.length - 1) {
      push(`${cityPath}/ranking`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!event.target.answer.value) {
      setErrorMessage('Escolha uma opção.');
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      return;
    }

    console.log('laksjlkdas');
    firebase
      .database()
      .ref(currentUser.uid)
      .set({
        ...user,
        answers: {
          ...getAnswersMap(),
          [id]: event.target.answer.value,
        },
      });

    saveAnswer({
      answer: event.target.answer.value,
      justification: event.target.justification.value,
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
          answersLength={answersLength}
          minAnswers={minAnswers}
          alreadyAnswered={value && value.answer ? true : false}
          questionIndex={id}
          onBack={handlePrevious}
          onSkip={handleSkip}
        />
      </Form>
    </>
  );
};

export default Question;
