import React from 'react';
import { Button, Col, FormGroup } from 'reactstrap';

import { ROLE_CANDIDATE } from 'constants/userRoles';

const QuestionnaireAction = ({ userRole, questionnaireLength, answersLength, questionIndex, onBack, onSkip }) => (
  <FormGroup row>
    {questionIndex > 0 && (
      <Col>
        <Button
          color="primary"
          outline
          block
          type="button"
          onClick={onBack}
        >
          Anterior
        </Button>
      </Col>
    )}

    {questionIndex < questionnaireLength - 1 && (
      <Col>
        <Button
          color="primary"
          outline
          block
          type="button"
          onClick={() => onSkip()}
        >
          {userRole === ROLE_CANDIDATE ? 'Pular' : 'Próxima'}
        </Button>
      </Col>
    )}

    {userRole === ROLE_CANDIDATE && (
      <Col>
        <Button type="submit" color="primary" block>
          {questionIndex === questionnaireLength - 1 ? 'Finalizar' : 'Responder'}
        </Button>
      </Col>
    )}
  </FormGroup>
);

export default QuestionnaireAction;
