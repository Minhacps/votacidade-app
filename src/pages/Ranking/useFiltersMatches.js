export default function useFilterMatches({ matches, formValues }) {
  const appliedFilter = formValues;

  const filterBySocialGroup = (data) => {
    if (!formValues.socialGroup || formValues.socialGroup.length === 0) {
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

  const filterByName = (data) => {
    if (!formValues.name) {
      return data;
    }

    const candidateName = String(data.name).toLowerCase();
    const filterName = String(formValues.name).toLowerCase();

    return candidateName.includes(filterName);
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

    return data.politicalParty === formValues.politicalParty;
  };

  return matches
    .filter(filterByName)
    .filter(filterBySocialGroup)
    .filter(filterByAge)
    .filter(filterByGender)
    .filter(filterByEthnicGroup)
    .filter(filterByPoliticalParty);
}
