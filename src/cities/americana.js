export const cityName = 'Americana';

export const cityPath = '/americana';

const questionnaire = [
  {
    question:
      'Toda a população brasileira, incluindo pessoas de classe média e alta, deve ter acesso à saúde pública gratuita.',
    explanation: '',
  },
  {
    question:
      'Municípios mais pobres devem receber mais recursos para a Educação.',
    explanation: '',
  },
  {
    question:
      'Taxar o uso do carro é uma boa solução para incentivar o uso do transporte coletivo.',
    explanation: '',
  },
  {
    question:
      'A privatização da gestão de água e esgoto vai facilitar o acesso à água em bairros mais pobres.',
    explanation: '',
  },
  {
    question:
      'Os(as) candidatos(as) eleitos(as) podem tomar decisões de interesse público, como projetos de lei, sem ouvir a população, uma vez que são representantes do povo.',
    explanation: '',
  },
  {
    question:
      'O mais importante é que as pessoas façam o isolamento social para evitar a disseminação do coronavírus enquanto não temos vacina.',
    explanation: '',
  },
  {
    question: 'As instituições religiosas devem continuar sem pagar impostos.',
    explanation: '',
  },
  {
    question:
      'O Brasil deve cobrar menos impostos de grandes fortunas e heranças.',
    explanation: '',
  },
  {
    question:
      'A ação da polícia deve ser protegida, livre de acusações de abuso de autoridade.',
    explanation: '',
  },
  {
    question:
      'O governo deve fornecer auxílio econômico e psicológico a mulheres que saem de casa por causa da violência doméstica.',
    explanation: '',
  },
  {
    question:
      'O auxílio emergencial federal deve ser constante para toda a população, como uma renda básica para todos.',
    explanation: '',
  },
  {
    question:
      'A Prefeitura investe o suficiente nos Centros de Saúde para prevenção à saúde da população.',
    explanation: '',
  },
  {
    question: 'Proibição definitiva do consumo da maconha.',
    explanation: '',
  },
  {
    question: 'É importante que a Guarda Municipal tenha porte de armas.',
    explanation: '',
  },
  {
    question: 'A cor da pele influencia a abordagem policial.',
    explanation: '',
  },
  {
    question:
      'As escolas municipais devem ensinar o combate à opressão de gênero, como a violência contra as mulheres.',
    explanation: '',
  },
  {
    question: 'A LGBTfobia deve ser criminalizada.',
    explanation: '',
  },
  {
    question:
      'A queima do lixo é uma ótima alternativa para a gestão de resíduos da cidade.',
    explanation: '',
  },
  {
    question:
      'Todos os lugares devem ser obrigados a ter acesso para cadeirantes, sob pena de multa.',
    explanation: '',
  },
  {
    question:
      'É necessário considerar que as mulheres em situação de violência doméstica às vezes não conseguem denunciar devido o medo, vergonha e culpa.',
    explanation: '',
  },
  {
    question:
      'A proibição do uso de materiais plásticos descartáveis, como canudos, copos e talheres, em bares e restaurantes é desnecessária e fere a liberdade dos empresários.',
    explanation: '',
  },
  {
    question:
      'Fakes news devem ser combatidas e severamente punidas e o poder público não pode contribuir nem veicular conteúdo através de canais de mídias que são propagadores de fake News',
    explanation: '',
  },
  {
    question:
      'É necessário valorizar grupos e entidades locais das periferias, com suporte e infra estrutura para realização de eventos em praças e centros comunitários',
    explanation: '',
  },
  {
    question:
      'A saúde básica (postos de saúde) deveria ser administrada e executada apenas pela esfera federal.',
    explanation: '',
  },
  {
    question:
      'O Poder Público deve oferecer todos os recursos necessários para o funcionamento das atividades de saúde bem como oferecer o benefício para profissionais vítimas da COVID-19.',
    explanation: '',
  },
  {
    question:
      'A Ficha Limpa é uma estratégia que fortalece o processo democrático.',
    explanation: '',
  },
  {
    question:
      'A Comunicação com a população é fundamental para a defesa dos seus interesses e deve ser promovido por todos os seus representantes políticos',
    explanation: '',
  },
  {
    question:
      'É necessário investir em ações para fortalecer o combate ao feminicídio e à violência contra as mulheres.',
    explanation: '',
  },
  {
    question: 'Votar em um candidato(a) negro(a) é uma prioridade.',
    explanation: '',
  },
  {
    question:
      'Debates sobre gênero e sexualidade nas escolas são importantes no combate a violência e ao preconceito.',
    explanation: '',
  },
];

export const firebaseConfig = {
  apiKey: 'AIzaSyBj357Z6zKvKR_BIu5o7HzDoDCKCv8vZ0E',
  authDomain: 'vota-americana-dev.firebaseapp.com',
  databaseURL: 'https://vota-americana-dev.firebaseio.com',
  projectId: 'vota-americana-dev',
  storageBucket: 'vota-americana-dev.appspot.com',
  messagingSenderId: '217995150141',
  appId: '1:217995150141:web:8c6f562518d9f8f34e7b54',
};

export const firebaseConfigProd = {
  apiKey: 'AIzaSyAHf9WDqB7gRNSK3gHez4ahcrkqUEChrk8',
  authDomain: 'vota-americana-prod.firebaseapp.com',
  databaseURL: 'https://vota-americana-prod.firebaseio.com',
  projectId: 'vota-americana-prod',
  storageBucket: 'vota-americana-prod.appspot.com',
  messagingSenderId: '882679912648',
  appId: '1:882679912648:web:61ceea017e613942e3edfd',
};

const totalCandidates = 505;

export default {
  cityName,
  cityPath,
  questionnaire,
  firebaseConfig,
  firebaseConfigProd,
  totalCandidates,
  enableRanking: false,
};
