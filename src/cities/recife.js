export const cityName = 'Recife';

export const cityPath = '/recife';

const questionnaire = [
  {
    question:
      'Toda a população brasileira, incluindo pessoas de classe média e alta, deve ter acesso à saúde pública gratuita.',
    explanation: '',
  },
  {
    question:
      'A privatização da gestão de água e esgoto vai facilitar o acesso à água em bairros mais pobres.',
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
      'A privatização do SUS é uma solução viável para melhorar o serviço no atendimento da população.',
    explanation: '',
  },
  { question: 'Sou a favor da redução da maioridade penal.', explanation: '' },
  {
    question:
      'Sou a favor do uso, do posse e do porte de armas de fogo por cidadãos em geral.',
    explanation: '',
  },
  {
    question:
      'A valorização do professor impacta diretamente na qualidade do ensino.',
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
      'Sou contra leis mais rígidas para punição de crimes cometidos por LGBTfobia.',
    explanation: '',
  },
  {
    question:
      'Debates sobre gênero e sexualidade nas escolas são importantes no combate a violência e ao preconceito.',
    explanation: '',
  },
  {
    question:
      'Investir nas Políticas de Acolhimento aos imigrantes é necessário para se atender as necessidades dos povos que buscam nossa cidade para asilo.',
    explanation: '',
  },
  {
    question:
      'As pessoas com deficiências devem ser priorizadas para garantir sua mobilidade e acessibilidade',
    explanation: '',
  },
  {
    question: 'Sou a favor da descriminalização do uso da maconha.',
    explanation: '',
  },
  {
    question:
      'É necessário ampliar o investimento no orçamento municipal em Cultura.',
    explanation: '',
  },
  {
    question:
      'É preciso investir em leis de incentivo, proteção valorizar os povos tradicionais e suas culturas.',
    explanation: '',
  },
  {
    question:
      'A gestão de resíduos é importante para a garantia da Sustentabilidade do Meio Ambiente.',
    explanation: '',
  },
  {
    question:
      'A especulação imobiliária é um risco para zonas costeiras, manguezais e alagados na cidade.',
    explanation: '',
  },
  {
    question:
      'A Renda Básica é uma solução viável no combate à Desigualdade Social e Econômica.',
    explanation: '',
  },
  {
    question:
      'O transporte coletivo e por bicicletas são opções necessárias para a melhoria da Mobilidade Urbana.',
    explanation: '',
  },
  {
    question:
      'A Ficha Limpa é uma estratégia que fortalece o processo democrático.',
    explanation: '',
  },
  {
    question:
      'A Comunicação com a população é fundamental para a defesa dos seus interesses e deve ser promovido por todos os seus representantes políticos.',
    explanation: '',
  },
  {
    question:
      'A criação de programas renda mínima são importantes no combate  à pobreza  e a desigualdade durante e depois da pandemia.',
    explanation: '',
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

export const firebaseConfigProd = {
  apiKey: 'AIzaSyDOhr1c_TyIWWLrBoe490X0bKnvK8E5bSI',
  authDomain: 'vota-recife-prod.firebaseapp.com',
  databaseURL: 'https://vota-recife-prod.firebaseio.com',
  projectId: 'vota-recife-prod',
  storageBucket: 'vota-recife-prod.appspot.com',
  messagingSenderId: '1025336522618',
  appId: '1:1025336522618:web:f916bf25fe70198fca48c3',
};

const totalCandidates = 884;

export default {
  cityName,
  cityPath,
  questionnaire,
  firebaseConfig,
  firebaseConfigProd,
  totalCandidates,
  enableRanking: false,
};
