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
import { ROLE_VOTER } from '../../constants/userRoles';

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

    const allAnswers = {
      ...answers,
      ...answer,
    };
    const currentAnswersSize = Object.keys(allAnswers).length;

    setTimeout(() => {
      updateAnswers(answer);
    }, 500);

    firebase
      .firestore()
      .collection(answersCollection(user.role))
      .doc(currentUser.uid)
      .set(answer, { merge: true });

    // Last question.
    const candidateCondition =
      user.role === ROLE_CANDIDATE && currentAnswersSize === minAnswers;
    const voterCondition =
      user.role === ROLE_VOTER && currentAnswersSize === questionnaire.length;

    if (candidateCondition || voterCondition) {
      push(`${cityPath}/ranking`);
    }
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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!event.target.answer.value) {
      setErrorMessage('Escolha uma opção.');
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      return;
    }

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

      {explanation && <StatementExplanation explanation={explanation} />}

      <Form onSubmit={handleSubmit} key={id + 1} className="mt-4">
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
          questionIndex={id}
          onBack={handlePrevious}
          onSkip={handleSkip}
        />
      </Form>
    </>
  );
};

export default Question;
