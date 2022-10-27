import React, { useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import useProfile from '../hooks/useProfile';

export default function Profile() {
  const { pathname } = useLocation();

  const [redirect, setRedirect] = useState('');

  const haveHeaderSearchBtn = pathname === '/profile'
    || pathname === '/done-recipes'
    || pathname === '/favorite-recipes';

  const {
    email,
    handleClickLogout,
  } = useProfile();

  if (redirect !== '') return (<Redirect to={ redirect } />);

  return (
    <div>
      <Header haveHeaderSearchBtn={ !haveHeaderSearchBtn } />
      <div>
        <p data-testid="profile-email">{email}</p>
        <button
          type="button"
          onClick={ () => { setRedirect('/done-recipes'); } }
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
        <button
          type="button"
          onClick={ () => { setRedirect('/favorite-recipes'); } }
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          onClick={ () => {
            handleClickLogout();
            setRedirect('/');
          } }
          data-testid="profile-logout-btn"
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}
