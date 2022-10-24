import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../helpers';

import App from '../App';

describe('Valida tela de Login', () => {
  it('Verifica se os inputs name e email existem na página', async () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeDisabled();
    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, '1234567');
    expect(button).toBeEnabled();
    userEvent.click(button);

    await waitFor(() => {
      const { location: { pathname } } = history;
      return expect(pathname).toBe('/meals');
    }, { timeout: 4000 });
  });
});
