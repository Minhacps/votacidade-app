import React, { useState } from 'react';
import {
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InputPassword = (props) => {
  const [showPassword, toggleShowPassword] = useState(false);

  return (
    <FormGroup>
      <Label for="password">Senha</Label>
      <InputGroup>
        <Input
          type={showPassword ? 'text' : 'password'}
          name="password"
          id="password"
          placeholder={props.placeholder}
          className={!props.invalid ? 'border-right-0' : 'rounded-right'}
          {...props}
        />
        {props.errors.password?.type === 'required' && (
          <FormFeedback>Campo obrigatório</FormFeedback>
        )}
        {props.errors.password?.type === 'minLength' && (
          <FormFeedback>A senha deve ter no mínimo 6 caracteres</FormFeedback>
        )}

        {!props.invalid && (
          <InputGroupAddon addonType="append">
            <InputGroupText
              className="bg-transparent"
              role="button"
              title={
                !props.invalid &&
                (showPassword ? 'Ocultar senha' : 'Mostrar senha')
              }
              onClick={() => toggleShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </InputGroupText>
          </InputGroupAddon>
        )}
      </InputGroup>
    </FormGroup>
  );
};

export default InputPassword;
