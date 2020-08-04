import { nationalQuestions } from './nationalQuestions';

export const cityName = 'Campinas';

export const cityPath = '/campinas';

const questionnaire = [
  ...nationalQuestions,
  {
    question: 'Campinas Questão 11',
  },
  {
    question: 'Campinas Questão 12',
  },
  {
    question: 'Campinas Questão 13',
  },
  {
    question: 'Campinas Questão 14',
  },
];

export const firebaseConfig = {
  apiKey: 'AIzaSyB4nonpNJdxeKzemlkASmjUyRyY-5EpF3U',
  authDomain: 'vota-campinas-dev.firebaseapp.com',
  databaseURL: 'https://vota-campinas-dev.firebaseio.com',
  projectId: 'vota-campinas-dev',
  storageBucket: 'vota-campinas-dev.appspot.com',
  messagingSenderId: '1091437694698',
  appId: '1:1091437694698:web:6173d6460c826d95e01193',
};

export default {
  cityName,
  cityPath,
  questionnaire,
  firebaseConfig,
};
