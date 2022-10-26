import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../helpers';

const profileTestId = 'profile-top-btn';

describe('Valida a tela de perfil', () => {
  it('Verifica se os itens foram renderizados', () => {
    const email = 'email@email.com';
    const password = '1234567890';
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const btnLogin = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(btnLogin);

    const searchBtn = screen.getByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();

    const profile = screen.getByTestId(profileTestId);
    userEvent.click(profile);

    const title = screen.getByText(/profile/i);
    const profileEmail = screen.getByTestId('profile-email');
    const btnDoneRecipes = screen.getByTestId('profile-done-btn');
    const btnFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    const btnLogout = screen.getByTestId('profile-logout-btn');

    expect(title).toBeInTheDocument();
    expect(profileEmail).toBeInTheDocument();
    expect(btnDoneRecipes).toBeInTheDocument();
    expect(btnFavoriteRecipes).toBeInTheDocument();
    expect(btnLogout).toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
  });

  it('Verifica o botão done recipes', async () => {
    const { history } = renderWithRouter(<App />);

    history.push('/profile');

    const btnDoneRecipes = screen.getByTestId('profile-done-btn');
    userEvent.click(btnDoneRecipes);

    expect(screen.getByText(/done recipes/i)).toBeInTheDocument();
  });

  it('Verifica o botão favorite recipes', async () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByTestId(profileTestId));

    const btnFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    userEvent.click(btnFavoriteRecipes);

    expect(screen.getByText(/favorite recipes/i)).toBeInTheDocument();
  });

  it('Verifica o botão logout', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByTestId(profileTestId));

    const btnLogout = screen.getByTestId('profile-logout-btn');
    userEvent.click(btnLogout);

    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
  });
});
