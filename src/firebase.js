import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import cities from './cities';

const devConfig = {
  apiKey: 'AIzaSyCWQJu9s9_O7kMzJmz4H8mUK2d2hm4pFpk',
  authDomain: 'vota-authentication-dev.firebaseapp.com',
  databaseURL: 'https://vota-authentication-dev.firebaseio.com',
  projectId: 'vota-authentication-dev',
  storageBucket: 'vota-authentication-dev.appspot.com',
  messagingSenderId: '486228417417',
  appId: '1:486228417417:web:14a13ad6b4b41a52d4df58',
};

const prodConfig = {
  apiKey: 'AIzaSyB5FyquTVU5DeEDRB9EJEhkQiDje8JqNY0',
  authDomain: 'vota-authentication-prod.firebaseapp.com',
  databaseURL: 'https://vota-authentication-prod.firebaseio.com',
  projectId: 'vota-authentication-prod',
  storageBucket: 'vota-authentication-prod.appspot.com',
  messagingSenderId: '499239810325',
  appId: '1:499239810325:web:ff6ecdc92c5e7e725fe51c',
};

firebase.initializeApp(
  process.env.REACT_APP_FIREBASE_ENV === 'prod' ? prodConfig : devConfig,
);

cities.forEach((city) => {
  const cityConfig =
    process.env.REACT_APP_FIREBASE_ENV === 'prod'
      ? city.firebaseConfigProd
      : city.firebaseConfig;
  firebase.initializeApp(cityConfig, city.cityPath);
});
