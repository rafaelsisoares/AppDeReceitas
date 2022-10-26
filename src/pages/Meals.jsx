import React, { useContext } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';

export default function Meals() {
  const { recipesData: { meals } } = useContext(AppContext);

  const { pathname } = useLocation();

  const haveHeaderSearchBtn = pathname === '/profile'
  || pathname === '/done-recipes'
  || pathname === '/favorite-recipes';

  const haveHeader = !(pathname.includes(':id'));

  if (meals.length === 1) {
    const currRecipeId = meals[0].idMeal;
    return <Redirect to={ `/meals/${currRecipeId}` } />;
  }

  return (
    <div>
      {haveHeader && <Header haveHeaderSearchBtn={ !haveHeaderSearchBtn } />}

      { meals.length > 0 && meals.map((recipe) => (
        <h2 key={ recipe.idMeal }>{recipe.strMeal}</h2>
      ))}

      <Footer />
    </div>
  );
}
