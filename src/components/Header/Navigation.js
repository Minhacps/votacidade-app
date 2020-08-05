import React, { useContext } from 'react';
import firebase from 'firebase/app';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../styles/colors';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { CityContext } from '../CityProvider/CityProvider';

const StyledLink = styled(NavLink)`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1rem;
  color: ${colors.grey500} !important;

  .nav-item:not(:last-child) & {
    margin-right: 15px;
  }

  &.active {
    color: ${colors.purple} !important;
    border-bottom: 4px solid ${colors.purple} !important;
  }

  &:hover {
    color: ${colors.grey500} !important;
  }
`;

const ExternalLink = styled(NavLink)`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1rem;
  color: ${colors.grey500} !important;

  .nav-item:not(:last-child) & {
    margin-right: 15px;
  }

  &.active {
    color: ${({ theme }) => theme.primaryColor} !important;
  }

  &:hover {
    color: ${({ theme }) => theme.primaryColor} !important;
    text-decoration: none;
  }
`;

const Navigation = () => {
  const { cityPath } = useContext(CityContext);

  return (
    <Nav className="mr-0 ml-auto" navbar>
      <NavItem>
        <StyledLink
          tag={Link}
          to={`${cityPath}/questionario`}
          activeClassName="active"
        >
          Questionário
        </StyledLink>
      </NavItem>
      <NavItem
        onClick={() => firebase.auth().signOut()}
        activeClassName="active"
      >
        <StyledLink>Logout</StyledLink>
      </NavItem>

      <NavItem>
        <ExternalLink
          rel="noopener noreferrer"
          target="_blank"
          href="https://drive.google.com/drive/folders/1xQh5dm-XkmQL_deO9sRueERMYpHoCj2a?usp=sharing"
          activeClassName="active"
        >
          Mídia Kit
        </ExternalLink>
      </NavItem>
      <NavItem>
        <ExternalLink
          target="_blank"
          rel="noopener noreferrer"
          href="https://docs.google.com/forms/d/e/1FAIpQLSfFORbjA5LqCB9xPoj1tXyZmCNv_-Zx_ZwW8KW06BS8cSrpVg/viewform"
          activeClassName="active"
        >
          Seja Voluntário
        </ExternalLink>
      </NavItem>
    </Nav>
  );
};

export default Navigation;
