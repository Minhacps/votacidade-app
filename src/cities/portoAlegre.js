import { nationalQuestions } from './nationalQuestions';

export const cityName = 'Porto Alegre';

export const cityPath = '/porto-alegre';

const questionnaire = [
  ...nationalQuestions,
  {
    question: 'Porto Alegre Questão 11',
  },
  {
    question: 'Porto Alegre Questão 12',
  },
  {
    question: 'Porto Alegre Questão 13',
  },
  {
    question: 'Porto Alegre Questão 14',
  },
];

export const firebaseConfig = {
  apiKey: 'AIzaSyDQChz1sWIRwUQzJA4e2t3wZx3MJFKSTUo',
  authDomain: 'vota-porto-alegre-dev.firebaseapp.com',
  databaseURL: 'https://vota-porto-alegre-dev.firebaseio.com',
  projectId: 'vota-porto-alegre-dev',
  storageBucket: 'vota-porto-alegre-dev.appspot.com',
  messagingSenderId: '199357298152',
  appId: '1:199357298152:web:8afd86d7ddfaf01fb1a05d',
};

export default {
  cityName,
  cityPath,
  questionnaire,
  firebaseConfig,
};
