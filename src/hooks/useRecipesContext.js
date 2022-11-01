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
    const categorysURL = `https://www.${category}.com/api/json/v1/1/list.php?c=list`;
    const categories = await (await fetch(categorysURL)).json();
    const data = await (await fetch(URL)).json();
    return { data, categories };
  };

  useEffect(() => {
    const setData = async () => {
      const { data: meals,
        categories: mealsCategories,
      } = await reqApi('themealdb');

      const {
        data: drinks,
        categories: drinksCategories,
      } = await reqApi('thecocktaildb');

      setRecipesData({
        meals: meals.meals,
        mealsCategories: mealsCategories.meals,
        drinks: drinks.drinks,
        drinksCategories: drinksCategories.drinks,
      });
    };
    setData();
  }, []);
  return {
    contentValue,
    reqApi };
};

export default useRecipesContext;
