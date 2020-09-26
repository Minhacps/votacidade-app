export const getMatches = ({ answers, projectId }) => {
  const query = btoa(
    JSON.stringify({
      answers,
      instance: projectId,
    }),
  );

  return fetch(`https://votacidade.vercel.app/api/getTopMatches?query=${query}`)
    .then((response) => response.json())
    .then((response) => response);
};
