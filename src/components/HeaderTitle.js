import React from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import { Title } from '../UI/Title';

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.lightSecondary};
  background-image: url(${require('../assets/img/pattern-baixo.png')});
  background-size: cover;
  background-position: center right;
  background-repeat: no-repeat;
  padding: 48px;
`;

const HeaderTitle = ({ title }) => (
  <StyledHeader>
    <Container>
      <Title style={{ margin: 0 }} as="h1" size="24px" color="darkGray">
        {title}
      </Title>
    </Container>
  </StyledHeader>
);

export default HeaderTitle;
