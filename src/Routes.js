import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import firebase from 'firebase/app';
import { Row, Navbar, Nav, NavItem, NavLink } from 'reactstrap';

import campinaGrande from './cities/campinaGrande';
import campinas from './cities/campinas';
import joaoPessoa from './cities/joaoPessoa';
import portoAlegre from './cities/portoAlegre';
import recife from './cities/recife';

import { firebaseSetup } from './firebase';

const cities = [campinaGrande, campinas, joaoPessoa, portoAlegre, recife];

const CityContext = React.createContext();

const BaseApp = ({ name, firebaseConfig }) => {
  useEffect(() => {
    firebaseSetup(firebaseConfig);
  }, []);

  useEffect(() => {
    return () => firebase.delete();
  }, []);

  return <span>{name}</span>;
};

export default function Routes() {
  return (
    <Router>
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

      <Switch>
        {cities.map((city) => (
          <Route path={city.path} key={`${city.path}-route`} exact>
            <CityContext.Provider value={city}>
              <CityContext.Consumer>
                {({ name, firebaseConfig }) => (
                  <BaseApp name={name} firebaseConfig={firebaseConfig} />
                )}
              </CityContext.Consumer>
            </CityContext.Provider>
          </Route>
        ))}
      </Switch>
    </Router>
  );
}
