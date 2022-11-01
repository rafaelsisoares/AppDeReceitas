import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FavoriteAndShare from '../components/FavoriteAndShare';
import useRecipesContext from '../hooks/useRecipesContext';
import useRecipes from '../hooks/useRecipes';

export default function RecipeInProgress() {
  const { pathname } = useLocation();
  const [currRecipeData, setCurrRecipeData] = useState({});
  const [currRecipeSteps, setCurrRecipeSteps] = useState([]);
  const { contentValue: { recipesData } } = useRecipesContext();
  const { getIngredients,
    handleCheckRecipeStep,
    checkedSteps,
    setCheckedSteps,
  } = useRecipes();

  const thumbKeyName = pathname.includes('drinks') ? 'strDrinkThumb' : 'strMealThumb';
  const titleKeyName = pathname.includes('drinks') ? 'strDrink' : 'strMeal';
  const currCategory = pathname.includes('drinks') ? 'drinks' : 'meals';

  const currentId = pathname.split('/')[2];

  useEffect(() => {
    const getRecipeData = async () => {
      const id = pathname.split('/')[2];
      const currApiProvider = pathname.includes('drinks') ? 'thecocktaildb' : 'themealdb';
      const endpoint = `https://www.${currApiProvider}.com/api/json/v1/1/lookup.php?i=${id}`;
      const checkedStepsData = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const data = await (await fetch(endpoint)).json();
      const ingredients = getIngredients(data[currCategory][0]);
      setCurrRecipeSteps([...ingredients]);
      setCurrRecipeData(data);
      if (checkedStepsData[currCategory][id]) {
        return setCheckedSteps([...checkedStepsData[currCategory][id]]);
      }
      setCheckedSteps([]);
    };

    getRecipeData();
  }, [pathname,
    recipesData,
    currCategory,
    getIngredients,
    checkedSteps,
    setCheckedSteps,
  ]);

  if ((currRecipeData[currCategory])) {
    return (
      <div>
        <img
          className="recipe-card-img"
          src={ currRecipeData[currCategory][0][thumbKeyName] }
          data-testid="recipe-photo"
          alt=""
        />

        <h2
          data-testid="recipe-title"
        >
          { currRecipeData[currCategory][0][titleKeyName] }
        </h2>

        <FavoriteAndShare />

        <p
          data-testid="recipe-category"
        >
          {currRecipeData[currCategory][0].strCategory}
        </p>

        <ul className="recipe-steps">
          { currRecipeSteps
             && currRecipeSteps.length > 0
               && currRecipeSteps.map((step, index) => (
                 <li
                   key={ `${step.ingrediente}: ${step.medida}` }
                 >
                   <label
                     data-testid={ `${index}-ingredient-step` }
                     className={ checkedSteps
                        && checkedSteps.includes(`${step.ingrediente}: ${step.medida}`)
                       ? 'checked-step' : '' }
                     htmlFor="step"
                   >
                     <input
                       className="step-checkbox"
                       type="checkbox"
                       name={ currentId }
                       checked={ checkedSteps
                         ? checkedSteps.includes(`${step.ingrediente}: ${step.medida}`)
                         : false }
                       onChange={ () => {
                         handleCheckRecipeStep(
                           `${step.ingrediente}: ${step.medida}`,
                           currentId,
                         );
                       } }
                       value={ `${step.ingrediente}: ${step.medida}` }
                       id="step"
                     />
                     { `${step.ingrediente}: ${step.medida}` }
                   </label>
                 </li>
               ))}
        </ul>

        <p
          data-testid="instructions"
        >
          { currRecipeData[currCategory][0].strInstructions}
        </p>

        <button
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finish Recipe
        </button>

      </div>
    );
  }
}
