import { apiDomain } from '../../constants/api';

export const getMatches = ({ answers, projectId }) => {
  const query = btoa(
    JSON.stringify({
      answers,
      instance: projectId,
    }),
  );

  return fetch(`${apiDomain}/api/getTopMatches?query=${query}`)
    .then((response) => response.json())
    .then((response) => response);
};
