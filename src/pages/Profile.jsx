import React from 'react';

import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  const { pathname } = useLocation();

  const haveHeaderSearchBtn = pathname === '/profile'
  || pathname === '/done-recipes'
  || pathname === '/favorite-recipes';

  return (
    <div>
      <Header haveHeaderSearchBtn={ !haveHeaderSearchBtn } />
      <Footer />
    </div>
  );
}
