import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import firebase from 'firebase/app';

const Question = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const fields = event.target.elements;
    if (fields.answer) {
      const userId = firebase.auth().currentUser.uid;

      firebase.firestore().collection('answers').doc(userId).set({
        1: fields.answer.value,
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente
        consequatur iste soluta ut unde, non expedita, ipsam deserunt voluptatem
        tempore illo! Ex aperiam quibusdam sequi, ab earum molestiae mollitia
        nesciunt!
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
