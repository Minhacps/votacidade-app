import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const PageLoading = () => {
  return (
    <Container fluid className="text-primary">
      <Row className="vh-100">
        <Col sm="12" className="text-center my-auto">
          <h1 className="display-4">
            <FontAwesomeIcon icon={faSpinner} spin />
          </h1>
        </Col>
      </Row>
    </Container>
  );
};

export default PageLoading;
