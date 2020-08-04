import React from 'react';
import styled from 'styled-components';

import { Button as BootButton } from 'reactstrap';

import { getColor } from '../../src/styles/styles';

const StyledButton = styled(BootButton)`
  background-color: ${getColor};
  transition: filter 0.2s;
  will-change: filter, color;
  color: ${(props) => (props.light ? props.theme.darkGray : '#fff')};
  border-radius: 10px;
  font-size: 16px;
  font-weight: ${(props) => (props.bold ? 800 : 400)};

  &:hover {
    color: ${(props) => (props.light ? props.theme.darkGray : '#fff')};
    filter: brightness(0.9) contrast(1.2);
  }
`;

export const Button = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
);
