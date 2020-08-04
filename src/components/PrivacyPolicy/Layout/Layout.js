/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import { Header, Footer } from './';

import 'bootstrap/dist/css/bootstrap.min.css';

const theme = {
  primaryColor: '#662D91',
  secondaryColor: '#FBB040',
  lightSecondary: '#FFF9F1',
  darkGray: '#333',
  lightGray: '#E6E6E6',
  sucess: '#46A46C',
  error: '#DA304C',
};

const GlobalStyle = createGlobalStyle`
  body {
	  font-family: 'Roboto', sans-serif;
  }

  p {
    font-size: 16px;
    line-height: 19px;
  }
`;

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Layout };
