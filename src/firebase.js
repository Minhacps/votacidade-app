import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import cities from './cities';

const defaultConfig = {
  apiKey: 'AIzaSyDIQWupPw0Wtdz8m_bJrjstYuMxSDlGY_g',
  authDomain: 'vota-cidade-dev.firebaseapp.com',
  databaseURL: 'https://vota-cidade-dev.firebaseio.com',
  projectId: 'vota-cidade-dev',
  storageBucket: 'vota-cidade-dev.appspot.com',
  messagingSenderId: '825608144160',
  appId: '1:825608144160:web:46e2d51bec05f2f7254345',
};

firebase.initializeApp(defaultConfig);

cities.forEach((city) => {
  firebase.initializeApp(city.firebaseConfig, city.path);
});
