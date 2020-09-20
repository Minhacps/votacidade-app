import React from 'react';
import { FormGroup, Input } from 'reactstrap';

import { QuestionOption, Checkmark } from 'components/Question/Question.styled';

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

const options = [
  {
    id: "DT",
    name: "Discordo Totalmente"
  },
  {
    id: "D",
    name: "Discordo"
  },
  {
    id: "C",
    name: "Concordo"
  },
  {
    id: "CT",
    name: "Discordo Totalmente"
  },
];

const Decision = ({ handleDecisionChoice, answer }) => {
  return (
    <FormGroup>
      {options.map(option => (
        <CustomRadio
          onChange={handleDecisionChoice}
          option={option.id}
          name="answer"
          value={answer}
          label={option.name}
        />
      ))}
    </FormGroup>
  );
};

export default Decision;
