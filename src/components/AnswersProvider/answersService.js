import { answersCollection } from '../../constants/firestoreCollections';

export const getAnsweredQuestions = ({ firebase, user, currentUser }) =>
  firebase
    .firestore()
    .collection(answersCollection(user.role))
    .doc(currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const loadedAnswers = doc.data();
        return loadedAnswers;
      }
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
