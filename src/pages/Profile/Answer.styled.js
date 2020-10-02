import styled from 'styled-components';
import colors from 'styles/colors';

const getAnswerColor = ({ isCandidate, isNotAnswered }) => {
  if (isCandidate) {
    return colors.purple;
  }
  if (!isNotAnswered && !isCandidate) {
    return colors.orangeLight;
  }

  if (isNotAnswered && !isCandidate) {
    return colors.textMuted;
  }
};

export const AnswerContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;

  & > p {
    color: ${colors.grey400};
    font-size: 12px;
    margin: 0 0 5px 0;
  }
`;

export const AnswerCheckbox = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 3px;
  margin-right: 10px;
  color: #fff;
  text-align: center;
`;

export const AnswerOption = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  font-size: 14px;
  padding: 0 12px;
  border-radius: 3px;

  border: 1px solid;
  border-left: 4px solid;
  border-color: ${getAnswerColor};

  & > ${AnswerCheckbox} {
    background-color: ${getAnswerColor};
  }
`;

export const Justification = styled.div`
  font-size: 14px;
  margin: 0;

  & > p:first-child {
    font-weight: 500;
    margin-bottom: 0;
  }
`;
