import React from 'react';
import firebase from 'firebase/app';

export const CityContext = React.createContext();

const CityProvider = ({ city, children }) => {
  const currentUser = firebase.auth().currentUser;
  const instance = firebase.app(city.cityPath);

  return (
    <CityContext.Provider value={{ ...city, firebase: instance, currentUser }}>
      {children}
    </CityContext.Provider>
  );
};

export default CityProvider;
