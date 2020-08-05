import React, { useContext } from 'react';
import { Button, Form, Input } from 'reactstrap';
import { CityContext } from 'components/CityProvider/CityProvider';
import { Link } from 'react-router-dom';

import InfoIcon from 'assets/icons/info.svg';
import { QuestionOption, Checkmark, QuestionTitle } from './Question.styled';

const CustomRadio = ({ option, label, value }) => (
  <QuestionOption>
    <Input
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

const Question = ({ id, onSave, onSkip, onBack, value }) => {
  const { firebase, currentUser, questionnaire, cityPath } = useContext(
    CityContext,
  );
  const { question, explanation } = questionnaire[id];

  const handleChange = (event) => {
    const { value } = event.target;

    const answer = {
      [id]: value,
    };

    firebase
      .firestore()
      .collection('answers')
      .doc(currentUser.uid)
      .set(answer, { merge: true })
      .then(() => onSave(answer));
  };

  return (
    <Form onChange={handleChange} key={id + 1} className="mt-4 mx-3">
      <QuestionTitle>
        <strong>{id + 1}. </strong>
        <span>{question}</span>
      </QuestionTitle>

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

      <CustomRadio option="D" value={value} label="Discordo" />

      <CustomRadio option="DP" value={value} label="Discordo Plenamente" />

      <CustomRadio option="C" value={value} label="Concordo" />

      <CustomRadio option="CP" value={value} label="Concordo Plenamente" />

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
            className="w-100 ml-4"
          >
            Finalizar
          </Button>
        )}
      </div>
    </Form>
  );
};

export default Question;
