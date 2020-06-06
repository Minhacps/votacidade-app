import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyB4nonpNJdxeKzemlkASmjUyRyY-5EpF3U',
  authDomain: 'vota-campinas-dev.firebaseapp.com',
  databaseURL: 'https://vota-campinas-dev.firebaseio.com',
  projectId: 'vota-campinas-dev',
  storageBucket: 'vota-campinas-dev.appspot.com',
  messagingSenderId: '1091437694698',
  appId: '1:1091437694698:web:6173d6460c826d95e01193',
};

firebase.initializeApp(firebaseConfig);
