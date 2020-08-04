import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Link as LinkLogo } from '../../Link/Link';
import { Container, Row, Col } from 'reactstrap';

import { Title } from '../../UI/Title';
import { Button } from '../../UI/Button';

import colors from '../../styles/colors';
import { alfabeticOrder } from '../../styles/helper';

const StyledFooter = styled.div`
  background-color: #662d91;

  .realizacao .realizador {
    flex-basis: 50%;
    flex-grow: 0;

    @media (min-width: 600px) {
      flex-basis: 33%;
    }

    @media (min-width: 992px) {
      flex-basis: 20%;
    }

    @media (min-width: 1200px) {
      flex-basis: 0;
      flex-grow: 1;
    }
  }
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
  <Col key={`partner-${index}`} className="realizador mb-3">
    <LinkLogo tag="a" href={partner.link}>
      <img
        src={partner.logo}
        alt={`Logotipo ${partner.nome}`}
        title={partner.nome}
        className="img-fluid d-block mx-auto"
      />
    </LinkLogo>
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
        <Col xs="12">
          <Title tag="h4" size="1.1em" color="#FBB040" className="mb-3">
            Realização
          </Title>
          <Row className="align-items-center realizacao">
            {makers.sort(alfabeticOrder('nome')).map(Partnership)}
          </Row>
        </Col>
        <Col xs="12" lg="6" className="mt-3 mt-lg-0">
          <Title tag="h4" size="1.1em" color="#FBB040" className="mb-3">
            Apoio
          </Title>
          <Row className="align-items-center">
            {supporters.sort(alfabeticOrder('nome')).map((supporter) => {
              return (
                <Col key={supporter.nome} xs="6" sm="4" lg="2" className="mb-3">
                  <LinkLogo tag="a" href={supporter.link}>
                    <img
                      src={supporter.logo}
                      alt={`Logotipo ${supporter.nome}`}
                      title={supporter.nome}
                      className="img-fluid d-block mx-auto"
                    />
                  </LinkLogo>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Container>
  </StyledFooter>
);

export default UpperFooter;
