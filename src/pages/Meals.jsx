import React, { useContext } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import useRecipes from '../hooks/useRecipes';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

export default function Meals() {
  const { recipesData: { meals, mealsCategories } } = useContext(AppContext);

  const { handleFilter, handleRemoveFilter, isFiltered } = useRecipes();

  const { pathname } = useLocation();

  const haveHeaderSearchBtn = pathname === '/profile'
  || pathname === '/done-recipes'
  || pathname === '/favorite-recipes';

  const haveHeader = !(pathname.includes(':id'));

  if (meals.length === 1 && !isFiltered) {
    const currRecipeId = meals[0].idMeal;
    return <Redirect to={ `/meals/${currRecipeId}` } />;
  }

  return (
    <div>
      {haveHeader && <Header haveHeaderSearchBtn={ !haveHeaderSearchBtn } />}
      <div className="category-filters">
        { mealsCategories && mealsCategories.map((category, index) => {
          const categoryLimit = 5;
          if (index < categoryLimit) {
            return (
              <button
                data-testid={ `${category.strCategory}-category-filter` }
                key={ category.strCategory }
                value="themealdb"
                name={ category.strCategory }
                type="button"
                onClick={ handleFilter }
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
            handleRemoveFilter('themealdb');
          } }
        >
          All
        </button>
      </div>
      <Recipes recipes={ meals } />

      <Footer />
    </div>
  );
}
