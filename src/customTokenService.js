export const getCustomToken = ({ uid, projectId }) => {
  const queryParams = `?uid=${uid}&instance=${projectId}`;

  return fetch(`https://votacidade.vercel.app/api/generateToken${queryParams}`)
    .then((response) => response.json())
    .then((response) => response.token);
};
