import colors from 'styles/colors';
import styled from 'styled-components';
import { Button } from 'reactstrap';

export const PrimaryButton = styled(Button)`
  background-color: ${colors.purple};
  font-size: 14px;
  height: 45px;
  border-color: ${colors.purple};
  text-transform: uppercase;

  :hover,
  :focus {
    background-color: ${colors.purple};
  }
`;

export const OutlineButton = styled(Button)`
  background-color: #fff;
  font-size: 14px;
  height: 45px;
  color: ${colors.purple};
  border: 2px solid ${colors.purple};
  text-transform: uppercase;

  :hover,
  :focus {
    color: ${colors.purple};
    background-color: #fff;
    border: 2px solid ${colors.purple};
  }
`;
