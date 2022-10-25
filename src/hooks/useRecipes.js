import { useState } from 'react';

const useRecipes = () => {
  const [recipesData, setRecipesData] = useState({
    content: [],
  });

  const value = {
    recipesData,
    setRecipesData,
  };

  return value;
};

export default useRecipes;
