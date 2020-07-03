import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import cities from '../cities';

const Navigation = () => (
  <Row>
    <Navbar className="col" light expand="md">
      <Nav navbar>
        {cities.map((city) => (
          <NavItem key={`${city.path}-link`}>
            <NavLink tag={Link} to={city.path}>
              {city.name}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </Navbar>
  </Row>
);

export default Navigation;
