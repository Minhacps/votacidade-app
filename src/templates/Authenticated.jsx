import React from 'react';
import { Header } from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import ProgressBar from 'components/ProgressBar/ProgressBar';

const Authenticated = ({ user, children }) => (
  <main>
    <Header user={user} />
    <ProgressBar user={user} />

    {children}
    <Footer />
  </main>
);

export default Authenticated;
