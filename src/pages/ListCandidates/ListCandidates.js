import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'reactstrap';
import {
  AnswerTag,
  CandidateCard,
  CardInfo,
  CardName,
  Description,
  Divider,
  Img,
  ImgPlaceholder,
  InfoWrapper,
  PageTitle,
} from './ListCandidates.styled';
import { CityContext } from '../../components/CityProvider/CityProvider';

const ListCandidates = ({ firebase }) => {
  const { totalCandidates } = useContext(CityContext);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase
      .database()
      .ref()
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

  return (
    <Container className="py-4">
      <PageTitle> Lista de Candidatos(as)</PageTitle>
      {loading ? (
        <p>carregando</p>
      ) : (
        <>
          <Divider />
          <Description>
            <strong>Candidatos(as):</strong> mostrando {candidates.length}{' '}
            cadastrados no Vota de um total de {totalCandidates}
          </Description>
          {candidates
            .sort((a, b) => {
              return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
            })
            .map((candidate) => (
              <div key={candidate.candidateNumber} data-testid="candidate-item">
                <CandidateCard>
                  {candidate.picture ? (
                    <Img
                      src={candidate.picture}
                      alt={`Foto do candidato ${candidate.name}`}
                    />
                  ) : (
                    <ImgPlaceholder />
                  )}
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
