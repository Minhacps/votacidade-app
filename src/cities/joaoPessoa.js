export const cityName = 'João Pessoa';

export const cityPath = '/joao-pessoa';

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
      'O mais importante é que as pessoas façam o isolamento social para evitar a propagação do coronavírus enquanto não temos vacina.',
    explanation: '',
  },
  {
    question: 'As instituições religiosas devem continuar sem pagar impostos.',
    explanation: '',
  },
  {
    question: 'O Brasil deve taxar grandes fortunas e heranças.',
    explanation: '',
  },
  {
    question:
      'A ação da polícia deve ser fiscalizada, para evitar abuso de autoridade. ',
    explanation: '',
  },
  {
    question:
      'O governo deve fornecer suporte financeiro e psicológico a mulheres que saem de casa por causa da violência doméstica.',
    explanation: '',
  },
  {
    question:
      'Remuneração docente acima de 4 salários mínimos e a contratação via concurso público possibilitam uma maior qualidade da educação pública.',
    explanation: '',
  },
  {
    question:
      'A política de cotas sociais contribui para a diminuição das desigualdades educacionais e sociais.',
    explanation: '',
  },
  {
    question:
      'A criminalização da maconha não tem eficiência na redução do consumo. Pelo contrário: gera mais violência, criminaliza pobreza, sobrecarrega o sistema penitenciário e gera lucros exorbitantes para a indústria de armas e bebidas.',
    explanation: '',
  },
  {
    question:
      'Isenção do IPTU para a população de baixa renda é um mecanismo importante para redução das desigualdades sociais.',
    explanation: '',
  },
  {
    question:
      'A Câmara Municipal de João Pessoa consegue servir como porta-voz dos interesses e reivindicações das diversas representações da sociedade civil  e da população.',
    explanation: '',
  },
  {
    question:
      'Por vezes, mulheres em situação de violência doméstica não conseguem denunciar por medo, vergonha e culpa.',
    explanation: '',
  },
  {
    question:
      'A proibição do uso de canudos, copos e talheres descartáveis é desnecessária e fere a liberdade dos empresários.',
    explanation: '',
  },
  {
    question:
      'A Câmara de Vereadores deveria ter instaurado a CPI da Lagoa para investigar um suposto desvio de dinheiro nas obras do Parque Solon Lucena.',
    explanation: '',
  },
  {
    question:
      'A ampliação das faixas exclusivas para os ônibus do transporte coletivo aumenta a fluidez do trânsito e favorece a mobilidade urbana.',
    explanation: '',
  },
  {
    question:
      'Fake news devem ser combatidas, os responsáveis pela sua propagação devem ser punidos e o poder público não deve veicular conteúdo através de canais midiáticos que impulsionam a sua disseminação.',
    explanation: '',
  },
  {
    question:
      'O porte de armas de fogo por Guardas Municipais deve ser proibido.',
    explanation: '',
  },
  {
    question:
      'É necessário criar políticas públicas contra o desarmamento e a favor da cultura da paz e comunicação não-violenta.',
    explanation: '',
  },
  {
    question:
      'É necessário valorizar grupos e entidades periféricas, dando suporte e infraestrutura para realização de eventos em praças e centros comunitários.',
    explanation: '',
  },
  {
    question:
      'A saúde básica (postos de saúde) deveria ser administrada e executada apenas pela esfera federal.',
    explanation: '',
  },
  {
    question:
      'O poder público deve oferecer todos os recursos necessários para o funcionamento das atividades de saúde bem como oferecer benefício para profissionais vítimas da COVID-19.',
    explanation: '',
  },
  {
    question:
      'Abrigos de imigrantes devem receber benefícios, tais como isenção de IPTU.',
    explanation: '',
  },
  {
    question:
      'O poder público deve criar programas para promover a contratação de pessoas LGBTQIA+ no mercado de trabalho.',
    explanation: '',
  },
  {
    question:
      'A acessibilidade dos bairros em João Pessoa é excelente e facilita a mobilidade das pessoas com dificuldade de locomoção.',
    explanation: '',
  },
  {
    question:
      'Geralmente, a abordagem policial é mais truculenta ou violenta quando as pessoas abordadas são negras.',
    explanation: '',
  },
  {
    question:
      'As escolas têm papel central na construção e promoção da equidade de gênero desde a Educação Infantil. ',
    explanation: '',
  },
];

export const firebaseConfig = {
  apiKey: 'AIzaSyBYVY-XCJsMtsSkeUNytgk2l7p3BEvPfsY',
  authDomain: 'vota-jampa-dev.firebaseapp.com',
  databaseURL: 'https://vota-jampa-dev.firebaseio.com',
  projectId: 'vota-jampa-dev',
  storageBucket: 'vota-jampa-dev.appspot.com',
  messagingSenderId: '16173311392',
  appId: '1:16173311392:web:e698ffbe4c661b66cdb0c5',
};

export const firebaseConfigProd = {
  apiKey: 'AIzaSyCPhDA2PTMtWgZ5PY8XzVIb83xJZW3jhWU',
  authDomain: 'vota-jampa-prod.firebaseapp.com',
  databaseURL: 'https://vota-jampa-prod.firebaseio.com',
  projectId: 'vota-jampa-prod',
  storageBucket: 'vota-jampa-prod.appspot.com',
  messagingSenderId: '1078941666488',
  appId: '1:1078941666488:web:6fd02c3c5b5833848c784d',
};

const totalCandidates = 663;

export default {
  cityName,
  cityPath,
  questionnaire,
  firebaseConfig,
  firebaseConfigProd,
  totalCandidates,
  enableRanking: false,
};
