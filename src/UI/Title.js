import React from 'react';
import styled from 'styled-components';

import { getColor, getFontWeight, buildFontSize } from '../styles/styles';
import colors from '../styles/colors';

const StyledTitle = styled.h3`
  color: ${getColor};
  font-weight: ${getFontWeight};
  ${buildFontSize};
`;

export const Title = ({ tag = 'h3', children, ...props }) => (
  <StyledTitle as={tag} {...props}>
    {children}
  </StyledTitle>
);
