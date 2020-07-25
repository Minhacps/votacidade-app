import React, { useContext } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { CityContext } from 'components/CityProvider/CityProvider';

const Question = ({ id, onSave }) => {
  const { firebase, currentUser, questionnaire } = useContext(CityContext);
  const question = questionnaire[0].question;

  const handleSubmit = (event) => {
    event.preventDefault();
    const fields = event.target.elements;

    if (!fields.answer.value) {
      return;
    }

    firebase
      .firestore()
      .collection('answers')
      .doc(currentUser.uid)
      .set({
        [id]: fields.answer.value,
      })
      .then(onSave);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <p>
        {id}
        {question}
      </p>

      <FormGroup tag="fieldset">
        <FormGroup check className="my-2">
          <Label check>
            <Input type="radio" id="answer-d" name="answer" value="D" />
            Discordo
          </Label>
        </FormGroup>

        <FormGroup check className="my-2">
          <Label check>
            <Input type="radio" name="answer" value="DP" />
            Discordo Plenamente
          </Label>
        </FormGroup>

        <FormGroup check className="my-2">
          <Label check>
            <Input type="radio" name="answer" value="C" />
            Concordo
          </Label>
        </FormGroup>

        <FormGroup check className="my-2">
          <Label check>
            <Input type="radio" name="answer" value="CP" />
            Concordo Plenamente
          </Label>
        </FormGroup>
      </FormGroup>

      <Button>Salvar</Button>
    </Form>
  );
};

export default Question;
