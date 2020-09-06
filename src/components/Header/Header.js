import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from 'reactstrap';

import { CityContext } from 'components/CityProvider/CityProvider';
import Navigation from './Navigation';

import logoVota from 'assets/img/logos/vota.svg';
import logoVotaCidade from 'assets/img/logos/logo-vota-cidades.svg';

export const Header = () => {
  const { cityName } = useContext(CityContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <header>
      <Navbar light expand="md">
        <Container>
          <NavbarBrand tag={Link} to="/" title="Vota Cidade">
            <img
              src={logoVota}
              alt="Logo Vota Cidade"
              style={{ height: '49px' }}
              className="d-block d-sm-none"
            />
            <img
              src={logoVotaCidade}
              alt="Logo Vota Cidade"
              className="d-none d-sm-block"
            />
          </NavbarBrand>

          <NavbarBrand
            tag={Link}
            to="/"
            title={cityName}
            className="text-muted font-weight-bold"
          >
            {cityName}
          </NavbarBrand>

          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Navigation />
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
