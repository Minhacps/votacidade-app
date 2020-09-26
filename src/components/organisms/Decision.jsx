import React from 'react';
import { FormGroup } from 'reactstrap';

import Option from 'components/molecules/Option/Option';

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
    name: "Concordo Totalmente"
  },
];

const Decision = ({ questionNumber, answer, handleDecisionChoice }) => {
  return (
    <FormGroup>
      {options.map(option => (
        <Option
          key={`${questionNumber}-${option.id}`}
          option={option.id}
          label={option.name}
          value={answer}
          onChange={handleDecisionChoice}
        />
      ))}
    </FormGroup>
  );
};

export default Decision;
