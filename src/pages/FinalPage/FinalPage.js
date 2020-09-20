import React, { useContext } from 'react';
import { Col, Container, Row } from 'reactstrap';

import { ROLE_CANDIDATE } from 'constants/userRoles';

import { CityContext } from 'components/CityProvider/CityProvider';

const FinalPage = ({ user }) => {
  const { cityName } = useContext(CityContext);

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <p class="h4 text-primary mb-4">Agradecemos a sua participação!</p>

          {user.role === ROLE_CANDIDATE ? (
            <p>
              <strong>Candidato(a)</strong>, lembre-se que você precisa
              responder todas as questões para participar do Vota Cidade. Após
              feito isso, suas respostas serão exibidas publicamente no site,
              pois assim quem concorda com você vai saber do seu posicionamento
              e, possivelmente, te escolher como representante.
            </p>
          ) : (
            <p>
              <strong>Eleitor(a)</strong>, lembre-se, para que o índice de
              afinidade seja exibido, você precisa responder no mínimo 21
              questões.
            </p>
          )}

          {cityName === 'Campinas' ? (
            <p className="mt-3" style={{ fontSize: '12pt' }}>
              Para que exista uma boa representatividade de cadastro de
              candidatos e candidatas no site de <strong>{cityName} </strong>, o
              critério mínimo para lançarmos a ferramenta será termos pelo menos
              15 partidos cadastrados no sistema. A partir desse índice
              alcançado lançaremos o ranking.
            </p>
          ) : null}
          {cityName === 'Porto Alegre' ? (
            <p className="mt-3" style={{ fontSize: '12pt' }}>
              Nós, da <strong>Minha Porto Alegre,</strong> valorizamos a
              representatividade. Por isso, estabelecemos um critério mínimo
              para lançarmos a ferramenta: termos pelo menos 15 partidos
              cadastrados no Vota Cidade, o que equivale a 50% do total, e pelo
              menos 300 candidaturas a vereador(a). Isso tudo pra você ter um
              match de qualidade e que realmente te represente.
              <br />
              Acompanhe as nossas redes sociais para atualizações e novidades!
            </p>
          ) : null}
          {cityName === 'Recife' ? (
            <p className="mt-3" style={{ fontSize: '12pt' }}>
              Para que existe uma boa representatividade de cadastro de
              candidatos e candidatas no site de <strong>{cityName}</strong> o
              critério mínimo para lançarmos a ferramenta será termos pelo menos
              15 partidos cadastrados no sistema. A partir desse índice
              alcançado lançaremos o ranking.
            </p>
          ) : null}
          {cityName === 'João Pessoa' ? (
            <p className="mt-3" style={{ fontSize: '12pt' }}>
              Para que existe uma boa representatividade de cadastro de
              candidatos e candidatas no site de <strong>{cityName}</strong> o
              critério mínimo para lançarmos a ferramenta será termos pelo menos
              15 partidos cadastrados no sistema. A partir desse índice
              alcançado lançaremos o ranking.
            </p>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default FinalPage;
