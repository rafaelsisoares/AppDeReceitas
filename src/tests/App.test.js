import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../helpers';

import App from '../App';
import Header from '../components/Header';

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

  it('Verifica funcionalidades do header', async () => {
    const { history } = renderWithRouter(<Header />);

    const profile = screen.getByTestId('profile-top-btn');
    const search = screen.getByTestId('search-top-btn');
    const title = screen.getByTestId('page-title');

    expect(profile).toBeInTheDocument();
    expect(search).toBeInTheDocument();

    userEvent.click(search);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    userEvent.click(search);

    expect(screen.getByTestId('search-input')).not.toBeInTheDocument();

    expect(title).toBeInTheDocument();
    userEvent.click(profile);
    await waitFor(() => {
      const { location: { pathname } } = history;
      return expect(pathname).toBe('/profile');
    }, { timeout: 4000 });
  });

  it('Verifica funcionalidades do footer', () => {
    render(<App />);
    const footer = screen.getByTestId('footer');
    const style = window.getComputedStyle(footer);
    const drinks = screen.getByTestId('drinks-bottom-btn');
    const meals = screen.getByTestId('meals-bottom-btn');

    expect(style.position).toBe('fixed');
    expect(drinks).toHaveAttribute('src', '../src/images/drinkIcon.svg');
    expect(meals).toHaveAttribute('src', '../src/images/mealIcon.svg');
  });
});
