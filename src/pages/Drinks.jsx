import React, { useContext } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Recipes from '../components/Recipes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useRecipes from '../hooks/useRecipes';

export default function Drinks() {
  const { recipesData: { drinks, drinksCategories } } = useContext(AppContext);

  const { handleFilter, handleRemoveFilter, isFiltered } = useRecipes();

  const { pathname } = useLocation();

  const haveHeaderSearchBtn = pathname === '/profile'
  || pathname === '/done-recipes'
  || pathname === '/favorite-recipes';

  const haveHeader = !(pathname.includes(':id'));

  if (drinks.length === 1 && !isFiltered) {
    const currRecipeId = drinks[0].idDrink;
    return <Redirect to={ `/drinks/${currRecipeId}` } />;
  }

  return (
    <div>
      {haveHeader && <Header haveHeaderSearchBtn={ !haveHeaderSearchBtn } />}

      { drinksCategories && drinksCategories.map((category, index) => {
        const categoryLimit = 5;
        if (index < categoryLimit) {
          return (
            <button
              key={ category.strCategory }
              type="button"
              value="thecocktaildb"
              name={ category.strCategory }
              onClick={ handleFilter }
              data-testid={ `${category.strCategory}-category-filter` }
            >
              {category.strCategory}
            </button>
          );
        }
        return null;
      })}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => {
          handleRemoveFilter('thecocktaildb');
        } }
      >
        All
      </button>
      <Recipes recipes={ drinks } />

      <Footer />
    </div>
  );
}
