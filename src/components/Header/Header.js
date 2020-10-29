import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, NavbarBrand } from 'reactstrap';

import { CityContext } from 'components/CityProvider/CityProvider';
import Sidebar from 'components/Sidebar/Sidebar';

import logoVota from 'assets/img/logos/vota.svg';
import logoVotaCidade from 'assets/img/logos/logo-vota-cidades.svg';

export const Header = ({ user }) => {
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
            to={cityPath}
            title={cityName}
            className="text-muted font-weight-bold"
            style={{ margin: 'auto' }}
          >
            {cityName}
          </NavbarBrand>
          {user && <Sidebar user={user} />}
        </Container>
      </Navbar>
    </header>
  );
};
