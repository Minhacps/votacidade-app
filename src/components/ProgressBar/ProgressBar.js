import React, { useContext, useEffect, useState } from 'react';
import { Progress } from 'reactstrap';
import {
  ProgressBarContainer,
  ProgressBarTitle,
  ProgressBarLabel,
  ProgressBarContent,
} from './ProgressBar.styled';
import { CityContext } from '../CityProvider/CityProvider';
import { QuestionsContext } from '../QuestionsProvider/QuestionsProvider';

const ProgressBar = () => {
  const { questionnaire } = useContext(CityContext);
  const { answers } = useContext(QuestionsContext);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const calculateProgress = () => {
      if (!answers) {
        return 0;
      }

      const answersKeys = Object.keys(answers);
      const questionsKeys = Object.keys(questionnaire);
      return Number((answersKeys.length / questionsKeys.length) * 100).toFixed(
        0,
      );
    };

    setProgress(calculateProgress());
  }, [answers, questionnaire]);

  return (
    <ProgressBarContainer progress={progress}>
      <ProgressBarContent>
        <ProgressBarTitle>Seu progresso</ProgressBarTitle>
        <ProgressBarLabel>{progress}% completo</ProgressBarLabel>
        <Progress value={progress} />
      </ProgressBarContent>
    </ProgressBarContainer>
  );
};

export default ProgressBar;
