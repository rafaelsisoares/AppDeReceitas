import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';

export default function Drinks() {
  const { pathname } = useLocation();

  const haveHeaderSearchBtn = pathname === '/profile'
  || pathname === '/done-recipes'
  || pathname === '/favorite-recipes';

  const haveHeader = !(pathname.includes(':id'));
  console.log(haveHeader);
  return (
    <div>
      {haveHeader && <Header haveHeaderSearchBtn={ !haveHeaderSearchBtn } />}

    </div>
  );
}
