import React from 'react';
import styled from 'styled-components';

const StyledParagraph = styled.p`
  line-height: 1.7em;
`

const LongParagraph = ({ children, ...props }) => (
  <StyledParagraph {...props}>{children}</StyledParagraph>
);

export default LongParagraph;
