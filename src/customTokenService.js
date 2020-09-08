export const getCustomToken = ({ uid, cityPath }) => {
  const queryParams = `?uid=${uid}&instance=${cityPath.replace('/', '')}`;

  return fetch(`https://votacidade.vercel.app/api/generateToken${queryParams}`)
    .then((response) => response.json())
    .then((response) => response.token);
};
