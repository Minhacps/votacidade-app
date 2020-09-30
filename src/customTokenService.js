import { apiDomain } from './constants/api';

export const getCustomToken = ({ uid, projectId }) => {
  const queryParams = `?uid=${uid}&instance=${projectId}`;

  return fetch(`${apiDomain}/api/generateToken${queryParams}`)
    .then((response) => response.json())
    .then((response) => response.token);
};
