import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function RecomendationCard() {
  const { pathname } = useLocation();
  const isDrinkCategory = pathname.includes('drinks');
  const currCategory = isDrinkCategory ? 'meals' : 'drinks';
  const [recomendations, setRecomendations] = useState([]);

  useEffect(() => {
    const getRecomendations = async () => {
      const category = isDrinkCategory ? 'themealdb' : 'thecocktaildb';
      const endpoint = `https://www.${category}.com/api/json/v1/1/search.php?s=`;
      const data = await (await fetch(endpoint)).json();
      console.log(data);
      if (data) {
        setRecomendations(data);
      }
    };

    getRecomendations();
  }, [currCategory, isDrinkCategory]);

  if (Object.keys(recomendations).length > 0) {
    console.log(currCategory);
    console.log(recomendations[currCategory][0].idDrink);
    return (
      <div className="recommendations-container">
        {
          recomendations[currCategory].map((rec, index) => {
            const key = currCategory === 'drinks' ? rec.idDrink : rec.idMeal;
            const title = currCategory === 'drinks' ? rec.strDrink : rec.strMeal;
            const recommendationsRenderLimit = 6;
            if (index < recommendationsRenderLimit) {
              return (
                <div
                  className="recommendation-card"
                  data-testid={ `${index}-recommendation-card` }
                  key={ key }
                >
                  <p
                    data-testid={ `${index}-recommendation-title` }
                  >
                    { title }

                  </p>
                </div>
              );
            }
            return null;
          })
        }
      </div>
    );
  }
}
