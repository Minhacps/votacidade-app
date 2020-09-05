import React, { useContext } from 'react';
import styled from 'styled-components';
import QuestionsBoard from 'components/QuestionsBoard/QuestionsBoard';
import firebase from 'firebase/app';

import colors from '../../styles/colors';
import { CityContext } from '../CityProvider/CityProvider';

const StyledLogout = styled.span`
  color: ${colors.purple};
  font-size: 12pt;
  display: block;
  margin-top: 45px;
  cursor: pointer;
`;

const StyledName = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.purple};
`;

const Divider = styled.hr`
  border-top: 1px solid ${colors.grey300};
`;

const Navigation = () => {
  const { currentUser } = useContext(CityContext);

  const abbreviate = (name) => {
    const splitedName = name.split(' ');
    const firstName = splitedName[0];
    const lastName = splitedName[splitedName.length - 1] || '';
    return `${firstName} ${lastName}`;
  };

  return (
    <div>
      <StyledName>{abbreviate(currentUser.displayName)}</StyledName>
      <Divider />
      <QuestionsBoard />
      <StyledLogout onClick={() => firebase.auth().signOut()}>
        Sair
      </StyledLogout>
    </div>
  );
};

export default Navigation;
