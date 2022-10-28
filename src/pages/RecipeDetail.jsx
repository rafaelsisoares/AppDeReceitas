import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function RecipeDetail() {
  const { pathname } = useLocation();

  const [currRecipeData, setCurrRecipeData] = useState({});

  useEffect(() => {
    const getRecipeDetail = async () => {
      const category = pathname.includes('drinks') ? 'thecocktaildb' : 'themealdb';
      const id = pathname.split('/')[2];
      const URL = `https://www.${category}.com/api/json/v1/1/lookup.php?i=${id}`;
      const data = await (await fetch(URL)).json();
      setCurrRecipeData({
        data,
      });
    };
    getRecipeDetail();
  }, [pathname]);

  console.log(currRecipeData);
  return (
    <div />
  );
}
