import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import cities from '../cities';

const LandingPage = () => (
  <Container data-testid="app">
    <Row>
      {cities.map((city) => (
        <Col>
          <Card>
            <CardImg
              top
              width="100%"
              src="https://via.placeholder.com/150"
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle>{city.cityName}</CardTitle>
              <NavLink tag={Link} to={city.cityPath}>
                Acessar
              </NavLink>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

export default LandingPage;
