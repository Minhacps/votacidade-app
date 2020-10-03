import React, { useContext } from 'react';
import { Button, Col, FormGroup } from 'reactstrap';

import { ROLE_CANDIDATE } from 'constants/userRoles';
import { ROLE_VOTER } from '../../constants/userRoles';
import { Link } from 'react-router-dom';
import { CityContext } from '../CityProvider/CityProvider';

const QuestionnaireAction = ({ userRole, questionnaireLength, answersLength, minAnswers, questionIndex, alreadyAnswered, onBack, onSkip }) => {
  const { cityPath, enableRanking } = useContext(CityContext);

  return (
    <>
      <FormGroup row className="mt-4">
        <Col>
          <Button
            color="primary"
            outline
            block
            type="button"
            onClick={onBack}
            disabled={questionIndex === 0}
          >
            Anterior
          </Button>
        </Col>

        <Col>
          <Button
            color="primary"
            outline
            block
            type="button"
            onClick={() => onSkip()}
            disabled={questionIndex === questionnaireLength - 1}
          >
            {userRole === ROLE_CANDIDATE ? 'Pular' : 'Próxima'}
          </Button>
        </Col>

        {userRole === ROLE_CANDIDATE && (
          <Col>
            <Button type="submit" color="primary" block>
              {answersLength >= (minAnswers - 1) && !alreadyAnswered ? 'Finalizar' : 'Responder'}
            </Button>
          </Col>
        )}
      </FormGroup>
      {enableRanking && answersLength >= minAnswers && userRole === ROLE_VOTER && (
        <FormGroup>
          <Button tag={Link} to={`${cityPath}/ranking`} color="link" block>
            Ir para o ranking
          </Button>
        </FormGroup>
      )}
    </>
  );
};

export default QuestionnaireAction;
