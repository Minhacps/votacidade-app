import React from 'react';
import { Container, Col, Row } from 'reactstrap';
const CandidateCard = ({ candidate }) => {
  // console.log(candidate);
  return (
    <Container className="flex-column">
      <div className="card mb-3">
        <Row>
          {/* <Col xs="4">
            <div style={{border:"1px black solid", width:"100px", height:"100px"}}>
            {/* <img
              style={{ width: '100px', borderRadius: '50%' }}
              className="card-img py-1 px-1"
              src="http://divulgacandcontas.tse.jus.br/candidaturas/oficial/2020/SP/62910/426/candidatos/82112/IMG_7914%20-%20BETHY%20MENINA%20BONITA%20-%20CAMPINAS%20-%20URNA.jpg"
              alt="Foto do candidato(a)"
            /> 
            </div>
            </Col>*/}
          <Col xs="12">
            <div className="card-body">
              <h5 className="card-title">{candidate.name}</h5>
              <p className="card-text">
                {candidate.candidateNumber}
                {' | '}
                {candidate.politicalParty}
              </p>
              <p className="card-text">
                <span className="text-muted">
                  N° de respostas: {` ${candidate.answersCompleted}`}
                </span>
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default CandidateCard;
