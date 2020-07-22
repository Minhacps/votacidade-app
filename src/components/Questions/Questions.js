import React from 'react';
import Question from 'components/Question/Question';

const Questions = () => (
  <Question
    id={0}
    onSave={() => {
      console.log('salvou');
    }}
  />
);

export default Questions;
