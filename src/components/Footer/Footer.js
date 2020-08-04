import React from 'react';
import LowerFooter from './LowerFooter';
import UpperFooter from './UpperFooter';
import { Container } from 'reactstrap';
import { makers } from '../../data/makers';
import { supporters } from '../../data/supporters';
import { contatos } from '../../data/contatos';

const Footer = () => {
  return (
    <Container fluid={true}>
      <footer>
        <UpperFooter
          makers={makers}
          contatos={contatos}
          supporters={supporters}
        />
        <LowerFooter />
      </footer>
    </Container>
  );
};

export default Footer;
