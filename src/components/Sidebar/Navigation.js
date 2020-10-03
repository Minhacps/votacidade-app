import React, { useContext } from 'react';
import styled from 'styled-components';
import QuestionsBoard from 'components/QuestionsBoard/QuestionsBoard';
import firebase from 'firebase/app';
import { Link, useHistory } from 'react-router-dom';

import colors from '../../styles/colors';
import { CityContext } from '../CityProvider/CityProvider';
import { SidebarContext } from 'components/Sidebar/SidebarProvider';

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

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const Navigation = ({ user }) => {
  const { currentUser, cityPath, enableRanking } = useContext(CityContext);
  const { toggleSidebar } = useContext(SidebarContext);

  const history = useHistory();

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => history.push('/'));
  };

  return (
    <div>
      <StyledName>{currentUser.displayName}</StyledName>
      <Divider />
      <Ul>
        <li>
          <StyledLink to={cityPath} onClick={toggleSidebar}>
            Como funciona
          </StyledLink>
        </li>
        {enableRanking && (
          <li>
            <StyledLink to={`${cityPath}/ranking`} onClick={toggleSidebar}>
              Ranking
            </StyledLink>
          </li>
        )}
      </Ul>
      <Divider />
      <QuestionsBoard user={user} />
      <StyledLogout onClick={handleLogout}>Sair</StyledLogout>
    </div>
  );
};

export default Navigation;
