import React from 'react';
import { Input, Label } from 'reactstrap';

import { QuestionOption, Checkmark } from './Option.styled';

const Option = ({ option, label, value, onChange }) => (
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
    <Label for={`answer-${option}`}>{label}</Label>
  </QuestionOption>
);

export default Option;
