import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../helpers';

it('Verifica botões de compartilhar e salvar', async () => {
  const { history } = renderWithRouter(<App />);

  userEvent.type(screen.getByTestId('email-input'), 'email@email.com');
  userEvent.type(screen.getByTestId('password-input'), '1234567890');
  userEvent.click(screen.getByTestId('login-submit-btn'));

  const btnDrinks = screen.getByAltText('Drink');
  const { location: { pathname } } = history;
  userEvent.click(btnDrinks);
  waitFor(() => expect(pathname).toBe('/drinks'), { timeout: 5000 });

  const drinkGG = await waitFor(() => screen.getByTestId('0-card-name'), { timeout: 6000 });
  userEvent.click(drinkGG);

  const share = await waitFor(() => screen.getByTestId('share-btn'));
  const favorite = await waitFor(() => screen.getByTestId('favorite-btn'));

  expect(share).toBeInTheDocument();
  expect(favorite).toBeInTheDocument();
});
