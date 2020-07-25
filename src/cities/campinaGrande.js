import { nationalQuestions } from './nationalQuestions';

export const cityName = 'Campina Grande';

export const cityPath = '/campina-grande';

const questionnaire = [
  ...nationalQuestions,
  {
    id: 11,
    question: 'Campina Grande Questão 11',
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
  apiKey: 'AIzaSyC0wJYldkpghKWOmje6OLr4RmpavYO6aAo',
  authDomain: 'vota-campina-grande-dev.firebaseapp.com',
  databaseURL: 'https://vota-campina-grande-dev.firebaseio.com',
  projectId: 'vota-campina-grande-dev',
  storageBucket: 'vota-campina-grande-dev.appspot.com',
  messagingSenderId: '357733865478',
  appId: '1:357733865478:web:f84cc829efa5dc35aa4b87',
};

export default {
  cityName,
  cityPath,
  questionnaire,
  firebaseConfig,
};
