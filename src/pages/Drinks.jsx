import React, { useContext } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Drinks() {
  const { recipesData: { drinks } } = useContext(AppContext);

  const { pathname } = useLocation();

  const haveHeaderSearchBtn = pathname === '/profile'
  || pathname === '/done-recipes'
  || pathname === '/favorite-recipes';

  const haveHeader = !(pathname.includes(':id'));

  if (drinks.length === 1) {
    const currRecipeId = drinks[0].idDrink;
    return <Redirect to={ `/drinks/${currRecipeId}` } />;
  }
  return (
    <div>
      {haveHeader && <Header haveHeaderSearchBtn={ !haveHeaderSearchBtn } />}

      { drinks.length > 0 && drinks.map((recipe) => (
        <h2 key={ recipe.idDrink }>{recipe.strDrink}</h2>
      ))}

      <Footer />
    </div>
  );
}
