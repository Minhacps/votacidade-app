import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import cities from './cities';

const defaultConfig = {
  apiKey: 'AIzaSyCWQJu9s9_O7kMzJmz4H8mUK2d2hm4pFpk',
  authDomain: 'vota-authentication-dev.firebaseapp.com',
  databaseURL: 'https://vota-authentication-dev.firebaseio.com',
  projectId: 'vota-authentication-dev',
  storageBucket: 'vota-authentication-dev.appspot.com',
  messagingSenderId: '486228417417',
  appId: '1:486228417417:web:14a13ad6b4b41a52d4df58',
};

firebase.initializeApp(defaultConfig);

cities.forEach((city) => {
  firebase.initializeApp(city.firebaseConfig, city.cityPath);
});
