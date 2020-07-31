import React, { useContext } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { CityContext } from 'components/CityProvider/CityProvider';
import { Link } from 'react-router-dom';

import InfoIcon from 'assets/icons/info.svg';

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
    <Form onChange={handleChange} key={id + 1}>
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

      <FormGroup tag="fieldset">
        <FormGroup check className="my-2">
          <Label check>
            <Input
              type="radio"
              id="answer-d"
              name="answer"
              value="D"
              defaultChecked={value === 'D'}
            />
            Discordo
          </Label>
        </FormGroup>

        <FormGroup check className="my-2">
          <Label check>
            <Input
              type="radio"
              name="answer"
              value="DP"
              defaultChecked={value === 'DP'}
            />
            Discordo Plenamente
          </Label>
        </FormGroup>

        <FormGroup check className="my-2">
          <Label check>
            <Input
              type="radio"
              name="answer"
              value="C"
              defaultChecked={value === 'C'}
            />
            Concordo
          </Label>
        </FormGroup>

        <FormGroup check className="my-2">
          <Label check>
            <Input
              type="radio"
              name="answer"
              value="CP"
              defaultChecked={value === 'CP'}
            />
            Concordo Plenamente
          </Label>
        </FormGroup>
      </FormGroup>

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
