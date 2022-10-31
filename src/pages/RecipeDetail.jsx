import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecomendationCard from '../components/RecomendationCard';

export default function RecipeDetail() {
  const { pathname } = useLocation();

  const isDrinkCateogry = pathname.includes('drinks');

  const [currRecipeData, setCurrRecipeData] = useState({
    data: {},
    ingredients: [],
  });

  const category = pathname.includes('drinks') ? 'thecocktaildb' : 'themealdb';
  const id = pathname.split('/')[2];

  useEffect(() => {
    const getIngredients = (data) => {
      const ingredients = [];

      const ingredientListLimit = 15;

      for (let i = 1; i <= ingredientListLimit; i += 1) {
        const currKeyTarget = `strIngredient${i}`;
        const currMeisureKey = `strMeasure${i}`;
        const currCategory = isDrinkCateogry ? 'drinks' : 'meals';
        const ingredient = data[currCategory][0][currKeyTarget];
        const meisure = data[currCategory][0][currMeisureKey];
        const ingredientObj = {
          [ingredient]: meisure,
        };
        if (ingredient) {
          ingredients.push(ingredientObj);
        }
      }

      return ingredients;
    };

    const getRecipeDetail = async () => {
      const URL = `https://www.${category}.com/api/json/v1/1/lookup.php?i=${id}`;
      const data = await (await fetch(URL)).json();
      const ingredients = getIngredients(data);

      setCurrRecipeData({
        data,
        ingredients,
        thumbKey: isDrinkCateogry ? 'strDrinkThumb' : 'strMealThumb',
        titleKey: isDrinkCateogry ? 'strDrink' : 'strMeal',
        currTarget: isDrinkCateogry ? 'drinks' : 'meals',
      });
    };
    getRecipeDetail();
  }, [category, id, isDrinkCateogry]);

  const { data, ingredients, currTarget, thumbKey, titleKey } = (currRecipeData);

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

        <ul>
          {ingredients.map((el, index) => {
            const key = `${Object.keys(el)[0]}${Object.values(el)[0]}`;
            return (
              <li
                key={ key }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${Object.keys(el)[0]} : ${Object.values(el)[0]} `}
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

        <button
          type="button"
          data-testid="start-recipe-btn"
          className="btn-start-recipe"
        >
          Start Recipe
        </button>
        <div>
          <RecomendationCard />
        </div>
      </div>
    );
  }
}
