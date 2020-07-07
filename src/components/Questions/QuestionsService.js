import firebase from 'firebase/app';

export const saveAnswer = (answer, collection) => {
  const userId = firebase.auth().currentUser.uid;
  return firebase
    .firestore()
    .collection(collection)
    .doc(userId)
    .set(answer, { merge: true });
};

export const saveJustification = (justification) => {
  const userId = firebase.auth().currentUser.uid;
  return firebase
    .firestore()
    .collection('candidate_justifications')
    .doc(userId)
    .set(justification, { merge: true });
};

export const watchAnswers = (collection) => {
  const userId = firebase.auth().currentUser.uid;
  return firebase.firestore().collection(collection).doc(userId);
};

export const watchAnswerJustification = () => {
  const userId = firebase.auth().currentUser.uid;
  return firebase
    .firestore()
    .collection('candidate_justifications')
    .doc(userId);
};

export const getCurrentUser = () => {
  const userId = firebase.auth().currentUser && firebase.auth().currentUser.uid;

  if (!userId) {
    return Promise.reject('Unknown user');
  }

  return firebase.firestore().collection('users').doc(userId).get();
};
