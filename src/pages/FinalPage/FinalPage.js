import React, { useContext } from 'react';
import Authenticated from 'templates/Authenticated';
import styled from 'styled-components';
import { Container } from 'reactstrap';
import { Button } from 'UI/Button';
import { Link } from 'react-router-dom';
import { CityContext } from 'components/CityProvider/CityProvider';
import colors from 'styles/colors';

const StyledUserName = styled.span`
  color: ${colors.purple};
  font-weight: 800;
  font-size: 16pt;
  margin-bottom: 25px;
`;

const StyledButton = styled(Button)`
  min-width: 324px;
  text-transform: uppercase;
`;

const FinalPage = () => {
  const { currentUser, cityPath, cityName } = useContext(CityContext);
  const UserName = currentUser.displayName;
  console.log(cityName);
  return (
    <Authenticated>
      <Container className="py-4" style={{ lineHeight: '20px' }}>
        <StyledUserName>Olá, {UserName}!</StyledUserName>
        <p className="mt-3" style={{ fontSize: '12pt' }}>
          Obrigado(a) por responder.
        </p>
        <p className="mt-3" style={{ fontSize: '12pt' }}>
          <strong>Candidato(a)</strong> lembre-se que para participar do ranking
          vocẽ precisa responder todas as questões.
        </p>
        {cityName === 'Campinas' ? (
          <p className="mt-3" style={{ fontSize: '12pt' }}>
            Para que exista uma boa representatividade de cadastro de candidatos
            e candidatas no site de <strong>{cityName} </strong> o critério
            mínimo para lançarmos a ferramenta será termos pelo menos 15
            partidos cadastrados no sistema. A partir desse índice alcançado
            lançaremos o ranking.
          </p>
        ) : null}
        {cityName === 'Porto Alegre' ? (
          <p className="mt-3" style={{ fontSize: '12pt' }}>
            Nós, da <strong>Minha Porto Alegre,</strong> valorizamos a
            representatividade. Por isso, estabelecemos um critério mínimo para
            lançarmos a ferramenta: termos pelo menos 15 partidos cadastrados no
            Vota Cidade, o que equivale a 50% do total, e pelo menos 300
            candidaturas a vereador(a). Isso tudo pra você ter um match de
            qualidade e que realmente te represente.
          </p>
        ) : null}
        {cityName === 'Recife' ? (
          <p className="mt-3" style={{ fontSize: '12pt' }}>
            Para que existe uma boa representatividade de cadastro de candidatos
            e candidatas no site de <strong>{cityName}</strong> o critério
            mínimo para lançarmos a ferramenta será termos pelo menos 15
            partidos cadastrados no sistema. A partir desse índice alcançado
            lançaremos o ranking.
          </p>
        ) : null}
        {cityName === 'João Pessoa' ? (
          <p className="mt-3" style={{ fontSize: '12pt' }}>
            Para que existe uma boa representatividade de cadastro de candidatos
            e candidatas no site de <strong>{cityName}</strong> o critério
            mínimo para lançarmos a ferramenta será termos pelo menos 15
            partidos cadastrados no sistema. A partir desse índice alcançado
            lançaremos o ranking.
          </p>
        ) : null}
        <Link to={`${cityPath}/questionario`}>
          <StyledButton color="primary" className="mb-3" bold size="lg">
            voltar
          </StyledButton>
        </Link>
      </Container>
    </Authenticated>
  );
};

export default FinalPage;
