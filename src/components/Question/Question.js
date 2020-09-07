import React, { useState, useContext } from 'react';
import {
  Form,
  Input,
  UncontrolledCollapse,
  Button,
  CardBody,
  Card,
  Alert,
} from 'reactstrap';

import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { answersCollection } from 'constants/firestoreCollections';
import { CityContext } from 'components/CityProvider/CityProvider';
import InfoIcon from 'assets/icons/info.svg';

import { QuestionOption, Checkmark, TextArea } from './Question.styled';
import StatementExplanation from 'components/StatementExplanation/StatementExplanation';

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

const Question = ({ id, onSave, onSkip, onBack, value, user }) => {
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

    firebase
      .firestore()
      .collection(answersCollection(user.role))
      .doc(currentUser.uid)
      .set(answer, { merge: true })
      .then(() => onSave(answer));
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
        option="DP"
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
        option="CP"
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
            Voltar
          </Button>
        )}

        {id < questionnaire.length - 1 && (
          <Button
            color="primary"
            outline
            type="button"
            onClick={() => onSkip()}
            className="w-100"
          >
            Pular
          </Button>
        )}

        {user.role === 'candidate' && (
          <Button color="primary" className="w-100 ml-4" outline>
            {id === questionnaire.length - 1 ? 'Finalizar' : 'Responder'}
          </Button>
        )}
      </div>
    </StyledForm>
  );
};

export default Question;
