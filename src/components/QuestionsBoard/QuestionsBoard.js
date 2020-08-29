import React, { useContext, useState, useEffect } from 'react';
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
  box-shadow: ${(props) => (props.color === '' ? '#D6D6D6 0pt 0pt 3pt' : '')};
  border: ${(props) => (props.color === '' ? '1pt solid #E6E6E6' : '')};
`;

export default function QuestionBoard() {
  const { firebase, currentUser, questionnaire } = useContext(CityContext);
  const [answers, setAnswers] = useState([]);
  console.log(answers);

  useEffect(() => {
    const getQuestions = () => {
      firebase
        .firestore()
        .collection('answers')
        .doc(currentUser.uid)
        .onSnapshot((doc) => {
          if (doc.exists) {
            const loadedAnswers = doc.data();
            setAnswers(loadedAnswers);
          }
        });
    };
    getQuestions();
  }, [currentUser.uid, firebase]);

  return (
    <div>
      <p>Questões</p>
      <BoardGrid>
        {questionnaire.map((_, index) => (
          <QuestionButton key={index} color={answers[index] ? 'primary' : ''}>
            {index + 1}
          </QuestionButton>
        ))}
      </BoardGrid>
    </div>
  );
}
