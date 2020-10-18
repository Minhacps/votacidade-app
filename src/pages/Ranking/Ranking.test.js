import React, { useContext } from 'react';
import Ranking from './Ranking';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import user from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { createBrowserHistory } from 'history';

import AnswersProvider from 'components/AnswersProvider/AnswersProvider';
import questionsService from 'components/AnswersProvider/answersService';
import CityProvider, {
  CityContext,
} from 'components/CityProvider/CityProvider';
import MatchesProvider from 'components/MatchesProvider/MatchesProvider';
import * as matchesService from 'components/MatchesProvider/matchesService';
import { cityPath } from 'tests/fakeCity';

const candidateNamePrefix = 'Nome de exemplo #';
const mockedCandidates = new Array(30).fill(undefined).map((_, index) => ({
  id: 12345555 + index,
  name: `${candidateNamePrefix}${index}`,
  candidateNumber: 12341229 + index,
  match: `${index}`,
  politicalParty: `ABC-${index}`,
}));

const mockedAnswers = new Array(30).fill(undefined).reduce((acc, _, index) => {
  acc[index] = { answer: `DT-${index}` };
  return acc;
}, {});

const mockedMatchesService = jest
  .spyOn(matchesService, 'getMatches')
  .mockResolvedValue(mockedCandidates);
const mockedQuestionService = jest
  .spyOn(questionsService, 'getAnsweredQuestions')
  .mockResolvedValue(mockedAnswers);

jest.useFakeTimers();
jest.mock('components/CityProvider/CityProvider');

afterAll(() => {
  jest.unmock('components/CityProvider/CityProvider');
  mockedMatchesService.mockRestore();
  mockedQuestionService.mockRestore();
});

function customRender() {
  const history = createBrowserHistory();
  const WrappedUi = () => {
    const { firebase } = useContext(CityContext);

    return (
      <Router history={history}>
        <AnswersProvider>
          <MatchesProvider firebase={firebase}>
            <Ranking />
          </MatchesProvider>
        </AnswersProvider>
      </Router>
    );
  };

  return {
    ...render(<WrappedUi />, { wrapper: CityProvider }),
    history,
  };
}

describe('Ranking', () => {
  it('shoud list 10 candidates at a time', async () => {
    customRender();
    const candidatesBatchLength = 10;

    async function assertNumberOfCandidates(expectedLenght, total) {
      const totalCandidatesMessage = await screen.findByText(
        new RegExp(`de um total de ${total}`, 'gi'),
      );
      expect(totalCandidatesMessage).toBeInTheDocument();

      const candidates = await screen.findAllByText(
        new RegExp(candidateNamePrefix, 'gi'),
      );
      expect(candidates).toHaveLength(expectedLenght);
    }

    await assertNumberOfCandidates(
      candidatesBatchLength,
      mockedCandidates.length,
    );
    const loadMorebutton = screen.getByRole('button', {
      name: /carregar mais/i,
    });

    act(() => {
      user.click(loadMorebutton);
      jest.runOnlyPendingTimers();
    });

    await assertNumberOfCandidates(
      candidatesBatchLength * 2,
      mockedCandidates.length,
    );

    act(() => {
      user.click(loadMorebutton);
      jest.runOnlyPendingTimers();
    });

    await assertNumberOfCandidates(
      candidatesBatchLength * 3,
      mockedCandidates.length,
    );
  });

  it('should render a candidates and navigate to candidate profile', async () => {
    const { history } = customRender();

    const firstCandidate = mockedCandidates[0];

    expect(await screen.findByText(firstCandidate.name)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${firstCandidate.candidateNumber} | ${firstCandidate.politicalParty}`,
      ),
    ).toBeInTheDocument();

    const profileLink = screen.getByRole('link', {
      name: `Ver o perfil do(a) ${firstCandidate.name}`,
    });

    user.click(profileLink);

    expect(history.location.pathname).toContain(
      `${cityPath}/perfil/${firstCandidate.id}`,
    );
  });
});
