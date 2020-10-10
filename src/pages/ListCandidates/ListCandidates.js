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
import { CityContext } from '../../components/CityProvider/CityProvider';
import ImageThumbnail from 'components/atoms/ImageThumbnail';
import getPicture from 'constants/candidatePicture';
import { politicalParties } from '../../data/form-data';
import { alfabeticOrder } from '../../styles/helper';

const ListCandidates = ({ firebase }) => {
  const { cityPath, totalCandidates } = useContext(CityContext);
  const [candidates, setCandidates] = useState([]);
  const [filter, setFilter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase
      .database()
      .ref()
      .orderByChild('name')
      .once('value', (data) => {
        data.forEach(function (childSnapshot) {
          let candidate = childSnapshot.val();
          const answers = candidate.answers;
          const answersKeys = Object.keys(answers);
          candidate.answersCompleted = answersKeys.length;
          setCandidates((candidates) => [...candidates, candidate]);
          setLoading(false);
        });
      });
  }, [firebase]);

  const handleChange = (event) => {
    if (event.target.value) {
      setFilter(event.target.value);
    } else {
      setFilter(null);
    }
  };

  return (
    <Container className="py-4">
      <PageTitle> Lista de Candidatos(as)</PageTitle>
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
                    onChange={handleChange}
                  >
                    <option value="">Selecione...</option>
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
            <strong>Candidatos(as):</strong> mostrando {candidates.length}{' '}
            cadastrados no Vota de um total de {totalCandidates}
          </Description>
          {candidates
            .filter((candidate) => {
              if (!filter) {
                return true;
              }

              return candidate.politicalParty === filter;
            })
            .map((candidate) => (
              <div key={candidate.candidateNumber} data-testid="candidate-item">
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
            ))}
        </>
      )}
    </Container>
  );
};

export default ListCandidates;
