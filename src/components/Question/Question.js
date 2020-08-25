import React, { useContext } from 'react';
import { Button, Form, Input } from 'reactstrap';
import { CityContext } from 'components/CityProvider/CityProvider';
import { Link } from 'react-router-dom';

import InfoIcon from 'assets/icons/info.svg';
import { QuestionOption, Checkmark, TextArea } from './Question.styled';

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
  const { firebase, currentUser, questionnaire, cityPath } = useContext(
    CityContext,
  );
  const { question, explanation } = questionnaire[id];

  const saveVoterAnswer = (event) => {
    if (user.role === 'candidate') {
      return;
    }

    saveAnswer({
      answer: event.target.value,
    });
  };

  const saveCandidateAnswer = (event) => {
    event.preventDefault();

    saveAnswer({
      answer: event.target.answer.value,
      justification: event.target.justification.value,
    });
  };

  const saveAnswer = (data) => {
    const answer = {
      [id]: data,
    };

    firebase
      .firestore()
      .collection('answers')
      .doc(currentUser.uid)
      .set(answer, { merge: true })
      .then(() => onSave(answer));
  };

  return (
    <Form onSubmit={saveCandidateAnswer} key={id + 1} className="m-4">
      <p>
        <span>{id + 1}. </span>
        <span>{question}</span>
      </p>

      {explanation && (
        <p>
          <img
            className="mr-1"
            src={InfoIcon}
            alt="Ícone com a lera I dentro de um círculo"
          />
          <small className="text-muted font-weight-bold">
            Entender melhor a questão
          </small>
        </p>
      )}

      <CustomRadio
        onChange={saveVoterAnswer}
        option="D"
        name="answer"
        value={value && value.answer}
        label="Discordo"
      />

      <CustomRadio
        onChange={saveVoterAnswer}
        option="DP"
        name="answer"
        value={value && value.answer}
        label="Discordo Plenamente"
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
        label="Concordo Plenamente"
      />

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

        {id === questionnaire.length - 1 && (
          <Button
            color="primary"
            tag={Link}
            to={`${cityPath}/ranking`}
            className="w-100 ml-3"
          >
            Finalizar
          </Button>
        )}

        {user.role === 'candidate' && (
          <Button color="primary" className="w-100 ml-4" outline>
            Responder
          </Button>
        )}
      </div>
    </Form>
  );
};

export default Question;
