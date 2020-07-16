import React from 'react';
import { CityContext } from 'components/CityProvider/CityProvider';
import Question from 'components/Question/Question';

const Navigation = () => (
  <CityContext>
    {({ cityPath, questionnaire }) =>
      questionnaire.map((question) => {
        return <Question question={question.question} />;
      })
    }
  </CityContext>
);

export default Navigation;
