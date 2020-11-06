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

const ShareImage = () => {
  const { cityName } = useContext(CityContext);

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md="6">
          {cityName === 'Americna' && (
            <>
              <img
                src={divulgaAmericana}
                alt={'Imagem de compartilhamento do Vota'}
                className="rounded w-100"
              />
              <CenteredContent>
                <a href={divulgaAmericana} download={'Vota-Americana.png'}>
                  <StyledButton>Compartilhe o Vota!!</StyledButton>
                </a>
              </CenteredContent>
            </>
          )}

          {cityName === 'Campinas' && (
            <>
              <img
                src={divulgaCmp}
                alt={'Imagem de compartilhamento do Vota'}
                className="rounded w-100"
              />
              <CenteredContent>
                <a href={divulgaCmp} download={'Vota-Campinas.png'}>
                  <StyledButton>Compartilhe o Vota!!</StyledButton>
                </a>
              </CenteredContent>
            </>
          )}

          {cityName === 'Porto Alegre' && (
            <>
              <img
                src={divulgaPoa}
                alt={'Imagem de compartilhamento do Vota'}
                className="rounded w-100"
              />
              <CenteredContent>
                <a href={divulgaPoa} download={'Vota-PortoAlegre.png'}>
                  <StyledButton>Compartilhe o Vota!!</StyledButton>
                </a>
              </CenteredContent>
            </>
          )}

          {cityName === 'Recife' && (
            <>
              <img
                src={divulgaRecife}
                alt={'Imagem de compartilhamento do Vota'}
                className="rounded w-100"
              />
              <CenteredContent>
                <a href={divulgaRecife} download={'Vota-Recife.png'}>
                  <StyledButton>Compartilhe o Vota!!</StyledButton>
                </a>
              </CenteredContent>
            </>
          )}

          {cityName === 'João Pessoa' && (
            <>
              <img
                src={divulgaJampa}
                alt={'Imagem de compartilhamento do Vota'}
                className="rounded w-100"
              />
              <CenteredContent>
                <a href={divulgaJampa} download={'Vota-Jampa.png'}>
                  <StyledButton>Compartilhe o Vota!!</StyledButton>
                </a>
              </CenteredContent>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ShareImage;
