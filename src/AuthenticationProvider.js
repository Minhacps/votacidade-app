import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import PageLoading from './components/molecules/PageLoading';

export const AuthenticationContext = React.createContext();

const AuthenticationProvider = ({ children }) => {
  const [lookingForUser, setLookingForUser] = useState(true);
  const [authUser, setAuthUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [signUpFormUserData, setSignUpFormUserData] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authUser) => {
      setLookingForUser(false);
      setAuthUser(authUser);

      if (!authUser) {
        window.localStorage.removeItem('userData');
      }
    });
  }, []);

  useEffect(() => {
    const getLocalUserData = () => {
      try {
        const localUserData = window.localStorage.getItem('userData');
        return JSON.parse(localUserData);
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    const localUserData = getLocalUserData();

    if (localUserData) {
      setUserData(localUserData);
      return;
    }

    if (!authUser) {
      setUserData(null);
      return;
    }

    setLookingForUser(true);

    if (signUpFormUserData) {
      setUserData(signUpFormUserData);
      setLookingForUser(false);
      window.localStorage.setItem(
        'userData',
        JSON.stringify(signUpFormUserData),
      );
      return;
    }

    firebase
      .firestore()
      .collection('users')
      .doc(authUser.uid)
      .get()
      .then((snapshot) => {
        const storedUserData = snapshot.data();

        setUserData(storedUserData);
        setLookingForUser(false);

        window.localStorage.setItem('userData', JSON.stringify(storedUserData));
      });
  }, [authUser, signUpFormUserData]);

  if (lookingForUser) {
    return <PageLoading />;
  }

  return (
    <AuthenticationContext.Provider
      value={{ authUser, userData, setSignUpFormUserData }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
