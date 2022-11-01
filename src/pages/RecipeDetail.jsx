import { bool } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import useRecipes from '../hooks/useRecipes';
import RecomendationCard from '../components/RecomendationCard';
import FavoriteAndShare from '../components/FavoriteAndShare';

export default function RecipeDetail() {
  const { pathname } = useLocation();

  const isDrinkCateogry = pathname.includes('drinks');
  const currCategory = isDrinkCateogry ? 'drinks' : 'meals';

  const [currRecipeData, setCurrRecipeData] = useState({
    data: {},
    ingredients: [],
    isDone: bool,
    isInProgress: bool,
  });

  const inProgressRecipes = {
    meals: {
      52771: [],
    },
    drinks: {
      178319: [],
    },
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

  const { getIngredients } = useRecipes();

  const category = pathname.includes('drinks') ? 'thecocktaildb' : 'themealdb';
  const id = pathname.split('/')[2];

  useEffect(() => {
    const getRecipeDetail = async () => {
      const URL = `https://www.${category}.com/api/json/v1/1/lookup.php?i=${id}`;
      const data = await (await fetch(URL)).json();
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const idTarget = currCategory === 'meals' ? 'idMeal' : 'idDrink';
      const ingredients = getIngredients(data[currCategory][0]);
      const currRecipeId = data[currCategory][0][idTarget];

      setCurrRecipeData({
        isDone: doneRecipes
          ? doneRecipes.some((recipe) => recipe.id === currRecipeId) : false,
        data,
        isInProgress: inProgress
          ? Object.keys(inProgress[currCategory])
            .some((recipeID) => recipeID === currRecipeId) : false,
        ingredients,
        thumbKey: isDrinkCateogry ? 'strDrinkThumb' : 'strMealThumb',
        titleKey: isDrinkCateogry ? 'strDrink' : 'strMeal',
        currTarget: isDrinkCateogry ? 'drinks' : 'meals',
      });
    };
    getRecipeDetail();
  }, [
    category,
    id,
    isDrinkCateogry,
    currCategory,
    getIngredients,
  ]);

  const { data,
    ingredients,
    currTarget,
    thumbKey,
    titleKey,
    isDone,
    isInProgress,
  } = (currRecipeData);

  if (currTarget && thumbKey && titleKey) {
    return (
      <div>
        <img
          className="recipe-detail-thumb"
          data-testid="recipe-photo"
          src={ data[currTarget][0][thumbKey] }
          alt=""
        />

        <h2 data-testid="recipe-title">{data[currTarget][0][titleKey]}</h2>
        { currTarget === 'meals'
          ? <p data-testid="recipe-category">{data[currTarget][0].strCategory}</p>
          : <p data-testid="recipe-category">{data[currTarget][0].strAlcoholic}</p>}

        <FavoriteAndShare />
        <ul>
          {ingredients.map((el, index) => {
            const key = `${el.ingrediente}${el.medida}`;
            return (
              <li
                key={ key }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${el.ingrediente}${el.medida}`}
              </li>
            );
          })}
        </ul>

        <p data-testid="instructions">{data[currTarget][0].strInstructions}</p>

        { currTarget === 'meals' && <iframe
          data-testid="video"
          width="320"
          height="260"
          src={ `https://www.youtube.com/embed/${data[currTarget][0].strYoutube.split('=')[1]}` }
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
          allowFullScreen
          title="Embedded youtube"
        />}
        {!isDone && (
          <Link to={ `/${currCategory}/${id}/in-progress` }>
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="btn-start-recipe"
            >
              { isInProgress ? 'Continue Recipe' : 'Start Recipe'}
            </button>
          </Link>)}

        <div>
          <RecomendationCard />
        </div>

      </div>
    );
  }
}
