import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function Recipes({ recipes }) {
  const renderRecipesLimit = 12;
  const currRecipeCategory = useLocation().pathname.slice(1);

  if (recipes.length > 0) {
    return (
      <div>
        { recipes.length > 0 && recipes.map((recipe, index) => {
          if (index < renderRecipesLimit) {
            return (
              <div
                key={ currRecipeCategory === 'meals' ? recipe.idMeal : recipe.idDrink }
                className="recipe-card"
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  className="recipe-card-img"
                  data-testid={ `${index}-card-img` }
                  src={ currRecipeCategory
                     === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
                  alt=""
                />
                <h3
                  className="recipe-title"
                  data-testid={ `${index}-card-name` }
                >
                  { currRecipeCategory === 'meals' ? recipe.strMeal : recipe.strDrink }
                </h3>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  }
  return null;
}

Recipes.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Recipes;
