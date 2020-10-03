import React from 'react';

import {
  AnswerContainer,
  AnswerOption,
  AnswerCheckbox,
  Justification,
} from './Answer.styled';

const Answer = ({ isCandidate = false, answer, justification }) => {
  return (
    <>
      <AnswerContainer>
        <p>{isCandidate ? `Resposta do(a) candidato(a):` : `Sua resposta:`}</p>
        <AnswerOption isCandidate={isCandidate} isNotAnswered={!answer}>
          <AnswerCheckbox>{answer ? `✓` : ``}</AnswerCheckbox>
          {answer || `Você ainda não respondeu esta questão`}
        </AnswerOption>
      </AnswerContainer>

      {isCandidate && justification && (
        <Justification>
          <p>Justificativa:</p>
          <p>{justification}</p>
        </Justification>
      )}
    </>
  );
};

export default Answer;
