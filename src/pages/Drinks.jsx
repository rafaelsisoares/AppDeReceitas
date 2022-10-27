import React, { useContext, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Recipes from '../components/Recipes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useRecipes from '../hooks/useRecipes';
import useRecipesContext from '../hooks/useRecipesContext';

export default function Drinks() {
  const {
    recipesData, recipesData: { drinks, drinksCategories },
    setRecipesData,
  } = useContext(AppContext);

  const { handleFilterByCategory } = useRecipes();

  const [isFiltered, toggleFiltered] = useState(false);

  const { reqApi } = useRecipesContext();

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
              onClick={ () => {
                toggleFiltered(true);
                handleFilterByCategory('thecocktaildb', category.strCategory);
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
          const { data } = await reqApi('thecocktaildb');
          if (data) {
            setRecipesData({
              ...recipesData,
              drinks: data.drinks,
            });
          }
        } }
      >
        All
      </button>
      <Recipes recipes={ drinks } />

      <Footer />
    </div>
  );
}
