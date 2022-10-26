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

  const renderRecipesLimit = 12;

  return (
    <div>
      {haveHeader && <Header haveHeaderSearchBtn={ !haveHeaderSearchBtn } />}

      { meals.length > 0 && meals.map((recipe, index) => {
        if (index < renderRecipesLimit) {
          return (
            <div
              key={ recipe.idMeal }
              className="recipe-card"
              data-testid={ `${index}-recipe-card` }
            >
              <img
                className="recipe-card-img"
                data-testid={ `${index}-card-img` }
                src={ recipe.strMealThumb }
                alt=""
              />
              <h3
                className="recipe-title"
                data-testid={ `${index}-card-name` }
              >
                {recipe.strMeal}

              </h3>
            </div>
          );
        }
        return null;
      })}

      <Footer />
    </div>
  );
}
