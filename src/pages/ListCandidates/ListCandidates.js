import React, { useContext, useEffect, useState } from 'react';
import {
  Col,
  Container,
  CustomInput,
  Form,
  FormGroup,
  Label,
  Row,
  Spinner,
} from 'reactstrap';

import { CityContext } from '../../components/CityProvider/CityProvider';
import { alfabeticOrder } from '../../styles/helper';
import { politicalParties } from '../../data/form-data';
import getPicture from 'constants/candidatePicture';

import ImageThumbnail from 'components/atoms/ImageThumbnail';
import {
  AnswerTag,
  CandidateCard,
  CardInfo,
  CardName,
  Description,
  Divider,
  InfoWrapper,
  PageTitle,
} from './ListCandidates.styled';
import { CenteredContent } from '../Ranking/Ranking.styled';

const ListCandidates = ({ firebase }) => {
  const { cityPath, totalCandidates } = useContext(CityContext);
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase
      .database()
      .ref()
      .orderByChild('name')
      .once('value', (data) => {
        data.forEach(function (childSnapshot) {
          let candidate = childSnapshot.val();
          const answers = candidate?.answers;

          candidate.answersCompleted = 0;

          if (answers) {
            const answersKeys = Object.keys(answers);
            candidate.answersCompleted = answersKeys.length;
          }

          setCandidates((candidates) => [...candidates, candidate]);
          setFilteredCandidates((candidates) => [...candidates, candidate]);
          setLoading(false);
        });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebase]);

  const handlePoliticalPartyFilter = (event) => {
    setFilteredCandidates(
      candidates.filter((candidate) => {
        if (!event.target.value) {
          return true;
        }

        return candidate.politicalParty === event.target.value;
      }),
    );
  };

  return (
    <Container className="py-4">
      <PageTitle>Candidaturas</PageTitle>
      {loading ? (
        <CenteredContent>
          <Spinner color="primary" />
        </CenteredContent>
      ) : (
        <>
          <Form>
            <Row>
              <Col xs="12" sm="6">
                <FormGroup>
                  <Label for="politicalParty">Partido</Label>
                  <CustomInput
                    type="select"
                    id="politicalParty"
                    onChange={handlePoliticalPartyFilter}
                  >
                    <option value="">Todos</option>
                    {politicalParties
                      .sort(alfabeticOrder('numero'))
                      .map((partido) => {
                        return (
                          <option key={partido.sigla} value={partido.sigla}>
                            {' '}
                            {partido.numero} - {partido.sigla} - {partido.nome}
                          </option>
                        );
                      })}
                  </CustomInput>
                </FormGroup>
              </Col>
            </Row>
          </Form>
          <Divider />
          <Description>
            Mostrando <strong>{filteredCandidates.length}</strong>{' '}
            candidatura(s) de <strong>{candidates.length}</strong> cadastrada(s)
            de um total de <strong>{totalCandidates}</strong> registrada(s).
          </Description>
          {filteredCandidates.length === 0 ? (
            <p className="text-muted">Nenhuma candidatura encontrada.</p>
          ) : (
            filteredCandidates.map((candidate, index) => (
              <div
                key={`${index}${candidate.candidateNumber}`}
                data-testid="candidate-item"
              >
                <CandidateCard>
                  <ImageThumbnail
                    src={getPicture(cityPath, candidate.candidateNumber)}
                    alt={`Foto de ${candidate.name}`}
                    placeholderText="Foto"
                    width="83px"
                    height="83px"
                    className="border mr-3"
                  />
                  <InfoWrapper>
                    <CardName>{candidate.name}</CardName>
                    <CardInfo>
                      {candidate.candidateNumber} | {candidate.politicalParty}
                    </CardInfo>
                    <CardInfo>
                      Respostas:{' '}
                      <AnswerTag>{candidate.answersCompleted}</AnswerTag>
                    </CardInfo>
                  </InfoWrapper>
                </CandidateCard>
                <Divider />
              </div>
            ))
          )}
        </>
      )}
    </Container>
  );
};

export default ListCandidates;
