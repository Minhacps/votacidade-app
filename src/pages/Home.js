import React, { useContext } from 'react';
import styled from 'styled-components';
import { CityContext } from 'components/CityProvider/CityProvider';
import {
  Row,
  Col,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Card,
  Container,
} from 'reactstrap';

import { Title } from 'UI/Title';
import colors from 'styles/colors';
import { Link } from 'react-router-dom';
import { Button } from 'UI/Button';
import Modal from '../components/Modal/Modal';

const StyledCard = styled(Card)`
  border-radius: 10px;
  box-shadow: 0px 3px 6px #00000029;
`;

const StyledUserName = styled.span`
  color: ${colors.purple};
  font-weight: 800;
  font-size: 16pt;
  display: block;
`;

const StyledButton = styled(Button)`
  min-width: 330px;
  text-transform: uppercase;
`;

const HomePage = () => {
  const { currentUser, cityPath, enableRanking } = useContext(CityContext);
  const name = currentUser.displayName;

  return (
    <Container className="py-4" style={{ lineHeight: '20px' }}>
      {!enableRanking && <Modal name={name} />}

      <StyledUserName className="mt-3">Olá, {name},</StyledUserName>
      <p className="mt-3" style={{ fontSize: '12pt' }}>
        O Vota Cidade é uma ferramenta para a população encontrar candidatos(as)
        a vereador(a) que pensam parecido com você nas eleições de 2020. Assim,
        você escolhe alguém que pensa parecido e pode cobrar melhor depois!
      </p>

      <div className="d-flex justify-content-center">
        <Link to={`${cityPath}/questionario`}>
          <StyledButton color="primary" className="mb-5 mt-2" bold size="lg">
            começar
          </StyledButton>
        </Link>
      </div>

      <Row noGutters>
        <Col
          md="6"
          xl="3"
          className="pr-md-2 pr-lg-3 pr-xl-2 mb-4 d-flex align-items-stretch"
        >
          <StyledCard>
            <CardImg
              top
              width="100%"
              src={require('assets/img/cards/como-funciona.png')}
              alt="Como funciona"
            />
            <CardBody>
              <CardTitle>
                <Title size="20px" color={colors.purple}>
                  Como funciona?
                </Title>
              </CardTitle>
              <CardText>
                Você responderá um questionário de 30 perguntas, com questões
                variadas sobre políticas públicas como transporte, saneamento
                básico, drogas, etc. O eleitor(a) pode responder no mínimo 21
                questões já o candidato(a) precisa responder todas.
              </CardText>
            </CardBody>
          </StyledCard>
        </Col>
        <Col
          md="6"
          xl="3"
          className="pl-md-2 pl-lg-3 px-xl-2 mb-4 d-flex align-items-stretch"
        >
          <StyledCard>
            <CardImg
              top
              width="100%"
              src={require('assets/img/cards/afinidade.png')}
              alt="Afinidade"
            />
            <CardBody>
              <CardTitle>
                <Title size="20px" color={colors.purple}>
                  Afinidade
                </Title>
              </CardTitle>
              <CardText>
                Nós cruzaremos as suas respostas com os candidatos e candidatas
                cadastradas e te mostraremos quem pensa parecido com você!
              </CardText>
            </CardBody>
          </StyledCard>
        </Col>
        <Col
          md="6"
          xl="3"
          className="pr-md-2 pr-lg-3 px-xl-2 mb-4 d-flex align-items-stretch"
        >
          <StyledCard>
            <CardImg
              top
              width="100%"
              src={require('assets/img/cards/quero-mais.png')}
              alt="Quero mais"
            />
            <CardBody>
              <CardTitle>
                <Title size="20px" color={colors.purple}>
                  Quero mais!
                </Title>
              </CardTitle>
              <CardText>
                Você poderá pesquisar e acessar o perfil de qualquer candidato
                ou candidata cadastrada para ver as respostas, comparar e tomar
                a sua decisão.
              </CardText>
            </CardBody>
          </StyledCard>
        </Col>
        <Col
          md="6"
          xl="3"
          className="pl-md-2 pl-lg-3 pl-xl-2 mb-4 d-flex align-items-stretch"
        >
          <StyledCard>
            <CardImg
              top
              width="100%"
              src={require('assets/img/cards/seguranca-dos-dados.png')}
              alt="Segurança dos Dados"
            />
            <CardBody>
              <CardTitle>
                <Title size="20px" color={colors.purple}>
                  E os dados?
                </Title>
              </CardTitle>
              <CardText>
                Nós nos preocupamos e respeitamos muito seus dados e por isso
                daremos a opção de responder o questionário de forma anônima.
              </CardText>
            </CardBody>
          </StyledCard>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
