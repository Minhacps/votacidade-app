export default function useFilterMatches({ matches, formValues }) {
  const appliedFilter = formValues;

  const filterBySocialGroup = (data) => {
    if (!formValues.socialGroup) {
      return data;
    }

    if (!data.socialGroup) {
      return false;
    }

    const filteredGroups = appliedFilter.socialGroup.map((i) => i.value);
    const candidateIdentifiedGroups = data.socialGroup.map((i) => i.value);

    return filteredGroups.some((item) =>
      candidateIdentifiedGroups.includes(item),
    );
  };

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
    .filter(filterBySocialGroup)
    .filter(filterByAge)
    .filter(filterByGender)
    .filter(filterByEthnicGroup)
    .filter(filterByPoliticalParty);
}
