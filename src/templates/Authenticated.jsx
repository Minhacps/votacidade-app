import React from 'react';
import { Header } from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import ProgressBar from 'components/ProgressBar/ProgressBar';

const Authenticated = ({ user, children }) => (
  <>
    <Header user={user} />
    <ProgressBar user={user} />
    <main>{children}</main>
    <Footer />
  </>
);

export default Authenticated;
