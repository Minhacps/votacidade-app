import React, { useContext } from 'react';
import firebase from 'firebase/app';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../styles/colors';
import { Nav, NavItem } from 'reactstrap';
import { CityContext } from '../CityProvider/CityProvider';

const baseLinkStyle = `
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1rem;
  color: ${colors.grey500};
  cursor: pointer;

  .nav-item:not(:last-child) & {
    margin-right: 15px;
  }

  &:hover {
    color: ${colors.grey500};
  }
`;

const StyledLink = styled(NavLink)`
  ${baseLinkStyle}

  &.active {
    color: ${colors.purple};
    border-bottom: 4px solid ${colors.purple};
  }
`;

const StyledLogout = styled.span`
  ${baseLinkStyle}
`;

const Navigation = () => {
  const { cityPath } = useContext(CityContext);

  return (
    <Nav className="mr-0 ml-auto" navbar>
      <NavItem>
        <StyledLink to={`${cityPath}/questionario`} activeClassName="active">
          Questionário
        </StyledLink>
      </NavItem>
      <NavItem onClick={() => firebase.auth().signOut()}>
        <StyledLogout>Logout</StyledLogout>
      </NavItem>
    </Nav>
  );
};

export default Navigation;
