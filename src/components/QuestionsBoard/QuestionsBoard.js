import React, { useContext } from 'react';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { CityContext } from 'components/CityProvider/CityProvider';
import { SidebarContext } from 'components/Sidebar/SidebarProvider';
import { AnswersContext } from '../AnswersProvider/AnswersProvider';

const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: 40px 40px 40px 40px 40px;
  grid-gap: 10px;
`;

const QuestionButton = styled(Button)`
  padding: 0px;
  height: 40px;
  box-shadow: ${(props) => (props.color === '' ? '#D6D6D6 0pt 0pt 3pt' : '')};
  border: ${(props) => (props.color === '' ? '1pt solid #E6E6E6' : '')};
`;

export default function QuestionBoard() {
  const history = useHistory();
  const { questionnaire, cityPath } = useContext(CityContext);
  const { answers } = useContext(AnswersContext);
  const { toggleSidebar } = useContext(SidebarContext);

  return (
    <div>
      <p>Questões</p>
      <BoardGrid>
        {questionnaire.map((_, index) => (
          <QuestionButton
            key={index}
            color={answers[index] ? 'primary' : ''}
            onClick={() => {
              history.push({
                pathname: `${cityPath}/questionario`,
                search: `${index + 1}`,
              });

              toggleSidebar();
            }}
          >
            {index + 1}
          </QuestionButton>
        ))}
      </BoardGrid>
    </div>
  );
}
