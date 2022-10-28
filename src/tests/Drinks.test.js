import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../helpers';

it('Verifica o botão de Drinks', async () => {
  const { history } = renderWithRouter(<App />);

  userEvent.type(screen.getByTestId('email-input'), 'email@email.com');
  userEvent.type(screen.getByTestId('password-input'), '1234567890');
  userEvent.click(screen.getByTestId('login-submit-btn'));

  const btnDrinks = screen.getByAltText('Drink');
  expect(btnDrinks).toBeInTheDocument();

  const { location: { pathname } } = history;
  userEvent.click(btnDrinks);
  waitFor(() => expect(pathname).toBe('/drinks'), { timeout: 5000 });

  const drink = await screen.findByTestId('Cocktail-category-filter', {}, { timeout: 5000 });
  expect(drink).toHaveTextContent('Cocktail');
  const drinksList = await screen.findAllByTestId(/card-name/i);
  expect(drinksList).toHaveLength(12);
});
