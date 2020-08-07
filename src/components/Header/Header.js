import React, { useState } from 'react';

import {
  Container,
  Row,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
} from 'reactstrap';

import Navigation from './Navigation';

import logo from '../../assets/img/logos/logo-vota-cidades.svg';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <header>
      <Container>
        <Row>
          <Navbar className="col" light expand="md">
            <NavbarBrand href="/">
              <img src={logo} alt="Logo VotaCidades" />
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Navigation />
            </Collapse>
          </Navbar>
        </Row>
      </Container>
    </header>
  );
};
