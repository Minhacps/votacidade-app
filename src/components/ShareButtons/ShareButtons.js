import React, { useContext } from 'react';

import { CityContext } from 'components/CityProvider/CityProvider';
import ClipboardButton from './ClipboardButton';
import whatsappIcon from 'assets/icons/whatsapp.svg';
import { WhatsAppButton, Label, ButtonsContainer } from './ShareButtons.styled';

const ShareButtons = () => {
  const currentUrl = window.location.href;
  const { cityName } = useContext(CityContext);

  // TODO: Revisar este texto porque está na visão de candidate e não voters
  const whatsAppText = `Acabei de utilizar o Vota Cidade em ${cityName} e compartilho com vocês este(a) candidato(a) ${currentUrl}`;

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
