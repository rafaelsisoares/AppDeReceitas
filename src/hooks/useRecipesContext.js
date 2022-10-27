import { useEffect, useState } from 'react';

const useRecipesContext = () => {
  const [recipesData, setRecipesData] = useState({
    meals: [],
    drinks: [],
  });

  const contentValue = {
    recipesData,
    setRecipesData,
  };

  const reqApi = async (category) => {
    const URL = `https://www.${category}.com/api/json/v1/1/search.php?s=`;
    const data = await (await fetch(URL)).json();
    return data;
  };

  useEffect(() => {
    const setData = async () => {
      const meals = await reqApi('themealdb');
      const drinks = await reqApi('thecocktaildb');
      console.log(meals);
      console.log(drinks);
      setRecipesData({
        meals: meals.meals,
        drinks: drinks.drinks,
      });
    };
    setData();
  }, []);
  return contentValue;
};

export default useRecipesContext;
