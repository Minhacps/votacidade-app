import React from 'react';
import {
  screen,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import CityProvider from 'components/CityProvider/CityProvider';
import {
  candidate as candidateMock,
  candidateAnswers as mockCandidateAnswers,
} from 'tests/__mocks__/candidate';
import { mockProfileDatabase } from 'tests/mockFirebaseAuth';
import PublicProfile from './PublicProfile';

jest.mock('components/CityProvider/CityProvider');

afterEach(() => {
  jest.clearAllMocks();
});

function customRender(
  ui,
  {
    path = '/:cityPath/perfil/:candidateId',
    route = '/campinas/perfil/candidate-uuid',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {},
) {
  return {
    ...render(
      <CityProvider>
        <Router history={history}>
          <Route path={path} component={ui} />
        </Router>
      </CityProvider>,
    ),
  };
}

describe('<PublicProfile />', () => {
  it('should render signup cta', async () => {
    mockProfileDatabase();
    const { getByText, getByRole } = customRender(PublicProfile);
    await waitForElementToBeRemoved(() => screen.getByText(/carregando/i));
    expect(getByText(/cadastre-se no vota e compare!/i)).toBeInTheDocument();
    expect(getByRole('link', { name: /cadastrar/i })).toBeInTheDocument();
  });

  it('should display a warning if the candidate was not found', async () => {
    mockProfileDatabase();
    const { getByText } = customRender(PublicProfile);
    await waitForElementToBeRemoved(() => screen.getByText(/carregando/i));

    expect(
      getByText(/infelizmente não encontramos este\(a\) candidato\(a\)/i),
    ).toBeInTheDocument();
  });

  it("should display the candidate's profile and its answers", async () => {
    mockProfileDatabase(candidateMock, mockCandidateAnswers);
    const {
      name,
      description,
      age,
      gender,
      candidateNumber,
      politicalParty,
      ethnicGroup,
    } = candidateMock;
    const {
      getByText,
      getByAltText,
      queryByTestId,
      queryAllByTestId,
    } = customRender(PublicProfile);
    await waitForElementToBeRemoved(() => screen.getByText(/carregando/i));
    expect(getByText(name)).toBeInTheDocument();
    expect(
      getByText(`${candidateNumber} | ${politicalParty}`),
    ).toBeInTheDocument();
    expect(getByAltText(`Foto de ${name}`)).toBeInTheDocument();
    expect(getByText(`${description}`)).toBeInTheDocument();
    expect(getByText(`${age}`)).toBeInTheDocument();
    expect(getByText(`${gender}`)).toBeInTheDocument();
    expect(getByText(`${ethnicGroup}`)).toBeInTheDocument();
    expect(queryByTestId('profile-afinity-tag')).not.toBeInTheDocument();
    expect(queryAllByTestId('candidate-answers')).toHaveLength(30);
  });
});
