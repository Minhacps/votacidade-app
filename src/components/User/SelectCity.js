import React from 'react';
import { CustomInput, FormGroup, Label, Button, Form } from 'reactstrap';
import { cidades } from 'data/cidades';
import { useForm } from 'react-hook-form';
import { alfabeticOrder } from '../../styles/helper';

export default function SelectCity() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async ({ city }) => {
    window.localStorage.setItem('userData', JSON.stringify({ city }));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label htmlFor="email">Selecione uma cidade</Label>
        <CustomInput
          type="select"
          name="city"
          id="city"
          innerRef={register({ required: true })}
          invalid={errors.city}
        >
          <option value="">Selecione...</option>
          {cidades.sort(alfabeticOrder('title')).map((city) => {
            return (
              <option key={city.value} value={city.value}>
                {city.title} ({city.state})
              </option>
            );
          })}
        </CustomInput>
      </FormGroup>
      <Button color="primary" block>
        Entrar
      </Button>
    </Form>
  );
}
