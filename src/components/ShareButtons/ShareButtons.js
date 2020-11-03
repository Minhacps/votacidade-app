import React, { useContext } from 'react';

import { CityContext } from 'components/CityProvider/CityProvider';
import ClipboardButton from './ClipboardButton';
import whatsappIcon from 'assets/icons/whatsapp.svg';
import { WhatsAppButton, Label, ButtonsContainer } from './ShareButtons.styled';
import { AuthenticationContext } from '../../AuthenticationProvider';
import { ROLE_CANDIDATE } from 'constants/userRoles';
import { getShareMessage } from 'constants/share';

const ShareButtons = () => {
  const currentUrl = window.location.href;
  const { cityName: city } = useContext(CityContext);
  const { userData } = useContext(AuthenticationContext) ?? {};
  const isCandidate = userData?.role === ROLE_CANDIDATE;

  const whatsAppText = getShareMessage({ isCandidate, city, currentUrl });

  return (
    <>
      <Label>Compartilhe este perfil:</Label>
      <ButtonsContainer>
        {/* TODO: Voltar o botão quando resolvermos o problema de conteúdo bloqueado pelo Facebook */}
        {/* <FacebookShareButton /> */}
        <WhatsAppButton>
          <a href={`whatsapp://send?text=${encodeURIComponent(whatsAppText)}`}>
            <img src={whatsappIcon} alt="icone do whatsapp" />
          </a>
        </WhatsAppButton>
        <ClipboardButton text={whatsAppText}>Copiar o link</ClipboardButton>
      </ButtonsContainer>
    </>
  );
};

export default ShareButtons;
