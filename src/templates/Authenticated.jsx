import React, { useEffect, useContext, useState } from 'react';

import { answersCollection } from 'constants/firestoreCollections';
import { CityContext } from 'components/CityProvider/CityProvider';
import { Header } from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import ProgressBar from 'components/ProgressBar/ProgressBar';
import Sidebar from 'components/Sidebar/Sidebar';

const Authenticated = ({ user, children }) => {
  const { firebase, currentUser, questionnaire } = useContext(CityContext);
  const [answers, setAnswers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebase
      .firestore()
      .collection(answersCollection(user.role))
      .doc(currentUser.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const loadedAnswers = doc.data();
          setAnswers(loadedAnswers);
        }
        setIsLoading(false);
      });
  }, [user, firebase, currentUser]);

  const getProgress = () => {
    if (!answers) {
      return 0;
    }

    const answersKeys = Object.keys(answers);
    const questionsKeys = Object.keys(questionnaire);
    return Number((answersKeys.length / questionsKeys.length) * 100).toFixed(0);
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Header />
      <ProgressBar progress={getProgress()} />

      {children}
      <Sidebar />
      <Footer />
    </>
  );
};

export default Authenticated;
