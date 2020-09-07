import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, NavbarBrand } from 'reactstrap';

import { CityContext } from 'components/CityProvider/CityProvider';

import logoVota from 'assets/img/logos/vota.svg';
import logoVotaCidade from 'assets/img/logos/logo-vota-cidades.svg';

export const Header = () => {
  const { cityName, cityPath } = useContext(CityContext);

  return (
    <header>
      <Navbar light expand="md">
        <Container>
          <NavbarBrand tag={Link} to={cityPath} title="Vota Cidade">
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
            style={{ margin: 'auto' }}
          >
            {cityName}
          </NavbarBrand>
        </Container>
      </Navbar>
    </header>
  );
};
