import React from 'react';
import { render, screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Question from './Question';

import CityProvider from 'components/CityProvider/CityProvider';

jest.mock('components/CityProvider/CityProvider');

describe('Question', () => {
  it('renders the provided question', async () => {
    const mockSave = jest.fn();

    render(
      <CityProvider>
        <Question id={1} onSave={mockSave} />
      </CityProvider>,
    );

    expect(screen.getByText('Any question title 1')).toBeVisible();
    userEvent.click(screen.getByText('Discordo'));
    userEvent.click(screen.getByText('Salvar'));
    await wait(() => expect(mockSave).toBeCalled());
  });
});
