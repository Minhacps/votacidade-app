import React, { useEffect, useState, useContext } from 'react';
import { AnswersContext } from 'components/AnswersProvider/AnswersProvider';
import { getMatches } from './matchesService';

export const MatchesContext = React.createContext();

const MatchesProvider = ({ firebase, children }) => {
  const { getAnswersMap } = useContext(AnswersContext);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    getMatches({
      answers: getAnswersMap(),
      projectId: firebase.options.projectId,
    }).then((data) => setMatches(data));

    // this useEffect should be executed only once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MatchesContext.Provider value={{ matches }}>
      {children}
    </MatchesContext.Provider>
  );
};

export default MatchesProvider;
