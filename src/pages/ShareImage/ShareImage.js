import React, { useContext } from 'react';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';
import colors from 'styles/colors';

import { CityContext } from 'components/CityProvider/CityProvider';
import divulgaAmericana from 'assets/img/share_images/divulgaAmericana.png';
import divulgaCmp from 'assets/img/share_images/divulgaCmp.png';
import divulgaJampa from 'assets/img/share_images/divulgaJampa.png';
import divulgaPoa from 'assets/img/share_images/divulgaPoa.png';
import divulgaRecife from 'assets/img/share_images/divulgaRecife.png';
import { CenteredContent } from 'pages/Ranking/Ranking.styled';

export const StyledButton = styled.button`
  height: 40px;
  display: flex;
  justify-content: center;
  background: ${colors.purple};
  color: #fff;
  text-align: center;
  font-size: 15px;
  border: 0;
  border-radius: 10px;
  padding: 5px 15px;
  margin-top: 12px;
  align-items: center;
`;

const citySharing = {
  Americana: {
    img: divulgaAmericana,
    download: 'Vota-Americana.png',
  },
  Campinas: {
    img: divulgaCmp,
    download: 'Vota-Campinas.png',
  },
  'João Pessoa': {
    img: divulgaJampa,
    download: 'Vota-Jampa.png',
  },
  Recife: {
    img: divulgaRecife,
    download: 'Vota-Recife.png',
  },
  'Porto Alegre': {
    img: divulgaPoa,
    download: 'Vota-Poa.png',
  },
};

const ShareImage = () => {
  const { cityName } = useContext(CityContext);

  const sharingData = citySharing[cityName];
  if (!sharingData) {
    return null;
  }

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md="6">
          <img
            src={sharingData.img}
            alt={'Imagem de compartilhamento do Vota'}
            className="rounded w-100"
          />
          <CenteredContent>
            <a href={sharingData.img} download={sharingData.download}>
              <StyledButton>Compartilhe o Vota!!</StyledButton>
            </a>
          </CenteredContent>
        </Col>
      </Row>
    </Container>
  );
};

export default ShareImage;
