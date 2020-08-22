import React from 'react';
import { Link } from 'react-router-dom';
import cities from '../cities';

const LandingPage = () => (
  <section data-testid="app">
    <ul>
      {cities.map((city) => (
        <li key={city.cityPath}>
          <Link to={city.cityPath}>{city.cityName}</Link>
        </li>
      ))}
    </ul>
  </section>
);

export default LandingPage;
