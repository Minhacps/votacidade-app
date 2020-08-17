import React, { useState } from 'react';
import styled from 'styled-components';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';

const InputContainer = styled.div`
  position: relative;
`;

const StyledEyeIcon = styled(EyeIcon)`
  position: absolute;
  top: 14px;
  right: 5px;
  width: 20px;
`;

const InputPassword = (props) => {
  const [showPassword, toggleShowPassword] = useState(false);

  return (
    <FormGroup>
      <Label for="password">Senha</Label>
      <InputContainer>
        <Input
          type={showPassword ? 'text' : 'password'}
          name="password"
          id="password"
          {...props}
        />
        {!props.invalid && (
          <StyledEyeIcon onClick={() => toggleShowPassword(!showPassword)} />
        )}
        <FormFeedback>Campo obrigatório</FormFeedback>
      </InputContainer>
    </FormGroup>
  );
};

export default InputPassword;
