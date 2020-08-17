import React from 'react';
import styled from 'styled-components';

import { ReactComponent as ArrowIcon } from 'assets/icons/arrow.svg';

const StyledHeader = styled.div`
  background: #662d91;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 18px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 18px;
  text-transform: uppercase;
  font-weight: bold;
  margin: 0 auto;
  line-height: 22px;
`;

const StyledArrowIcon = styled(ArrowIcon)`
  width: 27px;
  position: absolute;
`;

const Header = ({ title, onArrowClick }) => (
  <StyledHeader>
    <StyledArrowIcon onClick={onArrowClick} />
    <Title tabindex="0">{title}</Title>
  </StyledHeader>
);

export default Header;
