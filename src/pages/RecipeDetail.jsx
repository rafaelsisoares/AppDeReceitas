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

  const [isDisabled, setIsDisabled] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const doneRecipeExemplo = [{
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '',
    tags: ['Pasta', 'Curry'],
  }];
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipeExemplo));

  useEffect(() => {
    const teste = JSON.parse(localStorage.getItem('doneRecipes'));
    const isRecipeDone = () => {
      console.log('antes do if');
      if (teste.length > 0) {
        setIsDisabled(true);
        console.log('depois do if');
      }
      console.log('retorno');
    };
    isRecipeDone();
  }, []);

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

  useEffect(() => {
    const isRecipeInProgress = () => {
      const { data } = currRecipeData;
      const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const recipeType = isDrinkCateogry ? 'drinks' : 'meals';
      const idType = isDrinkCateogry ? 'idDrink' : 'idMeal';
      const recipeTarget = data[recipeType];
      if (recipesInProgress
        && recipeTarget) {
        const recipesId = Object.keys(recipesInProgress[recipeType]);
        if (recipesId.includes(recipeTarget[0][idType])) {
          setInProgress(true);
        } else {
          console.log(recipeTarget[0]);
          setInProgress(false);
        }
      }
    };
    isRecipeInProgress();
  }, [currRecipeData, isDrinkCateogry]);

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
          disabled={ isDisabled }
        >
          {inProgress ? 'Continue Recipe' : 'Start recipe'}
        </button>

        <div>
          <RecomendationCard />
        </div>

      </div>
    );
  }
}
