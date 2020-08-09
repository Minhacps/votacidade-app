import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';

import { Link } from '../../Link/Link';

import colors from '../../styles/colors';

const StyledFooter = styled.footer`
  background-color: ${colors.purpleDark};
  padding: 15px 0;
  color: #fff;
  font-size: 15px;

  @media (min-width: 400px) {
    font-size: initial;
  }
`;
const StyledLink = styled(Link)`
  color: #dcdcdc;
  &:hover {
    color: #daa520;
    text-decoration: none;
  }
`;
const StyledAnchor = styled.a`
  color: #dcdcdc;
  &:hover {
    color: #daa520;
    text-decoration: none;
  }
`;

const LowerFooter = () => (
  <StyledFooter color="#4F1778" className="py-3 py-md-4">
    <Container>
      <Row>
        <Col xs="12" lg="3">
          <ul className="list-unstyled text-small">
            <li>
              <StyledLink to="/privacidade">Política de Privacidade</StyledLink>
            </li>
          </ul>
        </Col>
        <Col xs="12" lg="9" className="d-lg-flex justify-content-end">
          <a
            rel="license noopener noreferrer"
            href="http://creativecommons.org/licenses/by/4.0/"
            target="_blank"
          >
            <img
              alt="Licença Creative Commons"
              style={{ borderWidth: '0' }}
              src="https://i.creativecommons.org/l/by/4.0/88x31.png"
            />
          </a>
          <small className="d-block mt-1 ml-lg-2">
            Este trabalho está licenciado sob uma{' '}
            <StyledAnchor
              rel="license noopener noreferrer"
              href="http://creativecommons.org/licenses/by/4.0/"
            >
              Licença Creative Commons Attribution 4.0 International
            </StyledAnchor>
          </small>
        </Col>
      </Row>
    </Container>
  </StyledFooter>
);

export default LowerFooter;
