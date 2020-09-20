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
          <p className="h4 text-primary mb-4">
            Agradecemos a sua participação!
          </p>

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
              <strong>Eleitor(a)</strong>, para que o índice de afinidade seja
              exibido, lembre-se que você precisa responder no mínimo 21
              questões.
            </p>
          )}

          {cityName === 'Campinas' && (
            <p>
              Para que exista uma boa representatividade de cadastro de
              candidatos e candidatas no site de <strong>{cityName}</strong>, o
              critério mínimo para lançarmos a ferramenta será de termos pelo
              menos 15 partidos cadastrados no sistema. Após alcançado este
              índice, lançaremos o ranking para a cidade.
            </p>
          )}

          {cityName === 'Porto Alegre' && (
            <p>
              Nós, da <strong>Minha Porto Alegre,</strong> valorizamos a
              representatividade. Por isso, estabelecemos um critério mínimo
              para lançarmos a ferramenta: termos pelo menos 15 partidos
              cadastrados no Vota Cidade, o que equivale a 50% do total, e pelo
              menos 300 candidaturas a vereador(a). Isso tudo pra você ter um
              match de qualidade e que realmente te represente.
              <br />
              Acompanhe as nossas redes sociais para atualizações e novidades!
            </p>
          )}

          {cityName === 'Recife' && (
            <p>
              Para que exista uma boa representatividade de cadastro de
              candidatos e candidatas no site de <strong>{cityName}</strong>, o
              critério mínimo para lançarmos a ferramenta será de termos pelo
              menos 15 partidos cadastrados no sistema. Após alcançado este
              índice, lançaremos o ranking para a cidade.
            </p>
          )}

          {cityName === 'João Pessoa' && (
            <p>
              Para que exista uma boa representatividade de cadastro de
              candidatos e candidatas no site de <strong>{cityName}</strong>, o
              critério mínimo para lançarmos a ferramenta será de termos pelo
              menos 15 partidos cadastrados no sistema. Após alcançado este
              índice, lançaremos o ranking para a cidade.
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default FinalPage;
