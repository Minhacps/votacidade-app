import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Alert, Label, FormText, FormGroup } from 'reactstrap';
import styled from 'styled-components';

import { ROLE_CANDIDATE } from 'constants/userRoles';

import { answersCollection } from 'constants/firestoreCollections';
import { CityContext } from 'components/CityProvider/CityProvider';
import { AnswersContext } from '../AnswersProvider/AnswersProvider';

import { TextArea } from './Question.styled';
import StatementExplanation from 'components/StatementExplanation/StatementExplanation';
import Statement from 'components/Statement/Statement';
import Decision from 'components/Decision/Decision';

const StyledForm = styled(Form)`
  max-width: 860px;
  margin: 0 auto;
  padding: 1.5rem;
`;

const Question = ({ id, onSave, onSkip, onBack, value, user }) => {
  const { updateAnswers } = useContext(AnswersContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const { push } = useHistory();
  const { firebase, currentUser, questionnaire, cityPath } = useContext(
    CityContext,
  );
  const { question, explanation } = questionnaire[id];

  const handleDecisionChoice = (event) => {
    setErrorMessage(null);

    if (user.role === ROLE_CANDIDATE) {
      return;
    }

    saveAnswer({
      answer: event.target.value,
    });

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

    saveAnswer({
      answer: event.target.answer.value,
      justification: event.target.justification.value,
    });

    if (id === questionnaire.length - 1) {
      push(`${cityPath}/ranking`);
    }
  };

  const saveAnswer = (data) => {
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

  return (
    <StyledForm onSubmit={handleSubmit} key={id + 1}>
      <Statement number={id + 1} text={question} />

      {explanation && (
        <div className="mb-3">
          <StatementExplanation explanation={explanation} />
        </div>
      )}

      {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
      <Decision
        handleDecisionChoice={handleDecisionChoice}
        answer={value && value.answer}
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

      <div className="d-flex">
        {id > 0 && (
          <Button
            color="primary"
            outline
            type="button"
            onClick={onBack}
            className="w-100 mr-4"
          >
            Anterior
          </Button>
        )}

        {id < questionnaire.length - 1 && (
          <Button
            color="primary"
            outline
            type="button"
            onClick={() => onSkip()}
            className="w-100  mr-4"
          >
            {user.role === ROLE_CANDIDATE ? 'Pular' : 'Próxima'}
          </Button>
        )}

        {user.role === ROLE_CANDIDATE && (
          <Button type="submit" color="primary" className="w-100" outline>
            {id === questionnaire.length - 1 ? 'Finalizar' : 'Responder'}
          </Button>
        )}
      </div>
    </StyledForm>
  );
};

export default Question;
