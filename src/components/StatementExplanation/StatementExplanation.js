import React, { useState } from 'react';
import { Button, Card, CardBody, Collapse } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfoCircle,
  faCaretDown,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons';

const StatementExplanation = ({ explanation }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Button onClick={toggle} color="link" className="text-muted">
        <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />

        <small className="font-weight-bold">Entenda melhor a questão</small>

        {isOpen ? (
          <FontAwesomeIcon icon={faCaretUp} className="ml-2" />
        ) : (
          <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
        )}
      </Button>

      <Collapse isOpen={isOpen} className="mt-2">
        <Card>
          <CardBody style={{ fontSize: '12px' }}>{explanation}</CardBody>
        </Card>
      </Collapse>
    </>
  );
};

export default StatementExplanation;
