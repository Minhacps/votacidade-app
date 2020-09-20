import React from 'react';
import { Button, FormGroup } from 'reactstrap';

import { ROLE_CANDIDATE } from 'constants/userRoles';

const QuestionnaireAction = ({ userRole, questionnaireLength, questionIndex, onSkip, onBack }) => (
  <FormGroup>
    {questionIndex > 0 && (
      <Button
        color="primary"
        outline
        type="button"
        onClick={onBack}
        className="w-100 mr-4"
      >
        Anterior
      </Button>
    )}

    {questionIndex < questionnaireLength - 1 && (
      <Button
        color="primary"
        outline
        type="button"
        onClick={() => onSkip()}
        className="w-100 mr-4"
      >
        {userRole === ROLE_CANDIDATE ? 'Pular' : 'Próxima'}
      </Button>
    )}

    {userRole === ROLE_CANDIDATE && (
      <Button type="submit" color="primary" className="w-100" outline>
        {questionIndex === questionnaireLength - 1 ? 'Finalizar' : 'Responder'}
      </Button>
    )}
  </FormGroup>
);

export default QuestionnaireAction;
