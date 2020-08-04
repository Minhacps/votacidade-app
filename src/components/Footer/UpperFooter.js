import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import { Title } from '../../UI/Title';
import { Button } from '../../UI/Button';

import colors from '../../styles/colors';

const StyledFooter = styled.div`
  background-color: #662d91;
`;

const StyledButton = styled(Button)`
  min-width: 185px;
  text-transform: uppercase;
`;

const ListaDeContato = styled.ul`
  padding-left: 0;
  list-style: none;
  color: #fff;

  strong::after {
    content: '|';
    display: inline-block;
    margin-left: 5px;
  }
`;

const Contato = ({ cidade, contato }, index) => (
  <li key={`concato-${index}`}>
    <strong>{cidade}</strong> {contato}
  </li>
);

const Partnership = (partner, index) => (
  <Col key={`partner-${index}`} xs="4" sm="3" className="mb-3">
    <img
      src={partner.logo}
      alt={`Logotipo ${partner.nome}`}
      title={partner.nome}
      className="img-fluid d-block mx-auto"
    />
  </Col>
);

const UpperFooter = ({ contatos = [], makers = [], supporters = [] }) => (
  <StyledFooter className="py-3">
    <Container>
      <Row className="mt-3">
        <Col xs="12" lg="6">
          <Title tag="h4" size="1.1em" color="#FBB040">
            Contato
          </Title>
          <ListaDeContato>{contatos.map(Contato)}</ListaDeContato>
        </Col>

        <Col xs="12" lg="6">
          <Title tag="h4" size="1.1em" color="#FBB040">
            Apoie o projeto!
          </Title>
          <p style={{ color: '#fff' }}>
            O Vota Cidade foi idealizado por cinco cidades da Rede Nossas
            Cidades, organizações sem fins lucrativos, que tem por objetivo
            fortalecer e incentivar a cultura da participação em questões
            públicas.
          </p>
          <Link to="/o-projeto">
            <StyledButton bold light size="lg" color="#FBB040">
              Saiba Mais
            </StyledButton>
          </Link>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xs="12" lg="6">
          <Title tag="h4" size="1.1em" color="#FBB040" className="mb-3">
            Realização
          </Title>
          <Row className="align-items-center">{makers.map(Partnership)}</Row>
        </Col>
        <Col xs="12" lg="6" className="mt-3 mt-lg-0">
          <Title tag="h4" size="1.1em" color="#FBB040" className="mb-3">
            Apoio
          </Title>
          <Row className="align-items-center">
            {supporters.map(Partnership)}
          </Row>
        </Col>
      </Row>
    </Container>
  </StyledFooter>
);

export default UpperFooter;
