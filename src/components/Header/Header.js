import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Collapse, Navbar, NavbarToggler } from 'reactstrap';

import Navigation from './Navigation';

import logo from 'assets/img/logos/logo-vota-cidades.svg';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <header>
      <Container>
        <Row>
          <Navbar className="col" light expand="md">
            <Link to="/">
              <img src={logo} alt="Logo VotaCidades" />
            </Link>
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
