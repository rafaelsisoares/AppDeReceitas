import React, { useContext, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import useRecipes from '../hooks/useRecipes';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import useRecipesContext from '../hooks/useRecipesContext';

export default function Meals() {
  const {
    recipesData, recipesData: { meals, mealsCategories },
    setRecipesData,
  } = useContext(AppContext);

  const [isFiltered, toggleFiltered] = useState(false);

  const { handleFilterByCategory } = useRecipes();

  const { pathname } = useLocation();

  const { reqApi } = useRecipesContext();

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
                key={ category.strCategory }
                type="button"
                onClick={ () => {
                  toggleFiltered(true);
                  handleFilterByCategory('themealdb', category.strCategory);
                } }
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
          onClick={ async () => {
            toggleFiltered(false);
            const { data } = await reqApi('themealdb');
            if (data) {
              setRecipesData({
                ...recipesData,
                meals: data.meals,
              });
            }
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
