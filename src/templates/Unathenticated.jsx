import React from 'react';
import { Container } from 'reactstrap';

import Background from 'components/Background/Background';

import background from 'assets/img/splashscreen.png';

const Unauthenticated = ({ children }) =>
  (
    <Container>
      <Background
        src={background}
        alt="Imagem de fundo com a visão aérea de uma cidade com prédios altos em degradê das cores violeta e laranja claro"
      />
      {children}
    </Container>
  );

export default Unauthenticated;
