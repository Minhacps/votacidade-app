import { nationalQuestions } from './nationalQuestions';
export const cityName = 'Recife';

export const cityPath = '/recife';

const questionnaire = [
  ...nationalQuestions,
  {
    question: 'Recife Questão 11',
  },
  {
    question: 'Recife Questão 12',
  },
  {
    question: 'Recife Questão 13',
  },
  {
    question: 'Recife Questão 14',
  },
];

export const firebaseConfig = {
  apiKey: 'AIzaSyDgq0fxCglQNkm_UatOMCqhfNUenW51u8g',
  authDomain: 'vota-recife-dev.firebaseapp.com',
  databaseURL: 'https://vota-recife-dev.firebaseio.com',
  projectId: 'vota-recife-dev',
  storageBucket: 'vota-recife-dev.appspot.com',
  messagingSenderId: '2058177508',
  appId: '1:2058177508:web:6d43b3617e7b28a0dc15f1',
};

export default {
  cityName,
  cityPath,
  questionnaire,
  firebaseConfig,
};
