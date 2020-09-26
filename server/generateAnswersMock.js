const fs = require('fs');
const { nanoid } = require('nanoid');

const template = {
  age: '25-29',
  answers: [
    'DT',
    'DT',
    'DT',
    'DT',
    'DT',
    'DT',
    'D',
    'D',
    'DT',
    'DT',
    'DT',
    'D',
    'D',
    'DT',
    'C',
    'DT',
    'DT',
    'DT',
    'DT',
    'DT',
    'DT',
    'D',
    'D',
    'DT',
    'DT',
    'DT',
    'D',
    'D',
    'DT',
    'C',
    'CT',
  ],
  candidateNumber: '123',
  city: 'campinas',
  cnpj: '51.894.866/0001-24',
  description:
    'Lorem ipsum dolor Lorem ipsum dolorLorem ipsum dolorLorem ipsum dolorLorem ipsum dolorLorem ipsum dolorLorem ipsum dolorLorem ipsum dolorLorem ipsum dolorLorem ipsum dolorLorem ipsum dolorLorem ipsum dolorLorem ipsum dolorLorem ipsum dolorLorem ipsum dolorLorem ipsum dolor',
  email: 'candidato@vota.com',
  ethnicGroup: 'Amarela',
  gender: 'Feminino',
  name: 'candidato@vota.com',
  politicalParty: 'DC',
  role: 'candidate',
  socialGroup: 'LGBT',
};

const result = Array(600)
  .fill(null)
  .reduce((acc, item, index) => {
    return {
      ...acc,
      [nanoid()]: template,
    };
  }, {});

fs.writeFileSync('./data.json', JSON.stringify(result));
