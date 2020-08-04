import React from 'react';
import Navigation from 'components/Navigation';

const Authenticated = ({ children }) => (
  <>
    <Navigation />

    {children}
  </>
);

export default Authenticated;
