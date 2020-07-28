import React, { useContext } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { CityContext } from 'components/CityProvider/CityProvider';

const Question = ({ id, onSave, onSkip, onBack, value }) => {
  const { firebase, currentUser, questionnaire } = useContext(CityContext);
  const { question } = questionnaire[id];

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

      <div>
        {id > 0 && (
          <Button color="primary" outline type="button" onClick={onBack}>
            Voltar
          </Button>
        )}
        <Button color="primary" outline type="button" onClick={onSkip}>
          Pular
        </Button>
      </div>
    </Form>
  );
};

export default Question;
