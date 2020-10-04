export default function useFilterMatches({ matches, formValues }) {
  const filterByAge = (data) => {
    if (!formValues.age) {
      return data;
    }

    return data.age === formValues.age;
  };

  const filterByGender = (data) => {
    if (!formValues.gender) {
      return data;
    }

    return data.gender === formValues.gender;
  };

  const filterByEthnicGroup = (data) => {
    if (!formValues.ethnicGroup) {
      return data;
    }

    return data.ethnicGroup === formValues.ethnicGroup;
  };

  const filterByPoliticalParty = (data) => {
    if (!formValues.politicalParty) {
      return data;
    }

    return (data.politicalParty = formValues.politicalParty);
  };

  return matches
    .filter(filterByAge)
    .filter(filterByGender)
    .filter(filterByEthnicGroup)
    .filter(filterByPoliticalParty);
}
