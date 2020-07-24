import React, { useContext } from 'react';
import firebase from 'firebase/app';
import { Link } from 'react-router-dom';
import { Row, Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import { CityContext } from 'components/CityProvider/CityProvider';

const Navigation = () => {
  const { cityPath } = useContext(CityContext);

  return (
    <Row>
      <Navbar className="col" light expand="md">
        <Nav navbar>
          <NavItem>
            <NavLink tag={Link} to={`${cityPath}/questionario`}>
              Questionário
            </NavLink>
          </NavItem>

          <NavItem onClick={() => firebase.auth().signOut()}>
            <NavLink>Logout</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </Row>
  );
};

export default Navigation;
