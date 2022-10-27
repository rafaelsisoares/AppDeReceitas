import React, { useContext } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

export default function Meals() {
  const { recipesData: { meals, mealsCategories } } = useContext(AppContext);

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
      <div className="category-filters">
        { mealsCategories && mealsCategories.map((category, index) => {
          const categoryLimit = 5;
          if (index < categoryLimit) {
            return (
              <button
                key={ category.strCategory }
                type="button"
                data-testid={ `${category.strCategory}-category-filter` }
              >
                {category.strCategory}
              </button>
            );
          }
          return null;
        })}
      </div>
      <Recipes recipes={ meals } />

      <Footer />
    </div>
  );
}
