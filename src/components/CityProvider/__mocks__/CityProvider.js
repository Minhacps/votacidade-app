import React from 'react';
import fakeCity from 'tests/fakeCity';
import { firebase } from '../../../tests/mockFirebaseAuth';

export const CityContext = React.createContext();

const CityProvider = ({ city = fakeCity, children }) => {
  const currentUser = { uid: 'fakeUid' };

  return (
    <CityContext.Provider value={{ ...city, firebase, currentUser }}>
      {children}
    </CityContext.Provider>
  );
};

export default CityProvider;
