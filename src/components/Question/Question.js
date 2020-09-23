import React, { useState, useContext } from 'react';
import { Form, Input, Button, Alert } from 'reactstrap';

import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { answersCollection } from 'constants/firestoreCollections';
import { CityContext } from 'components/CityProvider/CityProvider';

import { QuestionOption, Checkmark, TextArea } from './Question.styled';
import StatementExplanation from 'components/StatementExplanation/StatementExplanation';
import { AnswersContext } from '../AnswersProvider/AnswersProvider';

const TitleQuestion = styled.span`
  font-size: 18px;
`;

const StyledForm = styled(Form)`
  max-width: 860px;
  margin: 0 auto;
  padding: 1.5rem;
`;

const CustomRadio = ({ option, label, value, onChange }) => (
  <QuestionOption>
    <Input
      onChange={onChange}
      type="radio"
      id={`answer-${option}`}
      name="answer"
      value={option}
      defaultChecked={value === option}
    />
    <Checkmark />
    <label htmlFor={`answer-${option}`}>{label}</label>
  </QuestionOption>
);

const Question = ({ id, onSkip, onBack, value, user }) => {
  const { updateAnswers, getAnswersMap } = useContext(AnswersContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const { push } = useHistory();
  const { firebase, currentUser, questionnaire, cityPath } = useContext(
    CityContext,
  );
  const { question, explanation } = questionnaire[id];

  const saveVoterAnswer = (event) => {
    setErrorMessage(null);

    if (user.role === 'candidate') {
      return;
    }

    saveAnswer({
      answer: event.target.value,
    });

    if (id === questionnaire.length - 1) {
      push(`${cityPath}/ranking`);
    }
  };

  const saveCandidateAnswer = (event) => {
    event.preventDefault();

    if (!event.target.answer.value) {
      setErrorMessage('Escolha uma opção');
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
    <StyledForm onSubmit={saveCandidateAnswer} key={id + 1}>
      <p>
        <TitleQuestion>{id + 1}. </TitleQuestion>
        <TitleQuestion>{question}</TitleQuestion>
      </p>

      {explanation && (
        <div className="mb-3">
          <StatementExplanation explanation={explanation} />
        </div>
      )}

      <CustomRadio
        onChange={saveVoterAnswer}
        option="DT"
        name="answer"
        value={value && value.answer}
        label="Discordo Totalmente"
      />

      <CustomRadio
        onChange={saveVoterAnswer}
        option="D"
        name="answer"
        value={value && value.answer}
        label="Discordo"
      />

      <CustomRadio
        onChange={saveVoterAnswer}
        option="C"
        name="answer"
        value={value && value.answer}
        label="Concordo"
      />

      <CustomRadio
        onChange={saveVoterAnswer}
        option="CT"
        name="answer"
        value={value && value.answer}
        label="Concordo Totalmente"
      />

      {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

      {user.role === 'candidate' ? (
        <div style={{ margin: '20px 0 15px' }} className="d-block">
          <label htmlFor="justification">
            Justificativa <small>(opcional)</small>
          </label>
          <TextArea
            name="justification"
            id="justification"
            maxLength={500}
            defaultValue={value && value.justification}
          />
        </div>
      ) : null}

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
            {user.role === 'candidate' ? 'Pular' : 'Próxima'}
          </Button>
        )}

        {user.role === 'candidate' && (
          <Button color="primary" className="w-100" outline>
            {id === questionnaire.length - 1 ? 'Finalizar' : 'Responder'}
          </Button>
        )}
      </div>
    </StyledForm>
  );
};

export default Question;
