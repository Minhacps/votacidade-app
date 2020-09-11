import React, { useContext } from 'react';
import styled from 'styled-components';
import QuestionsBoard from 'components/QuestionsBoard/QuestionsBoard';
import firebase from 'firebase/app';
import { Link, useHistory } from 'react-router-dom';

import colors from '../../styles/colors';
import { CityContext } from '../CityProvider/CityProvider';

const StyledLogout = styled.button`
  color: ${colors.purple};
  font-size: 12pt;
  display: block;
  margin-top: 45px;
  background: transparent;
  border: none;
  padding: 0;
`;

const StyledLink = styled(Link)`
  color: ${colors.grey500};

  &:hover {
    color: black;
  }
`;

const StyledName = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.purple};
`;

const Divider = styled.hr`
  border-top: 1px solid ${colors.grey300};
`;

const Navigation = ({ user }) => {
  const { currentUser, cityPath } = useContext(CityContext);
  const history = useHistory();

  const handleLogout = () => {
    firebase.auth().signOut();
    history.push('/');
  };

  return (
    <div>
      <StyledName>{currentUser.displayName}</StyledName>
      <Divider />
      <ul>
        <li>
          <StyledLink to="/">Como funciona</StyledLink>
        </li>
        <li>
          <StyledLink to={`${cityPath}/ranking`}>Ranking</StyledLink>
        </li>
      </ul>
      <Divider />
      <QuestionsBoard user={user} />
      <StyledLogout onClick={handleLogout}>Sair</StyledLogout>
    </div>
  );
};

export default Navigation;
