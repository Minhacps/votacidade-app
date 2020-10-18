import React, { useContext } from 'react';
import Ranking from './Ranking';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import AnswersProvider from 'components/AnswersProvider/AnswersProvider';
import questionsService from 'components/AnswersProvider/answersService';
import CityProvider, {
  CityContext,
} from 'components/CityProvider/CityProvider';
import MatchesProvider from 'components/MatchesProvider/MatchesProvider';
import * as matchesService from 'components/MatchesProvider/matchesService';

const candidateNamePrefix = 'Nome de exemplo #';
const mockedCandidates = new Array(30).fill(undefined).map((_, index) => ({
  id: 12345555 + index,
  name: `${candidateNamePrefix}${index}`,
  candidateNumber: 12341229 + index,
  match: `${index}`,
}));

jest.spyOn(matchesService, 'getMatches').mockResolvedValue(mockedCandidates);

jest.mock('components/CityProvider/CityProvider');

const mockedAnswers = new Array(30).fill(undefined).reduce((acc, _, index) => {
  acc[index] = { answer: `DT-${index}` };
  return acc;
}, {});

jest
  .spyOn(questionsService, 'getAnsweredQuestions')
  .mockResolvedValue(mockedAnswers);

const WrappedUi = () => {
  const { firebase } = useContext(CityContext);

  return (
    <BrowserRouter>
      <AnswersProvider>
        <MatchesProvider firebase={firebase}>
          <Ranking />
        </MatchesProvider>
      </AnswersProvider>
    </BrowserRouter>
  );
};

jest.useFakeTimers();

describe('Ranking', () => {
  it('shoud list 10 candidates at a time', async () => {
    render(<WrappedUi />, { wrapper: CityProvider });
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
      userEvent.click(loadMorebutton);
      jest.runOnlyPendingTimers();
    });

    await assertNumberOfCandidates(
      candidatesBatchLength * 2,
      mockedCandidates.length,
    );

    act(() => {
      userEvent.click(loadMorebutton);
      jest.runOnlyPendingTimers();
    });

    await assertNumberOfCandidates(
      candidatesBatchLength * 3,
      mockedCandidates.length,
    );
  });
});
