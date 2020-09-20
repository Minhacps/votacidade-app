import React from 'react';
import styled from 'styled-components';

const TitleQuestion = styled.span`
  font-size: 18px;
`;

const Statement = ({ order, text }) =>
  (
    <p>
      <TitleQuestion>{order}. </TitleQuestion>
      <TitleQuestion>{text}</TitleQuestion>
    </p>
  );

export default Statement;
