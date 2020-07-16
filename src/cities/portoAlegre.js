import { nationalQuestions } from './nationalQuestions';

export const cityName = 'Porto Alegre';

export const cityPath = '/porto-alegre';

const cityQuestions = [
  {
    id: 11,
    question: 'Porto AlegreQuestão 11',
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
export const questionnaire = [].concat(nationalQuestions, cityQuestions);
console.log(questionnaire);

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
