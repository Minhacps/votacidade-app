import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import firebase from 'firebase/app';
import Question from 'components/Question/Question';

import { Row, Navbar, Nav, NavItem, NavLink } from 'reactstrap';

export default function Routes() {
  return (
    <Router>
      <Row>
        <Navbar className="col" light expand="md">
          <Nav navbar>
            <NavItem>
              <NavLink tag={Link} to="/">
                Home
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={Link} to="/questionario">
                Questionário
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className="nav-link"
                to="#"
                onClick={() => firebase.auth().signOut()}
              >
                Sair
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </Row>

      <div>
        <Switch>
          <Route path="/questionario">
            <Question />
          </Route>
          <Route path="/">
            <div>Vota Cidade</div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
