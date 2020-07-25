import { nationalQuestions } from './nationalQuestions';
export const cityName = 'Recife';

export const cityPath = '/recife';

const questionnaire = [
  nationalQuestions,
  {
    id: 11,
    question: 'Recife Questão 11',
  },
  {
    id: 12,
    question: 'Questão 12',
  },
  {
    id: 13,
    question: 'Questão 13',
  },
  {
    id: 14,
    question: 'Questão 14',
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
