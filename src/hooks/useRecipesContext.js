import { useState } from 'react';

const useRecipesContext = () => {
  const [recipesData, setRecipesData] = useState({
    meals: [],
    drinks: [],
  });

  const contentValue = {
    recipesData,
    setRecipesData,
  };

  return contentValue;
};

export default useRecipesContext;
