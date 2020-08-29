import React, { useContext } from 'react';
import { Button } from 'reactstrap';
import { CityContext } from 'components/CityProvider/CityProvider';
import styled from 'styled-components';

const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: 40px 40px 40px 40px 40px;
  grid-gap: 10px;
`;

const QuestionButton = styled(Button)`
  padding: 0px;
  height: 40px;
`;

export default function QuestionBoard() {
  const { questionnaire } = useContext(CityContext);

  return (
    <div>
      <p>Questões</p>
      <BoardGrid>
        {questionnaire.map((_, index) => (
          <QuestionButton key={index} color="primary">
            {index + 1}
          </QuestionButton>
        ))}
      </BoardGrid>
    </div>
  );
}
