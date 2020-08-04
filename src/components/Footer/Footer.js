import React from 'react';
import LowerFooter from './LowerFooter';
import UpperFooter from './UpperFooter';
import { Container } from 'reactstrap';
import { makers } from '../../data/makers';
import { supporters } from '../../data/supporters';
import { contatos } from '../../data/contatos';

const Footer = () => {
  return (
    <footer>
      <UpperFooter
        makers={makers}
        contatos={contatos}
        supporters={supporters}
      />
      <LowerFooter />
    </footer>
  );
};

export default Footer;
