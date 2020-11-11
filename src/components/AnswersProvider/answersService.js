import { answersCollection } from '../../constants/firestoreCollections';

const getLocalAnswers = () => {
  try {
    const localAnswers = window.localStorage.getItem('answers');
    return JSON.parse(localAnswers);
  } catch (e) {
    return null;
  }
};

export const getAnsweredQuestions = ({ firebase, user, currentUser }) =>
  new Promise((resolve) => {
    const localAnswers = getLocalAnswers();

    if (localAnswers) {
      resolve(localAnswers);
      return;
    }

    firebase
      .firestore()
      .collection(answersCollection(user.role))
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const loadedAnswers = doc.data();
          resolve(loadedAnswers);
        }
        resolve(null);
      });
  });

export const syncAnswers = ({ firebase, user, currentUser, answers }) =>
  firebase
    .firestore()
    .collection(answersCollection(user.role))
    .doc(currentUser.uid)
    .set(answers, { merge: true });

export default {
  getAnsweredQuestions,
  syncAnswers,
};
