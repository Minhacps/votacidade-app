import React from 'react';
import { Container } from 'reactstrap';
import { useParams } from 'react-router-dom';
import CityProvider from 'components/CityProvider/CityProvider';
import { Header } from 'components/Header/Header';
import SignupCta from 'components/SignupCta/SignupCta';
import Footer from 'components/Footer/Footer';
import Profile from './Profile';
import cities from 'cities';

const PublicProfile = () => {
  const { cityPath } = useParams();
  const city = cities.find((city) => city.cityPath === `/${cityPath}`);

  return (
    <CityProvider city={city}>
      <Header />
      <SignupCta />
      <Container className="py-2" style={{ lineHeight: '20px' }}>
        <Profile unauthenticated />
      </Container>
      <Footer />
    </CityProvider>
  );
};

export default PublicProfile;
