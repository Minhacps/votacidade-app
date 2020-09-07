import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'reactstrap';

import logoVota from 'assets/img/logos/vota.svg';
import logo from 'assets/img/logos/vota.svg';
import logoVotaCidade from 'assets/img/logos/logo-vota-cidades.svg';

export const Header = () => {
  return (
    <header>
      <Navbar className="col" light expand="md">
        <Link to="/">
          <img src={logo} alt="Logo VotaCidades" />
        </Link>
      </Navbar>
    </header>
  );
};
