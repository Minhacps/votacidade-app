import React from 'react';
import { Progress } from 'reactstrap';
import {
  ProgressBarContainer,
  ProgressBarTitle,
  ProgressBarLabel,
  ProgressBarContent,
} from './ProgressBar.styled';

const ProgressBar = ({ progress }) => (
  <ProgressBarContainer progress={progress}>
    <ProgressBarContent>
      <ProgressBarTitle>Seu progresso</ProgressBarTitle>
      <ProgressBarLabel>{progress}% completo</ProgressBarLabel>
      <Progress value={progress} />
    </ProgressBarContent>
  </ProgressBarContainer>
);

export default ProgressBar;
