import useFilterMatches from './useFiltersMatches';

const data = [
  {
    id: 'candidate',
    age: '55-59',
    candidateNumber: '17077',
    city: 'campinas',
    cnpj: '49.015.186/0001-41',
    description: 'Any',
    email: 'candidate@a.com',
    ethnicGroup: 'Indígena',
    gender: 'Feminino',
    name: 'Frederick Quinn',
    picture:
      'http://divulgacandcontas.tse.jus.br/candidaturas/oficial/2020/SP/62910/426/candidatos/209297/1600362618450.jpeg',
    politicalParty: 'DC',
    role: 'candidate',
    socialGroup: '',
    match: 6394,
  },
  {
    id: 'candidate-l',
    age: '25-29',
    candidateNumber: '13242',
    city: 'campinas',
    cnpj: '',
    description: 'Vote em mim, pela renovação!',
    email: 'j_candidato-ameri@email.com',
    ethnicGroup: 'Branca',
    gender: 'Masculino',
    name: 'joao candidato americana',
    politicalParty: 'PT',
    role: 'candidate',
    socialGroup: [{ label: 'Lésbica', value: 'L' }],
    match: 4038,
  },
];

describe('useFilterMatches', () => {
  it('returns a filtered list based on social group', () => {
    const appliedFilters = {
      age: '',
      gender: '',
      socialGroup: [{ value: 'L', label: 'Lésbica' }],
      ethnicGroup: '',
      politicalParty: '',
    };

    const result = useFilterMatches({
      matches: data,
      formValues: appliedFilters,
    });

    expect(result.length).toBe(1);
    expect(result[0].id).toBe('candidate-l');
  });
});
