import styled from 'styled-components';
import colors from 'styles/colors';

export const QuestionTitle = styled.p`
  font-size: 14px;
  color: ${colors.grey500};

  strong {
    color: ${colors.purple};
    font-weight: bold;
  }
`;

export const Checkmark = styled.span`
  width: 15px;
  height: 15px;
  border-radius: 100%;
  background: #fff;
  border: 1px solid ${colors.purple};
  position: absolute;
  display: block;
  top: 50%;
  transform: translateY(-50%);
  left: 12px;
  transition: 0.2s all ease;
`;

export const QuestionOption = styled.div`
  position: relative;
  margin-bottom: 15px;

  label {
    transition: 0.2s all ease;
    border-radius: 3px;
    border: 1px solid #e6e6e6;
    box-shadow: 0 0 3px #00000029;
    width: 100%;
    padding: 16px 16px 16px 42px;
    margin: 0;
  }

  input {
    opacity: 0;
  }

  input:checked ~ ${Checkmark} {
    background: ${colors.purple};
  }

  input:checked ~ label {
    box-shadow: none;
    border-color: ${colors.purple};
    border-left-width: 3px;
  }

  input:focus ~ label {
    border-color: ${colors.purple};
  }
`;
