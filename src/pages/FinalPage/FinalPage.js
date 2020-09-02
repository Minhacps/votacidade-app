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
  const { currentUser, cityPath } = useContext(CityContext);
  const UserName = currentUser.displayName;
  return (
    <Authenticated>
      <Container className="py-4" style={{ lineHeight: '20px' }}>
        <StyledUserName>Olá, {UserName}!</StyledUserName>
        <p className="mt-3" style={{ fontSize: '12pt' }}>
          Obrigado(a) por responder. Em breve a página do índice de afinidade
          estará no ar. Caso queira mudar alguma resposta do questionário clique
          no botão abaixo.
        </p>
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
