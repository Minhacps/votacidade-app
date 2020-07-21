import React from 'react';
import { Progress } from 'reactstrap';
import {
  ProgressBarContainer,
  ProgressBarTitle,
  ProgressBarLabel,
} from './ProgressBar.styled';

const ProgressBar = ({ progress }) => (
  <ProgressBarContainer>
    <ProgressBarTitle>Seu progresso</ProgressBarTitle>
    <ProgressBarLabel>{progress}% completo</ProgressBarLabel>
    <Progress value={progress} />
  </ProgressBarContainer>
);

export default ProgressBar;
