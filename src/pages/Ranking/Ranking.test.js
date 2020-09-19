import React from 'react';
import Ranking from './Ranking';
import { render, fireEvent, screen } from '@testing-library/react';

describe('Ranking', () => {
  it('shoud list 10 candidates at a time', async () => {
    render(<Ranking />);
    const candidates = screen.getAllByTestId('candidate-item');
    expect(candidates.length).toEqual(10);

    const loadMorebutton = screen.getByRole('button', {
      name: /carregar mais/i,
    });
    fireEvent.click(loadMorebutton);

    const newCandidates = screen.getAllByTestId('candidate-item');
    expect(newCandidates.length).toEqual(20);
  });
});
