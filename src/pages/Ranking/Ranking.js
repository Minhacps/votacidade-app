import React, { useContext, useState } from 'react';
import { Button, Container, Spinner } from 'reactstrap';

import { ReactComponent as FindSvg } from 'assets/icons/find.svg';
import { CityContext } from '../../components/CityProvider/CityProvider';

import {
  AffinityTag,
  ButtonWrapper,
  CandidateCard,
  CardInfo,
  CardName,
  Description,
  Divider,
  Img,
  ImgPlaceholder,
  InfoWrapper,
  PageDescription,
  PageTitle,
  ProfileLink,
} from './Ranking.styled';
import { MatchesContext } from 'components/MatchesProvider/MatchesProvider';
import { AnswersContext } from 'components/AnswersProvider/AnswersProvider';
import { useForm } from 'react-hook-form';
import RankingFilters from './RankingFilters';

export default function Ranking() {
  const [listLimiter, setListlimiter] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const { matches } = useContext(MatchesContext);
  const { answers } = useContext(AnswersContext);
  const limitList = (_, index) => index < listLimiter;
  const { cityPath } = useContext(CityContext);
  const { register, control, getValues, watch } = useForm();
  watch();

  const filterForm = (data) => {
    const formValues = getValues([
      'age',
      'gender',
      'socialGroups',
      'ethnicGroup',
      'politicalParty',
    ]);
    console.log(formValues);

    if (!formValues) {
      return data;
    }

    return data.age === formValues.age;
  };

  const hasMoreCandidates = matches.filter(filterForm).length > listLimiter;
  const candidatesCount =
    listLimiter < matches.filter(filterForm).length
      ? listLimiter
      : matches.filter(filterForm).length;

  const loadMoreCandidates = async () => {
    setIsLoading(true);
    return setTimeout(() => {
      setListlimiter(listLimiter + 10);
      setIsLoading(false);
    }, 300);
  };

  if (Object.keys(answers).length < 21) {
    return (
      <Container className="py-4">
        <PageTitle>Ranking</PageTitle>
        <p>
          <strong>Eleitor(a)</strong>, para que o índice de afinidade seja
          exibido, lembre-se que você precisa responder no mínimo 21 questões.
        </p>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <PageTitle>Ranking</PageTitle>
      <PageDescription>
        Quanto mais perguntas você responder, mais assertiva vai ser a
        porcentagem de afinidade! Ah, você pode filtrar os candidatos, ver o
        perfil e as respostas de cada um.
      </PageDescription>
      <Divider />
      <Description>
        <strong>Candidatos(as):</strong> mostrando {candidatesCount} cadastrados
        no Vota de um total de {matches.length}
      </Description>

      <RankingFilters register={register} control={control} />

      {matches
        .filter(filterForm)
        .filter(limitList)
        .map((candidate) => (
          <div key={candidate.id} data-testid="candidate-item">
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
                  Afinidade: <AffinityTag>{candidate.match / 100}%</AffinityTag>
                </CardInfo>
              </InfoWrapper>
              <ProfileLink to={`${cityPath}/perfil/${candidate.id}`}>
                <FindSvg />
              </ProfileLink>
            </CandidateCard>
            <Divider />
          </div>
        ))}
      {hasMoreCandidates && (
        <ButtonWrapper>
          <Button
            color="primary"
            onClick={loadMoreCandidates}
            style={{ width: '130px' }}
            disabled={isLoading}
          >
            {isLoading ? <Spinner color="light" size="sm" /> : 'Carregar mais'}
          </Button>
        </ButtonWrapper>
      )}
    </Container>
  );
}
