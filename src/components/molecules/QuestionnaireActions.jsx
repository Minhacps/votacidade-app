import React from 'react';
import { Button, Col, FormGroup } from 'reactstrap';

import { ROLE_CANDIDATE, ROLE_VOTER } from 'constants/userRoles';

const QuestionnaireAction = ({ userRole, questionnaireLength, answersLength, minAnswers, questionIndex, alreadyAnswered, onBack, onSkip }) => (
  <FormGroup row>
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

    {((userRole === ROLE_VOTER && answersLength === minAnswers) || userRole === ROLE_CANDIDATE) && (
      <Col>
        <Button type="submit" color="primary" block>
          {userRole === ROLE_VOTER || (!alreadyAnswered && answersLength >= (minAnswers < 1)) ? 'Finalizar' : 'Responder'}
        </Button>
      </Col>
    )}
  </FormGroup>
);

export default QuestionnaireAction;
