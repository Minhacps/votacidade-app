import * as firebase from 'firebase/app';
import { firebaseConfig } from './cities/campinas';

import 'firebase/auth';
import 'firebase/firestore';

export const firebaseSetup = (firebaseConfig) =>
  firebase.initializeApp(firebaseConfig);
